<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="pb-0">
      <c-texto
          v-model="value.NoPrescripcion"
          label="Número de prescripción"
          rules="required"
          name="número de prescripción"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
name: 'PrescripcionNumero',
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