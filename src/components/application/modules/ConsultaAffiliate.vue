<template>
  <div>
    <h1 class="form-title">Consulta afiliado por documento</h1>
    <form class="global-form-container">
      <div class="register-form">
        <div class="input-container">
          <label for="search" class="input-container__label">Documento</label>
          <input
            type="number"
            class="input-container__input"
            name="search"
            id="search"
            required
            maxlength="40"
          />
        </div>
      </div>

      <button type="submit" class="primary-btn primary-btn--margin">
        Buscar
      </button>
    </form>
  </div>
  <br />

  <div>
    <h1>Afiliados</h1>
    <div class="scroll-table">
      <table class="table">
        <thead>
          <tr class="table__header">
            <th class="table__header-item">Id</th>
            <th class="table__header-item">Nombres</th>
            <th class="table__header-item">Apellidos</th>
            <th class="table__header-item">Tipo Documento</th>
            <th class="table__header-item">N° Documento</th>
            <th class="table__header-item">Email</th>
            <th class="table__header-item">Celular</th>
            <th class="table__header-item">Ciudad</th>
            <th class="table__header-item">Dirección</th>
            <th class="table__header-item">Acciones</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(affiliate, index) in allAffiliates" :key="index">
            <td class="table__body-item">{{ affiliate.id }}</td>
            <td class="table__body-item">{{ affiliate.name }}</td>
            <td class="table__body-item">{{ affiliate.lastname }}</td>
            <td class="table__body-item">{{ affiliate.document }}</td>
            <td class="table__body-item">{{ affiliate.document_number }}</td>
            <td class="table__body-item">{{ affiliate.email }}</td>
            <td class="table__body-item">{{ affiliate.phone }}</td>
            <td class="table__body-item">{{ affiliate.city }}</td>
            <td class="table__body-item">{{ affiliate.address }}</td>
            <td class="table__body-item">
              <button class="edit-btn" @click="openEditModal(index)"></button>
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
    </div>
    <ModalEditAffiliate
      v-show="isModalVisible"
      @close="closeModal"
      v-bind="editAffiliate"
    >
    </ModalEditAffiliate>
    <ConfirmationModal
      v-show="isConfirmationModalVisible"
      @close="closeConfirmationModal"
      @delete-element="deleteAffiliate"
      :idElement="deleteAffiliateId"
    ></ConfirmationModal>
  </div>
</template>
<script>
import gql from "graphql-tag";
import ModalEditAffiliate from "../modals/ModalEditAffiliate.vue";
import ConfirmationModal from "../modals/ConfirmationModal.vue";

export default {
  name: "consultaAfiliados",
  components: {
    ModalEditAffiliate,
    ConfirmationModal,
  },
  data: function () {
    return {
      affiliate: {
        id: "",
        name: "",
        lastname: "",
        document: "",
        document_number: "",
        email: "",
        phone: "",
        city: "",
        address: "",
      },
      affiliates: [],
      editAffiliate: {},
      isModalVisible: false,
      filterAffiliatesInput: "",
      isConfirmationModalVisible: false,
      deleteAffiliateId: {},
    };
  },
  apollo: {
    allAffiliates: {
      query: gql`
        query AllAffiliates {
          allAffiliates {
            id
            name
            lastname
            document
            document_number
            email
            phone
            city
            address
          }
        }
      `,
    },
    affiliatesByDocument_number: {
      query: gql`
        query AffiliatesByDocument_number($documentNumber: String!) {
          affiliatesByDocument_number(document_number: $documentNumber) {
            id
            name
            lastname
            document
            document_number
            email
            phone
            city
            address
            created
            updated
          }
        }
      `,
    },
  },
  methods: {
    openEditModal(affiliateId) {
      this.isModalVisible = true;
      this.editAffiliate = this.allAffiliates[affiliateId];
    },
    closeModal() {
      this.isModalVisible = false;
      this.allAffiliates();
    },
    closeConfirmationModal() {
      this.isConfirmationModalVisible = false;
    },
    openConfirmationModal(affiliateId) {
      this.isConfirmationModalVisible = true;
      this.deleteAffiliateId = affiliateId;
    },

    deleteAffiliate(deleteAffiliateId) {
      // let userToken = localStorage.getItem("token_access");
      // let userId = jwt_decode(userToken).user_id.toString();
      let affiliateId = this.allAffiliates[deleteAffiliateId].id;
      this.$apollo.mutate({
        mutation: gql`
          mutation Mutation($affiliateId: ID!) {
            deleteAffiliate(affiliateID: $affiliateId)
          }
        `,
        variables: {
          affiliateId: affiliateId,
        },
      });
    },
  },

  filterAffiliatesInput(affiliatesByDocument_number) {
    let affiliateDocument =
      this.allAffiliates[affiliatesByDocument_number].document;
    this.$apollo.mutate({
      mutation: gql`
        query SurveysByDocument($document: Int!) {
          surveysByDocument(document: $document) {
            id
            document
            question_one
            question_two
            question_three
            question_four
            question_five
          }
        }
      `,
      variables() {
        return {
          documentNumber: affiliateDocument,
        };
      },
    });
  },
  created: function () {
    this.$apollo.queries.affiliatesByDocument_number.refetch();
  },
};
</script>