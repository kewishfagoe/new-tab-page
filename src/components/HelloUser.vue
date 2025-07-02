<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
    numberOfTasks?: number
    totalTasksCompleted: number
}>()

import Card from '../layouts/Card.vue'
import SetUsernameModal from './SetUsernameModal.vue'

const username = ref<string>("friend")

const showModal = ref<boolean>(false)

const loadUsername = () => {
    try {
        const storedValue = localStorage.getItem('username')
        if (storedValue) {
            username.value = storedValue
        }
    } catch (error) {
        console.warn('localStorage access failed:', error)
    }
}

const updateUsername = (newValue: string) => {
    username.value = newValue
    try {
        if (newValue === 'friend') {
          localStorage.removeItem('username')
        } else {
          localStorage.setItem('username', newValue)
        }
    } catch (error) {
        console.warn('localStorage write failed: ', error)
    }
    showModal.value = false
}

const now = ref<Date>(new Date())

const updateNow = (): void => {
    now.value = new Date()
}

// Format date as "Month Day, Year"
const formattedDate = computed<string>(() =>
    now.value.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
)

// Format time as "HH:MM AM/PM"
const formattedTime = computed<string>(() =>
    now.value.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
    })
)

const weekNumber = computed<number>(() => getISOWeekNumber(now.value))

const getISOWeekNumber = (date: Date): number => {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNumber = tempDate.getUTCDay() || 7 // Sunday is 0 in JS, convert to 7

    // Set date to Thursday in the current week
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber)

    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1))
    const weekNo = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

    return weekNo
}


let timer: number | undefined

onMounted(() => {
    loadUsername()

    updateNow()
    timer = setInterval(updateNow, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
    <Card>
        <template v-slot:heading>
            <div class="container">
                <img src="/asterisk.svg" class="logo" alt="App logo" @click="showModal = true" />
                <h2>Hello {{ username }}.</h2>
            </div>
        </template>
        <template v-slot:body>
            <div class="content">
                <div class="date">{{ formattedDate }}</div>
                <div class="time">{{ formattedTime }}</div>
                <div class="week">Week <span class="val">{{ weekNumber }}</span></div>
                <div>Tasks <span class="val">{{ props.totalTasksCompleted ? props.totalTasksCompleted : 0 }} / {{ props.numberOfTasks ? props.numberOfTasks : 0 }}</span></div>
            </div>
        </template>
    </Card>
    <SetUsernameModal v-if="showModal" @close="showModal = false" @updateUsername="updateUsername" />
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
}

.logo {
    height: 20px;
    padding-right: 4px;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    cursor: pointer;
}

.content {
    border-radius: 8px;
    padding: 15px 16px;

    display: flex;
    justify-content: space-between;
}

.date {
  font-weight: bold;
}

.time {
  color: #555;
}

.val {
    border: 1px solid #eaeaea;
    color: var(--brand-color);
    padding: 1px 4px;
    border-radius: 12px;
    background-color: #F0F8FF;
}

@media only screen and (max-width: 680px) {
    .content {
        flex-direction: column;
        align-items: center;
    }
    .content div {
        margin: 10px;
    }
}
</style>
