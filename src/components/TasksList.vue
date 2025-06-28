<script setup lang="ts">
import Card from '../layouts/Card.vue';
import type { Task } from '../types';

const props = defineProps<{
    tasks: Task[]
}>()

const emit = defineEmits<{
    deleteTask: [id: string]
    completeTask: [id: string]
}>()

function deleteTask(id: string) {
    emit("deleteTask", id)
}

function completeTask(id: string) {
    emit("completeTask", id)
}
</script>

<template>
    <Card>
        <template v-slot:heading>
            <h2>Tasks</h2>
        </template>
        <template v-slot:body>
            <div class="content">
                <ul v-if="tasks !== undefined && tasks.length > 0">
                    <li class="task-container" v-for="(task, index) in props.tasks" :key="task.id">
                        <!-- add checkbox, title, delete icon -->
                        <div class="task-item">
                            <div class="checkbox-container">
                                <input
                                    type="checkbox"
                                    :id="`completeTask-${index}`"
                                    :name="`completeTask-${index}`"
                                    :checked="task.done"
                                    @click="completeTask(task.id)" />
                            </div>
                            <div>
                                <span :class="{ completed: task.done }">
                                    <span class="title">{{ task.title }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="delete-button-container">
                            <button class="delete-button" @click="deleteTask(task.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                </ul>
                <p v-else>
                    <span class="no-state-symbol">&#10070;</span> No tasks stored.
                </p>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.content {
    border-radius: 8px;
    /* padding: 15px 16px; */
}
p {
    margin: 0;
    padding: 15px 16px;
}
.no-state-symbol {
    color: #727272;
}
.delete-button {
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #DC143C;
}
.delete-button:hover {
    color: #FF5B7C;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
li {
    border-bottom: 1px solid #eaeaea;
    padding: 15px 16px;
}
li:last-child {
    border-bottom: none;
}
.title {
    color: #000;
}
.completed {
    color: #0000EE;
    text-decoration: line-through;
    text-decoration-thickness: 0.2rem;
}
.task-item {
    display: flex;
    align-items: center;
}
.checkbox-container {
    margin-right: 15px;
}
.task-container {
    display: flex;
    justify-content: space-between;
}
.delete-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
}
</style>
