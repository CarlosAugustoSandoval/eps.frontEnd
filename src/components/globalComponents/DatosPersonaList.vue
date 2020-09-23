<template>
  <v-list :three-line="threeLine" :two-line="twoLine" class="py-0">
    <v-list-item class="pl-0">
      <v-list-item-avatar color="primary" class="white--text font-weight-bold">
        <v-icon dark>{{sexo === 1 ? 'mdi-face-woman' : sexo === 2 ? 'mdi-face' : 'fas fa-user'}}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="truncate-content pa-0">
        <v-list-item-subtitle class="caption" v-if="definicion">{{ definicion }}</v-list-item-subtitle>
        <v-list-item-title class="body-1" v-if="title">{{ title }}</v-list-item-title>
        <v-list-item-subtitle v-if="subtitle">{{ subtitle }}</v-list-item-subtitle>
        <v-list-item-subtitle v-if="subtitle2" v-html="subtitle2"></v-list-item-subtitle>
        <slot tag="v-list-item-action-text" name="actiontext"></slot>
        <slot tag="v-list-item-action" name="action"></slot>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: 'ViewTitle',
  props: {
    definicion: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    subtitle2: {
      type: String,
      default: null
    },
    threeLine: {
      type: Boolean,
      default: false
    },
    twoLine: {
      type: Boolean,
      default: false
    },
    sexo: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss">

</style>