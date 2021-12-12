<template>
  <div>
    <h1 class="form-title">Registro de afiliados</h1>
    <form class="global-form-container" v-on:submit.prevent="createAffiliate">
      <div class="register-form">
        <div class="input-container">
          <label for="id" class="input-container__label">Id</label>
          <input
            type="text"
            class="input-container__input"
            name="id"
            id="id"
            required
            v-model="affiliate.id"
          />
        </div>
        <div class="input-container">
          <label for="name" class="input-container__label">Nombres</label>
          <input
            type="text"
            class="input-container__input"
            name="name"
            id="name"
            required
            v-model="affiliate.name"
            maxlength="40"
          />
        </div>
        <div class="input-container">
          <label for="lastname" class="input-container__label">Apellidos</label>
          <input
            type="text"
            class="input-container__input"
            name="lastname"
            id="lastname"
            required
            v-model="lastname"
            maxlength="40"
          />
        </div>
        <div class="input-container">
          <label for="document" class="input-container__label"
            >Tipo Documento</label
          >
          <select
            class="input-container__input"
            name="document"
            id="document"
            required
            v-model="document"
          >
            <option disabled>Seleccione</option>
            <option v-for="tipo in document" :key="tipo">
              {{ tipo.document }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="document_number" class="input-container__label"
            >Número Document</label
          >
          <input
            type="number"
            class="input-container__input"
            name="price"
            id="price"
            required
            v-model="price"
          />
        </div>
        <div class="input-container">
          <label for="email" class="input-contailer__label">Email</label>
          <input
            type="email"
            class="input-container__input"
            name="email"
            id="email"
            required
            v-model="email"
          />
        </div>
        <div class="input-container">
          <label for="phone" class="input-container__label">Celular</label>
          <input
            type="number"
            class="input-container__input"
            name="phone"
            id="phone"
            required
            v-model="phone"
          />
        </div>
        <div class="input-container">
          <label for="city" class="input-container__label">Celular</label>
          <input
            type="text"
            class="input-container__input"
            name="city"
            id="city"
            required
            v-model="city"
          />
        </div>
        <div class="input-container">
          <label for="address" class="input-container__label">Celular</label>
          <input
            type="text"
            class="input-container__input"
            name="address"
            id="address"
            required
            v-model="address"
          />
        </div>
      </div>
      <button type="submit" class="primary-btn primary-btn--margin">
        Ingresar afiliado a la eps
      </button>
    </form>
  </div>
</template>
<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "registroAfiliado",
  data: function () {
    return {
      affiliate: {
        id: "",
        name: "",
        lastname: "",
        document: [],
        document_number: "",
        email: "",
        phone: "",
        city: "",
        address: "",
      },
    };
  },
  methods: {
    getAffiliates: function () {
      let userToken = localStorage.getItem("token_access");
      let userId = jwt_decode(userToken).user_id.toString();
      axios
        .get(
          `https://affiliates-ms-be.herokuapp.com/user/${userId}/affiliates`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((result) => {
          this.affiliates = result.data;
        });
    },
    createAffiliate: function () {
      let userToken = localStorage.getItem("token_access");
      let userId = jwt_decode(userToken).user_id.toString();
      axios
        .post(
          `https://affiliates-ms-be.herokuapp.com/user/${userId}/affiliates`,
          this.affiliate,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((result) => {
          alert("Afiliado creado con éxito");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          alert("Falló registro de afiliado");
        });
    },
    clearData: function () {
      this.affiliate.id = "";
      this.affiliate.name = "";
      this.affiliate.lastname = "";
      this.affiliate.document = "";
      this.affiliate.document_number = "";
      this.affiliate.email = "";
      this.affiliate.phone = "";
      this.affiliate.city = "";
      this.affiliate.address = "";

    },
  },
  beforeMount() {
    this.getAffiliates();
  },
};
</script>