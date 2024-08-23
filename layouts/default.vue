<scripts setup lang="ts"></scripts>

<template>
  <body>
    <div class="container">
      <div class="header">
        <div class="info">
          <ul>
            <li class="home">
              <NuxtLink to="/"
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
          </ul>
        </div>
      </div>

      <slot />
      <footer>Copyright © 2024 Tan</footer>
    </div>
  </body>
</template>

<style scoped>
body {
  background-color: rgb(18, 18, 18);
}
.container {
  width: 100%;
  height: 1200px;
  display: flex;
  color: white;
  flex-direction: column;
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

ul {
  display: flex;
  justify-content: flex-end;
  margin: auto 0px;
}

li {
  list-style: none;
  display: flex;
}

a {
  color: white;
  text-decoration: none;
  transition: opacity 0.1s ease;
  transition: background-color 0.1s ease;
  margin: 5px;
  padding: 5px;
  border-radius: 15%;
  display: flex;
}

span {
  font-size: 20px;
}

a:hover {
  cursor: pointer;
  opacity: 0.8;
  background-color: rgb(48, 48, 48);
}

footer {
  display: block;
  width: fit-content;
  margin: 100px auto 0px auto;
  padding-bottom: 10px;
  font-size: 10px;
}

/* Tablet Styles (768px - 1023px) */
@media screen and (max-width: 900px) {
  a {
    font-size: 14px;
  }

  span {
    font-size: 18px;
  }

  footer {
    font-size: 10px;
    margin-top: 50px;
  }
}

/* Mobile Styles (767px and below) */
@media screen and (max-width: 430px) {
  .header {
    padding-top: 10px;
  }

  .info {
    justify-content: center;
  }

  ul {
    padding-left: 0px;
  }

  li {
    margin-left: -10px;
  }
  a {
    font-size: 9px;
    width: 70px;
    border-radius: 20%;
    margin: 5px;
    padding: 2px;
    align-items: center;
  }

  span {
    font-size: 18px;
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
