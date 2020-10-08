<template>
  <v-app id="inspire">
    <Header/>
    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view/>
      </v-container>
    </v-main>
    <Customizer/>
    <Footer/>
  </v-app>
</template>

<script>
import store from '../../store/store'
import Header from './header/Header'
import Footer from './footer/Footer'
import Customizer from './customizer/Customizer'
export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
    Customizer
  },
  async beforeCreate() {
    await store.dispatch('getUser')
  }
}
</script>

<style>

</style>