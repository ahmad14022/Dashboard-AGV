import axios from "axios"; 

const API_URL = "https://sans-agv.azurewebsites.net/api";

class TasksService {
  constructor() {
    this.init();
  }

  init() {
    // interceptor request
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // interceptor response
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getTasks() {
    try {
      const response = await axios.get(API_URL + "/task/line");
      console.log("Read Task Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Read Task Error:", error);
      throw error;
    }
  }

  async deleteTask(id) {
    console.log("Memanggil API untuk menghapus ID:", id);  // Tambahkan ini untuk debugging
    return axios
      .delete(API_URL + "/task/" + id)
      .then((response) => {
        console.log("Delete Task:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete Task Error:", error);
        throw error;
      });
  }
}

export default new TasksService();
