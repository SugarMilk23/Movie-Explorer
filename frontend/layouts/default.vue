<script setup lang="ts">
import axios from "axios";
import LogoutModal from "../components/logout.vue";

//THE PROVIDE AND INJECT WAY WITHOUT PINIA

const baseUrl = "https://movie-explorer-api-4ezv.onrender.com";
const searchByTitle = ref<string>("");

const clearSearchByTitle = () => {
  searchByTitle.value = "";
};

provide("searchByTitle", searchByTitle);

const handleHomeClick = () => {
  clearSearchByTitle();
};

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isAuthenticated = ref(false);

const showLogoutModal = ref(false);

const openLogoutModal = () => {
  showLogoutModal.value = true;
};

const closeLogoutModal = () => {
  showLogoutModal.value = false;
};

const authenticateUser = async () => {
  const response = await axios.get(baseUrl + "/authenticate-user", {
    withCredentials: true,
  });
  if (response.status === 200) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
    console.log("Unauthorized , not showing sidebar");
  }
};

onMounted(async () => {
  try {
    await authenticateUser();
  } catch (error) {
    console.error("Authentication failed", error);
  }
});

const handleLogout = async () => {
  try {
    await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
    isAuthenticated.value = false;
    closeLogoutModal();
    navigateTo("/");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
</script>

<template>
  <body>
    <div class="container">
      <div class="header">
        <div class="info">
          <ul>
            <li class="home">
              <NuxtLink to="/" @click="handleHomeClick"
                ><span class="material-icons">home</span>&nbsp; Home</NuxtLink
              >
            </li>

            <li>
              <NuxtLink to="/"
                ><span class="material-icons">group</span> &nbsp;About
                Us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/"
                ><span class="material-icons">call</span>
                &nbsp;Contact</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/login" v-if="!isAuthenticated"
                ><span class="material-icons">login</span> &nbsp;Login</NuxtLink
              >
              <a href="#" v-else @click.prevent="openLogoutModal">
                <span class="material-icons">logout</span> &nbsp;Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <nav
        class="sideBar"
        :class="{ open: isSidebarOpen }"
        v-if="isAuthenticated"
      >
        <span class="material-icons menu" @click="toggleSidebar">menu</span>
        <ul>
          <li><span class="material-icons">&nbsp;person</span>&nbsp;Profile</li>
          <li @click="authenticateUser">
            <span class="material-icons">&nbsp;favorite</span>&nbsp; Favorites
          </li>
          <NuxtLink to="/ratedMovies">
            <li @click="authenticateUser">
              <span class="material-icons">&nbsp;rate_review</span>&nbsp;Rated
              Movies
            </li>
          </NuxtLink>
          <li @click="authenticateUser">
            <span class="material-icons">&nbsp;notifications</span
            >&nbsp;Notification
          </li>
          <li @click="authenticateUser">
            <span class="material-icons">&nbsp;settings</span>&nbsp;Settings
          </li>
        </ul>
      </nav>

      <slot />
      <footer>Copyright © 2024 Tan</footer>
    </div>
    <LogoutModal
      :is-open="showLogoutModal"
      @close="closeLogoutModal"
      @confirm="handleLogout"
    />
  </body>
</template>

<style scoped>
body {
  background-color: rgb(18, 18, 18);
}

body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  background: black;
}

body::-webkit-scrollbar-thumb {
  background: linear-gradient(white, rgb(54, 54, 54));
  border-radius: 10px;
}

.container {
  width: 98%;
  height: 1200px;
  display: flex;
  color: white;
  flex-direction: column;
  margin-left: 10px;
}

.header {
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
}

.info {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.info ul {
  display: flex;
  justify-content: flex-end;
  margin: auto 0px;
}

.info li {
  list-style: none;
  display: flex;
}

.info a {
  color: white;
  text-decoration: none;
  transition: opacity 0.1s ease;
  transition: background-color 0.1s ease;
  margin: 5px;
  padding: 5px;
  border-radius: 15%;
  display: flex;
}

.info span {
  font-size: 20px;
}

.info a:hover {
  cursor: pointer;
  box-shadow:
    6px 6px 6px rgb(72, 72, 72),
    -5px -5px 20px rgb(222, 221, 221);
  background-color: rgba(27, 27, 27, 0.95);
  transform: translateY(-3px);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease-in-out;
}

.sideBar {
  display: flex;
  flex-direction: column;
  z-index: 20;
  background-color: rgb(25, 25, 25);
  opacity: 0.9;
  position: fixed;
  left: -250px;
  top: 0;
  padding-top: 60px;
  height: 100%;
  width: 175px;
  transition: left 0.4s ease;
}

@keyframes bounceRotate {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(3px) rotate(45deg);
  }
  50% {
    transform: translateY(7px) rotate(90deg);
  }
  75% {
    transform: translateY(-5px) rotate(135deg);
  }
  100% {
    transform: translateY(-5px) rotate(180deg);
  }
}

@keyframes bounceRotateBack {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(5px) rotate(-45deg);
  }
  50% {
    transform: translateY(7px) rotate(-90deg);
  }
  75% {
    transform: translateY(-9px) rotate(-135deg);
  }
  100% {
    transform: translateY(-3px) rotate(-180deg);
  }
}

