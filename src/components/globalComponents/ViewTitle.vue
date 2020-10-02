<template>
  <v-row class="title-breadcrumb">
    <v-col cols="12" class="pa-0">
      <v-card class="px-2 custom-shaodow">
        <v-toolbar dense flat class="transparent pa-0" height="60px" v-if="title">
          <v-avatar :color="title.color || ''" class="mr-2">
            <template v-if="title.svg">
              <icon-base :name="title.icon">
                <FileShield
                    v-if="title.icon === 'FileShield'"
                    scale="0.6"
                    translatex="130"
                    translatey="100"
                    fill="white"
                ></FileShield>
              </icon-base>
            </template>
            <v-icon v-else :large="title.large" :dark="!!title.color">{{title.icon}}</v-icon>
          </v-avatar>
          <v-toolbar-title class="py-2">
            <span class="text--primary">{{title.text}}{{adicionalTitle}}</span>
            <v-breadcrumbs v-if="title.breadcrumbs" :items="title.breadcrumbs" class="pa-0">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item tag="a" :disabled="item.disabled" @click="$router.push({ name: item.routerName})">
                  {{ item.text }}
                </v-breadcrumbs-item>
              </template>
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-toolbar-title>
          <slot name="action">
            
          </slot>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import FileShield from '@/components/icons/FileShield'
export default {
  name: 'ViewTitle',
  components: {FileShield},
  props: {
    adicionalTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    title () {
      if (this && this.$route && this.$route.meta && this.$route.meta.title) return this.$route.meta.title
      return null
    }
  }
}
</script>

<style lang="scss">
  .title-breadcrumb{
    margin:-20px -25px 27px -25px;
  }
</style>