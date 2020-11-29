<template>
  <v-btn dark icon class="mr-1" @click.stop="setCustomizerDrawer(!Customizer_drawer)">
    <v-icon large>mdi-account-circle</v-icon>
<!--    <v-avatar>-->
<!--      <v-icon>mdi-account-circle</v-icon>-->
<!--      &lt;!&ndash;      <img src="@/assets/images/users/userDefault.png" alt="John" />&ndash;&gt;-->
<!--    </v-avatar>-->
  </v-btn>
</template>
<script>
// Utilities
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'UserMenu',
  data: () => ({}),
  computed: {
    ...mapState(['Customizer_drawer'])
  },
  methods: {
    ...mapMutations({
      setCustomizerDrawer: 'SET_CUSTOMIZER_DRAWER'
    })
  }
}
</script>

<style lang="scss">

</style>