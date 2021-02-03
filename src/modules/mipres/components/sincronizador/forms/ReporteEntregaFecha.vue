<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="pb-0">
      <c-date
          v-model="value.FechaReporteEntrega"
          label="Fecha de reportes de entrega"
          rules="required"
          name="Fecha de reportes de entrega"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
name: 'ReporteEntregaFecha',
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