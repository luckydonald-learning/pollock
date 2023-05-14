<script>

import HomePage from './components/HomePage.vue'
import MyPolls from './components/MyPolls.vue'
import CreatePolls from './components/CreatePolls.vue'

const routes = {
  '/': HomePage,
  '/MyPolls': MyPolls,
  '/CreatePolls': CreatePolls,
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] 
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
		})
  }
}

import axios from 'axios'

axios.get('/api/mydata')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })


</script>

<template>
  <div class="navbar">
    <div class="navbar-container">
      <div class="navbar-links">
        <a href="#/">
          <font-awesome-icon :icon="['fas', 'house']" />
        </a>
        <a href="#/MyPolls">My Polls</a>
        <a href="#/CreatePolls">Create Polls</a>
      </div>
    </div>
  </div>
  <component :is="currentView" />
</template>

<style>
body {
  background: linear-gradient(to left, #4B0082, #000000);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 50px; /* Hier den gewünschten Abstand in Pixeln eintragen */
  text-align: center;
  color: #fefefe;
}
/* Bei Hover nach unten verschieben */
.navbar a:hover {
  transform: translateY(2px);
  color: #060606;
}

/* Menüleiste position:fixed beim Scrollen */
.navbar {
  background: linear-gradient(to right, #000000, #151515);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.navbar-links a {
  color: rgb(107, 107, 107); /* Ändere die Farbe des Links */
  text-decoration: none; /* Entferne die Unterstreichung */
}

/* Trennung durch Kästchen */
.navbar a {
  display: inline-block;
  margin: 0 10px;
  padding: 10px;
  border: 3px solid #0f0f0f;
}
</style>
