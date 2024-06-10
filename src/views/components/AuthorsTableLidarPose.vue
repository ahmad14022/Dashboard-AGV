<script>
import ArgonButton from "../../components/ArgonButton.vue";
import moment from "moment";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import BaseTablePose from "./BaseTablePose.vue";
import { mapActions } from "pinia";
import useStation from "@/store/station"

export default {
  name: "ListView",
  data: () => ({
    poseData: [],
    table: {
      columns: ["pose", "x", "y", "z", "w"],
    },
  }),

  created() {
    const socket = new WebSocket(
      "wss://sans-api-service.onrender.com/ws/task/lidar"
    );

    const self = this;

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);

      try {
        const modifiedData = data.map((item) => {
          // Parsing time_end dan time_start menggunakan moment
          const timeEnd = item.time_end
            ? moment(item.time_end).format("h:mm:ss a")
            : "";
          const timeStart = moment(item.time_start).format("h:mm:ss a");

          return {
            agv: item.agv.code,
            station_from: item.station_from.code,
            station_to: item.station_to?.code ?? "",
            // Mengubah time_end dan time_start menggunakan moment
            time_end: timeEnd,
            time_start: timeStart,
          };
        });
        self.poseData = modifiedData;
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
      toast.danger(`[error]`);
    };
  },
  computed: {
    ...mapState(useStation, ["g$getPoses"]),
    // poseList() {
    //   return this.poseData.length
    //     ? this.poseData
    //     : this.formattedTasks(this.g$getPoses);
    // },
  },
  methods: {
    ...mapActions(useStation, [
      "a$getposes",
      "a$ddPose",
      "a$editPose",
      "a$deletePose",
    ]),

    async getDataPose() {
      await this.a$getPoses();
    },

    async addPose(event) {
      try {
        event.preventDefault();
        if (this.editing) {
          await this.a$editPose({
            id: this.input._id,
            updatedAGVData: this.input,
          });
          const toast = useToast();
          toast.success(`AGV ${this.input.code} updated successfully`);
          this.editing = null;
        } else {
          await this.a$addPose({ ...this.input });
          await this.a$getPoses();
          const toast = useToast();
          toast.success(`Pose ${this.input.code} added successfully`);
        }
        this.resetForm();
      } catch (error) {
        console.error("Failed to add/edit entry:", error);
      }
    },

    async handleRemoveEvent(row) {
      console.log("Row to be removed:", row);
      try {
        const idToRemove = row._id;
        console.log(`hapus: ${idToRemove}`);
        await this.a$deletePose(idToRemove);
        await this.getDataPose();
        this.showToast("History Task Deleted Successfully", "success");
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },
  },
  components: {
    BaseTablePose,
    ArgonButton,
    BaseTablePose,
  },
};
</script>

<template>
  <div class="container table-responsive">
    <!-- <div v-if="!poseData.length" class="text-center text-muted">
      <img src="src/assets/img/robot-with-pliers.png" style="width: 10%" />
      <h3 class="mb-4">Data Not Found</h3>
    </div> -->
    <div>
      <base-table-pose
        class="table"
        :data="poseList"
        :columns="table.columns"
        :actions="table.action"
        @remove-row="handleRemoveEvent"
      />
    </div>
  </div>
</template>
