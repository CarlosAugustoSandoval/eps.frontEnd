<template>
  <v-container fluid class="down-top-padding">
    <view-title :adicional-title="` No. ${NoPrescripcion}`"/>
    <loading :value="loading"></loading>
    <template v-if="prescripcion">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6" xl="7">
          <v-card>
            <v-container fluid class="py-0">
              <v-row>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Prescripción</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.NoPrescripcion }}</v-list-item-title>
                  <v-list-item-subtitle>Fecha: <strong>{{ prescripcion.FPrescripcion || prescripcion.HPrescripcion ? moment([prescripcion.FPrescripcion, prescripcion.HPrescripcion].filter(x => x).join(' ')).format('DD/MM/YYYY HH:mm') : '' }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle>Estado: <strong>{{ prescripcion.EstadoPrescripcion }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle>Código EPS: <strong>{{ prescripcion.CodEPS }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">IPS</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.TipoIDIPS }}{{ prescripcion.NroIDIPS }}</v-list-item-title>
                  <v-list-item-subtitle>Cód. Habilitación: <strong>{{ prescripcion.CodHabIPS }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle><strong>{{ prescripcion.DirSedeIPS }}, {{ prescripcion.CodDANEMunIPS }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>Teléfono: <strong>{{ prescripcion.TelSedeIPS }}</strong>
                  </v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Paciente</v-list-item-subtitle>
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
                  <v-list-item-subtitle class="text--secondary">Profesional</v-list-item-subtitle>
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
                  <v-list-item-subtitle class="text--secondary">Ámbito de Atención</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.AmbitoAtencion }}</v-list-item-title>
                  <p class="mb-0">
                    Prestación <strong>{{ prescripcion.RefAmbAte === 1 ? 'SI' : 'NO' }}</strong> se trata de referencia o contrareferencia.
                  </p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.EnfHuerfana === 1">
                  <v-list-item-subtitle class="text--secondary">Enfermedad Huerfana</v-list-item-subtitle>
                  <v-list-item-title>{{ prescripcion.CodEnfHuerfana }}</v-list-item-title>
                  <p class="pt-1 mb-0">La Enfermedad Huérfana
                    <strong>{{ !!prescripcion.EnfHuerfanaDX ? 'ES' : 'NO ES' }}</strong> el Diagnóstico Principa.
                  </p>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico Principal</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      prescripcion.dx_principal ? [prescripcion.dx_principal.codigo, prescripcion.dx_principal.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.dx1">
                  <v-list-item-subtitle>Diagnóstico Relacionado 1</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      prescripcion.dx1 ? [prescripcion.dx1.codigo, prescripcion.dx1.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.dx2">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico Relacionado 2</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      prescripcion.dx2 ? [prescripcion.dx2.codigo, prescripcion.dx2.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.NroIDDonanteVivo">
                  <v-list-item-subtitle class="text--secondary">Donante Vivo</v-list-item-subtitle>
                  <v-list-item-title>
                    {{ [prescripcion.TipoIDDonanteVivo, prescripcion.NroIDDonanteVivo].filter(x => x).join(' ') }}
                  </v-list-item-title>
                </v-col>
                <v-col cols="12" xl="6" v-if="prescripcion.TipoTranscripcion">
                  <v-list-item-subtitle class="text--secondary">Tipo de transcripción</v-list-item-subtitle>
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
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`Medicamento${indexMedicamento}`"
                    key-tecnologia="medicamentos"
                    :documento="prescripcion"
                    :item="medicamento"
                ></card-servtec>
              </template>
              <template v-for="(complementario, indexComplementario) in prescripcion.complementarios">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`Complementario${indexComplementario}`"
                    key-tecnologia="complementarios"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="complementario"
                ></card-servtec>
              </template>
              <template v-for="(nutricional, indexNutricional) in prescripcion.nutricionales">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`nutricional${indexNutricional}`"
                    key-tecnologia="nutricionales"
                    :documento="prescripcion"
                    :item="nutricional"
                ></card-servtec>
              </template>
              <template v-for="(procedimiento, indexProcedimiento) in prescripcion.procedimientos">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`procedimiento${indexProcedimiento}`"
                    key-tecnologia="procedimientos"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="procedimiento"
                ></card-servtec>
              </template>
              <template v-for="(dispositivo, indexDispositivo) in prescripcion.dispositivos">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`dispositivo${indexDispositivo}`"
                    key-tecnologia="dispositivos"
                    :documento="prescripcion"
                    tipo="prescripción"
                    :item="dispositivo"
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
  created() {
    console.log('NoPrescripcion', this.NoPrescripcion)
    this.loading = true
    this.$store.dispatch('getPrescripcion', this.NoPrescripcion).then(prescripcion => {
      this.prescripcion = prescripcion
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>