import { defineStore } from "pinia";
import TasksService from "../services/task.service";

const useTaskStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
  }),
  getters: {
    g$getTasks(state) {
      return state.tasks;
    },
  },

  actions: {
    async a$getTasks() {
      try {
        const tasks = await TasksService.getTasks();
        this.tasks = tasks.data;
      } catch (error) {
        console.error("Error fetching Task list:", error.message);
        throw error;
      }
    },

    async a$deleteTask(id) {
      try {
        await TasksService.deleteTask(id);
        console.log(`terhapus ${id} `);
      } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error.message);
        throw error;
      }
    },
  },
});

export default useTaskStore;
