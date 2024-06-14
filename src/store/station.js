import { defineStore } from "pinia";
import stationService from "../services/station.service";

const useStationStore = defineStore({
  id: "station",
  state: () => ({
    stations: [],
    poses: [],
  }),
  actions: {
    // POSE FOR AGV LIDAR
    async a$addPose(pose) {
      try {
        const response = await stationService.addPose(pose)
        console.log("response add pose", response)
      } catch (error) {
        console.error("Error add pose", error.message);
        throw error;
      }
    },

    async a$getPoses() {
      try {
        const poses = await stationService.getPoses();
        this.poses = poses.data
        console.log("ini data poses:", poses)
      } catch (error) {
        console.error("Error fetching pose list:", error.message);
        throw error;
      }
    },

    async a$editPose({ id, updatedPoseData }) {
      try {
        await stationService.updateStation(id, updatedPoseData);
        const index = this.poses.findIndex((pose) => pose._id === id);
        if (index !== -1) {
          this.poses[index] = updatedPoseData;
        }
      } catch (error) {
        console.error("Error editing poses:", error.message);
        throw error;
      }
    },

    async a$deletePose(id) {
      try {
        await stationService.deletePose(id);
        const index = this.poses.findIndex((pose) => pose._id === id);
        if (index !== -1) {
          this.poses.splice(index, 1);
        }
        console.log(`Pose with ID ${id} deleted.`);
      } catch (error) {
        console.error(`Error deleting pose with ID ${id}:`, error.message);
        throw error;
      }
    },

    // STATION FOR AGV LINE FOLLOWER
    async a$addStation(stationData) {
      try {
        await stationService.addStation(stationData);
      } catch (error) {
        console.error("Error adding station:", error.message);
        throw error;
      }
    },

    async a$getStations() {
      try {
        const stations = await stationService.getStations();
        this.stations = stations.data;
      } catch (error) {
        console.error("Error fetching station list:", error.message);
        throw error;
      }
    },

    async a$editStation({ id, updatedStationData }) {
      try {
        await stationService.updateStation(id, updatedStationData);
        const index = this.stations.findIndex((station) => station._id === id);
        if (index !== -1) {
          this.stations[index] = updatedStationData;
        }
      } catch (error) {
        console.error("Error editing station:", error.message);
        throw error;
      }
    },

    async a$deleteStation(id) {
      try {
        await stationService.deleteStation(id);
        const index = this.stations.findIndex((station) => station._id === id);
        if (index !== -1) {
          this.stations.splice(index, 1);
        }
        console.log(`station with ID ${id} deleted.`);
      } catch (error) {
        console.error(`Error deleting station with ID ${id}:`, error.message);
        throw error;
      }
    },

    async g$getStationById(id) {
      try {
        return await stationService.getStationById(id);
      } catch (error) {
        console.error("Error getting station by id:", error.message);
        throw error;
      }
    },
  },
  
  getters: {
    g$getStations(state) {
      return state.stations;
    },
    g$getPoses(state) {
      return state.poses;
    },
    g$getDetail: ({ stations }) => {
      return (index) => stations[index];
    },
  },
});

export default useStationStore;