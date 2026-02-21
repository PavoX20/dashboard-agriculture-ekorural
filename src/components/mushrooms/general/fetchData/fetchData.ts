import axios from "axios";

export async function humedityLastDay() {
  const url = "http://localhost:5001/mushroomOysters/DataLastDay"; // Usa el nombre del servicio Docker y el puerto interno del backend

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data; // Retorna los datos para uso posterior
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;  // Retorna null para indicar que la solicitud no tuvo éxito
  }
}
