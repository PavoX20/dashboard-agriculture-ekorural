import axios from "axios";

export async function humedityLastDay() {
  const url = "/api/mushroomOysters/DataLastDay";

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


