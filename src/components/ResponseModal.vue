<template>
    <b-modal :id="'showResponse' + data.id" title="Ответ от менеджера" :hide-footer="true">
        <p class="my-4">{{ data.answer }}</p>
    </b-modal>
</template>

<script>
export default {
    name: 'ResponseModal',
    props: ['data'],
}
</script>