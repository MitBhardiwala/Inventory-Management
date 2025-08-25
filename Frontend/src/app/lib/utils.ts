export const prepareBodyData = (data: { [key: number]: number }) => {
  const productsPurchased = [];
  for (const key in data) {
    if (data[key] != 0) {
      productsPurchased.push({
        productId: Number(key),
        quantityPurchased: data[key],
      });
    }
  }

  return productsPurchased;
};
