<template>
  <div>
    <h1>Consulta de encuestas</h1>
    <table class="scroll-table">
      <table class="table">
        <thead>
          <tr class="table__header">
            <th class="table__header-item">Id</th>
            <th class="table__header-item">N° Documento</th>
            <th class="table__header-item">Pregunta N° 1</th>
            <th class="table__header-item">Pregunta N° 2</th>
            <th class="table__header-item">Pregunta N° 3</th>
            <th class="table__header-item">Pregunta N° 4</th>
            <th class="table__header-item">Pregunta N° 5</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(survey, index) in surveys" :key="index">
            <td class="table__body-item">{{ survey.id }}</td>
            <td class="table__body-item">{{ survey.document }}</td>
            <td class="table__body-item">{{ survey.question_one }}</td>
            <td class="table__body-item">{{ survey.question_two }}</td>
            <td class="table__body-item">{{ survey.question_three }}</td>
            <td class="table__body-item">{{ survey.question_four }}</td>
            <td class="table__body-item">{{ survey.question_five }}</td>
            <td class="table__body-item">
              <button class="edit-btn" @click="openEditSurveyModal(index)">
                <ges-icon icon="edit" size="lg"></ges-icon>
              </button>
              <button type="button" class="close-btn">
                <ges-icon size="lg" icon="trash-alt"></ges-icon>
              </button>
              <button
                type="button"
                class="close-btn"
                @click="openConfirmationModal(index)"
              >
                <ges-icon size="lg" icon="trash-alt"></ges-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </table>
    <ModalEditSurvey
      v-show="isModalVisible"
      @close="closeModal"
      v-bind="editSurvey"
    >
    </ModalEditSurvey>
    <ConfirmationModal
      v-show="isConfirmationModalVisible"
      @close="closeConfirmationModal"
      @delete-element="deleteSurvey"
      :idElement="deleteSurveyId"
    ></ConfirmationModal>
  </div>
</template>
<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import ModalEditSurvey from "../modals/ModalEditSurvey.vue";
import ConfirmationModal from "../modals/ConfirmationModal.vue";
export default {
  name: "consultaEncuestas",
  components: {
    ModalEditSurvey,
    ConfirmationModal,
  },
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
      surveys: [],
      editSurvey: {},
      isModalVisible: false,
      isConfirmationModalVisible: false,
      deleteSurveyId: {},
    };
  },
  methods: {
    getSurveys: function () {
      let userToken = localStorage.getItem("token_access");
      let userId = jwt_decode(userToken).user_id.toString();
      axios
        .get(`https://eps-surveys-ms.herokuapp.com/user/${userId}/surveys`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((result) => {
          this.surveys = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openEditSurveyModal(surveyId) {
      this.isModalVisible = true;
      this.editSurvey = this.surveys[surveyId];
    },
    closeModal() {
      this.isModalVisible = false;
      this.getSurveys();
    },

    closeConfirmationModal() {
      this.isConfirmationModalVisible = false;
    },

    openConfirmationModal(surveyId) {
      this.isConfirmationModalVisible = true;
      this.deleteSurveyId = surveyId;
    },

    deleteSurvey(surveyIdDelete) {
      let userToken = localStorage.getItem("token_access");
      let userId = jwt_decode(userToken).user_id.toString();
      let surveyId = this.surveys[surveyIdDelete].document;
      axios
        .delete(
          `https://eps-surveys-ms.herokuapp.com/user/${userId}/surveys/${surveyId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((result) => {
          alert("Encuesta eliminada con éxito");
          this.getSurveys();
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
          alert("Falló eliminación de encuesta");
        });
    },
  },
  beforeMount() {
    this.getSurveys();
  },
};
</script>