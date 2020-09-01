<template>
  <v-container fluid class="down-top-padding">
    <view-title/>
    <v-row>
      <v-col cols="12" sm="4" md="3" xl="2" class="mb-4">
        <v-card>
          <v-list class="py-0">
            <v-list-item-group v-model="currentMenu" mandatory>
              <v-list-item
                  v-for="(item, indexMenu) in items"
                  :key="`menu${indexMenu}`"
              >
                <v-list-item-avatar :color="item.color">
                  <v-icon dark v-text="item.icon"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="9" xl="10">
        <v-window
            v-model="currentMenu"
            vertical
        >
          <v-window-item
              v-for="(componente, indexComponente) in items"
              :key="`componente${indexComponente}`"
          >
            <v-card>
              <v-container fluid>
                <component :accesorios="{ icon: componente.icon, color: componente.color, title: componente.componente }" :is="componente.dataComponent"></component>
              </v-container>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Administrativo',
  data: () => ({
    currentMenu: 0,
    items: [
      { icon: 'mdi-account', color: 'blue', title: 'Usuarios', componente: 'Usuarios', dataComponent: () => import('@/modules/administrativo/components/usuarios/Usuarios') },
      { icon: 'mdi-account-switch', color: 'cyan', title: 'Roles', componente: 'Roles', dataComponent: () => import('@/modules/administrativo/components/roles/Roles') },
    ]
  })
}
</script>

<style scoped>

</style>