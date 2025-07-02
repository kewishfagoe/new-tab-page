<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Card from '../layouts/Card.vue'
import type { SavedLink } from "../types";
import AddLinkModal from "./AddLinkModal.vue";

const links = ref<SavedLink[]>([])
const showModal = ref<boolean>(false)

const saveLink = (newUrl: string, newTitle: string) => {
    links.value.push({
        id: crypto.randomUUID(),
        url: newUrl,
        title: newTitle,
    })

    showModal.value = false
}

function deleteLink(id: string) {
    const linkIndex = links.value.findIndex((link) => link.id === id)
    if (linkIndex !== -1) {
        links.value.splice(linkIndex, 1)
    }
}

const loadLinks = () => {
    try {
        const storedLinks = localStorage.getItem('savedLinks')
        if (storedLinks) {
            links.value = storedLinks ? JSON.parse(storedLinks) : []
        }
    } catch (error) {
        console.warn('localStorage access failed:', error)
    }
}

onMounted(() => {
    loadLinks()
})

watch(links, (newVal: SavedLink[]) => {
  localStorage.setItem('savedLinks', JSON.stringify(newVal))
}, { deep: true })
</script>

<template>
    <Card>
        <template v-slot:heading>
            <div class="heading-container">
                <h2>Saved Links</h2>
                <div class="add-button-container">
                    <button class="add-button" @click="showModal = true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </template>
        <template v-slot:body>
            <div class="content">
                <ul v-if="links !== undefined && links.length > 0">
                    <li class="link-container" v-for="(item, index) in links" :key="item.id" :data-order="`link-item-${index+1}`">
                        <a :href="item.url" rel="noopener noreferrer">
                            {{ item.title }} &#8599;
                        </a>
                        <div class="delete-button-container">
                            <button class="delete-button" @click="deleteLink(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                </ul>
                <p v-else>
                    <span class="no-state-symbol">&#10070;</span> No links added.
                </p>
            </div>
        </template>
    </Card>
    <AddLinkModal v-if="showModal" @close="showModal = false" @save-link="saveLink" />
</template>

<style scoped>
.content {
    border-radius: 8px;
    /* padding: 15px 16px; */
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
p {
    margin: 0;
    padding: 15px 16px;
}
.no-state-symbol {
    color: #727272;
}
.add-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
}
.add-button {
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

    color: #727272;
    margin: 0 6px;
}
.add-button:hover {
    color: #a6a6a6;
}
.heading-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.link-container {
    display: flex;
    justify-content: space-between;
}
.delete-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
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
</style>
