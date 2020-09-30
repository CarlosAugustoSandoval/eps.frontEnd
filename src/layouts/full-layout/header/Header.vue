<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex">
      <span>
        <img src="../../../assets/images/logo-light-text.png" class="mt-2" :width="$vuetify.breakpoint.smAndUp ? 200 : 140" />
      </span>
    </v-toolbar-title>
    <!---Logo part -->

    <!---/App Menu -->
    <app-menu/>
    <!---/App menu -->

    <v-spacer />

    <!---right part -->
    <!---Notification -->
<!--    <notifications/>-->
    <!---Notification -->
    <!---Messages -->
<!--    <messages/>-->
    <!---Messages -->
    <!---User -->
    <user/>
    <!---User -->
  </v-app-bar>
</template>

<script>
import AppMenu from '@/layouts/full-layout/header/components/AppMenu'
// import Notifications from '@/layouts/full-layout/header/components/Notifications'
// import Messages from '@/layouts/full-layout/header/components/Messages'
import User from '@/layouts/full-layout/header/components/User'
export default {
  name: 'Header',
  components: {
    AppMenu,
    // Notifications,
    // Messages,
    User
  },
  data: () => ({
    showLogo: true
  }),
  computed: {
  },
  created() {
    this.$store.dispatch('getComplementosMipres')
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .v-application #main-sidebar.theme--dark.white{
    background:#363636!important;
  }
</style>