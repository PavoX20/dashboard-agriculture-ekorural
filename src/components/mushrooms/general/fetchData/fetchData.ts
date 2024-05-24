import axios from "axios";

export async function humedityLastDay() {
  const url = "http://localhost:3000/mushroomOysters/DataLastDay";

  try {
    // Perform a GET request using axios
    const response = await axios.get(url);

    // `response.data` contains the data in JSON format
    return response.data; // Return the data for further use
  } catch (error) {
    // Handle errors in the request or in the response
    console.error("Failed to fetch data:", error);
    return null;  // Return null to indicate that the fetch was unsuccessful
  }
}
