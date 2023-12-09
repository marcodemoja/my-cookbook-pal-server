import {} from "dotenv/config";
import axios from "axios";
const { NUTRITIONX_BASE_URL, NUTRITIONX_API_KEY, NUTRITIONX_APP_ID } =
  process.env;
const HEADERS = {
  "Content-Type": "application/json",
  "x-app-id": NUTRITIONX_APP_ID,
  "x-app-key": NUTRITIONX_API_KEY,
};

const searchFood = async (searchTerm: string) => {
  return axios(`${NUTRITIONX_BASE_URL}/search/instant`, {
    method: "GET",
    params: {
      query: searchTerm.toLowerCase(),
      branded: false,
    },
    headers: HEADERS,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getNutrients = async (foodName: string) => {
  return axios(`${NUTRITIONX_BASE_URL}/natural/nutrients`, {
    method: "POST",
    data: { query: foodName },
    headers: HEADERS,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export { searchFood, getNutrients };