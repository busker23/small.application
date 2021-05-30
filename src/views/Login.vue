<template>
    <main class="form-signin">
        <form>
        <h1 class="h3 mb-3 fw-normal">Пожалуйста, войдите в систему</h1>

        <input v-model="form.email" type="email" class="form-control" placeholder="Email">
        <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
        </span>

        <input v-model="form.password" type="password" class="form-control" placeholder="Пароль">
        <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
        </span>
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="login">Войти</button>
        </form>
    </main>
</template>

<script>

export default {
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            errors: [],
        };
    },
    methods: {
        login() {
            this.$store.dispatch('login', this.form).then(response => {
                console.log(response);
            }, error => {console.log(error.response.status, error.response.data.errors);
                if (error.response && error.response.status == 422) {
                    this.errors = error.response.data.errors;
                }
            })
        },
    }
}
</script>
