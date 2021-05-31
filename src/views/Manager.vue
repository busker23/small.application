<template>
    <div class="container">
        <h3 class="text-center mt-4 mb-4">Заявки</h3>
        <div class="justify-content-between d-flex mb-4">
            <div>
                <span>Показать:</span>
                <ul class="nav nav-pills">
                    <li class="nav-item" @click="showAll">
                        <a :class="['nav-link', activeNav == 'all' ? 'active' : '']">Все</a>
                    </li>
                    <li class="nav-item" @click="showAnswered">
                        <a :class="['nav-link', activeNav == 'answered' ? 'active' : '']">Отвеченные</a>
                    </li>
                    <li class="nav-item" @click="showNotAnswered">
                        <a :class="['nav-link', activeNav == 'notanswered' ? 'active' : '']">Неотвеченные</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pt-4 pb-4" v-if="allRequests">
            <Card v-for="request in allRequests" :key="request.id" :data="request">
                <template v-if="request.is_replied">
                    <b-button href="#" variant="primary" @click="$root.$emit('bv::show::modal', 'showResponse' + request.id, $event.target)">Посмотреть ответ</b-button>
                    <ResponseModal :data="request"/>
                </template>
                <template v-else>
                    <b-button href="#" variant="primary" @click="$root.$emit('bv::show::modal', 'addResponse' + request.id, $event.target)">Ответить</b-button>
                    <AddResponseModal :data="request"/>
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue'
import AddResponseModal from '@/components/AddResponseModal.vue'
import ResponseModal from '@/components/ResponseModal.vue'

export default {
    components: {
        Card,
        ResponseModal,
        AddResponseModal
    },
    computed: {
        allRequests() {
            return this.$store.getters.allRequests;
        }
    },
    data() {
        return {
            activeNav: 'all',            
        }
    },
    methods: {
        getAllRequests() {
            this.$store.dispatch('getAllRequests', this.form);
        },
        showAll() {
            this.activeNav = 'all';
            this.getAllRequests();
        },
        showAnswered() {
            this.activeNav = 'answered';
            let params = {
                'answered': 1
            }
            this.$store.dispatch('getOptionalRequests', params);
        },
        showNotAnswered() {
            this.activeNav = 'notanswered';
            let params = {
                'answered': 0
            }
            this.$store.dispatch('getOptionalRequests', params);
        }
    },
    mounted() {
        this.getAllRequests();
    }
}
</script>
