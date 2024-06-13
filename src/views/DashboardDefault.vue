<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg col-md-6 col-12">
        <div class="card p-3 ngrok-port">
          <p class="font-weight-bold text-sm text-center mt-2">
            {{
              ngrokPort
                ? `YOUR NGROK PORT: ${ngrokPort}`
                : "ADD YOUR NGROK PORT"
            }}
          </p>
          <argon-button
            @click="modal.connectPORT = true"
            class="bg-gradient-success"
          >
            <i class="fas fa-plus" style="margin-left: 5px"></i>
          </argon-button>
        </div>
        <ip-input v-model:show="modal.connectPORT" modal-classes="modal-lg">
          <template #header>
            <p class="modal-title">Enter NGROK Port</p>
          </template>
          <template #body>
            <form @submit.prevent="addPORT">
              <base-input
                v-model="input.port"
                name="PORT"
                class="input"
                placeholder="Enter Port Number"
                required
              ></base-input>
            </form>
            <p>The port is used to control the robot using a joystick</p>
          </template>
          <template #footer>
            <argon-button class="bg-gradient-success" @click="addPORT">
              <span v-if="!loading">Add</span>
              <span v-else>
                <i class="fa fa-spinner fa-spin"></i> Connecting...
              </span>
            </argon-button>
          </template>
        </ip-input>
      </div>
      <div class="col-lg col-md-6 col-12">
        <div class="card d-flex flex-row align-items-center mb-4">
          <div>
            <p class="font-weight-bold px-3 text-sm">JOYSTICK CONTROL</p>
            <h5
              v-if="status === 'start'"
              class="font-weight-bold px-3 text-uppercase text-start"
            >
              Start
            </h5>
            <h5
              v-else-if="status === 'stop'"
              class="font-weight-bold px-3 text-uppercase text-danger"
            >
              Stop
            </h5>
            <h5
              v-else-if="status === 'move'"
              class="font-weight-bold px-3 text-move"
            >
              {{ direction }}
            </h5>
          </div>
          <div class="card-body p-3 align-items-end">
            <Joystick
              :size="85"
              base-color="#FFDDDD"
              stick-color="#FF6565"
              :throttle="85"
              @start="start"
              @stop="stop"
              @move="move"
            />
          </div>
        </div>
      </div>
      <div class="col-lg col-md-6 col-12">
        <card
          :title="stats.money.title"
          :value="stats.money.value"
          :percentage="stats.money.percentage"
          :iconClass="stats.money.iconClass"
          :iconBackground="stats.money.iconBackground"
          :detail="stats.money.detail"
          directionReverse
        ></card>
      </div>
      <div class="col-lg col-md-6 col-12">
        <card
          :title="stats.users.title"
          :value="stats.users.value"
          :percentage="stats.users.percentage"
          :iconClass="stats.users.iconClass"
          :iconBackground="stats.users.iconBackground"
          :detail="stats.users.detail"
          directionReverse
        ></card>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 mb-lg mb-3">
        <div class="card">
          <div class="card-body px-0 pt-1 pb-2 d-flex flex-column">
            <div class="pb-0 card-header">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2 bg-title">Data Pose</h6>
                <div class="d-flex gap-2">
                  <argon-button
                    :size="sm"
                    class="button-read bg-gradient-success"
                    @click="modal.displayPose = true"
                    ><span class="switch-button-text">Read</span>
                    <i class="fas fa-plus" style="margin-left: 7px"></i
                  ></argon-button>
                  <ip-input
                    v-model:show="modal.displayPose"
                    modal-classes="modal-lg"
                  >
                    <template #header>
                      <p class="modal-title">Your Data AGV Lidar Pose</p>
                    </template>
                    <template #body>
                      <form @submit.prevent="addPORT">
                        <base-input
                          v-model="input.code"
                          name="Pose Code"
                          class="input"
                          placeholder="Enter Code Pose"
                          required
                        ></base-input>
                        <base-input
                          v-model="input.x"
                          name="Pose X"
                          class="input"
                          placeholder="Enter Pose X"
                          required
                        ></base-input>
                        <base-input
                          v-model="input.y"
                          name="Pose Y"
                          class="input"
                          placeholder="Enter Pose Y"
                          required
                        ></base-input>
                        <base-input
                          v-model="input.z"
                          name="Pose Z"
                          class="input"
                          placeholder="Enter Pose Z"
                          required
                        ></base-input>
                        <base-input
                          v-model="input.w"
                          name="Pose W"
                          class="input"
                          placeholder="Enter Pose W"
                          required
                        ></base-input>
                      </form>
                      <p>
                        After Save The Data Pose Will Add in Data Pose AGV Lidar
                      </p>
                    </template>
                    <template #footer>
                      <argon-button
                        class="bg-gradient-success"
                        @click="addPose"
                      >
                        <span v-if="!loading">Save</span>
                        <span v-else>
                          <i class="fa fa-spinner fa-spin"></i> Connecting...
                        </span>
                      </argon-button>
                    </template>
                  </ip-input>
                  <!-- <argon-button size="md" color="success" variant="gradient">
                    Save
                  </argon-button> -->
                </div>
              </div>
            </div>
            <authors-table-lidar-pose />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 mb-lg mb-3">
        <div class="card">
          <div
            class="card-body px-0 pt-1 pb-2 d-flex flex-column justify-content-center"
          >
            <div class="pb-0 card-header">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-2 bg-title">Data Task</h6>
                <router-link to="/history-lidar-task" class="text-end">
                  See History <i class="fas fa-regular fa-clock"></i>
                </router-link>
              </div>
            </div>
            <authors-table-lidar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import ROSLIB from "roslib";
