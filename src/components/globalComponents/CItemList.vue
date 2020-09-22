<template>
  <v-list-item :style="`max-width: ${ item.maxWidth ? item.maxWidth : '300px' } !important;`" class="pa-0 ma-0">
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>
    <v-list-item-content class="px-0 py-1">
      <v-list-item-title v-if="item.title" class="text-truncate" v-text="item.title" />
      <v-list-item-subtitle v-if="item.subtitle" class="text-truncate" v-text="item.subtitle" />
      <v-list-item-subtitle v-if="item.subtitle2" class="text-truncate" v-text="item.subtitle2" />
      <v-list-item-subtitle v-if="item.subtitle3" class="text-truncate" v-text="item.subtitle3" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'CItemList',
    mixins: [Themeable],
    props: {
      item: {
        type: Object,
        default: () => ({
          icon: null,
          title: null,
          subtitle: null,
          subtitle2: null,
          maxWidth: '300px'
        })
      }
    }
  }
</script>
