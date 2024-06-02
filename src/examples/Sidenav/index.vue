<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${
      this.$store.state.darkMode ? 'bg-transparent' : 'bg-gradient-success'
    }`"
  />
  <aside
    :class="`my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl ${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3'
    } ${
      this.$store.state.layout === 'landing' ? 'bg-success shadow-none' : ''
    } ${isSidebarOpen ? 'show' : ''}`"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
        @click="toggleSidebar"
      ></i>
      <router-link class="m-0 navbar-brand" to="/">
        <img src="../../../public/SANSIcon.png" />
        <span class="ms-2 font-weight-bold me-2">SANS Dashboard</span>
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class"  />
  </aside>
</template>

<script>
import SidenavList from "./SidenavList.vue";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  created() {
    this.$store.commit('toggleSidebarClose');
  },
  computed: {
    isSidebarOpen() {
      return this.$store.state.isSidebarOpen;
    },
  },
  
  methods: {
    toggleSidebar() {
      this.$store.commit("toggleSidebar");
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

#sidenav-main {
  background-color: white; /* Ensure the background is white */
}

/* Display the navbar toggler button on small devices */
@media (max-width: 992px) {
  .navbar-toggler {
    display: block;
  }

  #sidenav-main {
    transform: translateX(-300px);
    transition: transform 0.3s ease;
    height: 100%;
    margin: 0 0;
    border-radius: 0;
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

  /* Override margin for smaller screens */
  #sidenav-main {
    margin: 0 !important;
  }
}

/* Ensure sidebar is always visible on larger screens */
@media (min-width: 993px) {
  #sidenav-main {
    transform: translateX(0) !important;
    position: fixed;
    left: 0; /* Posisi sidebar di sebelah kiri */
    top: 0;
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
