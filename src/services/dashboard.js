import axios from "axios";

const API_URL =
  "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings";

export const getDashboard = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching master jenis konsumsi:", error);
    throw error;
  }
};
