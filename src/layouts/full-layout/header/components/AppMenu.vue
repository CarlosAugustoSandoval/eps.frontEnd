<template>
  <v-menu bottom left offset-y origin="top left" transition="scale-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" dark icon class="mr-2">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </template>
    <v-list class="pa-0">
      <h4 class="px-5 py-3 pt-2 font-weight-medium title">Menu principal</h4>
      <v-divider></v-divider>
      <v-list-item v-for="(item, i) in itemsMenu" :key="i" :to="{name: item.routeName}">
        <v-list-item-avatar :color="item.iconbg">
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>

import { mapGetters } from 'vuex'
export default {
  name: 'AppMenu',
  data: () => ({
  }),
  computed: {
    ...mapGetters([
        'itemsMenu'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>