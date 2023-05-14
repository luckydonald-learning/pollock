<template>
    <div>
        <h1>My Polls</h1>
        <ul>
            <li v-for="poll in polls" :key="poll.id">{{ poll.title }}</li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      polls: [],
    };
  },
  mounted() {
    axios
      .get('/polls') // Hier wird die GET-Anfrage an den Server gesendet
      .then(response => {
        this.polls = response.data; // Hier wird die Antwort in der Datenliste gespeichert
      })
      .catch(error => console.log(error));
  },
};
</script>
  
<style scoped>
 
</style>