<template>
    <div class="mt-4">
        <b-card :title="data.title" header-tag="header" footer-tag="footer">
        <template #header>
            <h6 class="mb-0">Запрос #{{ data.id }}</h6>
        </template>
        <b-card-text>{{ data.question }}</b-card-text>
        <slot></slot>
        <!-- <b-button href="#" variant="primary" v-b-modal.modal-1>Посмотреть ответ</b-button>
        <ResponseModal/> -->
        <template #footer>
            <em>{{ data.created_at }}</em>
        </template>
        </b-card>
    </div>
</template>

<script>
// import ResponseModal from '@/components/ResponseModal';

export default {
    name: 'Card',
    props: ['data'],
    // components: {ResponseModal}
}
</script>