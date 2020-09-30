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
      <v-col cols="12" sm="12" md="5">
        <v-card>
          <v-card-text>
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
          </v-card-text>
          <v-card-text v-if="!reportesFiltrados.length" class="text-center body-1 grey--text">
            No hay reportes para mostrar
          </v-card-text>
          <v-list v-else two-line>
            <v-list-item-group color="primary">
              <template v-for="reporte in reportesFiltrados">
                <v-hover v-slot:default="{ hover }" :key="`reporte${reporte.id}`">
                  <v-list-item :class="reporte.id === indexSeleccionado ? 'v-item--active v-list-item--active' : ''" @click="seleccionarReporte(reporte)">
                    <v-list-item-avatar class="my-1 align-self-center">{{ reporte.id }}</v-list-item-avatar>
                    <v-list-item-content class="pa-0">
                      <v-list-item-title><h5 class="mb-0 text-truncate">{{ reporte.nombre }}</h5></v-list-item-title>
                      <v-list-item-subtitle class="grey--text fs-12 fw-normal text-truncate">{{ reporte.descripcion }}
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
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="7">
        <generador-reporte v-if="seleccionado && seleccionado.id" :reporte="seleccionado"></generador-reporte>
        <v-card v-else>
          <v-card-text class="text-center headline">
            No hay un reporte seleccionado
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <registro-reporte ref="registroReporte" @guardado="getReportes"></registro-reporte>
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
    reportesFiltrados: [],
    seleccionado: null,
    indexSeleccionado: null
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
      this.reportesFiltrados = this.search ? this.reportesFull.filter(x => (x.id === parseInt(this.search) || x.nombre.toLowerCase().search(this.search.toLowerCase()) > -1) || (x.descripcion.toLowerCase().search(this.search.toLowerCase()) > -1)) : this.reportesFull
    }, 200),
    crearReporte() {
      this.$refs.registroReporte.open()
    },
    editarReporte(reporte) {
      this.$refs.registroReporte.open(reporte.id)
    },
    seleccionarReporte(reporte) {
      this.$nextTick(() => {
        this.indexSeleccionado = reporte.id
      })
      let copyReporte = this.clone(reporte)
      copyReporte.variables.map(x => {
        x.value = null
      })
      this.seleccionado = copyReporte
    },
    getReportes() {
      this.loading = true
      this.axios.get(`reportes`)
          .then(response => {
            this.reportesFull = response.data
            this.reportesFiltrados = this.clone(this.reportesFull)
            this.seleccionado = null
            this.indexSeleccionado = null
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