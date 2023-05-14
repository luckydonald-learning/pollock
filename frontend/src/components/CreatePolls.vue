<template>
    <h1>Create Polls</h1>
    <div class="create-poll">
      <form>
        <label for="question">Frage:</label>
        <input type="text" id="question" v-model="question">
        <label for="options">Antwortmöglichkeiten:</label>
        <div v-for="(option, index) in options" :key="index">
          <div class="option-container">
            <input type="text" :id="'option-' + index" v-model="options[index]">
            <button class="delete-option" @click="deleteOption(index)">
                <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
        <button @click.prevent="addOption">Weitere Antwortmöglichkeit hinzufügen</button>
        <button @click.prevent="submit">Umfrage erstellen</button>
      </form>
    </div>
  </template>
  <script>
  
  export default {
    data() {
      return {
        question: '',
        options: ['', '']
      }
    },
    methods: {
      addOption() {
        this.options.push('');
      },
      deleteOption(index) {
        this.options.splice(index, 1);
      },
      submit() {
        // Hier muss der Code zum Speichern der Umfrage implementiert werden
      }
    }
  }
  </script>
  <style scoped>
  .create-poll {
    max-width: 600px;
    margin: 0 auto;
  }
  input[type="text"] {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
  button {
    display: block;
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
    background-color: #008CBA;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #00557e;
  }
  .option-container {
    display: flex;
    align-items: center;
  }
  .delete-option {
    margin-left: 10px;
    margin-bottom: 1.34em;
    cursor: pointer;
    background: linear-gradient(to right, #000000, #747474);
  }
  </style>