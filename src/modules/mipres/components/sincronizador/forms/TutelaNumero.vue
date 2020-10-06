<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="pb-0">
      <c-texto
          v-model="value.NoTutela"
          label="Número de tutela"
          rules="required"
          name="número de tutela"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
name: 'TutelaNumero',
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