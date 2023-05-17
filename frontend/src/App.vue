<script>

import HomePage from './components/HomePage.vue'
import MyTokens from './components/MyTokens.vue'
import CreatePolls from './components/CreatePolls.vue'
import VoteTokenInput from './components/VoteTokenInput.vue'
import PollTokenInput from './components/PollTokenInput.vue'

const routes = {
  '/': HomePage,
  '/MyTokens': MyTokens,
  '/CreatePolls': CreatePolls,
  '/VoteTokenInput': VoteTokenInput,
  '/PollTokenInput': PollTokenInput,
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
        <a :href="'#/'" :class="{ 'active': currentPath === '#/' }">
          <font-awesome-icon :icon="['fas', 'house']" />
        </a>
        <a :href="'#/MyTokens'" :class="{ 'active': currentPath === '#/MyTokens' }">My Tokens</a>
        <a :href="'#/CreatePolls'" :class="{ 'active': currentPath === '#/CreatePolls' }">Create Polls</a>
        <a :href="'#/VoteTokenInput'" :class="{ 'active': currentPath === '#/VoteTokenInput' }">Search Vote</a>
        <a :href="'#/PollTokenInput'" :class="{ 'active': currentPath === '#/PollTokenInput' }">Search Poll</a>
      </div>
    </div>
  </div>
  <component :is="currentView" />
</template>

<style>
body {
  background: linear-gradient(to left, #ffffff, #e9e9e9);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 50px; /* Hier den gewünschten Abstand in Pixeln eintragen */
  text-align: center;
  color: #000000;
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

.navbar-links a.active {
  background: linear-gradient(to right, #3900c9, #110090);
}

.navbar-links a {
  color: rgb(162, 162, 162); /* Ändere die Farbe des Links */
  font-weight: bold;
  text-decoration: none; /* Entferne die Unterstreichung */
}

/* Trennung durch Kästchen */
.navbar a {
  display: inline-block;
  margin: 0 10px;
  padding: 10px;
  border: 3px solid #000000;
}
</style>
