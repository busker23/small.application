<template>
    <main class="form-signin">
        <form>
        <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

            <input v-model="form.name" type="text" class="form-control" placeholder="Имя">
            <span class="text-danger" v-if="errors.name">
                {{ errors.name[0] }}
            </span>

            <input v-model="form.email" type="email" class="form-control" placeholder="Email">
            <span class="text-danger" v-if="errors.email">
                {{ errors.email[0] }}
            </span>

            <input v-model="form.password" type="password" class="form-control" placeholder="Пароль">
            <span class="text-danger" v-if="errors.password">
                {{ errors.password[0] }}
            </span>

            <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Подтвердите пароль">
            <span class="text-danger" v-if="errors.password_confirmation">
                {{ errors.password_confirmation[0] }}
            </span>

        <button class="w-100 btn btn-lg btn-primary" @click.prevent="register">Зарегистрироваться</button>
        </form>
    </main>
</template>

<script>
// import request from '../api/request';
// import { mapActions } from 'vuex';

export default {
    computed: {
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            errors: [],
        };
    },
    methods: {
        register() {
            this.$store.dispatch('register', this.form).then(response => {
                console.log(response);
            }, error => {
                if (error.response && error.response.status == 422) {
                    this.errors = error.response.data.errors;
                }
            })

            // request.register(this.form)
            // .then(() => {
            //     this.$router.push({ path: '/login' });
            // })
            // .catch(error => {
            //     console.log(error);
            //     if (error.response && error.response.status == 422) {
            //         this.errors = error.response.data.errors;
            //     }
            // });
        },
    }
}
</script>

<style scoped>

</style>