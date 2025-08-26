import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getSalesReport = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sales`);

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: "An unknown error occurred." };
  }
};
