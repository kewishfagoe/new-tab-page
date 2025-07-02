<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

import HelloUser from './components/HelloUser.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import type { Task } from './types'
import TasksList from './components/TasksList.vue'
import SearchForm from './components/SearchForm.vue'
import TechNews from './components/TechNews.vue'
import SavedLinks from './components/SavedLinks.vue'

const tasks = ref<Task[]>([])

const totalTasksCompleted = computed(() => {
   return tasks.value.filter(task => task.done).length || 0;
})

function addTask(newTask: string) {
    tasks.value.push({
        id: crypto.randomUUID(),
        title: newTask,
        done: false
    })
}

function deleteTask(id: string) {
    const taskIndex = tasks.value.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        tasks.value.splice(taskIndex, 1)
    }
}

function completeTask(id: string) {
    const task = tasks.value.find((task) => task.id === id)
    if(task) {
        task.done = !task.done
    }
}

const loadTasks = () => {
    try {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
            tasks.value = storedTasks ? JSON.parse(storedTasks) : []
        }
    } catch (error) {
        console.warn('localStorage access failed:', error)
    }
}

onMounted(() => {
    loadTasks()
})

watch(tasks, (newVal: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(newVal))
}, { deep: true })
</script>

<template>
    <main>
        <HelloUser :number-of-tasks="tasks.length" :total-tasks-completed="totalTasksCompleted" />
        <SearchForm />
        <AddTaskForm @add-task="addTask" />
        <TasksList :tasks="tasks" @delete-task="deleteTask" @complete-task="completeTask" />
        <TechNews />
        <SavedLinks />
        <footer>
            <p class="">Made with ♡ by <a href="https://github.com/kewishfagoe" rel="noopener noreferrer" target="_blank">Kewish &#8599;</a></p>
        </footer>
    </main>
</template>

<style scoped>
footer {
    color: #727272;
    font-size: 12px;
    margin-top: 6rem;
}
</style>
