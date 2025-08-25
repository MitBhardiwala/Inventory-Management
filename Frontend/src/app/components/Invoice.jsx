import { Button } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Invoice({ data }) {
  const invoiceData = data.data;
  const { Customer, OrderItem } = invoiceData;

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <div className="p-3" ref={contentRef}>
        <div>
          <div className="flex">
            <p className="text-xl font-bold">Dear {Customer.name}</p>
            <p className="font-thin">({Customer.email})</p>
          </div>
          <p className="text-gray-500">
            Here are your order details. We thank you for your purchase
          </p>
        </div>

        <hr className="my-[50px] text-gray-300" />

        <div className="flex justify-between">
          <div>
            <p>Order Id</p>
            <p className="text-gray-500">#{invoiceData.id}</p>
          </div>
          <div>
            <p>Date Purchased</p>
            <p className="text-gray-500">
              {invoiceData.createdAt.substr(0, 10)}
            </p>
          </div>
          <div>
            <p>User Address</p>
            <p className="text-gray-500">{Customer.address}</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between text-gray-600">
            <p className="basis-1/2">Products</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>

          <hr className="text-gray-300" />
          <div>
            {OrderItem.map((order) => (
              <div className="flex justify-between p-2" key={order.id}>
                <p className="basis-1/2">{order.Product.name}</p>
                <p>{order.Product.price}</p>
                <p>{order.quantity}</p>
                <p>{order.totalPrice}</p>
              </div>
            ))}
          </div>

          <hr className="text-gray-300" />
        </div>

        <p className="text-right p-2 mr-1">
          Grand Total : {invoiceData.totalAmount}
        </p>
      </div>

      <Button
        variant="contained"
        color="success"
        sx={{  mt: 2, alignSelf: "center" }}
        onClick={reactToPrintFn}
      >
        Print Invoice
      </Button>
    </>
  );
}
