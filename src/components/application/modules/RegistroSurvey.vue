<template>
  <div>
    <h1 class="form-title">Registro Encuestas</h1>
    <form class="global-form-container" v-on:submit.prevent="createProvider">
      <div class="register-form">
        <div class="input-container">
          <label for="id" class="input-container__label">ID</label>
          <input
            type="text"
            class="input-container__input"
            name="id"
            id="id"
            required
            v-model="id"
          />
        </div>
        <div class="input-container">
          <label for="document" class="input-container__label">Documento</label>
          <input
            type="number"
            class="input-container__input"
            name="document"
            id="document"
            required
            v-model="document"
          />
        </div>
        <div class="input-container">
          <label for="question_one" class="input-contailer__label"
            >¿Ha sufrido de covid-19?</label
          >
          <select
            class="input-container__input"
            name="question_one"
            id="question_one"
            required
            v-model="question_one"
          >
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="input-container">
          <label for="question_two" class="input-contailer__label"
            >¿Ha estado en contacto con personas que han sufrido de
            covid-19?</label
          >
          <select
            class="input-container__input"
            name="question_two"
            id="question_two"
            required
            v-model="question_two"
          >
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="input-container">
          <label for="question_three" class="input-contailer__label"
            >¿Ha tenido temperatura mayor a 37° grados?</label
          >
          <select
            class="input-container__input"
            name="question_three"
            id="question_three"
            required
            v-model="question_three"
          >
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="input-container">
          <label for="question_four" class="input-contailer__label"
            >¿Ha tenido dificultad para respirar durante la última
            semana?</label
          >
          <select
            class="input-container__input"
            name="question_four"
            id="question_four"
            required
            v-model="question_four"
          >
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="input-container">
          <label for="question_five" class="input-contailer__label"
            >¿Se ha sentido más cansado que de costumbre durante la última
            semana?</label
          >
          <select
            class="input-container__input"
            name="question_five"
            id="question_five"
            required
            v-model="question_five"
          >
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <button class="primary-btn primary-btn--margin" type="submit">
        Registrar encuesta
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "registroEncuestas",
  data: function () {
    return {
      survey: {
        id: "",
        document: "",
        question_one: "",
        question_two: "",
        question_three: "",
        question_four: "",
        question_five: "",
      },
    };
  },
  methods: {
    createSurvey: function () {
      let userToken = localStorage.getItem("token_access");
      let userId = jwt_decode(userToken).user_id.toString();

      axios
        .post(
          `https://eps-surveys-ms.herokuapp.com/user/${userId}/surveys`,
          this.survey,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((result) => {
          alert("Encuesta creado con éxito");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          alert("Falló creación de encuesta");
        });
    },

    clearData: function () {
      this.survey.id = "";
      this.survey.document = "";
      this.survey.question_one = "";
      this.survey.question_two = "";
      this.survey.question_three = "";
      this.survey.question_four = "";
      this.survey.question_five = "";
    },
  },
};
</script>