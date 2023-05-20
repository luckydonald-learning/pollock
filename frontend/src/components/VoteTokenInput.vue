<template>
    <div>
      <div class="create-poll">
        <br /><br /><br />
        <form @submit.prevent="submitToken">
          <div class="form-group">
            <label :for="tokenInputId">Insert Edit-Token here:</label>
            <div id="search-field" class="input-container">
              <input
                :id="tokenInputId"
                type="text"
                v-model="token"
                :disabled="loading"
                required
                placeholder="Edit-Token"
              />
              <button id="search" type="submit" :disabled="loading" @click="loadDataFromDatabase">Search</button>
            </div>
          </div>
          <br /><br /><br />
          <div class="form-group">
            <label for="question">Title:</label>
            <input type="text" id="question" v-model="title" :disabled="true" />
          </div>
          <br /><br /><br />
          <div class="form-group">
            <label for="owner">Owner:</label>
            <input type="text" id="owner" v-model="vote_owner" :disabled="false" required placeholder="Enter your name here" />
          </div>
          <br /><br /><br />
          <label for="options">Vote Options:</label>
          <div class="form-group">
            <div v-for="(option, index) in options" :key="index" class="option-container">
              <button
                :id="'option-' + index"
                :class="{ 'green': isOptionClicked[index], 'white': !isOptionClicked[index] }"
                @click="toggleOption(index)"
                :disabled="false"
              >
                {{ option.text }}
              </button>
            </div>
          </div>
          <br /><br /><br />
          <button id="changevote" @click.prevent="submit" :class="{ 'disabled-button': !optionCountValid }" :disabled="!optionCountValid">
            Change Vote
          </button>
        </form>
      </div>
  
      <div class="options-window">
        <h2>Poll-Options</h2>
        <div class="option">
          <label for="description">Description:</label>
          <input type="input" id="description" v-model="description" :disabled="true" />
        </div>
        <div class="option">
          <label for="deadline">Deadline:</label>
          <input type="input" id="deadline" v-model="convertTimestringToReadable" :disabled="true" />
        </div>
        <div class="option">
          <label for="max-options">Maximum number of votes:</label>
          <div class="input-container">
            <input type="range" id="max-options" v-model="voices" min="1" :max="options.length" :disabled="true" />
            <span class="range-value">{{ voices }}</span>
          </div>
        </div>
        <div class="option">
          <label for="worst">Show worst vote too:</label>
          <input type="checkbox" id="worst" v-model="worst" :disabled="true" />
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
    computed: {
        optionCountValid() {
            // Zähle alle Elemente, die ausgewählt (true) sind
            const count = this.isOptionClicked.reduce((accumulator, currentValue) => {
                if (currentValue === true) {
                    return accumulator + 1;
                }
                return accumulator;
            }, 0);
            return (count <= this.voices) && (count > 0);
        },
        convertTimestringToReadable(){
            const dateString = this.deadline;
            if(dateString == ''){
                return '';
            }
            const date = new Date(dateString);
            return date.toLocaleString();
        },
    },
    data() {
        return {
            title: '',
            options: [],
            description: '',
            deadline: '',
            voices: 0,
            vote_owner: '',
            worst: false,
            token: '',
            selectedOptions: [],
            isTitleClicked: false,
            isOptionClicked: [],
        };
    },
    mounted() {
    },

    methods: {
        loadDataFromDatabase() {
            axios.get('http://localhost:3000/vote/lack/' + this.token)
                .then(response => {
                    const pollBody = response.data.poll.body;

                    this.title = pollBody.title;
                    this.description = pollBody.description;
                    this.options = pollBody.options;
                    this.deadline = pollBody.setting.deadline;
                    this.voices = pollBody.setting.voices;
                    this.worst = pollBody.setting.worst;
                    this.selectedOptions = response.data.vote.choice;
                    this.vote_owner = response.data.vote.owner.name;

                    // Setze den Zustand der Buttons basierend auf den ausgewählten Optionen
                    this.isOptionClicked = this.options.map((option) => {
                        return this.selectedOptions.some((selectedOption) => {
                            return selectedOption.id == option.id;
                        })
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        },
        toggleOption(index) {
            // Überprüfen, ob der Button bereits geklickt wurde
            if (this.isOptionClicked[index]) {
                // Button wurde bereits geklickt, setze den Zustand auf false (weiß)
                this.isOptionClicked[index] = false;
            } else {
                // Button wurde noch nicht geklickt, setze den Zustand auf true (grün)
                this.isOptionClicked[index] = true;
            }
        },
        submit() {
            // Fügen Sie hier den Code ein, um die aktualisierten Daten an die Datenbank zu senden
        }
    }
};
</script>

<style>

.input-container#search-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.create-poll {
    max-width: 600px;
    margin: 0 auto;
}

.options-window {
    width: 50em;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 10em;
}

.options-window h2 {
    font-size: 24px;
    margin-bottom: 1rem;
    color: #333;
}

.option {
    margin-bottom: 1.5rem;
}

input[type="text"] {
    width: 50em;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
}

input[type="text"]:focus {
    width: 52em;
    border-color: #2196F3;
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
}

#optionselector {
    background-color: #00557e;
}

input[type="datetime-local"] {
    display: block;
    margin-bottom: 10px;
    width: 200px;
    margin: 0 auto;
    padding: 8px;
    font-size: 14px;
}

.range-value {
    display: inline-block;
    margin-left: 10px;
    font-size: 16px;
    color: #777;
}

.option label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
}

input[type="number"],

.disabled-button#changevote {
    background-color: #ccc;
    cursor: not-allowed;
}

#description {
    width: 50%;
}

input[type="checkbox"] {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    font-size: 16px;
}



h2 {
    font-size: 24px;
    margin-bottom: 1rem;
}

button {
    display: block;
    padding: 0px;
    width: 100%;
    font-size: 16px;
    background-color: #008CBA;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}



button#changevote {
    display: block;
    padding: 10px;
    width: 20%;
    /* Macht alle Buttons gleich breit */
    font-size: 16px;
    background-color: #008CBA;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button#search {
    display: block;
    width: 5em;
    height: 100%;
    margin-top: 0px;
    font-size: 16px;
    background-color: #008CBA;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #00557e;
    /* Ändert die Hintergrundfarbe beim Hovern */
}

.option-container {
    display: flex;
    flex-basis: 50%;
    flex-grow: 1;
    align-items: center;
}

.option-container button {
    text-align: center;
    padding: 10px;
    font-size: 16px;
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5em;
}

.option-container button.green {
    background-color: green;
    color: white;
}

.option-container button.white {
    background-color: white;
    color: black;
}

.option-container button:hover:not(.disabled-button) {
    background-color: #f5f5f5;
}

.delete-option {
    margin-left: 10px;
    margin-bottom: 1.34em;
    cursor: pointer;
    background: linear-gradient(to right, #000000, #353535);
}

.range-value {
    display: inline-block;
    margin-left: 10px;
    font-size: 16px;
    color: #777;
}

h2 {
    font-size: 24px;
    margin-bottom: 1rem;
}

.green {
    background-color: green;
    color: white;
}

.white {
    background-color: white;
    color: black;
}

.form-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.label-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.label-container label {
    font-size: 18px;
    font-weight: bold;
    margin-right: 0.5rem;
    color: #555;
}

</style>


