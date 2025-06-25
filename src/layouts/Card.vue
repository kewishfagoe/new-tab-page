<script setup lang="ts">

</script>

<template>
    <div class="card">
        <div v-if="$slots.heading" class="card__heading">
            <slot name="heading"></slot>
        </div>
        <div v-if="$slots.body" class="card__body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: #f6f8fa;
    padding: 4px;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    margin-top: 24px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.card__heading {
    font-size: 17px;
    color: #727272;
    padding: 8px 10px;
}

.card__body {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
}
</style>
