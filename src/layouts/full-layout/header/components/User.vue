<template>
  <v-btn dark icon class="mr-1" @click.stop="setCustomizerDrawer(!Customizer_drawer)">
    <v-avatar size="40">
      <img src="@/assets/images/users/userDefault.png" alt="John" />
    </v-avatar>
  </v-btn>
</template>
<script>
// Utilities
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'UserMenu',
  data: () => ({
  }),
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