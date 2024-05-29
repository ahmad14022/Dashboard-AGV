<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="{
      'top-0 position-sticky z-index-sticky': $store.state.isRTL,
    }"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="py-2 d-flex align-items-center navbar-collapse">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        id="navbar"
      >
        <div
          class="pe-md-3"
          :class="$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <argon-button
            v-if="
              currentRouteName === 'Dashboard Agv Lidar' ||
              currentRouteName === 'Dashboard Agv Line Follower'
            "
            @click="switchToDashboard"
            >{{ switchButtonDashboardText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>

          <argon-button
            v-if="
              currentRouteName === 'AGV Lidar' ||
              currentRouteName === 'AGV Line Follower'
            "
            @click="switchToAGV"
            >{{ switchButtonAGVText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>

          <argon-button
            v-if="
              currentRouteName === 'Pose AGV Lidar' ||
              currentRouteName === 'Station AGV Line Follower'
            "
            @click="switchToStation"
            >{{ switchButtonStationText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>
        </div>
        
      </div>
    </div>
  </nav>

  <!-- add modal -->
  <ip-input
    v-model:show="modal.connectPORT"
    modal-classes="modal-lg"
    @hidden="clearInputs"
  >
    <template #header>
      <p class="modal-title">Input Your NGROK Port</p>
    </template>
    <template #body>
      <form @submit.prevent="addIP()">
        <base-input
          v-model="input.port"
          name="PORT"
          class="input"
          placeholder="add PORT"
          required
        ></base-input>
      </form>
      <p>PORT digunakan untuk controlling robot dengan joystick</p>
    </template>
    <template #footer>
      <argon-button class="success">
        <span v-if="!loading">Connect to the PORT</span>
        <span v-else>
          <i class="fa fa-spinner fa-spin"></i> Connecting...
        </span>
      </argon-button>
    </template>
  </ip-input>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
// import { mapActions, mapState } from "pinia";
import { mapActions } from "vuex";
import useDropDownStore from "@/store/dropdown";
import Cookies from "js-cookie";
import ArgonButton from "../../components/ArgonButton.vue";
import IpInput from "../../views/components/IpInput.vue";
import MultiSelect from "vue-multiselect";
import BaseInput from "../../views/components/BaseInput.vue";
import "@/assets/css/vue-multiselect.min.css";
import { useToast } from "vue-toastification";;
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
    // this.a$ddDataAGV();
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
        // Memastikan port tersimpan di store
        this.setNgrokPort(this.input.port);
        console.log(`Port set to: ${this.input.port}`); // Debugging
        this.modal.connectPORT = true;
      } catch (error) {
        console.error("Error fetching AGV data:", error.message);
      }
    },
    toggleSidebar() {
      this.$store.commit("navbarMinimize");
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
      // Perbarui nilai port ngrok di Vuex
      this.$store.commit("setNgrokPort", this.input.port);
      this.modal.connectPORT = false;
      console.log(`ini modal untuk menambahkan port ${this.input.port}`);
    },
    setPort(port) {
      this.$store.dispatch("setNgrokPort", port); // Memanggil action untuk mengatur nilai ngrokPort
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