.sideBar .menu {
  margin-top: 0px;
  margin-left: 255px;
  transition: margin-left 0.4s ease;
  cursor: pointer;
  width: fit-content;
  padding: 5px;
  align-content: center;
  animation: bounceRotateBack 0.4s ease;
  border: 1px solid;
  border-radius: 50%;
  background: linear-gradient(rgb(250, 41, 41), rgb(22, 22, 245));
}

.sideBar ul {
  list-style: none;
  padding-left: 0px;
}

.sideBar li {
  width: 160px;
  display: flex;
  align-items: center;
  margin: 30px 0px 30px 0px;
  height: 55px;
}

.sideBar.open {
  left: 0;
}

.sideBar.open .menu {
  margin-left: 130px;
  background: linear-gradient(rgb(22, 22, 245), rgb(250, 41, 41));
  animation: bounceRotate 0.4s ease;
}

.sideBar li:hover {
  background: linear-gradient(rgb(253, 253, 253), rgb(245, 3, 3));
  background-clip: text;
  cursor: pointer;
  color: transparent;
}

.sideBar a {
  text-decoration: none;
  color: white;
}

footer {
  display: block;
  width: fit-content;
  margin: 100px auto 0px auto;
  padding-bottom: 10px;
  font-size: 10px;
}

/* Tablet Styles (768px - 1023px) */
@media screen and (max-width: 1024px) {
  .info a {
    font-size: 13px;
  }

  .info span {
    font-size: 18px;
  }

  .sideBar .menu {
    font-size: 16px;
  }

  .sideBar li {
    font-size: 14px;
  }

  footer {
    font-size: 10px;
    margin-top: 50px;
  }
}

@media screen and (max-width: 465px) {
  .header {
    padding-top: 10px;
  }

  .info {
    justify-content: center;
  }

  .info ul {
    padding-left: 0px;
  }

  .info li {
    margin-left: -10px;
  }
  .info a {
    font-size: 10px;
    width: 70px;
    border-radius: 20%;
    margin: 5px;
    padding: 2px;
    align-items: center;
  }

  .info span {
    font-size: 18px;
  }

  .sideBar {
    font-size: 10px;
    width: 130px;
  }

  .sideBar .menu {
    font-size: 10px;
  }

  .sideBar.open .menu {
    margin-left: 103px;
  }

  .sideBar li {
    height: 50px;
    font-size: 11px;
  }

  footer {
    font-size: 8px;
    margin-top: 50px;
  }

  .home {
    width: 70px;
  }
}
</style>
