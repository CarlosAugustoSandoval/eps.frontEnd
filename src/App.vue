<template>
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
    <router-view/>
    <snackbar/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>


<!--Personal Styles-->
<style>
.v-autocomplete.v-select.v-input--is-focused input{
  min-width: 0px !important;
}
.v-list-item--link{
  user-select: auto !important;
}
</style>