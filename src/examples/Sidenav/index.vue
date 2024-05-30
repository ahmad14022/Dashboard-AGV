<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="{
      'bg-transparent': this.$store.state.darkMode,
      'bg-gradient-success': !this.$store.state.darkMode,
    }"
  ></div>
  <aside
    :class="[
      'my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl',
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3',
      this.$store.state.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : '',
      this.$store.state.sidebarType,
      { show: isSidebarOpen },
    ]"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
        @click="toggleSidebar"
      ></i>
      <router-link class="m-0 navbar-brand" to="/">
        <img src="../../../public/SANSIcon.png" alt="SANS Dashboard Logo" />
        <span class="ms-2 font-weight-bold me-2">SANS Dashboard</span>
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class" />
  </aside>
  <button class="navbar-toggler" type="button" @click="toggleSidebar">
    <span class="navbar-toggler-icon"></span>
  </button>
</template>

<script>
import SidenavList from "./SidenavList.vue";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  props: ["custom_class", "layout"],
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped>
/* Add styles for the navbar toggler button */
.navbar-toggler {
  display: none;
  border: none;
  background: transparent;
  cursor: pointer;
}

.navbar-toggler .navbar-toggler-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-width='2' linecap='round' linejoin='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

/* Display the navbar toggler button on small devices */
@media (max-width: 992px) {
  .navbar-toggler {
    display: block;
  }

  #sidenav-main {
    transform: translateX(-250px);
    transition: transform 0.3s ease;
  }

  #sidenav-main.show {
    transform: translateX(0);
  }

  .fixed-end #sidenav-main {
    transform: translateX(250px);
  }

  .fixed-end #sidenav-main.show {
    transform: translateX(0);
  }
}

/* Ensure sidebar is always visible on larger screens */
@media (min-width: 993px) {
  #sidenav-main {
    transform: translateX(0) !important;
    position: fixed;
    left: 0; /* Posisi sidebar di sebelah kiri */
    top: 0;
    height: 100%;
    width: 250px;
  }

  .col-lg {

    padding-left: 260px;
  }

  .fixed-end #sidenav-main {
    transform: translateX(0) !important;
    right: 0;
    left: auto;
  }
}
</style>
