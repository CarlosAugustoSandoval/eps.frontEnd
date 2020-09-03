<template>
  <v-container fluid class="down-top-padding">
    <view-title :adicional-title="` No. ${NoTutela}`"/>
    <loading :value="loading"></loading>
    <template v-if="tutela">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6" xl="7">
          <v-card>
            <v-container fluid class="py-0">
              <v-row>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Tutela</v-list-item-subtitle>
                  <v-list-item-title>{{ tutela.NoTutela }}</v-list-item-title>
                  <v-list-item-subtitle>Fecha: <strong>{{ tutela.FTutela || tutela.HTutela ? moment([tutela.FTutela, tutela.HTutela].filter(x => x).join(' ')).format('DD/MM/YYYY HH:mm') : '' }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle>Estado: <strong>{{ tutela.EstadoTutela }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Fallo Tutela</v-list-item-subtitle>
                  <v-list-item-title>{{ tutela.NroFallo }}</v-list-item-title>
                  <v-list-item-subtitle>Fecha: <strong>{{ tutela.FFalloTutela ? moment(tutela.FFalloTutela).format('DD/MM/YYYY') : '' }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle v-if="tutela.F1Instan">Fecha Intancia 1: <strong>{{ moment(tutela.F1Instan).format('DD/MM/YYYY') }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle v-if="tutela.F2Instan">Fecha Intancia 2: <strong>{{ moment(tutela.F2Instan).format('DD/MM/YYYY') }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle v-if="tutela.FCorte">Fecha Corte: <strong>{{ moment(tutela.FCorte).format('DD/MM/YYYY') }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle v-if="tutela.FDesacato">Fecha Desacato: <strong>{{ moment(tutela.FDesacato).format('DD/MM/YYYY') }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">EPS</v-list-item-subtitle>
                  <v-list-item-title>{{ tutela.TipoIDEPS }}{{ tutela.NroIDEPS }}</v-list-item-title>
                  <v-list-item-subtitle>Código: <strong>{{ tutela.CodEPS }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Paciente</v-list-item-subtitle>
                  <v-list-item-title>{{
                      [tutela.PAPaciente, tutela.SAPaciente, tutela.PNPaciente, tutela.SNPaciente].filter(x => x).join(' ')
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle><strong>{{ tutela.TipoIDPaciente }}{{
                      tutela.NroIDPaciente
                    }}</strong></v-list-item-subtitle>
                  <v-list-item-subtitle>Identificación de la Madre: <strong>{{
                      tutela.TipoIDMadrePaciente || tutela.NroIDMadrePaciente ? [tutela.TipoIDMadrePaciente, tutela.NroIDMadrePaciente].filter(x => x).join('') : 'No Registra'
                    }}</strong></v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Profesional</v-list-item-subtitle>
                  <v-list-item-title>{{
                      [tutela.PAProfS, tutela.SAProfS, tutela.PNProfS, tutela.SNProfS].filter(x => x).join(' ')
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle><strong>{{ tutela.TipoIDProf }}{{ tutela.NumIDProf }}</strong>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>Registro Profesional: <strong>{{ tutela.RegProfS }}</strong>
                  </v-list-item-subtitle>
                </v-col>
                <v-col cols="12" xl="6" v-if="tutela.EnfHuerfana === 1">
                  <v-list-item-subtitle class="text--secondary">Enfermedad Huerfana</v-list-item-subtitle>
                  <v-list-item-title>{{ tutela.CodEnfHuerfana }}</v-list-item-title>
                  <p class="pt-1 mb-0">La Enfermedad Huérfana
                    <strong>{{ !!tutela.EnfHuerfanaDX ? 'ES' : 'NO ES' }}</strong> el Diagnóstico Principa.
                  </p>
                </v-col>
                <v-col cols="12" xl="6">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico Principal</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      tutela.dx_principal ? [tutela.dx_principal.codigo, tutela.dx_principal.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="tutela.dx1">
                  <v-list-item-subtitle>Diagnóstico Relacionado 1</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      tutela.dx1 ? [tutela.dx1.codigo, tutela.dx1.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="tutela.dx2">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico Relacionado 2</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{
                      tutela.dx2 ? [tutela.dx2.codigo, tutela.dx2.descripcion].filter(x => x).join(' ') : ''
                    }}</p>
                </v-col>
                <v-col cols="12" xl="6">
                  <p class="subtitle-2 font-weight-regular text--secondary pt-1 mb-0">Aclaraciones del Fallo de Tutela que se relacionan con la Tecnología en Salud a recobrar</p>
                  <p class="pt-1 mb-0">{{ tutela.AclFalloTut }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="tutela.dx_motiva1">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico que Motiva Solicitud 1</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{ [tutela.dx_motiva1.codigo, tutela.dx_motiva1.descripcion].filter(x => x).join(' ') }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="tutela.dx_motiva2">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico que Motiva Solicitud 2</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{ [tutela.dx_motiva2.codigo, tutela.dx_motiva2.descripcion].filter(x => x).join(' ') }}</p>
                </v-col>
                <v-col cols="12" xl="6" v-if="tutela.dx_motiva3">
                  <v-list-item-subtitle class="text--secondary">Diagnóstico que Motiva Solicitud 3</v-list-item-subtitle>
                  <p class="pt-1 mb-0">{{ [tutela.dx_motiva3.codigo, tutela.dx_motiva3.descripcion].filter(x => x).join(' ') }}</p>
                </v-col>
                <v-col cols="12" xl="6">
                  <p class="subtitle-2 font-weight-regular text--secondary pt-1 mb-0">Justificación médica que demuestra la conexidad de la solicitud recobrada con el Fallo de Tutela</p>
                  <p class="pt-1 mb-0">{{ tutela.JustifMed }}</p>
                </v-col>
                <v-col cols="12" xl="6">
                  <p class="subtitle-2 font-weight-regular text--secondary pt-1 mb-0">Criterios definidos por la Corte Contitucional</p>
                  <template v-for="(definicion, indexDefinicion) in [tutela.CritDef1CC, tutela.CritDef2CC, tutela.CritDef3CC, tutela.CritDef4CC]">
                    <v-chip
                        :key="`definicion${indexDefinicion}`"
                        class="ma-2"
                        color="primary"
                        text-color="white"
                    >
                      <v-avatar
                          left
                          class="primary darken-3"
                      >
                        {{indexDefinicion + 1}}
                      </v-avatar>
                      {{ definicion ? 'SI' : 'NO' }}
                    </v-chip>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6" xl="5">
          <v-row class="fill-height" no-gutters>
            <v-col cols="12">
              <template v-for="(medicamento, indexMedicamento) in tutela.medicamentos">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`Medicamento${indexMedicamento}`"
                    key-tecnologia="medicamentos"
                    :documento="tutela"
                    tipo="tutela"
                    :item="medicamento"
                ></card-servtec>
              </template>
              <template v-for="(complementario, indexComplementario) in tutela.complementarios">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`Complementario${indexComplementario}`"
                    key-tecnologia="complementarios"
                    :documento="tutela"
                    tipo="tutela"
                    :item="complementario"
                ></card-servtec>
              </template>
              <template v-for="(nutricional, indexNutricional) in tutela.nutricionales">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`nutricional${indexNutricional}`"
                    key-tecnologia="nutricionales"
                    :documento="tutela"
                    tipo="tutela"
                    :item="nutricional"
                ></card-servtec>
              </template>
              <template v-for="(procedimiento, indexProcedimiento) in tutela.procedimientos">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`procedimiento${indexProcedimiento}`"
                    key-tecnologia="procedimientos"
                    :documento="tutela"
                    tipo="tutela"
                    :item="procedimiento"
                ></card-servtec>
              </template>
              <template v-for="(dispositivo, indexDispositivo) in tutela.dispositivos">
                <card-servtec
                    @actualizado="$emit('actualizado')"
                    class="mb-3"
                    :key="`dispositivo${indexDispositivo}`"
                    key-tecnologia="dispositivos"
                    :documento="tutela"
                    tipo="tutela"
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
  name: 'Tutela',
  components: {CardServtec},
  props: {
    NoTutela: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    loading: false,
    tutela: null
  }),
  created() {
    console.log('NoTutela', this.NoTutela)
    this.loading = true
    this.$store.dispatch('getTutela', this.NoTutela).then(tutela => {
      this.tutela = tutela
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>