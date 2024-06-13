import { defineStore } from "pinia";
import AGVService from "../services/agv.service";

const useAgvStore = defineStore({
  id: "agv",
  state: () => ({
    agvs: [],
  }),
  
  actions: {
    async a$addAGV(agvData) {
      try {
        const response = await AGVService.addAGV(agvData);
        console.log("ini add:", response)
      } catch (error) {
        console.error("Error adding AGV:", error.message);
        throw error;
      }
    },
    
    async a$getAGVs() {
      try {
        const agvs = await AGVService.getAGVs();
        console.log("ini get:", agvs)
        this.agvs = agvs.data;
      } catch (error) {
        console.error("Error fetching AGV list:", error.message);
        throw error;
      }
    },
    
    async a$editAGV({ id, updatedAGVData }) {
      try {
        await AGVService.updateAGV(id, updatedAGVData);
        const index = this.agvs.findIndex((agv) => agv._id === id);
        if (index !== -1) {
          this.agvs[index] = updatedAGVData;
        }
      } catch (error) {
        console.error("Error editing AGV:", error.message);
        throw error;
      }
    },
    
    async a$deleteAGV(id) {
      try {
        await AGVService.deleteAGV(id)
        console.log(`AGV with ID ${id} deleted.`);
      } catch (error) {
        console.error(`Error deleting AGV with ID ${id}:`, error.message);
        throw error;
      }
    },
    
    async a$getAGVById(id) {
      try {
        return await AGVService.getAGVById(id);
      } catch (error) {
        console.error("Error getting AGV by id:", error.message);
        throw error;
      }
    },
  },
  getters: {
    g$getAGVs(state) {
      return state.agvs;
    },
    g$getDetail: ({ agvs }) => {
      return (index) => agvs[index];
    },
  },
});

export default useAgvStore;