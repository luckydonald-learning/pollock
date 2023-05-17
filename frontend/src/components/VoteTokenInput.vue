<template>
    <div>
        <div class="create-poll">
            <br><br><br>
            <form @submit.prevent="submitToken">
                <label :for="tokenInputId">Insert Edit-Token here:</label>
                <input :id="tokenInputId" type="text" v-model="token" :disabled="loading" required placeholder="Edit-Token">
                <button type="submit" :disabled="loading" @click="loadDataFromDatabase">Search</button>
                <span v-if="loading">Loading...</span>
            </form>
            <form>
                <label for="question">Title:</label>
                <input type="text" id="poll_title" v-model="title" :disabled="true">
                <br><br><br>
                <label for="options">Vote Options:</label>
                <div v-for="(option, index) in options" :key="index">
                    <div class="option-container">
                        <input type="text" :id="'option-' + index" v-model="options[index]" :disabled="true">
                        <button class="delete-option" @click="deleteOption(index)">
                            <div class="checkbox" :class="{ 'checked': selectedOptions.includes(index) }"></div>
                        </button>
                    </div>
                </div>
                <button @click.prevent="submit" class="disabled-button" :disabled="true">
                    Change Vote
                </button>
            </form>
        </div>

        <div class="options-window">
            <h2>Poll-Options</h2>
            <div class="option">
                <label for="description">Description:</label>
                <input type="input" id="description" v-model="description" :disabled="true">
            </div>
            <div class="option">
                <label for="deadline">Deadline:</label>
                <input type="datetime-local" id="deadline" v-model="deadline" :disabled="true">
            </div>
            <div class="option">
                <label for="max-options">Maximum number of votes:</label>
                <input type="range" id="max-options" v-model="voices" min="1" :max="options.length" :disabled="true">
                <span class="range-value">{{ voices }}</span>
            </div>
            <div class="option">
                <label for="worst">Show worst vote too:</label>
                <input type="checkbox" id="worst" v-model="worst" :disabled="true">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            options: [],
            description: '',
            deadline: '',
            voices: 1,
            worst: false
        };
    },
    mounted() {

    },
    methods: {
        loadDataFromDatabase() {
            axios.get('http://localhost:3000/vote/lack/4b8401ef-2f2f-4a6d-8c7b-4b392ef0739f')
                .then(response => {
                    const data = response.data.rows;
                    // Aktualisiere die Komponentendaten entsprechend
                    this.title = data.title;
                    this.description = data.description;
                    this.options = data.options.map(option => option.text);
                    this.deadline = data.deadline;
                    this.voices = data.voices;
                    this.worst = data.worst;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteOption(index) {
            this.options.splice(index, 1);
        },
        addOption() {
            this.options.push('');
        },
        submit() {
            // Fügen Sie hier den Code ein, um die aktualisierten Daten an die Datenbank zu senden
        }
    }
};
</script>

<style>
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
.disabled-button {
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

label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 18px;
    font-weight: bold;
}

h2 {
    font-size: 24px;
    margin-bottom: 1rem;
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

.checkbox {
    width: 16px;
    height: 16px;
    border: 2px solid #000;
    margin-right: 10px;
}

.checkbox.checked {
    background-color: blue;
}
</style>
