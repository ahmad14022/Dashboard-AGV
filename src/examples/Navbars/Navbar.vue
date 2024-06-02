<template>
  <nav>
    <div class="py-3 d-flex justify-content-between">
      <div>
        <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />
      </div>
      <div :class="$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
        <div class="d-flex align-items-center justify-content-center">
          <div>
            <argon-button
              v-if="
                currentRouteName === 'AGV Lidar' ||
                currentRouteName === 'AGV Line Follower'
              "
              @click="switchToAGV"
              class="button-switch"
              ><span class="switch-button-text">{{ switchButtonAGVText }}</span>
              <i class="fas fa-sync" style="margin-left: 7px"></i>
            </argon-button>
          </div>
          <div>
            <argon-button
              v-if="
                currentRouteName === 'Pose AGV Lidar' ||
                currentRouteName === 'Station AGV Line Follower'
              "
              @click="switchToStation"
              class="button-switch"
              ><span class="switch-button-text">{{
                switchButtonStationText
              }}</span>
              <i class="fas fa-sync" style="margin-left: 7px"></i>
            </argon-button>
          </div>

          <div>
            <argon-button
              v-if="
                currentRouteName === 'Dashboard Agv Lidar' ||
                currentRouteName === 'Dashboard Agv Line Follower'
              "
              @click="switchToDashboard"
              class="button-switch"
              ><span class="switch-button-text">{{
                switchButtonDashboardText
              }}</span>
              <i class="fas fa-sync" style="margin-left: 7px"></i>
            </argon-button>
          </div>
          <div>
            <button class="toggle" @click="toggleSidebar">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapActions } from "vuex";
import Cookies from "js-cookie";
import ArgonButton from "../../components/ArgonButton.vue";
import IpInput from "../../views/components/IpInput.vue";
import MultiSelect from "vue-multiselect";
import BaseInput from "../../views/components/BaseInput.vue";
import "@/assets/css/vue-multiselect.min.css";
import { useToast } from "vue-toastification";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      isLoggedIn: !!Cookies.get("user"),
      isDashboardAGVLineFollower: false,
      isAGVLineFollower: false,
      isStationLineFollower: false,
      modal: {
        connectPORT: false,
      },
      input: {
        port: "",
      },
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapActions(["setNgrokPort"]),
    clearInputs() {
      this.input.port = "";
    },
    connectToRobot(event) {
      try {
        event.preventDefault();
        this.setNgrokPort(this.input.port);
        console.log(`Port set to: ${this.input.port}`);
        this.modal.connectPORT = true;
      } catch (error) {
        console.error("Error fetching AGV data:", error.message);
      }
    },
    toggleSidebar() {
      this.$store.commit("toggleSidebar");
    },
    switchToDashboard() {
      const toast = useToast();
      if (this.isDashboardAGVLineFollower) {
        this.$router.push({ name: "Dashboard Agv Lidar" });
        this.isDashboardAGVLineFollower = false;
        toast.success("Switched to AGV Lidar Dashboard");
      } else {
        this.$router.push({ name: "Dashboard Agv Line Follower" });
        this.isDashboardAGVLineFollower = true;
        toast.success("Switched to AGV Line Follower Dashboard");
      }
    },
    switchToAGV() {
      const toast = useToast();
      if (this.isAGVLineFollower) {
        this.$router.push({ name: "AGV Lidar" });
        this.isAGVLineFollower = false;
        toast.success("Switched to AGV Lidar");
      } else {
        this.$router.push({ name: "AGV Line Follower" });
        this.isAGVLineFollower = true;
        toast.success("Switched to AGV Line Follower");
      }
    },
    switchToStation() {
      const toast = useToast();
      if (this.isStationLineFollower) {
        this.$router.push({ name: "Pose AGV Lidar" });
        this.isStationLineFollower = false;
        toast.success("Switched to AGV Lidar Station");
      } else {
        this.$router.push({ name: "Station AGV Line Follower" });
        this.isStationLineFollower = true;
        toast.success("Switched to AGV Line Follower Station");
      }
    },
    addIP(event) {
      event.preventDefault();
      this.$store.commit("setNgrokPort", this.input.port);
      this.modal.connectPORT = false;
      console.log(`ini modal untuk menambahkan port ${this.input.port}`);
    },
    setPort(port) {
      this.$store.dispatch("setNgrokPort", port);
    },
  },
  components: {
    Breadcrumbs,
    ArgonButton,
    IpInput,
    MultiSelect,
    BaseInput,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    switchButtonDashboardText() {
      return this.currentRouteName === "Dashboard Agv Line Follower"
        ? "Switch to AGV Lidar Dashboard"
        : "Switch to AGV Line Follower Dashboard";
    },
    switchButtonAGVText() {
      return this.currentRouteName === "AGV Line Follower"
        ? "Switch to AGV Lidar"
        : "Switch to AGV Line Follower";
    },
    switchButtonStationText() {
      return this.currentRouteName === "Station AGV Line Follower"
        ? "Switch to AGV Lidar Station"
        : "Switch to AGV Line Follower Station";
    },
  },
};
</script>

<style scoped>
.toggle {
  color: white;
  font-size: 1.4rem;
  background: none;
  border: none;
  display: none;
}

.switch-button-text {
  display: inline-block;
}

@media (max-width: 992px) {
  .toggle {
    display: block;
  }
  .switch-button-text {
    display: none;
  }
  .button-switch {
    background: none;
    box-shadow: none;
    border: none;
    font-size: 1.2rem;
  }

  .button-switch:hover,
  .button-switch:active,
  .button-switch:focus {
    background: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
}
</style>
