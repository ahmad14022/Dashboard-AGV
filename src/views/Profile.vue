<!-- Membuat ahlaman profile yang menampilkan data user yang sedang login dengan cara mengambil data dari cookie berupa anma dan username -->
<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="d-flex gap-3 align-items-center">
          <div>
            <p style="margin-left: 10px; font-size: 50px; margin-top: 10px">
              👨🏻
            </p>
          </div>
          <div class="">
            <div class="h-100">
              <h5 class="mb-1">{{ name }}</h5>
              <p class="mb-0 font-weight-bold text-sm">{{ username }}</p>
            </div>
          </div>
          <div
            class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
          >
            
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <!-- <form @submit.prevent="updateProfile"> -->
            <div class="card-body">
              <p class="text-uppercase font-weight-bold">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Name</label
                  >
                  <argon-input
                    type="text"
                    v-model="name"
                    :disable="isDisabled"
                  />
                </div>

                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Username</label
                  >
                  <argon-input
                    type="text"
                    v-model="username"
                    :disable="isDisabled"
                  />
                </div>

                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Password</label
                  >

                  <div class="d-flex">
                    <div class="w-100">
                      <argon-input
                        :type="passwordVisible ? 'text' : 'password'"
                        :disable="isDisabled"
                        v-model="password"
                        id="password"
                      />
                    </div>
                    <div>
                      <button
                        class="btn btn-outline-secondary btn-pw"
                        type="button"
                        @click="togglePasswordVisibility"
                      >
                        <i
                          class="fas"
                          :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Confirm Password</label
                  >
                  <div class="d-flex">
                    <div class="w-100">
                      <argon-input
                       
                        :type="confirmPasswordVisible ? 'text' : 'password'"
                        :disable="isDisabled"
                        v-model="confirmPassword"
                        id="confirmPassword"
                        style="
                          border-top-right-radius: 0;
                          border-bottom-right-radius: 0;
                        "
                      />
                    </div>
                    <div>
                      <button
                        class="btn btn-outline-secondary btn-pw"
                        type="button"
                        @click="togglePasswordConfirmVisibility"
                      >
                        <i
                          class="fas"
                          :class="
                            confirmPasswordVisible ? 'fa-eye' : 'fa-eye-slash'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>
                  <!-- <p v-if="password !== confirmPassword" class="text-danger">Passwords do not match.</p> -->
                </div>
                
                </div>
                <argon-button
                  color="success"
                  size="md"
                  class="w-100 my-3"                 
                  @click="saveChanges"
                >
                  {{ isDisabled ? "Edit" : "Save" }}
                </argon-button>
            </div>
            <!-- </form> -->
          </div>
        </div>
        <!-- <div class="col-md-4">
          <profile-card />
        </div> -->
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Cookies from "js-cookie";
import { useToast } from "vue-toastification";
import "vue-toast-notification/dist/theme-sugar.css";
import { mapActions } from "pinia";
import useAuthStore from "../store/auth.js";

const body = document.getElementsByTagName("body")[0];
const $toast = useToast();

import { ref } from "vue";
export default {
  setup() {
    const inputValue = ref("");
    const isDisabled = ref(true);

    const toggleEditMode = () => {
      isDisabled.value = !isDisabled.value;
    };

    return {
      inputValue,
      isDisabled,
      toggleEditMode,
    };
  },
  name: "profile",
  data() {
    return {
      showMenu: false,

      name: "",
      username: "",
      password: "",

      confirmPassword: "",
      passwordVisible: false,
      confirmPasswordVisible: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordConfirmVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    ...mapActions(useAuthStore, ["a$updateProfile"]),
    async updateProfile() {
      try {
        await this.a$updateProfile({
          name: this.name,
          username: this.username,
          password: this.password,
        });
        Cookies.set("name", this.name);
        Cookies.set("username", this.username);
        Cookies.set("password", this.password);
        $toast.success("Update profile Success!");
      } catch (error) {
        console.log(error);
        $toast.error("Failed to update profile");
      }
    },

    saveChanges() {
      if (this.isDisabled) {
        this.toggleEditMode();
      } else {
        if (this.password === this.confirmPassword) {
          this.updateProfile();
          this.isDisabled = true;
        } else {
          $toast.error("The password does not match");
        }
      }
    },
  },

  components: { ProfileCard, ArgonInput, ArgonButton },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    this.name = Cookies.get("name");
    this.username = Cookies.get("username");
    this.password = Cookies.get("password");
    this.confirmPassword = this.password;
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  },
};
</script>

<style scoped>
.btn-pw {
  background: rgb(255, 69, 69);
  color: white;
  border: none;
  outline: none;
  margin-left: 5px;
}
.btn-pw:active,
.btn-pw:focus,
.btn-pw:hover {
  background: rgb(255, 69, 69) !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
</style>
