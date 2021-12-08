<template>
  <button v-on:click="sendToLogIn">Iniciar sesión</button>

  <h1>EPS</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique suscipit
    cupiditate dolorem, omnis saepe alias illo aspernatur quam. Vitae hic
    sapiente repellendus sed culpa sint illum iste enim! Voluptates, commodi.
  </p>
  <button v-on:click="sendToSignUp">Registrarme</button>
</template>
<script>
export default {
  name: "homePage",
  methods: {
    sendToLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    sendToSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
  },
};
</script>