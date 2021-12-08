<template>
  <router-link to="/"> VOLVER </router-link>
  <h1>Inicio de sesión</h1>

  <form v-on:submit.prevent="sendToDashboard">
    <div>
      <label for="username">Nombre de usuario</label>
      <input
        type="username"
        name="username"
        id="username"
        v-model="user.username"
      />

      <label for="password">Contraseña</label>
      <input
        type="password"
        name="password"
        id="pass"
        v-model="user.password"
      />
    </div>
    <button type="submit">Iniciar sesión</button>
  </form>

  <p>
    ¿Aún no eres usuario?
    <router-link to="/user/signup">Regístrate</router-link>
  </p>
</template>

<script>
import axios from "axios";
export default {
  name: "logIn",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    sendToDashboard: function () {
      axios
        .post("https://eps-authms.herokuapp.com/login", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("logInSuccess", dataLogIn);
          this.$router.push({ name: "mainLayout" });
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("Verifica tus credenciales para continuar");
        });
    },
  },
};
</script>