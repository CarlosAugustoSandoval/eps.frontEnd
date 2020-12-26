<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="pb-0">
      <c-date
          v-model="value.FechaPrescripcion"
          label="Fecha de prescripción"
          rules="required"
          name="fecha de prescripción"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
name: 'PrescripcionFecha',
  props: {
    value: {
      type: [Object, Number, String],
      default: null
    }
  }
}
</script>

<style scoped>

</style>