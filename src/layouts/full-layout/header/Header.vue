<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex mr-2">
<!--      <span class="logo-icon">-->
<!--        <img src="../../../assets/images/logo-light-icon.png" />-->
<!--      </span>-->
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/logo-light-text.png" class="mt-2" width="180" />
      </span>
    </v-toolbar-title>
    <!---Logo part -->

    <!---/App Menu -->
    <app-menu/>
    <!---/App menu -->

    <v-spacer />

    <!---right part -->
    <!---Notification -->
    <notifications/>
    <!---Notification -->
    <!---Messages -->
    <messages/>
    <!---Messages -->
    <!---User -->
    <user/>
    <!---User -->
  </v-app-bar>
</template>

<script>
import AppMenu from '@/layouts/full-layout/header/components/AppMenu'
import Notifications from '@/layouts/full-layout/header/components/Notifications'
import Messages from '@/layouts/full-layout/header/components/Messages'
import User from '@/layouts/full-layout/header/components/User'
export default {
  name: 'Header',
  components: {
    AppMenu,
    Notifications,
    Messages,
    User
  },
  data: () => ({
    showLogo: true
  }),
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .v-application #main-sidebar.theme--dark.white{
    background:#363636!important;
  }
  .hidelogo{
    display: none;
  }
  .descpart{
    max-width:220px;
  }
</style>