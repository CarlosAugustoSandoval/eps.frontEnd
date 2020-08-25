<template>
  <v-list-item class="pa-0">
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="item.title" />
      <v-list-item-subtitle v-text="item.subtitle" />
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
          subtitle: null
        })
      }
    }
  }
</script>
