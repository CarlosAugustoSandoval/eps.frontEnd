<template>
  <v-container fluid>
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <v-tooltip top v-if="permisos.crear" :disabled="$vuetify.breakpoint.smAndUp">
          <template v-slot:activator="{on}">
            <v-btn
                v-on="on"
                color="primary"
                @click.stop="crearReporte"
                class="white--text"
            >
              <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-plus</v-icon>
              {{ $vuetify.breakpoint.smAndUp ? 'Crear Reporte' : '' }}
            </v-btn>
          </template>
          <span>Crear Reporte</span>
        </v-tooltip>
      </template>
    </view-title>
    <v-row>
      <loading :value="loading"/>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" offset-md="3">
                <v-text-field
                    v-model="search"
                    placeholder="Buscar"
                    filled
                    solo
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    @input="buscarReportes"
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text v-if="!reportesFiltrados.length" class="text-center body-1 grey--text">
            No hay reportes para mostrar
          </v-card-text>
          <v-list v-else two-line class="py-0">
            <template v-for="(reporte, indexReporte) in reportesFiltrados">
              <v-hover v-slot:default="{ hover }" :key="`reporte${indexReporte}`">
                <v-list-item @click="seleccionarReporte(reporte)">
                  <v-list-item-avatar class="my-1 align-self-center">{{ reporte.id }}</v-list-item-avatar>
                  <v-list-item-content class="pa-0">
                    <v-list-item-title><h5 class="mb-0 text-truncate">{{ reporte.nombre }}</h5></v-list-item-title>
                    <p class="grey--text fs-12 fw-normal ma-0">{{ reporte.descripcion }}</p>
                    <v-list-item-subtitle class="green--text" v-if="reporte.variables && !reporte.variables.length">
                      <v-icon color="green">mdi-arrow-down-bold-circle-outline</v-icon>
                      Descarga directa
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="hover && permisos.editar">
                    <v-btn icon color="warning" @click.stop="editarReporte(reporte)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <generador-reporte
        ref="generadorReporte"
        @loading="val => loading = val"
    />
    <registro-reporte ref="registroReporte" @guardado="getReportes"/>
  </v-container>
</template>

<script>
const RegistroReporte = () => import('@/modules/reportes/components/RegistroReporte')
const GeneradorReporte = () => import('@/modules/reportes/components/GeneradorReporte')

export default {
  name: 'Reportes',
  components: {
    RegistroReporte,
    GeneradorReporte
  },
  data: () => ({
    search: '',
    loading: false,
    reportesFull: [],
    reportesFiltrados: []
  }),
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('reportes')
    }
  },
  created() {
    this.getReportes()
  },
  methods: {
    buscarReportes: window.lodash.debounce(function () {
      this.reportesFiltrados = this.search
          ? this.reportesFull.filter(x => (x.id === parseInt(this.search) || x.nombre.toLowerCase().search(this.search.toLowerCase()) > -1) || (x.descripcion.toLowerCase().search(this.search.toLowerCase()) > -1))
          : this.clone(this.reportesFull)
    }, 200),
    crearReporte() {
      this.$refs.registroReporte.open()
    },
    editarReporte(reporte) {
      this.$refs.registroReporte.open(reporte.id)
    },
    seleccionarReporte(reporte) {
      let copyReporte = this.clone(reporte)
      copyReporte.variables.map(x => {
        x.value = null
      })
      this.$refs.generadorReporte.open(copyReporte)
    },
    getReportes() {
      this.loading = true
      this.axios.get(`reportes`)
          .then(response => {
            this.reportesFull = response.data
            this.reportesFiltrados = this.clone(this.reportesFull)
            this.loading = false
          })
          .catch(error => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'error',
              message: `al recuperar los registros de los reportes.`,
              error: error
            })
            this.loading = false
          })
    }
  }
}
</script>

<style>
.CodeMirror-gutter-wrapper {
  left: -34px !important;
}

.CodeMirror-gutters {
  left: 0px !important;
}
</style>