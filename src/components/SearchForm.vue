<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { SearchEngine, SearchEngine as SearchEngineEnum } from "../enums/SearchEngine";
import Card from '../layouts/Card.vue';

const searchEngine = ref<SearchEngine>(SearchEngine.DUCKDUCKGO)
const searchQuery = ref<string>("")

function search() {
    if (searchQuery.value === "" || searchQuery.value.trim() === "") { return }

    let url = "";
    // const urlFriendlyParam = searchQuery.value.trim().replace(/ /g,"+")
    const urlFriendlyParam = searchQuery.value
                                            .trim()
                                            .toLowerCase()
                                            .replace(/[^a-z0-9\s]/g, "")
                                            .trim()
                                            .replace(/\s+/g, "+")

    switch (searchEngine.value) {
        case SearchEngine.DUCKDUCKGO:
            url = "https://duckduckgo.com/?ia=web&q="
            break
        case SearchEngine.GOOGLE:
            url = "https://www.google.com/search?udm=14&q="
            break
        case SearchEngine.STARTPAGE:
            url = "https://www.startpage.com/sp/search?query="
            break
        case SearchEngine.WIKIPEDIA:
            url = "https://en.wikipedia.org/wiki/Special:Search?search="
            break
        case SearchEngine.YOUTUBE:
            url = "https://www.youtube.com/results?search_query="
            break
        case SearchEngine.AMAZON:
            url = "https://www.amazon.com/s?k="
            break
        case SearchEngine.EXA:
            url = "https://exa.ai/search?q="
            break
        default:
            url = "https://duckduckgo.com/?ia=web&q="
    }

    let redirectTo = `${url}${urlFriendlyParam}`
    window.location.href = redirectTo
    // window.open(redirectTo)
}

const loadDefaultSearchEngine = () => {
    try {
        const storedValue = localStorage.getItem('defaultSearchEngine')
        if (storedValue) {
            if (Object.values(SearchEngineEnum).includes(storedValue as SearchEngine)) {
                searchEngine.value = storedValue as SearchEngine
            } else {
                console.warn('Invalid user role:', storedValue)
            }
        }
    } catch (error) {
        console.warn('localStorage access failed:', error)
    }
}

const searchQueryInput = ref()
onMounted(() => {
    loadDefaultSearchEngine()

    setTimeout(() => {
        searchQueryInput.value!.focus();
    }, 0);
})

watch(searchEngine, (newVal: SearchEngine) => {
  localStorage.setItem('defaultSearchEngine', newVal)
}, { deep: true })
</script>

<template>
    <Card>
        <template v-slot:heading>
            <h2>Search</h2>
        </template>
        <template v-slot:body>
            <div class="content">
                <form class="input-container" @submit.prevent="search">
                    <input type="text" id="search-input" name="searchQuery" v-model="searchQuery" ref="searchQueryInput" autocomplete="off" placeholder="Ask anything..." />
                    <select name="search-engine" id="search-engine-select" v-model="searchEngine" >
                        <option :value="SearchEngine.DUCKDUCKGO">DuckDuckGo</option>
                        <option :value="SearchEngine.GOOGLE">Google</option>
                        <option :value="SearchEngine.STARTPAGE">Startpage</option>
                        <option :value="SearchEngine.WIKIPEDIA">Wikipedia</option>
                        <option :value="SearchEngine.YOUTUBE">YouTube</option>
                        <option :value="SearchEngine.AMAZON">Amazon</option>
                        <option :value="SearchEngine.EXA">Exa</option>
                    </select>
                    <button type="button" class="search-button" @click="search">Search</button>
                    {{  }}
                </form>
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
button.search-button {
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

select {
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
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #111827;
    background-color: #F9FAFB;
    margin-left: 10px;
}

@media only screen and (max-width: 680px) {
    .input-container {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    button.search-button {
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
    }
    select {
        width: 100%;
        margin-left: 0;
        margin-top: 10px;
    }
}
</style>
