<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emits = defineEmits<{
    saveLink: [newUrl: string, newTitle: string]
    close: boolean
}>()

const newUrl = ref<string>("")
const newTitle = ref<string>("")

const showError = ref<boolean>(false)
const showUrlError = ref<boolean>(false)

function addLink() {
    if (newUrl.value === "" || newUrl.value.trim() === "") {
        showError.value = true
        return
    }
    if (newTitle.value === "" || newTitle.value.trim() === "") {
        showError.value = true
        return
    }

    const inputUrl = newUrl.value.trim()
    const finalUrl = inputUrl.match(/^https?:\/\//i) ? inputUrl : `https://${inputUrl}`
    if(!isValidHttpUrl(finalUrl)) {
        showUrlError.value = true
        return
    }

    emits("saveLink", finalUrl, newTitle.value.trim())
}

function isValidHttpUrl(urlString: string) {
    let url

    const prefixedUrl = urlString.match(/^https?:\/\//i) ? urlString : `https://${urlString}`

    try {
        url = new URL(prefixedUrl)
    } catch (err) {
        return false
    }

    return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        /\./.test(url.hostname)
    )
}

function resetError() {
    showError.value = false
    showUrlError.value = false
}

const newUrlInput = ref()
onMounted(() => {
    // small delay to ensure the modal is fully rendered
    setTimeout(() => {
        newUrlInput.value!.focus();
    }, 10);
})
</script>

<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Add Link</h3>
                    </div>

                    <div class="modal-body">
                        <div class="form-input">
                            <label>
                                URL
                                <div class="input-container">
                                    <input type="text" id="url-input" name="newUrl" v-model="newUrl" ref="newUrlInput" @input="resetError" @keyup.esc="$emit('close')" autocomplete="off">
                                </div>
                                <div v-if="showUrlError" class="error">The URL provided needs to be valid.</div>
                            </label>
                        </div>
                        <div class="form-input">
                            <label style="margin-top: 20px;">
                                Title
                                <div class="input-container">
                                    <input type="text" id="title-input" name="newTitle" v-model="newTitle" @input="resetError" @keyup.enter="addLink" @keyup.esc="$emit('close')" autocomplete="off">
                                </div>
                                <div v-if="showError" class="error">URL and Title cannot be empty.</div>
                            </label>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="modal-default-button" @click="$emit('close')">
                            Cancel
                        </button>
                        <button type="button" class="modal-default-button modal-confirm-button" @click="addLink">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    min-width: 300px;
    max-width: 420px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    padding: 20px 30px;
    background-color: #f6f8fa;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid #eaeaea;
}
.modal-header h3 {
    margin: 0;
}

.modal-body {
    padding: 20px 30px;
}
.error {
    font-size: smaller;
    color: #DC143C;
}

.modal-footer {
    padding: 20px 30px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
}


.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

button.modal-default-button {
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
button.modal-confirm-button {
    margin-left: 10px;
    border: 1px solid #eaeaea;
    color: var(--brand-color);
    background-color: #F0F8FF;
}
button:hover {
    border-color: var(--brand-color);
}
button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

.input-container {
    display: flex;
    align-items: center;
    margin-top: 5px;
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
.form-input {
    margin-bottom: 20px;
}
.form-input:last-child {
    margin-bottom: 0;
}
</style>
