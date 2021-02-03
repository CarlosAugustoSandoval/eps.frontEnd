<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="pb-0">
      <c-date
          v-model="value.fecha"
          :label="label"
          rules="required"
          :name="label"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
name: 'RegistrosFecha',
  props: {
    value: {
      type: [Object, Number, String],
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>