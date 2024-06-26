import { createStore } from "vuex";

export default createStore({
  state: {   
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    isSidebarOpen: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    ngrokPort: "",
    loading: true,
  },
  mutations: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleSidebarClose(state) {
      state.isSidebarOpen = false;
    },
    setNgrokPort(state, port) {
      state.ngrokPort = port;
      // console.log(`Port set in Vuex: ${state.ngrokPort}`);
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      let sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show) {
        // Pemeriksaan apakah elemen ditemukan
        if (sidenav_show.classList.contains("g-sidenav-hidden")) {
          sidenav_show.classList.remove("g-sidenav-hidden");
          sidenav_show.classList.add("g-sidenav-pinned");
          state.isPinned = true;
        } else {
          sidenav_show.classList.add("g-sidenav-hidden");
          sidenav_show.classList.remove("g-sidenav-pinned");
          state.isPinned = false;
        }
      }
    },

    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },

    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setNgrokPort({ commit }, port) {
      commit("setNgrokPort", port);
    },
    setLoading({ commit }, loading) {
      commit('setLoading', loading);
    }
  },
  modules: {
    // auth,
  },
  getters: {
    ngrokPort: (state) => state.ngrokPort,
  },
});
