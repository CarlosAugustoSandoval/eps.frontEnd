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
      <ValidationObserver ref="formSincronizador" tag="form" autocomplete="off">
        <v-container fluid class="py-0">
          <component :is="item.dataComponent" v-model="model"></component>
        </v-container>
      </ValidationObserver>
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
      <loading :value="loading" absolute/>
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
    model: null,
    dialog: false,
    item: null,
    items: [
      {
        id: 1,
        title: 'Prescripción por número',
        subtitle: 'Requiere ingresar número de prescripción',
        model: {NoPrescripcion: null, sync: true},
        dispatch: 'getPrescripcionMipres',
        dataComponent: () => import('@/modules/mipres/components/sincronizador/forms/PrescripcionNumero')
      },
      {
        id: 2,
        title: 'Suministro por número de prescripción',
        subtitle: 'Requiere ingresar número de prescripción',
        model: {NoPrescripcion: null},
        dispatch: 'getSuministroMipres',
        dataComponent: () => import('@/modules/mipres/components/sincronizador/forms/PrescripcionNumero')
      },
      {
        id: 3,
        title: 'Tutela por número',
        subtitle: 'Requiere ingresar número de tutela',
        model: {NoTutela: null, sync: true},
        dispatch: 'getTutelasMipres',
        dataComponent: () => import('@/modules/mipres/components/sincronizador/forms/TutelaNumero')
      }
    ]
  }),
  methods: {
    sincronizar() {
      this.$refs.formSincronizador.validate().then(result => {
        if (result) {
          this.loading = true
          this.$store.dispatch(this.item.dispatch, this.model)
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
      })
    },
    showDialog(item) {
      this.item = item
      this.model = this.clone(this.item.model)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$refs.formSincronizador.reset()
      this.item = null
      this.model = null
    }
  }
}
</script>

<style scoped>

</style>