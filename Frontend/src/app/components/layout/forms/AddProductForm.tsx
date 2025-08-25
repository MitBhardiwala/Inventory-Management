"use client";

import { createProductSchema, CreateProductType } from "@/app/lib/definitions";
import ReusableForm from "@/app/lib/ReusableForm";

const AddProductForm = ({
  handleAddProduct,
}: {
  handleAddProduct: (
    values: CreateProductType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
}) => {
  const addProductFields = [
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

  const initialValues = {
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  };

  return (
    <div className="overflow-scroll no-scrollbar max-h-[90%] bg-white p-6 rounded-xl w-full  max-w-2xl">
      <ReusableForm
        title={`Add Product form`}
        initialValues={initialValues}
        validationSchema={createProductSchema}
        onSubmit={handleAddProduct}
        fields={addProductFields}
        submitButtonText={`Add Product`}
      />
    </div>
  );
};

export default AddProductForm;
