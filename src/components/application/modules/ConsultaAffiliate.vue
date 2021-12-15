<template>
  <div>
    <h1>Consulta de Afiliados</h1>
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
              <button class="edit-btn" @click="openEditModal(index)">
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
  data: function (){
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

  // methods: {

  //   getAffiliates: function () {
  //     let userToken = localStorage.getItem("token_access");
  //     let userId = jwt_decode(userToken).user_id.toString();
  //     axios
  //       .get(
  //         `https://affiliates-ms-be.herokuapp.com/user/${userId}/affiliates`,
  //         {
  //           headers: { Authorization: `Bearer ${userToken}` },
  //         }
  //       )
        // .then((result) => {
        //   this.affiliates = result.data;
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
  //   },
  //   openEditModal(affiliateId) {
  //     this.isModalVisible = true;
  //     this.editAffiliate = this.affiliates[affiliateId];
  //   },
  //   closeModal() {
  //     this.isModalVisible = false;
  //     this.getAffiliates();
  //   },
  //   closeConfirmationModal() {
  //     this.isConfirmationModalVisible = false;
  //   },
  //   openConfirmationModal(affiliateId) {
  //     this.isConfirmationModalVisible = true;
  //     this.deleteAffiliateId = affiliateId;
  //   },
  //   deleteAffiliate(affiliateIdDelete) {
  //     let userToken = localStorage.getItem("token_access");
  //     let userId = jwt_decode(userToken).user_id.toString();
  //     let affiliateId = this.affiliates[affiliateIdDelete].id;
  //     axios
  //       .delete(
  //         `https://affiliates-ms-be.herokuapp.com/user/${userId}/affiliates/${affiliateId}`,
  //         {
  //           headers: { Authorization: `Bearer ${userToken}` },
  //         }
  //       )
  //       .then((result) => {
  //         alert("Afiliado eliminado con éxito");
  //         this.getAffiliates();
  //         this.closeModal();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert("Falló eliminación de afiliado");
  //       });
  //   },
  // },
  // beforeMount() {
  //   this.getAffiliates();
  // },
};
</script>