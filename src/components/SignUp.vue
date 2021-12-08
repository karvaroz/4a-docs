<template>
  <router-link to="/"> VOLVER </router-link>
  <h1>Regístrate</h1>

  <form v-on:submit.prevent="sendToLogIn">
    <label for="name">Nombre completo</label>
    <input type="text" name="name" id="name" v-model="user.name" required />

    <label for="username">Nombre de usuario</label>
    <input
      type="text"
      name="username"
      id="username"
      v-model="user.username"
      required
    />

    <label for="email">Correo electrónico</label>
    <input type="email" name="email" id="email" v-model="user.email" required />

    <label for="password">Contraseña</label>
    <input
      type="password"
      name="password"
      id="pass"
      v-model="user.password"
      required
    />

    <button type="submit">Registrarme</button>
  </form>

  <p>
    ¿Ya tienes cuenta?
    <router-link to="/user/login">Inicia sesión</router-link>
  </p>
</template>

<script>
import axios from "axios";
export default {
  name: "signUp",
  data: function () {
    return {
      user: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    sendToLogIn: function () {
      axios
        .post("https://eps-authms.herokuapp.com/user", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataSignUp = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          console.error(error);
          alert("Falló el registro");
        });
    },
  },
};
</script>