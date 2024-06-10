<!-- src/components/SplashScreen.vue -->
<template>
  <div class="splash-screen" v-if="loading">
    <div class="logo-container">
      <img
        src="../../public/img/icons/android-launchericon-512-512.png"
        alt="Logo"
        class="logo"
      />
    </div>
    <div class="loading-spinner"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["loading"]),
  },
  mounted() {
    setTimeout(() => {
      this.setLoading(false);
    }, 3000);
  },
  methods: {
    ...mapActions(["setLoading"]),
  },
};
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: auto;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-top-color: #000000;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
