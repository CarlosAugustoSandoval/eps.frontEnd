<template>
  <v-container fluid class="down-top-padding">
    <ViewTitle :adicional-title="` No. ${NoPrescripcion}`"/>
    <v-row>
      <v-col cols="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Prescripcion',
  props: {
    NoPrescripcion: {
      type: [String, Number],
      default: null
    }
  }
}
</script>

<style scoped>

</style>