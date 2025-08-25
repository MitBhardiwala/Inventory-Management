"use client";

import { createProductSchema, CreateProductType } from "@/app/lib/definitions";
import ReusableForm from "@/app/lib/ReusableForm";
import { fetchProductById } from "@/app/lib/services/products";
import { useEffect, useState } from "react";

const EditProductForm = ({
  handleEditProduct,
  productId,
}: {
  handleEditProduct: (
    values: CreateProductType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  productId: number;
}) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });
  const editProductFields = [
    {
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
    },
    {
      name: "category",
      type: "text",
      label: "Category",
    },
    {
      name: "price",
      type: "number",
      label: "Price",
    },
    {
      name: "stock",
      type: "number",
      label: "Stock",
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetchProductById(productId);

      setInitialValues({
        name: response.name,
        description: response.description,
        category: response.category,
        price: response.price,
        stock: response.stock,
      });
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="overflow-scroll no-scrollbar max-h-[90%] bg-white p-6 rounded-xl w-full  max-w-2xl">
      <ReusableForm
        title={`Edit Product form`}
        initialValues={initialValues}
        validationSchema={createProductSchema}
        onSubmit={handleEditProduct}
        fields={editProductFields}
        submitButtonText={`Edit Product`}
      />
    </div>
  );
};

export default EditProductForm;
