<template>
    <div class="mt-4">
        <b-card :title="data.title" header-tag="header" footer-tag="footer">
        <template #header>
            <h6 class="mb-0">Запрос #{{ data.id }}</h6>
        </template>
        <b-card-text>{{ data.question }}</b-card-text>
        <slot></slot>
        <template #footer>
            <em>Создан {{ getFormattedDate(data.created_at) }}</em>
        </template>
        </b-card>
    </div>
</template>

<script>

export default {
    name: 'Card',
    props: ['data'],
    methods: {
        getFormattedDate(date) {
            let formattedDate = new Date(date);
            return formattedDate.toLocaleString();
        }
    },
}
</script>