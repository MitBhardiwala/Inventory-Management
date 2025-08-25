"use client";

import { useEffect, useState } from "react";
import {
  fetchAllProducts,
  getInvoiceDetails,
  purchaseProducts,
} from "../lib/services/products";
import { ProductType, purchasedProductType } from "../lib/definitions";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Invoice from "../components/Invoice.jsx";


export default function Page() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [invoice, setInvoice] = useState(null);

  const fetchProducts = async () => {
    const response = await fetchAllProducts();
    if (response.success) {
      setProducts(response.data);
      const initialQuantities = response.data.reduce(
        (acc: { [key: number]: number }, product: ProductType) => {
          acc[product.id] = 0;
          return acc;
        },
        {}
      );
      setQuantities(initialQuantities);
    }
  };

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prevQuantities: { [key: number]: number }) => ({
      ...prevQuantities,
      [productId]: Math.max(0, prevQuantities[productId] + change),
    }));
  };

  const handlePurchase = async () => {
    const sumOfQuantities = Object.values(quantities).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    if (sumOfQuantities === 0) {
      return;
    }
    const result = await purchaseProducts(quantities);
    if (result.success) {
      const invoiceData = await getInvoiceDetails(result.data.id);
      setInvoice(invoiceData);
      toast.success(result.message || "Invoice generated successfully");

      fetchProducts();
    } else {
      toast.error(result.error || "Unkown error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="h-full bg-white p-4">
        <div className="p-3 text-3xl font-semibold">Purchase Products </div>
        <div className="border-1 rounded-md p-3 flex flex-col gap-3 ">
          {products.map((product: purchasedProductType) => (
            <div
              key={product.id}
              className="flex border-1 p-3 border-gray-300 justify-between"
            >
              <div>
                <div>Name : {product.name}</div>
                <div>Description : {product.description}</div>
                <div>Category : {product.category}</div>

                <div>Price : {product.price}</div>
                <div>Stock : {product.stock}</div>
              </div>

              <div className="flex gap-3  items-center">
                <Button
                  variant="outlined"
                  onClick={() => handleQuantityChange(product.id, -1)}
                >
                  -
                </Button>
                <span>{quantities[product.id]}</span>
                <Button
                  variant="outlined"
                  onClick={() => handleQuantityChange(product.id, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}

          {products.length === 0 ? (
            <div className="text-center">No products found</div>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ width: "fit-content", alignSelf: "center" }}
              onClick={handlePurchase}
            >
              Purchase and Generate Invoice
            </Button>
          )}
        </div>

        {invoice && (
          <div>
            <Invoice data={invoice} />
          </div>
        )}
      </div>
    </>
  );
}
