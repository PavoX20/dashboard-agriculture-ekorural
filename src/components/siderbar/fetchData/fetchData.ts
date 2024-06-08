import axios from "axios";

export async function valuesMushroomLastDay() {
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



export async function valuesGreenhouse1LastDay() {
  const url = "http://localhost:3000/mushroomOysters/DataLastDay";

  try {
    // Realiza la solicitud GET utilizando axios
    const response = await axios.get(url);

    // `response.data` contiene los datos en formato JSON
    const data = response.data;
    return data; // Retorna los datos para uso posterior
  } catch (error) {
    // Maneja errores en la solicitud o en la respuesta
    console.error("Failed to fetch data: ", error);
    return null;  // Retorna null para indicar que la solicitud no tuvo éxito
  }
}


export async function valuesGreenhouse3LastDay() {
  const url = "http://localhost:3000/mushroomOysters/DataLastDay";

  try {
    // Realiza la solicitud GET utilizando axios
    const response = await axios.get(url);

    // `response.data` contiene los datos en formato JSON
    const data = response.data;
    return data; // Retorna los datos para uso posterior
  } catch (error) {
    // Maneja errores en la solicitud o en la respuesta
    console.error("Failed to fetch data: ", error);
    return null;  // Retorna null para indicar que la solicitud no tuvo éxito
  }
}






