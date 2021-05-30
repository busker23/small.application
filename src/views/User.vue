<template>
    <div class="container">
        <h3 class="text-center mt-4 mb-4">Ваши запросы</h3>
        <div class="justify-content-end d-flex mb-4">
            <b-button href="#" variant="outline-primary" v-b-modal.modal-user-request>Добавить запрос</b-button>
            <AddRequestModal/>
        </div>
        <div class="requests" v-if="userRequests">
            <Card v-for="request in userRequests" :key="request.id" :data="request">
                <template v-if="request.is_replied">
                    <b-button href="#" variant="primary" @click="$root.$emit('bv::show::modal', 'showResponse' + request.id)">Посмотреть ответ</b-button>
                    <ResponseModal :data="request"/>
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue'
import AddRequestModal from '@/components/AddRequestModal.vue'
import ResponseModal from '@/components/ResponseModal.vue'

export default {
    components: {Card, AddRequestModal, ResponseModal},
    computed: {
        userRequests() {
            return this.$store.getters.allRequests;
        }
    },
    data() {
        return {
            requests: [],
        }
    },
    methods: {
        addNewRequest(request) {
            this.requests.push(request.data);
        },
    },

    mounted() {
        this.$store.dispatch('getUserRequests', this.form).then(response => {
            console.log(response);
            // this.requests = response.data;
        }, error => {
            console.log(error)
        })
    }
}
</script>
