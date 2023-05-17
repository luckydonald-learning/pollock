<template>
  <div>
    <div class="create-poll">
      <br><br><br>
      <form>
        <label for="question">Title:</label>
        <input type="text" id="poll_title" v-model="title">
        <br><br><br>
        <label for="options">Vote Options:</label>
        <div v-for="(option, index) in options" :key="index">
          <div class="option-container">
            <input type="text" :id="'option-' + index" v-model="options[index]">
            <button class="delete-option" @click="deleteOption(index)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
        <button @click.prevent="addOption">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <button @click.prevent="submit" :class="{ 'disabled-button': !areOptionsValid }" :disabled="!areOptionsValid">
          Create Poll
        </button>
      </form>
      <div v-if="!areOptionsValid" class="warning-message">
        <p><b>Hints:</b></p>
        <p>Make sure you have entered a question/title</p>
        <p>Fill in all fields</p>
        <p>Do you have more than one option?</p>
        <p>The options must not match others</p>
      </div>
    </div>

    <div class="options-window">
      <h2>Poll-Options</h2>
      <div class="option">
        <label for="description">Description:</label>
        <input type="input" id="description" v-model="description">
      </div>
      <div class="option">
        <label for="deadline">Deadline:</label>
        <input type="datetime-local" id="deadline" v-model="deadline">
      </div>
      <div class="option">
        <label for="max-options">Maximum number of votes:</label>
        <input type="range" id="max-options" v-model="voices" min="1" :max="options.length">
        <span class="range-value">{{ voices }}</span>
      </div>
      <div class="option">
        <label for="worst">Show worst vote too:</label>
        <input type="checkbox" id="worst" v-model="worst">
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
      description: '',
      options: ['', ''],
      deadline: '',
      voices: 1,
      worst: false
    };
  },
  methods: {
    addOption() {
      this.options.push('');
    },
    deleteOption(index) {
      this.options.splice(index, 1);
    },
    submit() {
      const data = {
        title: this.title,
        options: this.options,
        description: this.description,
        deadline: this.deadline,
        voices: this.voices,
        worst: this.worst
      };

      axios.post('http://localhost:3000/api/lack', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    areOptionsValid() {
      const optionLengthNotZero = (this.options.length >= 2);
      const noEmptyOptions = this.options.every(option => option.trim() !== '');
      const noEmptyTitle = (this.title !== '');
      const uniqueOptions = new Set(this.options.map(option => option.trim()));
      const optionsAllUnique = uniqueOptions.size !== this.options.length;
      // Check if any option is empty
      return optionLengthNotZero && noEmptyOptions && noEmptyTitle && !optionsAllUnique;
    }
  },
};
</script>

<style scoped>
.create-poll {
  max-width: 600px;
  margin: 0 auto;
}

.warning-message {
  color: red;
  margin-top: 0.5rem;
}

.options-window {
  width: 50em;
  margin: 2rem auto;
  /* Added 'margin' property with 'auto' value */
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

.option label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}



input[type="datetime-local"] {
  display: block;
  margin-bottom: 10px;
  width: 200px;
  /* Adjust the width as desired */
  margin: 0 auto;
  /* Center the input horizontally */
  padding: 8px;
  font-size: 14px;
  /* Adjust the font size as desired */
}

.range-value {
  display: inline-block;
  margin-left: 10px;
  font-size: 16px;
  color: #777;
}

input[type="number"],
.disabled-button {
  background-color: #ccc;
  cursor: not-allowed;
}

#description{
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

.disabled-button {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>