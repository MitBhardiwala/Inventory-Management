import axios from "axios";
import { CreateProductType } from "../definitions";
import { prepareBodyData } from "../utils";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
export const createProduct = async (product: CreateProductType) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, product);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
export const editProduct = async (
  product: CreateProductType,
  productId: number
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/product/${productId}`,
      product
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const fetchProductById = async (productId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${productId}`);
    return response.data.data[0];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const purchaseProducts = async (data: { [key: number]: number }) => {
  try {
    const productsData = prepareBodyData(data);
    const response = await axios.post(`${BASE_URL}/order`, {
      customerId: 1,
      items: productsData,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};

export const getInvoiceDetails = async (orderId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/${orderId}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
