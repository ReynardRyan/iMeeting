import axios from "axios";

const API_URL =
  "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice";

export const getMasterOffice = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching master office data:", error);
    throw error;
  }
};
