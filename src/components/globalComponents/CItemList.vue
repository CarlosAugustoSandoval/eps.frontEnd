<template>
  <v-list-item :style="`max-width: ${ item.maxWidth ? item.maxWidth : '300px' } !important;`" class="pa-0 ma-0">
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>
    <v-list-item-content class="px-0 py-1">
      <slot name="title"></slot>
      <v-list-item-title v-if="item.title" class="text-truncate" v-html="item.title"></v-list-item-title>
      <slot name="subtitle"></slot>
      <v-list-item-subtitle v-if="item.subtitle" class="text-truncate" v-html="item.subtitle" />
      <v-list-item-subtitle v-if="item.subtitle2" class="text-truncate" v-html="item.subtitle2" />
      <v-list-item-subtitle v-if="item.subtitle3" class="text-truncate" v-html="item.subtitle3" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'CItemList',
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
