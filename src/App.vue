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
