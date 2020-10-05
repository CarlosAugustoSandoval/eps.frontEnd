<template>
  <v-row justify="end" fill-height>
    <v-col class="pb-0" cols="12" sm="6" md="4">
      <c-check
          label="Ambito de Atención"
          v-model="filters.models.CodAmbAte"
          :items="filters.data.codigosAmbitoAtencion"
          item-text="text"
      />
    </v-col>
    <v-col class="pb-0" cols="12" sm="6" md="4">
      <c-radio
          v-model="filters.models.direccionado"
          label="Estado Direccionamiento"
          :items="filters.data.procesosDireccionamiento"
          item-text="text"
      />
    </v-col>
    <v-col class="pb-0" cols="12" sm="6" md="4">
      <c-date-range
          v-model="filters.models.fecha_between"
          label="Fecha Prescripción"
          :max="moment().format('YYYY-MM-DD')"
      />
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Filtros',
  props: {
    rutaBase: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    complementos: [],
    filters: {
      models: {
        direccionado: null,
        CodAmbAte: [],
        fecha_between: []
      },
      data: {
        codigosAmbitoAtencion: [
          {value: 11, text: 'Ambulatorio – Priorizado'},
          {value: 12, text: 'Ambulatorio – NoPriorizado'},
          {value: 21, text: 'Hospitalario – Domiciliario'},
          {value: 22, text: 'Hospitalario – Internación'},
          {value: 30, text: 'Urgencias'}
        ],
        procesosDireccionamiento: [
          {value: 1, text: 'Direccionados'},
          {value: 0, text: 'Por Direccionar'},
          {value: null, text: 'Todos'}
        ]
      }
    }
  }),
  computed: {
    ...mapGetters([
      'clasificacionesCovid'
    ])
  },
  created() {
    // this.getDatosFiltros()
  },
  methods: {
    aplicaFiltros() {
      let rutaTemp = this.rutaBase
      if (this.filters.models.direccionado && this.filters.models.direccionado.value !== null) {
        rutaTemp = rutaTemp + (rutaTemp.indexOf('?') > -1 ? '&' : '?') + 'filter[direccionado]=' + this.filters.models.direccionado.value
      }
      if (this.filters.models.fecha_between.length) {
        rutaTemp = rutaTemp + (rutaTemp.indexOf('?') > -1 ? '&' : '?') + 'filter[fecha_between]=' + this.filters.models.fecha_between.join(',')
      }
      if (this.filters.models.CodAmbAte.length) {
        rutaTemp = rutaTemp + (rutaTemp.indexOf('?') > -1 ? '&' : '?') + 'filter[CodAmbAte]=' + this.filters.models.CodAmbAte.map(x => x.value).join(',')
      }
      this.$emit('filtra', rutaTemp)

    },
    getDatosFiltros() {
      this.axios.get(`filtros-suministros`)
          .then(response => {
            this.complementos = response.data
          })
          .catch(() => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'error',
              message: `Error al recuperar los complementos para los filtros de suministros.`
            })
          })
    }
  }
}
</script>

<style scoped>

</style>