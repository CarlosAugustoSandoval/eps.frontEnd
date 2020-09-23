<template>
  <v-container fluid class="down-top-padding">
    <view-title :adicional-title="` No. ${NoPrescripcion}`">
      <template v-slot:action v-if="botonJuntas">
        <v-spacer></v-spacer>
        <c-tooltip
            top
            tooltip="Sincronizar Juntas Médicas"
        >
          <v-btn
              dark
              fab
              bottom
              small
              color="light-blue"
              @click="sincronizaJuntaMedicas"
          >
            <v-icon>fas fa-sync-alt</v-icon>
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <loading :value="loading"/>
    <template v-if="prescripcion">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6" xl="7">
          <v-card>
            <v-container fluid class="py-0">
              <v-row>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Prescripción</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.NoPrescripcion }}</v-list-item-title>
                  <v-list-item-subtitle>Fecha: <strong>{{ prescripcion.FPrescripcion || prescripcion.HPrescripcion ? moment([prescripcion.FPrescripcion, prescripcion.HPrescripcion].filter(x => x).join(' ')).format('DD/MM/YYYY HH:mm') : '' }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle>Estado: <strong>{{ prescripcion.EstadoPrescripcion }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle>Código EPS: <strong>{{ prescripcion.CodEPS }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">IPS</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.TipoIDIPS }}{{ prescripcion.NroIDIPS }}</v-list-item-title>
                  <v-list-item-subtitle>Cód. Habilitación: <strong>{{ prescripcion.CodHabIPS }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle><strong>{{ prescripcion.DirSedeIPS }}, {{ prescripcion.CodDANEMunIPS }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>Teléfono: <strong>{{ prescripcion.TelSedeIPS }}</strong>
                  </v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Paciente</v-list-item-subtitle>
                  <v-list-item-title>{{
                      [prescripcion.PAPaciente, prescripcion.SAPaciente, prescripcion.PNPaciente, prescripcion.SNPaciente].filter(x => x).join(' ')
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle><strong>{{ prescripcion.TipoIDPaciente }}{{
                      prescripcion.NroIDPaciente
                    }}</strong></v-list-item-subtitle>
                  <p class="mb-0"><strong>{{ prescripcion.PacCovid19 === 1 ? 'SI' : 'NO' }}</strong> tiene un caso
                    sospechoso o confirmado de COVID19.</p>
                  <v-list-item-subtitle>Identificación de la Madre: <strong>{{
                      prescripcion.TipoIDMadrePaciente || prescripcion.NroIDMadrePaciente ? [prescripcion.TipoIDMadrePaciente, prescripcion.NroIDMadrePaciente].filter(x => x).join('') : 'No Registra'
                    }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Profesional</v-list-item-subtitle>
                  <v-list-item-title>{{
                      [prescripcion.PAProfS, prescripcion.SAProfS, prescripcion.PNProfS, prescripcion.SNProfS].filter(x => x).join(' ')
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle><strong>{{ prescripcion.TipoIDProf }}{{ prescripcion.NumIDProf }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>Registro Profesional: <strong>{{ prescripcion.RegProfS }}</strong>
                  </v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Ámbito de Atención</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.AmbitoAtencion }}</v-list-item-title>
                  <p class="mb-0">
                    Prestación <strong>{{ prescripcion.RefAmbAte === 1 ? 'SI' : 'NO' }}</strong> se trata de referencia o contrareferencia.
                  </p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.EnfHuerfana === 1">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Enfermedad Huerfana</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.CodEnfHuerfana }}</v-list-item-title>
                  <p class="pt-1 mb-0">La Enfermedad Huérfana
                    <strong>{{ !!prescripcion.EnfHuerfanaDX ? 'ES' : 'NO ES' }}</strong> el Diagnóstico Principa.
                  </p>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Diagnóstico Principal</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      prescripcion.dx_principal ? [prescripcion.dx_principal.codigo, prescripcion.dx_principal.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.dx1">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Diagnóstico Relacionado 1</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      prescripcion.dx1 ? [prescripcion.dx1.codigo, prescripcion.dx1.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.dx2">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Diagnóstico Relacionado 2</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      prescripcion.dx2 ? [prescripcion.dx2.codigo, prescripcion.dx2.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.NroIDDonanteVivo">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Donante Vivo</v-list-item-subtitle>
                  <v-list-item-title>
                    {{ [prescripcion.TipoIDDonanteVivo, prescripcion.NroIDDonanteVivo].filter(x => x).join(' ') }}
                  </v-list-item-title>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.TipoTranscripcion">
                  <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Tipo de transcripción</v-list-item-subtitle>
                  <p class="mb-0">{{ prescripcion.TipoTranscripcion }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6" xl="5">
          <v-row class="fill-height" no-gutters>
            <v-col cols="12">
              <template v-for="(medicamento, indexMedicamento) in prescripcion.medicamentos">
                <card-servtec
                    @actualizado="getPrescripcion"
                    class="mb-3"
                    :key="`Medicamento${indexMedicamento}`"
                    key-tecnologia="M"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="medicamento"
                    :loading-documento="loading"
                ></card-servtec>
              </template>
              <template v-for="(complementario, indexComplementario) in prescripcion.complementarios">
                <card-servtec
                    @actualizado="getPrescripcion"
                    class="mb-3"
                    :key="`Complementario${indexComplementario}`"
                    key-tecnologia="S"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="complementario"
                    :loading-documento="loading"
                ></card-servtec>
              </template>
              <template v-for="(nutricional, indexNutricional) in prescripcion.nutricionales">
                <card-servtec
                    @actualizado="getPrescripcion"
                    class="mb-3"
                    :key="`nutricional${indexNutricional}`"
                    key-tecnologia="N"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="nutricional"
                    :loading-documento="loading"
                ></card-servtec>
              </template>
              <template v-for="(procedimiento, indexProcedimiento) in prescripcion.procedimientos">
                <card-servtec
                    @actualizado="getPrescripcion"
                    class="mb-3"
                    :key="`procedimiento${indexProcedimiento}`"
                    key-tecnologia="P"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="procedimiento"
                    :loading-documento="loading"
                ></card-servtec>
              </template>
              <template v-for="(dispositivo, indexDispositivo) in prescripcion.dispositivos">
                <card-servtec
                    @actualizado="getPrescripcion"
                    class="mb-3"
                    :key="`dispositivo${indexDispositivo}`"
                    key-tecnologia="D"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="dispositivo"
                    :loading-documento="loading"
                ></card-servtec>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import CardServtec from '@/modules/mipres/components/servtecs/CardServtec'

export default {
  name: 'Prescripcion',
  components: {CardServtec},
  props: {
    NoPrescripcion: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    loading: false,
    prescripcion: null
  }),
  computed: {
    botonJuntas() {
      if(this && this.prescripcion) {
        let servtecs = this.prescripcion.medicamentos.concat(this.prescripcion.complementarios).concat(this.prescripcion.nutricionales).concat(this.prescripcion.procedimientos).concat(this.prescripcion.dispositivos)
        return servtecs.filter(x => x.EstJM === 2).length > 0
      }
      return false
    }
  },
  created() {
    console.log('NoPrescripcion', this.NoPrescripcion)
    this.getPrescripcion()
  },
  methods: {
    sincronizaJuntaMedicas() {
      this.loading = true
      this.axios.get(`mipres/sincronizar-junta/${this.prescripcion.NoPrescripcion}`)
          .then(async () => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'success',
              message: `Las juntas médicas se sincronizarón correctamente.`
            })
            this.getPrescripcion()
          })
          .catch(() => {
            this.$swal({
              icon: 'error',
              title: `Error al sincronizar las juntas médicas.`,
              text: ''
            })
            this.loading = false
          })
    },
    getPrescripcion() {
      this.loading = true
      this.$store.dispatch('getPrescripcion', this.NoPrescripcion).then(prescripcion => {
        this.prescripcion = prescripcion
        this.loading = false
        this.$store.dispatch('getAfiliadoIdentificacion', { identificacion: this.prescripcion.NroIDPaciente }).then(afiliado => {
          this.prescripcion.afiliado = afiliado
        })
      })
    }
  }
}
</script>

<style scoped>

</style>