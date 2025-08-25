import prisma from "./db";

export const getOrderItems = async (items) => {
  let orderItems: {}[] = [];
  let totalQuantity = 0;
  let totalAmount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const productId = item.productId;
    const productDetails = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    const totalPrice = productDetails
      ? item.quantityPurchased * Number(productDetails.price)
      : 0;

    orderItems.push({
      productId: productId,
      quantity: item.quantityPurchased,
      totalPrice: totalPrice,
    });

    totalQuantity += item.quantityPurchased;
    totalAmount += totalPrice;
  }

  return { orderItems, totalQuantity, totalAmount };
};

export const populateOrderItemTable = async (orderId, orderItems) => {
  try {
    for (let i = 0; i < orderItems.length; i++) {
      const product = orderItems[i];

      await prisma.orderItem.create({
        data: {
          orderId: orderId,
          productId: product.productId,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
        },
      });

      //update actual price
      await prisma.product.update({
        where: {
          id: product.productId,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};

export const checkIfStocksAvailable = async (items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const productId = item.productId;
    const productDetails = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (productDetails && item.quantityPurchased > productDetails?.stock) {
      return false;
    }
  }

  return true;
};
