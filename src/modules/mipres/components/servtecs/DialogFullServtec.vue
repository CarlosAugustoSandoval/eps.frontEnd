<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
            v-on="on"
            dark
            fab
            small
            color="blue"
            @click="dialog = true"
        >
          <v-icon>mdi-file-find</v-icon>
        </v-btn>
      </template>
      <span>Detalle completo</span>
    </v-tooltip>
    <v-dialog
        v-model="dialog"
        width="1200"
    >
      <card-servtec
          :key-tecnologia="keyTecnologia"
          :documento="documento"
          :tipo="tipo"
          :item="item"
          :boton-direccionamientos="false"
          :boton-detalle="false"
          :full-detalle="true"
      />
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogFullServtec',
  props: {
    item: {
      type: Object,
      default: null
    },
    documento: {
      type: Object,
      default: null
    },
    tipo: {
      type: String,
      default: 'prescripción'
    },
    keyTecnologia: {
      type: String,
      default: 'medicamentos'
    }
  },
  components: {
    CardServtec: () => import('@/modules/mipres/components/servtecs/CardServtec')
  },
  data: () => ({
    dialog: false
  })
}
</script>

<style scoped>

</style>