import BaseTableDashboard from "./components/BaseTableDashboard.vue";
import AuthorsTableLidar from "./components/AuthorsTableLidar.vue";
import AuthorsTableLidarPose from "./components/AuthorsTableLidarPose.vue";
import Joystick from "vue-joystick-component";
import axios from "axios";
import { useToast } from "vue-toastification";
import ArgonButton from "../components/ArgonButton.vue";
import IpInput from "./components/IpInput.vue";
import { mapActions as vuexMapActions, mapState } from "vuex";
import BaseInput from "./components/BaseInput.vue";
import { mapActions as piniaMapActions } from "pinia";
import useStationStore from "../store/station";

export default {
  name: "dashboard-agv-lidar",
  data() {
    return {
      modal: {
        connectPORT: false,
        displayPose: false,
      },
      input: {
        port: "",
        code: "",
        x: "",
        y: "",
        z: "",
        w: "",
      },
      status: "",
      direction: "",
      speed: 0,
      speedInput: "",
      ros: null,
      axes: [0, 0, 0, 0],
      buttons: [0, 0, 0, 0],
      connected: false,
      mapViewer: null,
      mapGridClient: null,
      msg: null,
      agvOn: false,
      loading: false,
      stats: {
        on_off: {
          title: "Status Robot",
          value: "fas fa-power-off",
          iconBackground: "fas fa-power-off",
        },
        money: {
          title: "Jumlah Pose",
          value: "0",
          percentage: "",
          iconClass: "ni ni-square-pin",
          detail: "Pose",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Jumlah AGV",
          value: "0",
          percentage: "",
          iconClass: "ni ni-delivery-fast",
          iconBackground: "bg-gradient-secondary",
          detail: "AGV",
        },
        clients: {
          title: "PORT NGROK",
          value: "0",
          percentage: "",
          iconClass: "ni ni-spaceship",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
          detail: "every control",
        },
      },
    };
  },
  computed: {
    ...mapState(["ngrokPort"]),
  },
  created() {
    this.connectWebSocket();
    this.fetchAGVData();
    this.fetchPoseData();
  },
  methods: {
    ...vuexMapActions(["setNgrokPort", "fetchPoseData"]),
    ...piniaMapActions(useStationStore, ["a$addPose", "a$getPoses"]),
    connectWebSocket() {
      const self = this;
      this.socket = new WebSocket(
        "wss://sans-agv.azurewebsites.net/ws/connect/lidar"
      );

      this.socket.onopen = (event) => {
        const toast = useToast();
        console.log("ini event", event);
        console.log("ngrokPort:", self.ngrokPort);

        this.socket.send(`ws://0.tcp.ap.ngrok.io:${self.ngrokPort}`);

        console.log(`ws://0.tcp.ap.ngrok.io:${self.ngrokPort}`);
        this.socket.onmessage = (event) => {
          console.log("Response from server:", event.data);
        };

        toast.success("Successfully connected to the echo websocket server...");
      };

      this.socket.onclose = () => {
        const toast = useToast();
        console.log("Connection died");
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.socket.onmessage = (event) => {
        console.log("Received message:", event.data);
      };
    },
    start() {
      console.log("start");
      this.status = "start";
      this.sendJoystickData();
    },
    stop() {
      console.log("stop");
      this.status = "stop";
      this.joyStop();
      this.sendJoystickData();
    },
    move({ x, y, direction, distance }) {
      console.log("move", { x, y, direction, distance });
      this.direction = direction;
      this.status = "move";
      this.joyMove(x, y);
      this.sendJoystickData();
    },
    joyStop() {
      this.axes = [0, 0, 0, 0];
    },
    joyMove(x, y) {
      this.axes[0] = -x;
      this.axes[1] = y;
    },
    sendJoystickData() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const data = {
          axes: this.axes,
          buttons: this.buttons,
        };
        this.socket.send(JSON.stringify(data));
        console.log("Sending joystick data:", data);
      } else {
        console.error("WebSocket connection is not open");
      }
    },
    fetchAGVData() {
      axios
        .get("https://sans-agv.azurewebsites.net/api/agv")
        .then((response) => {
          const agvData = response.data.data;
          if (agvData.length === 0) {
            this.stats.users.detail = "AGV";
          } else {
            this.stats.users.value = agvData.length.toString();
            const agvDetails = agvData.map((agv) => agv.code);
            if (agvDetails.length > 2) {
              const firstTwoAGVs = agvDetails.slice(0, 2);
              const remainingAGVs = agvDetails.slice(2);
              const formattedDetail = `${firstTwoAGVs.join(", ")} & ${
                remainingAGVs[0]
              }`;
              this.stats.users.detail = formattedDetail;
            } else {
              this.stats.users.detail = agvDetails.join(" & ");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching AGV data:", error);
        });
    },
    fetchPoseData() {
      axios
        .get("https://sans-agv.azurewebsites.net/api/pose")
        .then((response) => {
          const stationData = response.data.data;
          if (stationData.length === 0) {
            this.stats.money.detail = "Station";
          } else {
            this.stats.money.value = stationData.length.toString();
            const stationDetails = stationData.map((station) => station.code);

            if (stationDetails.length === 1) {
              this.stats.money.detail = stationDetails[0];
            } else if (stationDetails.length === 2) {
              this.stats.money.detail = stationDetails.join(" & ");
            } else if (stationDetails.length === 3) {
              this.stats.money.detail = stationDetails.join(", ");
            } else {
              const firstThreeStations = stationDetails.slice(0, 3);
              const remainingStations = stationDetails.slice(3);
              const formattedDetail = `${firstThreeStations.join(", ")}, ...`;
              this.stats.money.detail = formattedDetail;
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching Station data:", error);
        });
    },

    connectToRobot() {
      this.modal.connectPORT = true;
    },
    addPORT() {
      const toast = useToast();
      this.loading = true;

      // Simulate API call to add the port
      setTimeout(() => {
        this.setNgrokPort(this.input.port);
        this.loading = false;
        this.modal.connectPORT = false;
        toast.success(`Port ${this.input.port} added successfully.`);
      }, 2000);
    },
    async addPose() {
      try {
        const toast = useToast();
        this.loading = true;

        // Validasi input sebelum mengirim
        if (
          !this.input.code ||
          !this.input.x ||
          !this.input.y ||
          !this.input.z ||
          !this.input.w
        ) {
          toast.error("Mohon lengkapi semua input.");
          this.loading = false;
          return;
        }

        // Mengirim data ke a$addPose
        await this.a$addPose(this.input);
        this.fetchPoseData();
        await this.a$getPoses();
        toast.success(`${this.input.code} Added Successfully`);

        this.loading = false;
        this.modal.displayPose = false;
      } catch (err) {
        console.error("Error adding pose:", err);
        toast.error("Error adding pose");
        this.loading = false;
      }
    },
  },
  components: {
    Card,
    Carousel,
    GradientLineChart,
    BaseTableDashboard,
    AuthorsTableLidar,
    AuthorsTableLidarPose,
    Joystick,
    ArgonButton,
    IpInput,
    BaseInput,
  },
};
</script>

<style>
.lidar-row {
  display: flex;
}

.lidar-cell {
  width: 10px;
  height: 10px;
}

.lidar-cell.obstacle {
  background-color: red;
}

.lidar-cell.free {
  background-color: green;
}

.card-bg {
  background: rgb(158, 242, 255);
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
}

.speed-input {
  margin-top: 20px;
}

.speed-input h5 {
  margin-bottom: 10px;
}

.speed-input label {
  display: block;
  margin-bottom: 5px;
}

.speed-input input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  background-color: #ddd;
  height: 5px;
  border-radius: 5px;
  outline: none;
}

.speed-input input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
}

.speed-input input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
}

.text-start {
  color: green;
}

.text-move {
  color: orange;
}

.switch-button-text {
  display: inline-block;
}

.bg-title {
  background-color: rgb(157, 254, 124);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

@media (max-width: 992px) {
  .ngrok-port {
    margin-bottom: 1.2rem;
  }
  .switch-button-text {
    color: #344767;
  }
  .button-read {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
    font-size: 1rem;
    color: #344767 !important;
  }

  .button-read:hover,
  .button-read:active,
  .button-read:focus {
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
    color: #344767 !important;
  }
}
</style>
