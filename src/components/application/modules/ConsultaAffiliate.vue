<template>
  <div>
    <h1 class="form-title">Afiliados</h1>
    <form action="" class="search-form">
      <div class="flex">
        <div class="input-container input-container--search">
          <label for="search" class="input-container__label">Buscar</label>
          <input
            type="text"
            class="input-container__input"
            name="search"
            id="search"
            required
            v-model="filterAffiliatesInput"
          />
          <small>Buscar por documento</small>
        </div>
        <button
          v-on:click="filterAffiliates"
          class="primary-btn primary-btn--search"
        >
          Filtrar
        </button>
      </div>
    </form>
  </div>
  <br />

  <div>
    <div class="scroll-table">
      <table class="table">
        <thead>
          <tr class="table__header">
            <th class="table__header-item">Id</th>
            <th class="table__header-item">Nombres</th>
            <th class="table__header-item">Apellidos</th>
            <th class="table__header-item">Tipo Doc</th>
            <th class="table__header-item">N° Doc</th>
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
              <button
                type="button"
                class="edit-btn"
                @click="openEditModal(index)"
              >
                <ges-icon icon="edit" size="lg"></ges-icon>
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
      @delete-item="deleteAffiliate"
      :idItem="deleteAffiliateId"
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

    deleteAffiliate: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation DeleteAffiliate($affiliateId: ID!) {
              deleteAffiliate(affiliateID: $affiliateId)
            }
          `,
          variables: {
            affiliateId: this.affiliateId,
          },
        })
        .then((res) => {
          alert("Se eliminó el afiliado");
          console.log(res);
        })
        .catch((err) => {
          alert("Hubo un error");
          console.log(err);
        });
    },

    filterAffiliatesInput: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
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
              }
            }
          `,
          variables: {
            documentNumber: this.document_number,
          },
        })
        .then((res) => {
          alert("Se filtró exitosamente");
          console.log(res);
        })
        .catch((err) => {
          alert("Hubo un error");
          console.log(err);
        });
    },
  },

  created: function () {
    this.$apollo.queries.affiliatesByDocument_number.refetch();
  },
};
</script>