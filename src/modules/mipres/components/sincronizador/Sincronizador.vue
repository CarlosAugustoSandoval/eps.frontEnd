<template>
  <v-dialog v-model="dialog" persistent max-width="720px">
    <template v-slot:activator="{ on }">
      <c-tooltip :disabled="!$vuetify.breakpoint.smAndDown" top tooltip="Sincronizar">
        <v-menu
            transition="slide-y-transition"
            bottom
            v-on="on"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-if="$vuetify.breakpoint.smAndDown"
                dark
                fab
                color="primary"
                small
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-database-sync</v-icon>
            </v-btn>
            <v-btn
                v-else
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-icon left size="26">mdi-database-sync</v-icon>
              Sincronizar
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="`menu${i}`"
                @click="showDialog(item)"
            >
              <v-list-item-content class="pa-0">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </c-tooltip>
    </template>
    <v-card v-if="item">
      <v-toolbar class="elevation-0">
        <v-toolbar-title>
          <v-list-item class="px-0">
            <v-list-item-avatar size="40" color="primary">
              <v-icon dark>mdi-sync</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="truncate-content">
              <v-list-item-title class="title">{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle class="caption">{{ item.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid class="py-0">
        <v-row justify="center" align="center">
          <v-col cols="12" class="pb-0">
            <c-texto
                v-model="prescripcion"
                label="Número de prescripción"
                rules="required"
                name="número de prescripción"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
            text
            color="primary"
            @click="close"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="sincronizar"
        >
          Ejecutar
        </v-btn>
      </v-card-actions>
      <loading :value="loading"/>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogDireccionamientos',
  props: {
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  data: () => ({
    loading: null,
    prescripcion: null,
    dialog: false,
    item: null,
    items: [
      { id: 1, title: 'Prescripción por número', subtitle: 'Requiere ingresar número de prescripción' },
      { id: 2, title: 'Suministro por número de prescripción', subtitle: 'Requiere ingresar número de prescripción' }
    ]
  }),
  methods: {
    sincronizar() {
      this.loading = true
      if(this.prescripcion) {
        this.$store.dispatch(this.item.id === 1 ? 'getPrescripcionMipres' : 'getSuministroMipres', { NoPrescripcion: this.prescripcion, sync: true })
            .then(response => {
              if(response) {
                this.$emit('sincronizado', response.message)
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `Sincronización Completa${response && response.message ? `, ${response.message}` : '.'}`
                })
                this.close()
              }
              this.loading = false
            })
      }
    },
    showDialog(item) {
      this.item = item
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.prescripcion = null
    }
  }
}
</script>

<style scoped>

</style>