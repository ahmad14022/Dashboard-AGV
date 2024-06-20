import { createRouter, createWebHistory } from "vue-router";
import DashboardDefault from "../views/DashboardDefault.vue";
import DashboardSwitch from "../views/DashboardSwitch.vue";
import Tables from "../views/Tables.vue";
import Todo from "../views/Todo.vue";
import EditTodo from "../views/EditTodo.vue";
import ToDoForm from "../views/ToDoForm.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Cookies from "js-cookie";
import TableDataAgvLidar from "../views/TableDataAGVLidar.vue";
import TableDataAgvLineFollower from "../views/TableDataAGVLineFollower.vue";
import TableDataStationAgvLidar from "../views/TableDataStationAGVLidar.vue";
import TableDataStationAgvLineFollower from "../views/TableDataStationAGVLineFollower.vue";
import HistoryLidarTaskData from "../views/components/HistoryLidarTaskData.vue";
import HistoryLineTaskData from "../views/components/HistoryLineTaskData.vue";

// rute-rute yang digunakan untuk mengakses halaman
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-agv-lidar",
    name: "Dashboard Agv Lidar",
    component: DashboardDefault,
  },
  {
    path: "/dashboard-agv-line-follower",
    name: "Dashboard Agv Line Follower",
    component: DashboardSwitch,
  },
  {
    path: "/agv-lidar",
    name: "AGV Lidar",
    component: TableDataAgvLidar,
  },
  {
    path: "/agv-line-follower",
    name: "AGV Line Follower",
    component: TableDataAgvLineFollower,
  },
  {
    path: "/station-agv-lidar",
    name: "Pose AGV Lidar",
    component: TableDataStationAgvLidar,
  },
  {
    path: "/station-agv-line-follower",
    name: "Station AGV Line Follower",
    component: TableDataStationAgvLineFollower,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/todo",
    name: "To Do List",
    component: Todo,
  },
  {
    path: "/edit-todo/:id",
    name: "Edit Todo",
    component: EditTodo,
    props: true,
  },
  {
    path: "/todo-form",
    name: " To Do Form",
    component: ToDoForm,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  // {
  //   path: "/signup",
  //   name: "Signup",
  //   component: Signup,
  // },
  {
    path: "/history-lidar-task",
    name: "History Lidar Task",
    component: HistoryLidarTaskData,
  },
  {
    path: "/history-line-task",
    name: "History Line Task",
    component: HistoryLineTaskData,
  },
];

// membuat router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/signin"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Cookies.get("user");

  if (authRequired && !loggedIn) {
    next("/signin");
  } else if (loggedIn && to.path === "/signin") {
    next("/dashboard-agv-lidar");
  } else {
    next();
  }
});

export default router;
