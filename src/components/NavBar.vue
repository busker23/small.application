<template>
  <b-navbar toggleable type="dark" variant="dark" class="p-2">
    <b-navbar-brand href="#">Small</b-navbar-brand>
    <div>
      <b-nav>
          <router-link class="nav-link active" v-if="!isAuth" to="/login">Вход</router-link>
          <router-link class="nav-link active" v-if="!isAuth" to="/register">Регистрация</router-link>
          <a class="nav-link active" v-if="isAuth" @click.prevent="logout">Выйти</a>
      </b-nav>
    </div>
  </b-navbar>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'NavBar',
  components: {},
  computed: {
    isAuth() {
      return localStorage.getItem('auth') === 'true'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
  .nav-link {
    color: #fff!important;
  }
</style>