<template>
  <div class="container table-responsive">
    <div v-if="!taskList" class="text-center text-muted">
      <img src="src/assets/img/robot-with-pliers.png" style="width: 30%" />
      <h3 class="mb-4">Data Not Found</h3>
    </div>
    <div v-else>
      <base-table-dashboard
        class="table"
        :data="taskList"
        :columns="table.columns"
        :actions="table.action"
        @remove-row="handleRemoveEvent"
      />
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import ArgonButton from "../../components/ArgonButton.vue";
import BaseTableDashboard from "./BaseTableDashboard.vue";
import moment from "moment";
import { mapActions, mapState } from "pinia";
import useTaskStore from "@/store/task.js";

export default {
  name: "ListView",
  data: () => ({
    taskData: [],
    table: {
      columns: ["agv", "station_from", "station_to", "time_start", "time_end"],
    },
  }),

  created() {
    this.getData();
    const socket = new WebSocket(
      "wss://sans-agv.azurewebsites.net/ws/task/line"
    );
    const self = this;

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);

      try {
        const modifiedData = data.map((item) => {
          const timeEnd = item.time_end ? moment(item.time_end) : null;
          const timeStart = moment(item.time_start);

          const duration =
            timeEnd && timeEnd.isValid() && timeStart.isValid()
              ? timeEnd.diff(timeStart, "seconds")
              : null;

          return {
            _id: item._id,
            agv: item.agv.code,
            station_from: item.station_from.code,
            station_to: item.station_to?.code ?? "",
            time_end: timeEnd ? timeEnd.format("h:mm:ss a") : "",
            time_start: timeStart.format("h:mm:ss a"),
            duration: duration,
          };
        });

        self.taskData = modifiedData;

        // Menghitung kecepatan rata-rata
        self.calculateAverageSpeed(modifiedData);
      } catch (error) {
        console.error("Failed to parse incoming WebSocket message:", error);
      }

      console.log("Received data from WebSocket:", data);
    };

    socket.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };

    socket.onclose = function (event) {
      const toast = useToast();
      if (event.wasClean) {
        toast.warning(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        toast.danger("[close] Connection died");
      }
    };

    socket.onerror = function (error) {
      const toast = useToast();
      toast.danger(`[error] ${error.message}`);
    };
  },

  computed: {
    ...mapState(useTaskStore, ["g$getTasks"]),
    taskList() {
      return this.taskData.length
        ? this.taskData
        : this.formattedTasks(this.g$getTasks);
    },
  },
  methods: {
    ...mapActions(useTaskStore, ["a$getTasks", "a$deleteTask"]),

    async getData() {
      await this.a$getTasks(); // Fetch tasks from the store
    },

    formattedTasks(data) {
      return data.map((item) => {
        const timeEnd = item.time_end ? moment(item.time_end) : null;
        const timeStart = moment(item.time_start);

        const duration =
          timeEnd && timeEnd.isValid() && timeStart.isValid()
            ? timeEnd.diff(timeStart, "seconds")
            : null;

        return {
          _id: item._id,
          agv: item.agv.code,
          station_from: item.station_from.code,
          station_to: item.station_to?.code ?? "",
          time_end: timeEnd ? timeEnd.format("h:mm:ss a") : "",
          time_start: timeStart.format("h:mm:ss a"),
          duration: duration,
        };
      });
    },

    async handleRemoveEvent(row) {
      console.log("Row to be removed:", row);
      try {
        const idToRemove = row._id;
        console.log(`hapus: ${idToRemove}`);
        await this.a$deleteTask(idToRemove);
        await this.getData();
        this.showToast("History Task Deleted Successfully", "success");
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },

    calculateAverageSpeed(data) {
      const distance = 10; // Misalkan jarak antar stasiun adalah 10 meter
      let totalSpeed = 0;
      let count = 0;

      data.forEach((item) => {
        if (item.duration !== null && item.duration > 0) {
          const speed = distance / item.duration;
          totalSpeed += speed;
          count++;
        }
      });

      const averageSpeed = count > 0 ? (totalSpeed / count).toFixed(2) : 0;
      console.log(`Kecepatan rata-rata: ${averageSpeed} m/s`);
      this.$emit("average-speed", averageSpeed);
    },

    showToast(message, type) {
      const toast = useToast();
      if (type === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    },
  },
  components: {
    BaseTableDashboard,
    ArgonButton,
  },
};
</script>
