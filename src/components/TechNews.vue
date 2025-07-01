<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from '../layouts/Card.vue'
import type { NewsItem, FullNewsData } from '../types';

const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL

const links = ref<NewsItem[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const idsEndpoint = `${NEWS_API_URL}beststories.json?print=pretty&orderBy="$priority"&limitToFirst=5`
const linkDataEndpoint = (id: number) => `${NEWS_API_URL}item/${id}.json?print=pretty`


onMounted(async () => {
    try {
        const res = await fetch(idsEndpoint)
        const ids: number[] = await res.json()

        const linkPromises = ids.map(id =>
            fetch(linkDataEndpoint(id)).then(res => res.json())
        )

        const results: FullNewsData[] = await Promise.all(linkPromises)

        links.value = results.map(item => ({
            id: item.id,
            title: item.title,
            url: item.url
        }))
    } catch (err) {
        error.value = 'Failed to load news stories.'
        console.error(err)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <Card>
        <template v-slot:heading>
            <h2>Tech News</h2>
        </template>
        <template v-slot:body>
            <div class="content">
                <ul v-if="links !== undefined && links.length > 0">
                    <li v-for="(item, index) in links" :key="item.id" :data-order="`news-item-${index+1}`">
                        <a :href="item.url" rel="noopener noreferrer">
                            {{ item.title }} &#8599;
                        </a>
                    </li>
                </ul>
                <p v-else>
                    <span class="no-state-symbol">&#10070;</span> No news stories available.
                </p>

                <div v-if="loading" class="loader-container">
                    <div class="loader"></div>
                    <span class="loader-message">Loading...</span>
                </div>
                <p v-if="error" class="error">
                    {{ error }}
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
.loader-container {
    padding: 15px 16px;
    display: flex;
    align-items: center;
}
.loader-message {
    margin-left: 1rem;
}
.loader {
    display: inline-block;
    width: 1rem;
    padding: 6px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--brand-color);
    --_m:
        conic-gradient(#0000 10%,#000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
}
.error {
    font-size: smaller;
    color: #DC143C;
    margin-top: 5px;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>
