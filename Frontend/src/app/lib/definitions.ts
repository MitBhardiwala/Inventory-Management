import * as Yup from "yup";

export interface ProductType {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock: number;
}

export interface CreateProductType {
  name: string;
  description?: string;
  category?: string;
  price: string;
  stock: string;
}

export const createProductSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  stock: Yup.string().required("Required"),
});

export interface purchasedProductType extends ProductType {
  quantityPurchased: number;
}

export interface ProductSalesType {
  productId: number;
  _sum: {
    quantity: number;
    totalPrice: number;
  };
}
