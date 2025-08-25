"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../lib/services/products";
import { CreateProductType, ProductType } from "../lib/definitions";
import { Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import AddProductForm from "../components/layout/forms/AddProductForm";
import EditProductForm from "../components/layout/forms/EditProductForm";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [addProductForm, setAddProductForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const [currEditProductId, setCurrEditProductId] = useState(0);

  const fetchProducts = async () => {
    const response = await fetchAllProducts();
    if (response.success) {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: number) => {
    const result = await deleteProduct(productId);
    if (result.success) {
      toast.success(result.message || "Product Deleted successfully");
      fetchProducts();
    } else {
      toast.error(result.error || "Error in deleting Product");
    }
  };

  const handleAddProduct = async (values: CreateProductType) => {
    const result = await createProduct(values);
    if (result.success) {
      toast.success(result.message || "Product Added successfully");
      fetchProducts();
      setAddProductForm(false);
    } else {
      toast.error(result.error || "Error in addings Product");
    }
  };
  const handleEditProduct = async (values: CreateProductType) => {
    const result = await editProduct(values, currEditProductId);
    if (result.success) {
      toast.success(result.message || "Product Added successfully");
      fetchProducts();
      setEditProductForm(false);
    } else {
      toast.error(result.error || "Error in addings Product");
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="text-3xl p-2">Manage Products</div>

          <Button variant="contained" onClick={() => setAddProductForm(true)}>
            Add Product
          </Button>
        </div>

        <div className="p-4 bg-white flex flex-col gap-4 ">
          {products.map((product: ProductType) => (
            <div
              key={product.id}
              className="border-1 rounded-md border-gray-300 p-3 flex justify-between"
            >
              <div className="flex flex-col gap-2">
                <p>Name :{product.name}</p>
                <p>Description :{product.description}</p>
                <p>Category :{product.category}</p>
                <p>Price :{product.price}</p>
                <p>Stock :{product.stock}</p>
              </div>
              <div className="flex flex-col justify-center gap-5">
                <Button
                  variant="contained"
                  onClick={() => {
                    setCurrEditProductId(product.id);
                    setEditProductForm(true);
                  }}
                >
                  Edit Product
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete Product
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={addProductForm}
        onClose={() => setAddProductForm(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <AddProductForm handleAddProduct={handleAddProduct} />
      </Modal>
      <Modal
        open={editProductForm}
        onClose={() => setEditProductForm(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <EditProductForm
          handleEditProduct={handleEditProduct}
          productId={currEditProductId}
        />
      </Modal>
    </>
  );
}
