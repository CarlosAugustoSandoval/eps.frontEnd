<template>
  <v-app id="inspire">
    <Header></Header>
    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view />
      </v-container>
    </v-main>
    <Customizer></Customizer>
    <Footer></Footer>
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
  props: {
    source: String
  },
  data: () => ({
  }),
  async beforeCreate() {
    await store.dispatch('getUser')
  },
  computed: {
    },
    methods: {
    }
}
</script>

<style>

</style>