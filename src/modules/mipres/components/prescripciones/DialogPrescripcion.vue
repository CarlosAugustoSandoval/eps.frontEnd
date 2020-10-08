<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
    <v-card>
      <loading :value="loading"/>
      <v-toolbar dense class="py-0" height="60px" v-if="title">
        <v-avatar :color="title.color || ''" class="mr-2">
          <v-icon :large="title.large" :dark="!!title.color">{{ title.icon }}</v-icon>
        </v-avatar>
        <v-toolbar-title class="py-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Detalle de prescripción</v-list-item-title>
              <v-list-item-subtitle>Número: {{prescripcion ? prescripcion.NoPrescripcion : ''}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="botonJuntas">
          <c-tooltip
              :disabled="!$vuetify.breakpoint.smAndDown"
              left
              tooltip="Sincronizar Juntas Médicas"
          >
            <v-btn
                v-if="$vuetify.breakpoint.smAndDown"
                dark
                fab
                bottom
                small
                color="light-blue"
                @click="sincronizaJuntaMedicas"
            >
              <v-icon>fas fa-sync-alt</v-icon>
            </v-btn>
            <v-btn
                v-else
                color="primary"
                dark
                @click="sincronizaJuntaMedicas"
            >
              <v-icon left size="20">fas fa-sync-alt</v-icon>
              Sincronizar Juntas Médicas
            </v-btn>
          </c-tooltip>
          <v-divider vertical class="ml-3 mr-4"/>
        </template>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container class="px-0" fluid v-if="prescripcion">
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
                      <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Ámbito de Atención</v-list-item-subtitle>
                      <v-list-item-title>{{ prescripcion.AmbitoAtencion }}</v-list-item-title>
                      <p class="mb-0">
                        Prestación <strong>{{ prescripcion.RefAmbAte === 1 ? 'SI' : 'NO' }}</strong> se trata de referencia o contrareferencia.
                      </p>
                    </v-col>
                    <v-col cols="12" xl="6">
                      <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">IPS</v-list-item-subtitle>
                      <v-list-item-title>{{ prescripcion.TipoIDIPS }} {{ prescripcion.NroIDIPS }}{{prescripcion.ips ? ` - ${prescripcion.ips.nombre}` : ''}}</v-list-item-title>
                      <v-list-item-subtitle>Cód. Habilitación: <strong>{{ prescripcion.CodHabIPS }}</strong>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle><strong>{{ prescripcion.DirSedeIPS }}, {{ prescripcion.CodDANEMunIPS }}</strong>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>Teléfono: <strong>{{ prescripcion.TelSedeIPS }}</strong>
                      </v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" xl="6">
                      <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Paciente</v-list-item-subtitle>
                      <v-list-item-title>
                        {{ prescripcion.TipoIDPaciente }} {{ prescripcion.NroIDPaciente }} - {{ [prescripcion.PAPaciente, prescripcion.SAPaciente, prescripcion.PNPaciente, prescripcion.SNPaciente].filter(x => x).join(' ') }}
                      </v-list-item-title>
                      <p class="mb-0"><strong>{{ prescripcion.PacCovid19 === 1 ? 'SI' : 'NO' }}</strong> tiene un caso
                        sospechoso o confirmado de COVID19.</p>
                      <v-list-item-subtitle>Identificación de la Madre: <strong>{{
                          prescripcion.TipoIDMadrePaciente || prescripcion.NroIDMadrePaciente ? [prescripcion.TipoIDMadrePaciente, prescripcion.NroIDMadrePaciente].filter(x => x).join('') : 'No Registra'
                        }}</strong></v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" xl="6">
                      <v-list-item-subtitle :class="darkMode ? 'text--secondary' : 'primary--text'">Profesional</v-list-item-subtitle>
                      <v-list-item-title>
                        {{ prescripcion.TipoIDProf }} {{ prescripcion.NumIDProf }} - {{ [prescripcion.PAProfS, prescripcion.SAProfS, prescripcion.PNProfS, prescripcion.SNProfS].filter(x => x).join(' ') }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Registro Profesional: <strong>{{ prescripcion.RegProfS }}</strong>
                      </v-list-item-subtitle>
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
                        @actualizado="getPrescripcion(prescripcion.NoPrescripcion)"
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
                        @actualizado="getPrescripcion(prescripcion.NoPrescripcion)"
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
                        @actualizado="getPrescripcion(prescripcion.NoPrescripcion)"
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
                        @actualizado="getPrescripcion(prescripcion.NoPrescripcion)"
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
                        @actualizado="getPrescripcion(prescripcion.NoPrescripcion)"
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
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CardServtec from '@/modules/mipres/components/servtecs/CardServtec'
export default {
  name: 'DialogPrescripcion',
  components: {CardServtec},
  data: () => ({
    loading: false,
    dialog: false,
    prescripcion: null
  }),
  computed: {
    title() {
      if (this && this.$route && this.$route.meta && this.$route.meta.title) return this.$route.meta.title
      return null
    },
    botonJuntas() {
      if(this && this.prescripcion) {
        let servtecs = this.prescripcion.medicamentos.concat(this.prescripcion.complementarios).concat(this.prescripcion.nutricionales).concat(this.prescripcion.procedimientos).concat(this.prescripcion.dispositivos)
        return servtecs.filter(x => x.EstJM === 2).length > 0
      }
      return false
    }
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
            this.getPrescripcion(this.prescripcion.NoPrescripcion)
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
    getPrescripcion(NoPrescripcion) {
      this.loading = true
      this.$store.dispatch('getPrescripcion', NoPrescripcion).then(prescripcion => {
        this.prescripcion = prescripcion
        this.loading = false
        this.$store.dispatch('getAfiliadoIdentificacion', { identificacion: this.prescripcion.NroIDPaciente }).then(afiliado => {
          if(this.prescripcion) this.prescripcion.afiliado = afiliado
        })
      })
    },
    open(item) {
      this.getPrescripcion(item.NoPrescripcion)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.loading = false
      this.prescripcion = null
    }
  }
}
</script>

<style scoped>

</style>