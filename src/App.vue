<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import HelloUser from './components/HelloUser.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import type { Task } from './types'
import TasksList from './components/TasksList.vue'

const tasks = ref<Task[]>([])

function addTask(newTask: string) {
    tasks.value.push({
        // id: Date.now().toString(),
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
  <!-- <div>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <main>
        <HelloUser :number-of-tasks="tasks.length"/>
        <AddTaskForm @add-task="addTask" />
        <TasksList :tasks="tasks" @delete-task="deleteTask" @complete-task="completeTask" />
        <p>{{ totalTasksCompleted }}</p>
        <!-- <Card>
            <template v-slot:heading>
                <h2>Placeholder heading!</h2>
            </template>
            <template v-slot:body>
                Placeholder body content!
            </template>
        </Card> -->
  </main>
</template>

<style scoped>
</style>
