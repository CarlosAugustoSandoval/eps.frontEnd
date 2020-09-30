<template>
  <v-dialog v-model="dialog" persistent max-width="920px">
    <v-card>
      <v-toolbar class="elevation-0">
        <v-toolbar-title>
          <v-list-item class="px-0">
            <v-list-item-avatar size="40" color="light-green">
              <v-icon dark>fas fa-cubes</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="truncate-content">
              <v-list-item-title class="title">Registro de Suministro</v-list-item-title>
              <v-list-item-subtitle class="caption">
                Reporte de entrega ID: {{ reporteEntrega ? reporteEntrega.IDReporteEntrega : '' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click="cancelar"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="my-0"></v-divider>
      <ValidationObserver ref="formSuministro" tag="form" autocomplete="off">
        <v-container fluid v-if="reporteEntrega">
          <v-row>
            <v-col cols="12" sm="6" md="4" class="pb-0">
              <c-texto
                  v-model="suministro.NoLote"
                  label="Lote Entregado"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" class="pb-0">
              <c-number
                  v-model="suministro.CantTotEntregada"
                  label="Cantidad Total Entregada"
                  name="cantidad total entregada"
                  rules="required|min:0"
                  min="0"
                  step="0.1"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" class="pb-0">
              <c-number
                  v-model="suministro.ValorEntregado"
                  label="Valor Entrega"
                  name="valor entrega"
                  rules="required|min:0"
                  min="0"
                  step="0.1"
              />
            </v-col>
            <v-col cols="12" class="pb-0">
              <c-radio
                  v-model="suministro.UltEntrega"
                  label="Última Entrega"
                  rules="required"
                  name="última entrega"
                  :items="[{value: 1, text: 'Si'}, {value: 0, text: 'No'}]"
                  item-text="text"
                  item-value="value"
                  :column="$vuetify.breakpoint.xsOnly"
              />
            </v-col>
            <v-col cols="12" class="pb-0">
              <c-radio
                  v-model="suministro.EntregaCompleta"
                  label="Entrega Completa"
                  rules="required"
                  name="entrega completa"
                  :items="[{value: 1, text: 'Si'}, {value: 0, text: 'No'}]"
                  item-text="text"
                  item-value="value"
                  :column="$vuetify.breakpoint.xsOnly"
              />
            </v-col>
            <v-col cols="12" class="pb-0">
              <autocomplete-causas-no-entrega
                  v-model="suministro.CausaNoEntrega"
                  :tipo-tec="reporteEntrega.TipoTec"
                  hide-details
              />
            </v-col>
            <template v-if="suministro.CausaNoEntrega === 1">
              <v-col cols="12" sm="6" class="pb-0">
                <c-number
                    v-model="suministro.NoPrescripcionAsociada"
                    label="Número Prescripción Asociada"
                    name="número prescripción asociada"
                    rules="required|min:0"
                    min="0"
                    step="1"
                />
              </v-col>
              <v-col cols="12" sm="6" class="pb-0">
                <c-number
                    v-model="suministro.ConTecAsociada"
                    label="Consecutivo Orden Asociada"
                    name="consecutivo orden asociada"
                    rules="required|min:0"
                    min="0"
                    step="1"
                    hint="Consecutivo orden servicio o tecnología asociada"
                />
              </v-col>
            </template>
          </v-row>
        </v-container>
      </ValidationObserver>
      <loading :value="loading"/>
      <v-card-actions>
        <v-btn
            text
            color="primary"
            @click="cancelar"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="guardar"
        >
          <v-icon>mdi-content-save</v-icon>
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'RegistroSuministro',
  data: () => ({
    reporteEntrega: null,
    suministro: null,
    makeSuministro: {
      ID: null,
      UltEntrega: null,
      EntregaCompleta: null,
      CausaNoEntrega: null,
      NoPrescripcionAsociada: null,
      ConTecAsociada: null,
      NoPrescripcion: null,
      ConTec: null,
      TipoTec: null,
      CantTotEntregada: null,
      NoLote: null,
      ValorEntregado: null,
      TipoIDPaciente: null,
      NoIDPaciente: null
    },
    loading: false,
    dialog: false
  }),
  computed: {
    ...mapGetters([
      'causasnoentrega'
    ])
  },
  watch: {
    'suministro.CausaNoEntrega': {
      handler(val) {
        if (val !== 1) {
          this.suministro.NoPrescripcionAsociada = null
          this.suministro.ConTecAsociada = null
        }
      },
      immediate: false
    }
  },
  created() {
    this.suministro = this.clone(this.makeSuministro)
  },
  methods: {
    guardar() {
      this.$refs.formSuministro.validate().then(result => {
        if (result) {
          this.loading = true
          this.axios.post(`mipres/suministros`, this.suministro)
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El suministro se ha guardado correctamente.`
                })
                this.$emit('actualizado', response.data)
                this.cancelar()
                this.loading = false
              })
              .catch(e => {
                this.$swal({
                  icon: 'error',
                  title: `Error al guardar el suministro.`,
                  text: e.response.data && e.response.data.type ? `Error ${e.response.data.type}, ${e.response.data.message}` : ''
                })
                this.loading = false
              })
        }
      })
    },
    open(item) {
      this.dialog = true
      this.loading = true
      this.axios.get(`mipres/suministros/${item.ID}`)
          .then(response => {
            this.suministro.ID = response.data.ID
            this.suministro.CantTotEntregada = response.data.CantTotEntregada
            this.suministro.NoLote = response.data.NoLote
            this.suministro.ValorEntregado = response.data.ValorEntregado
            ///
            this.suministro.NoPrescripcion = response.data.NoPrescripcion
            this.suministro.ConTec = response.data.ConTec
            this.suministro.TipoTec = response.data.TipoTec
            this.suministro.TipoIDPaciente = response.data.TipoIDPaciente
            this.suministro.NoIDPaciente = response.data.NoIDPaciente
            this.reporteEntrega = response.data
            this.loading = false
          })
          .catch(() => {
            this.$swal({
              icon: 'error',
              title: `Error al recuperar los datos del reporte de entrega.`,
              text: ''
            })
            this.loading = false
          })
    },
    cancelar() {
      this.dialog = false
      this.suministro = this.clone(this.makeSuministro)
      this.reporteEntrega = null
    }
  }
}
</script>

<style scoped>

</style>