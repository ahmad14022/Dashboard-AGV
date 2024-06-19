import axios from "axios";

const API_URL = "https://sans-agv.azurewebsites.net/api";

class StationService {
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

  //POSE FOR AGV LIDAR
  async addPose(pose) {
    return axios
      .post(API_URL + "/pose", {
        code: pose.code,
        x: pose.x,
        y: pose.y,
        z: pose.z,
        w: pose.w,
      })
      .then((response) => {
        console.log("Add Pose Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Add Station Error:", error);
        throw error;
      });
  }

  async getPoses() {
    return axios
      .get(API_URL + "/pose")
      .then((response) => {
        console.log("Read Pose Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Read Pose Error:", error);
        throw error;
      });
  }

  async updatePose(id, updatedPose) {
    return axios
      .put(API_URL + "/pose/" + id, updatedPose)
      .then((response) => {
        console.log("Update Pose Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Update Pose Error:", error);
        throw error;
      });
  }

  async deletePose(id) {
    return axios
      .delete(API_URL + "/pose/" + id)
      .then((response) => {
        console.log("Delete Pose Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete Pose Error:", error);
        throw error;
      });
  }

  // STATION FOR AGV LINE FOLLOWER
  async addStation(station) {
    return axios
      .post(API_URL + "/station", {
        code: station.code,
        status: station.status,
        rfid: station.rfid,
      })
      .then((response) => {
        console.log("Add Station Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Add Station Error:", error);
        throw error;
      });
  }

  async getStationById(id) {
    return axios
      .get(API_URL + "/station/" + id)
      .then((response) => {
        console.log("Get Station by ID Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Get Station by ID Error:", error);
        throw error;
      });
  }

  async getStations() {
    return axios
      .get(API_URL + "/station")
      .then((response) => {
        console.log("Read Station Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Read Station Error:", error);
        throw error;
      });
  }

  async updateStation(id, updatedStation) {
    return axios
      .put(API_URL + "/station/" + id, updatedStation)
      .then((response) => {
        console.log("Update Station Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Update Station Error:", error);
        throw error;
      });
  }

  async deleteStation(id) {
    return axios
      .delete(API_URL + "/station/" + id)
      .then((response) => {
        console.log("Delete Station Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete Station Error:", error);
        throw error;
      });
  }
}

export default new StationService();