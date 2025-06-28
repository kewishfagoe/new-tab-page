<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    addTask: [newTask: string]
}>()

import Card from '../layouts/Card.vue';

const newTask = ref("")
const showError = ref<boolean>(false)

function addTaskFormSubmitted() {
    if (newTask.value === "" || newTask.value.trim() === "") {
        showError.value = true
        return
    } else {
        showError.value = false
    }

    emit("addTask", newTask.value.trim())

    newTask.value = ""
}
</script>

<template>
    <Card>
        <template v-slot:heading>
            <h2>Add Task</h2>
        </template>
        <template v-slot:body>
            <div class="content">
                <form class="input-container" @submit.prevent="addTaskFormSubmitted">
                    <input type="text" id="add-task-input" name="newTask" v-model="newTask" >
                    <button type="button" class="add-task-button" @click="addTaskFormSubmitted">Add</button>
                </form>
                <div v-if="showError" class="error">Task cannot be empty.</div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.content {
    border-radius: 8px;
    padding: 15px 16px;
}

button {
    border-radius: 8px;
    border: 1px solid #eaeaea;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;
}
button:hover {
    border-color: var(--brand-color);
}
button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
button.add-task-button {
    margin-left: 10px;
    color: var(--brand-color);
    background-color: #F0F8FF;
    width: 125px;
}

.input-container {
    display: flex;
    align-items: center;
}
input {
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    display: block;
    padding: 0.625rem;
    border-radius: 0.5rem;
    border: 1px solid #D1D5DB;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #111827;
    background-color: #F9FAFB;
}
.error {
    font-size: smaller;
    color: #DC143C;
    margin-top: 5px;
}

@media only screen and (max-width: 680px) {
    .input-container {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    button.add-task-button {
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
    }
}
</style>
