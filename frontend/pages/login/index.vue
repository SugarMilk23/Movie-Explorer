<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";

// Ref to manage form state (Sign In / Sign Up)
const isLogIn = ref(true);

// Function to toggle between Sign In and Sign Up
const toggleForm = () => {
  isLogIn.value = !isLogIn.value;
};

const baseUrl = "http://localhost:3100";

const userName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      const signInInfo = {
        userName: userName.value,
        email: email.value,
        password: password.value,
      };
      console.log("user name : ", userName.value + "sign up succesfully");
      await axios.post(baseUrl + "/sign-up", signInInfo);
      alert("New account created");
      window.location.href = "/login";
      userName.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
    } catch (e) {
      console.error(e);
    }
  }
};

const login = async () => {
  const loginInfo = {
    userName: userName.value,
    password: password.value,
  };

  try {
    await axios.post(baseUrl + "/login", loginInfo, { withCredentials: true });
    userName.value = "";
    password.value = "";
    alert("Welcome back!");
    window.location.href = "/";
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="container">
    <div class="flip-container" :class="{ flipped: !isLogIn }">
      <!-- Toggle Button -->
      <div class="toggle-form">
        <p class="sign-up">Sign Up</p>
        <p class="login">Login</p>
        <span
          class="slider"
          @click="toggleForm"
          :class="{ signUp: !isLogIn }"
        ></span>
      </div>
      <div class="flipper">
        <!-- Front Side (Login Form) -->
        <div class="front">
          <form @submit.prevent="login" class="box">
            <p class="text-muted">Please enter your username and password!</p>
            <input type="text" v-model="userName" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />
            <a class="forgot text-muted" href="#">Forgot password?</a>
            <input type="submit" value="Login" />
            <!-- Social Login Icons -->
            <div class="col-md-12">
              <ul class="social-network social-circle">
                <li>
                  <a href="#" class="icoFacebook" title="Facebook">
                    <img
                      width="44"
                      height="44"
                      src="https://img.icons8.com/color/48/facebook-new.png"
                      alt="facebook-new"
                    />
                  </a>
                </li>
                <li>
                  <a href="#" class="icoTwitter" title="Twitter">
                    <img
                      width="44"
                      height="44"
                      src="https://img.icons8.com/fluency/48/twitterx--v1.png"
                      alt="twitterx--v1"
                    />
                  </a>
                </li>
                <li>
                  <a href="#" class="icoGoogle" title="Google +">
                    <img
                      width="42"
                      height="42"
                      src="https://img.icons8.com/color/48/google-logo.png"
                      alt="google-logo"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>

        <!-- Back Side (Sign Up Form) -->
        <div class="back">
          <form @submit.prevent="signUp" class="box">
            <p class="text-muted">Please fill in your details to sign up!</p>
            <input type="text" v-model="userName" placeholder="Username" />
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
            />
            <input type="submit" value="Sign Up" />
            <!-- Social Login Icons -->
            <div class="col-md-12">
              <ul class="social-network social-circle">
                <li>
                  <a href="#" class="icoFacebook" title="Facebook">
                    <img
                      width="44"
                      height="44"
                      src="https://img.icons8.com/color/48/facebook-new.png"
                      alt="facebook-new"
                    />
                  </a>
                </li>
                <li>
                  <a href="#" class="icoTwitter" title="Twitter">
                    <img
                      width="44"
                      height="44"
                      src="https://img.icons8.com/fluency/48/twitterx--v1.png"
                      alt="twitterx--v1"
                    />
                  </a>
                </li>
                <li>
                  <a href="#" class="icoGoogle" title="Google +">
                    <img
                      width="42"
                      height="42"
                      src="https://img.icons8.com/color/48/google-logo.png"
                      alt="google-logo"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Same styles as before */
.container {
  font-family: sans-serif;
  background: url("../../public/gradient-background.jpg");
  background-size: cover;
  opacity: 0.9;
  width: 100%;
  height: 800px;
  overflow: hidden;
}

.box {
  width: 50%;
  padding: 40px;
  margin: 10px auto;
  background: rgb(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  text-align: center;
  transition: all 0.25s;

  height: 520px;
}

.flip-container {
  perspective: 700px;
}

.flipper {
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flipped .flipper {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari */
  overflow: hidden;
}

.front {
  z-index: 2;
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
}

.toggle-form {
  margin: 40px auto 5px auto;
  width: 140px;
  background: linear-gradient(to right, rgb(255, 255, 255), black);
  height: 40px;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribute space between elements */
  padding: 0 20px; /* Add padding for better spacing */
}

.slider {
  position: absolute;
  left: 0px; /* Adjust to fit within the padded area */
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: rgb(255, 255, 255);
  border: inset 1.2px;
  border-radius: 35px;
  width: 90px;
  height: 47px;
  transition: all 0.5s ease;
  z-index: 2;
}

.slider:hover {
  cursor: pointer;
}

.slider.signUp {
  left: calc(100% - 90px); /* Adjust to fit within the padded area */
  background: rgb(17, 17, 17);
}

.login,
.sign-up {
  z-index: 1; /* Ensure labels are above the slider */
  font-weight: bold;
  font-size: 16px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.login {
  margin-left: 0; /* Position to the left */
  background: transparent;
}

.sign-up {
  margin-right: 0; /* Position to the right */
  background: transparent;
  color: black;
}

.box input[type="text"],
.box input[type="password"],
.box input[type="email"] {
  border: 0;
  background: none;
  display: block;
  margin: 30px auto;
  text-align: center;
  border: 2px solid #5eccf0;
  padding: 10px 10px;
  width: 60%;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}

.box input::placeholder {
  color: rgb(224, 211, 193);
}

.text-muted {
  font-size: 24px;
  color: rgb(250, 236, 220);
  font-family: "Times New Roman", Times, serif;
}

.box input[type="text"]:focus,
.box input[type="password"]:focus,
.box input[type="email"]:focus {
  width: 68%;
  border-color: #2ecc71;
}

.box input[type="submit"] {
  width: 40%;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 15px 0 15px 0;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}

.box input[type="submit"]:hover {
  background: #2ecc71;
}

.forgot {
  font-size: 20px;
  text-decoration: underline;
  color: rgb(7, 236, 240);
}

ul.social-network {
  list-style: none;
  display: inline;
  margin-left: 0 !important;
  padding: 0;
}

ul.social-network li {
  display: inline;
  margin: 0 5px;
}

.social-network a.icoFacebook:hover img,
.social-network a.icoTwitter:hover img,
.social-network a.icoGoogle:hover img {
  box-shadow:
    1px 1px 1px rgb(35, 34, 34),
    -5px -5px 20px rgb(222, 221, 221);
}

.social-circle li a {
  display: inline-block;
  position: relative;
  margin: 15px auto 0 auto;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.social-circle li img {
  margin: 0;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
}

.social-circle li a:hover img {
  transform: rotate(360deg);
  transition: all 0.6s;
}

.social-circle img {
  transition: all 0.8s;
  transition: all 0.8s;
}

@media screen and (max-width: 1024px) {
  .box {
    width: 60%;
  }
  .text-muted {
    font-size: 18px;
  }

  img {
    width: 34px;
    height: 34px;
  }

  ul.social-network li {
    display: inline;
    margin: 0 2px;
  }

  .social-circle li a {
    width: 45px;
    height: 45px;
  }

  .toggle-form {
    width: 115px;
    height: 35px;
  }
  .slider {
    width: 80px;
    height: 41px;
  }

  .slider.signUp {
    left: calc(100% - 80px);
  }
  .sign-up,
  .login {
    font-size: 13px;
  }

  .box input[type="text"],
  .box input[type="password"],
  .box input[type="email"] {
    width: 80%;
  }

  .box input[type="text"]:focus,
  .box input[type="password"]:focus,
  .box input[type="email"]:focus {
    width: 88%;
  }

  .box input[type="submit"] {
    width: 50%;
    padding: 10px 0 10px 0;
  }
}
@media screen and (max-width: 430px) {
  .toggle-form {
    width: 90px;
    height: 30px;
  }
  .slider {
    width: 65px;
    height: 33px;
  }
  .slider.signUp {
    left: calc(100% - 65px);
  }
  .sign-up,
  .login {
    font-size: 11px;
  }

  .text-muted {
    font-size: 14px;
  }

  .social-circle li a {
    width: 26px;
    height: 26px;
  }

  img {
    width: 26px;
    height: 26px;
  }

  input {
    font-size: 10px;
    padding: 5px;
  }
}
</style>
