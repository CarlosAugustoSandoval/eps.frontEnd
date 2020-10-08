<template>
  <v-app>
     <router-view />
    <Customizer/>
  </v-app>
</template>

<script>
import Customizer from '../full-layout/customizer/Customizer'
  export default {
    name: 'Blanklayout',
    components: {
      Customizer
    },
  }
</script>
