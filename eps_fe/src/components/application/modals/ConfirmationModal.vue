<template>
  <transition name="modal-fade">
    <header id="modalTitle">
      <slot name="header">Eliminar elemento</slot>
      <button type="button" @click="close" aria-label="Close modal"></button>
    </header>
    <section id="modalDescription">
      <slot name="body"
        >¿Estás seguro de que deseas continuar? <br />Esta acción no se puede
        deshacer</slot
      >
      <button type="submit" @click="deleteItem(idItem)">Sí, eliminar</button>
      <button @click="close" type="button">Cancelar</button>
    </section>
  </transition>
</template>

<script>
export default {
  name: "ConfirmationModal",
  data: function () {
    return {
      idDeleteItem: "",
    };
  },
  props: ["idItem"],
  methods: {
    close() {
      this.$emit("close");
    },
    deleteItem() {
      this.idDeleteItem = this.idItem;
      this.$emit("delete-item", this.idDeleteItem);
      this.close();
    },
  },
};
</script>