<template>
  <div>
    <v-expansion-panel v-if="expand && data">
      <v-expansion-panel-content>
        <template v-slot:header>
          <v-list-item class="v-list-item-pl0">
            <v-list-item-content class="truncate-content">
              <v-list-item-title class="body-1">{{ data.title }}</v-list-item-title>
              <v-list-item-subtitle class="caption" :class="data.classSubTitle || ''">{{ data.subTitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="slotEntregas">
              <entregas :key-tecnologia="keyTecnologia" :prescripcion="prescripcion" :item="data"></entregas>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-divider class="my-0"></v-divider>
        <v-data-table
            :items="data.table"
            hide-actions
            hide-headers
        >
          <template v-slot:items="props">
            <td class="fs-12 fw-normal" style="height: 36px !important;">
              {{ props.item.label }}
            </td>
            <td class="caption fw-normal" style="height: 36px !important;">
              {{ props.item.text }}
            </td>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <template v-else>
      <v-card style="contain: content !important;" class="elevation-3">
        <template v-if="data">
          <v-toolbar class="elevation-0">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-list-item-avatar v-on="on" color="primary" class="white--text font-weight-bold">{{ data.TipoTec }}</v-list-item-avatar>
              </template>
              <span>{{data.type}}</span>
            </v-tooltip>
            <v-toolbar-title>
              <v-list-item-content>
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle class="caption" :class="data.classSubTitle || ''">{{ data.subTitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="!slotFull">
              <dialog-full-servtec
                  class="mr-2"
                  :item="item"
                  :prescripcion="prescripcion"
                  :key-tecnologia="keyTecnologia"
              />
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                      v-on="on"
                      dark
                      fab
                      bottom
                      small
                      color="green"
                  >
                    <v-icon>fas fa-map-signs</v-icon>
                  </v-btn>
                </template>
                <span>Direccionamientos</span>
              </v-tooltip>
              <!--              <entregas v-if="slotEntregas" :key-tecnologia="keyTecnologia" :prescripcion="prescripcion" :item="data"></entregas>-->
            </template>
          </v-toolbar>
          <v-divider class="mb-0"></v-divider>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
              <tr v-for="(item, indexItem) in data.table" :key="`tr${indexItem}`">
                <td>{{ item.label }}</td>
                <td class="pl-0">{{ item.text }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <template v-if="slotFull">
            <v-divider class="ma-0"></v-divider>
            <v-card-text>
              <template v-for="(itemList, indexList) in data.list">
                <v-list-item two-line class="pa-0" :key="`itemList${indexList}`">
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ itemList.title }}</v-list-item-subtitle>
                    <p class="pt-1 mb-0">{{ itemList.text }}</p>
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="`itemListDivider${indexList}`" class="ma-0"></v-divider>
              </template>
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                  <tr v-for="(itemcr, indexItemcr) in data.causasRazones" :key="`tr${indexItemcr}`">
                    <td class="text-justify" :class="itemcr.classTdItem">{{ itemcr.label }}</td>
                    <td class="text-justify" min-width="140" max-width="50%">
                      {{
                        itemcr.text === 0 ? 'NO' : itemcr.text === 1 ? 'SI' : itemcr.text === 'null' ? '' : itemcr.text
                      }}
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </template>
        </template>
      </v-card>
    </template>
  </div>
</template>

<script>
import DialogFullServtec from '@/modules/mipres/components/servtecs/DialogFullServtec'

export default {
  name: 'CardServtec',
  props: {
    item: {
      type: Object,
      default: null
    },
    prescripcion: {
      type: Object,
      default: null
    },
    expand: {
      type: Boolean,
      default: false
    },
    slotEntregas: {
      type: Boolean,
      default: false
    },
    slotFull: {
      type: Boolean,
      default: false
    },
    keyTecnologia: {
      type: String,
      default: 'medicamentos'
    }
  },
  components: {
    // Entregas: () => import('@/components/Prescripciones/ServiciosTecnologias/Entregas'),
    DialogFullServtec
  },
  data: () => ({
    data: null
  }),
  watch: {
    'item'(val) {
      val && this.assignData()
    }
  },
  created() {
    this.assignData()
  },
  methods: {
    assignData() {
      switch (this.keyTecnologia) {
        case 'medicamentos': {
          this.data = {
            objeto: this.item,
            cantidadTotal: (this.item.CantTotalF !== null ? Number(this.item.CantTotalF) : 0),
            type: 'medicamento',
            TipoTec: 'M',
            title: this.item.DescMedPrinAct,
            subTitle: `${this.item.estado_junta}`,
            classSubTitle: this.item.EstJM === 2 ? 'error--text' : 'success--text',
            cantidadFormulada: (this.item.CantTotalF !== null ? this.item.CantTotalF + (this.item.presentacion ? ' ' + this.item.presentacion.descripcion : '') : ''),
            table: [
              {label: 'Tipo medicamento', text: this.item.tipo_medicamento},
              {label: 'Tipo prestación', text: this.item.tipo_prestador},
              {
                label: 'Forma farmacéutica',
                text: this.item.forma_farmaceutica ? this.item.forma_farmaceutica.codigo + ' - ' + this.item.forma_farmaceutica.descripcion : ''
              },
              {
                label: 'Cantidad formulada',
                text: this.item.CantTotalF !== null ? this.item.CantTotalF + (this.item.presentacion ? ' ' + this.item.presentacion.descripcion : '') : ''
              },
              {
                label: 'Vía administración',
                text: this.item.via_administracion ? this.item.via_administracion.descripcion : ''
              },
              {
                label: 'Tratamiento',
                text: this.item.Dosis + (this.item.unidad_medida_dosis ? ' ' + this.item.unidad_medida_dosis.descripcion : '') + (this.item.NoFAdmon ? ' cada ' + this.item.NoFAdmon + (this.item.frecuencia_administracion ? ' ' + this.item.frecuencia_administracion : '') : '') + (this.item.CanTrat ? ' por ' + this.item.CanTrat + (this.item.duracion_tratamiento ? ' ' + this.item.duracion_tratamiento : '') : '')
              }
            ],
            list: [
              {title: 'Justificación no PBS', text: this.item.JustNoPBS},
              {title: 'Indicaciones especiales', text: this.item.indicaciones_especiales},
              {title: 'Indicaciones o recomendaciones para el paciente', text: this.item.IndRec},
              {title: 'Principios Activos', text: this.item.principios_activos ? this.item.principios_activos.map(x => { return `${x.principio_activo.descripcion} ${x.ConcCant}${x.unimedida_concentracion.descripcion2}/${x.CantCont}${x.unimedida_medicamento.descripcion2}`}).join('; ') : ''}
            ],
            causasRazones: [
              {
                label: 'Causa Solicitud 1 ¿El medicamento está financiado por el Plan de Beneficios en Salud con cargo a la UPC?',
                text: this.item.CausaS1,
                classTdItem: ''
              },
              {
                label: 'Causa Solicitud 2 ¿El medicamento se encuentra en fase experimental?',
                text: this.item.CausaS2,
                classTdItem: ''
              },
              {
                label: 'Causa Solicitud 3 ¿Ya utilizó los medicamentos existentes en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: this.item.CausaS3,
                classTdItem: ''
              },
              {label: 'Medicamento PBS Utilizado', text: this.item.MedPBSUtilizado, classTdItem: ''},
              {
                label: 'Razón Causa Solicitud 3.1 - Resultados clínicos no satisfactorios ¿Lo utilizó y no se obtuvieron resultados clínicos o paraclínicos satisfactorios en el término previsto de sus indicaciones?',
                text: (this.item.RznCausaS31 === 1 ? 'SI' : this.item.RznCausaS31 === 0 ? 'NO' : this.item.RznCausaS31) + (this.item.DescRzn31 ? ': ' + this.item.DescRzn31 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Razón Causa Solicitud 3.2 - Reacciones adversas o intolerancia ¿Lo utilizó y se observaron reacciones adversas o intolerancia por el paciente?',
                text: (this.item.RznCausaS32 === 1 ? 'SI' : this.item.RznCausaS32 === 0 ? 'NO' : this.item.RznCausaS32) + (this.item.DescRzn32 ? ': ' + this.item.DescRzn32 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Causa Solicitud 4 ¿Ya descartó los medicamentos existentes en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: this.item.CausaS4,
                classTdItem: ''
              },
              {label: 'Medicamento PBS Descartado', text: this.item.MedPBSDescartado, classTdItem: ''},
              {
                label: 'Razón Causa Solicitud 4.1 - Reacciones adversas o intolerancia ¿Lo descartó porque se prevén reacciones adversas o intolerancia por el paciente?',
                text: (this.item.RznCausaS41 === 1 ? 'SI' : this.item.RznCausaS41 === 0 ? 'NO' : this.item.RznCausaS41) + (this.item.DescRzn41 ? ': ' + this.item.DescRzn41 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Razón Causa Solicitud 4.2 - Indicaciones/Contraindicaciones ¿Lo descartó porque existen indicaciones o contraindicaciones expresas?',
                text: (this.item.RznCausaS42 === 1 ? 'SI' : this.item.RznCausaS42 === 0 ? 'NO' : this.item.RznCausaS42) + (this.item.DescRzn42 ? ': ' + this.item.DescRzn42 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Razón Causa Solicitud 4.3 - No existe  alternativa ¿Lo descartó porque no existe otra alternativa en el PBS?',
                text: (this.item.RznCausaS43 === 1 ? 'SI' : this.item.RznCausaS43 === 0 ? 'NO' : this.item.RznCausaS43) + (this.item.DescRzn43 ? ': ' + this.item.DescRzn43 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Razón Causa Solicitud 4.4 - Evidencia  científica   disponible ¿Lo descartó porque tiene mejor evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
                text: (this.item.RznCausaS44 === 1 ? 'SI' : this.item.RznCausaS44 === 0 ? 'NO' : this.item.RznCausaS44) + (this.item.DescRzn44 ? ': ' + this.item.DescRzn44 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Causa Solicitud 5 ¿La indicación o uso previsto del medicamento está registrado/aprobado por el competente?',
                text: this.item.CausaS5,
                classTdItem: ''
              },
              {
                label: 'Razón Causa Solicitud 5 - ¿El medicamento aparece en la lista de uso No Indicado en el Registro Sanitario - UNIRS?',
                text: (this.item.RznCausaS5 === 1 ? 'SI' : this.item.RznCausaS5 === 0 ? 'NO' : this.item.RznCausaS5),
                classTdItem: 'pl-10'
              },
              {
                label: 'Causa Solicitud 6 ¿Existe evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
                text: this.item.CausaS6,
                classTdItem: ''
              }
            ]
          }
          break
        }
        case 'complementarios': {
          this.data = {
            objeto: this.item,
            cantidadTotal: (this.item.CantTotal !== null ? Number(this.item.CantTotal) : 0),
            type: 'servicio complementario',
            TipoTec: 'S',
            title: (this.item.CodSerComp ? this.item.CodSerComp : '') + (this.item.DescSerComp ? ' - ' + this.item.DescSerComp : ''),
            subTitle: `${this.item.EstadoJunta}`,
            classSubTitle: this.item.EstJM === 2 ? 'error--text' : 'success--text',
            cantidadFormulada: (this.item.CantTotal !== null ? this.item.CantTotal : ''),
            table: [
              {label: 'Tipo prestación', text: this.item.TipoPrestador},
              {label: 'Cantidad formulada', text: (this.item.CantTotal !== null ? this.item.CantTotal : '')},
              {
                label: 'Tratamiento',
                text: this.item.CanForm + (this.item.CadaFreUso ? ' cada ' + this.item.CadaFreUso + (this.item.FrecuenciaUso ? ' ' + this.item.FrecuenciaUso : '') : '') + (this.item.Cant ? ' por ' + this.item.Cant + (this.item.DuracionTratamiento ? ' ' + this.item.DuracionTratamiento : '') : '')
              }
            ],
            list: [
              {title: 'Justificación no PBS', text: this.item.JustNoPBS},
              {title: 'Indicaciones o recomendaciones para el paciente', text: this.item.IndRec}
            ],
            causasRazones: [
              {
                label: 'Código Causa Solicitud 1 ¿El uso del servicio es cosmético o suntuario?',
                text: this.item.CausaS1,
                classTdItem: ''
              },
              {
                label: 'Código Causa Solicitud 2 ¿El servicio se prestará en Colombia?',
                text: this.item.CausaS2,
                classTdItem: ''
              },
              // {
              //   label: 'Código Causa Solicitud 3 ¿El servicio está registrado por la autoridad competente?',
              //   text: this.item.CausaS3,
              //   classTdItem: ''
              // },
              {
                label: 'Código Causa Solicitud 4 ¿El servicio corresponde a la condición clínica y diagnóstico del paciente?',
                text: (this.item.CausaS4 === 1 ? 'SI' : this.item.CausaS4 === 0 ? 'NO' : this.item.CausaS4) + (this.item.DescCausaS4 ? ': ' + this.item.DescCausaS4 : ''),
                classTdItem: 'pl-10'
              }
              // {
              //   label: 'Código Causa Solicitud 5 ¿Existe evidencia disponible sobre seguridad, eficacia y efectividad?',
              //   text: this.item.CausaS5,
              //   classTdItem: ''
              // }
            ]
          }
          break
        }
        case 'nutricionales': {
          this.data = {
            objeto: this.item,
            cantidadTotal: (this.item.CantTotalF !== null ? Number(this.item.CantTotalF) : 0),
            type: 'producto nutricional',
            TipoTec: 'N',
            title: this.item.producto ? this.item.producto.codigo + ' | ' + [this.item.producto.nombre_comercial, this.item.producto.descripcion].filter(x => x).join(' - ') + ` ${this.item.producto.presentacion_comercial}${this.item.producto.unidades}` : '',
            subTitle: `${this.item.EstadoJunta}`,
            classSubTitle: this.item.EstJM === 2 ? 'error--text' : 'success--text',
            cantidadFormulada: (this.item.CantTotalF !== null ? this.item.CantTotalF + (this.item.forma_cantidad_total ? ' ' + this.item.forma_cantidad_total.descripcion : '') : ''),
            table: [
              {
                label: 'Tipo producto',
                text: this.item.tipo ? this.item.tipo.descripcion : ''
              },
              {label: 'Tipo prestación', text: this.item.tipo_prestador},
              {
                label: 'Forma',
                text: this.item.forma ? this.item.forma.descripcion : ''
              },
              {
                label: 'Cantidad formulada',
                text: this.item.CantTotalF !== null ? this.item.CantTotalF + (this.item.forma_cantidad_total ? ' ' + this.item.forma_cantidad_total.descripcion : '') : ''
              },
              {
                label: 'Vía administración',
                text: this.item.via_administracion
              },
              {
                label: 'Tratamiento',
                text: this.item.Dosis + (this.item.unidad_medida_dosis ? ' ' + this.item.unidad_medida_dosis.descripcion : '') + (this.item.NoFAdmon ? ' cada ' + this.item.NoFAdmon + (this.item.frecuencia_administracion ? ' ' + this.item.frecuencia_administracion : '') : '') + (this.item.CanTrat ? ' por ' + this.item.CanTrat + (this.item.duracion_tratamiento ? ' ' + this.item.duracion_tratamiento : '') : '')
              }
            ],
            list: [
              {title: 'Número de prescripción asociada', text: this.item.NoPrescAso},
              {title: 'Justificación no PBS', text: this.item.JustNoPBS},
              {title: 'Indicaciones especiales', text: this.item.indicaciones_especiales},
              {title: 'Indicaciones o recomendaciones para el paciente', text: this.item.IndRec}
            ],
            causasRazones: [
              // {
              //   label: 'Código Causa Solicitud 1 ¿El Producto Nutricional se encuentra en fase experimental?',
              //   text: this.item.CausaS1,
              //   classTdItem: ''
              // },
              {
                label: 'Código Causa Solicitud 2 ¿El Producto de Soporte Nutricional está registrado por el INVIMA?',
                text: this.item.CausaS2,
                classTdItem: ''
              },
              // {
              //   label: 'Código Causa Solicitud 3 ¿El Producto Nutricional está cubierto por el Plan de Beneficios en Salud con cargo a la UPC?',
              //   text: this.item.CausaS3,
              //   classTdItem: ''
              // },
              // {
              //   label: 'Código Causa Solicitud 4 ¿Ya utilizó el producto nutricional o medicamento existente en el Plan de Beneficios en Salud con cargo a la UPC?',
              //   text: this.item.CausaS4,
              //   classTdItem: ''
              // },
              // {label: 'Producto nutricional utilizado', text: this.item.ProNutUtilizado, classTdItem: ''},
              // {
              //   label: 'Razón Causa Solicitud 4.1 ¿Lo utilizó y no se obtuvieron resultados clínicos o paraclínicos satisfactorios en el término previsto de sus indicaciones?',
              //   text: (this.item.RznCausaS41 === 1 ? 'SI' : this.item.RznCausaS41 === 0 ? 'NO' : this.item.RznCausaS41) + (this.item.DescRzn41 ? ': ' + this.item.DescRzn41 : ''),
              //   classTdItem: 'pl-10'
              // },
              // {
              //   label: 'Razón Causa Solicitud 4.2 ¿Lo utilizó y se observaron reacciones adversas o intolerancia por el paciente?',
              //   text: (this.item.RznCausaS42 === 1 ? 'SI' : this.item.RznCausaS42 === 0 ? 'NO' : this.item.RznCausaS42) + (this.item.DescRzn42 ? ': ' + this.item.DescRzn42 : ''),
              //   classTdItem: 'pl-10'
              // },
              // {
              //   label: 'Código Causa Solicitud 5 ¿Ya descartó el Producto Nutricional existente en el Plan de Beneficios en Salud con cargo a la UPC?',
              //   text: this.item.CausaS5,
              //   classTdItem: ''
              // },
              // {label: 'Descripción Producto nutricional descartado', text: this.item.ProNutDescartado, classTdItem: ''},
              // {
              //   label: 'Razón Causa Solicitud 5.1 ¿Lo descartó porque se prevén reacciones adversas o intolerancia por el paciente?',
              //   text: (this.item.RznCausaS51 === 1 ? 'SI' : this.item.RznCausaS51 === 0 ? 'NO' : this.item.RznCausaS51) + (this.item.DescRzn51 ? ': ' + this.item.DescRzn51 : ''),
              //   classTdItem: 'pl-10'
              // },
              // {
              //   label: 'Razón Causa Solicitud 5.2 ¿Lo descartó porque existen indicaciones o contraindicaciones expresas?',
              //   text: (this.item.RznCausaS52 === 1 ? 'SI' : this.item.RznCausaS52 === 0 ? 'NO' : this.item.RznCausaS52) + (this.item.DescRzn52 ? ': ' + this.item.DescRzn52 : ''),
              //   classTdItem: 'pl-10'
              // },
              // {
              //   label: 'Razón Causa Solicitud 5.3 ¿Lo descartó porque no existe otra alternativa en el PBS?',
              //   text: (this.item.RznCausaS53 === 1 ? 'SI' : this.item.RznCausaS53 === 0 ? 'NO' : this.item.RznCausaS53) + (this.item.DescRzn53 ? ': ' + this.item.DescRzn53 : ''),
              //   classTdItem: 'pl-10'
              // },
              // {
              //   label: 'Razón Causa Solicitud 5.4 ¿Lo descartó porque tiene mejor evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
              //   text: (this.item.RznCausaS54 === 1 ? 'SI' : this.item.RznCausaS54 === 0 ? 'NO' : this.item.RznCausaS54) + (this.item.DescRzn54 ? ': ' + this.item.DescRzn54 : ''),
              //   classTdItem: 'pl-10'
              // },
              {
                label: 'Diagnóstico de Enfermedad Huérfana, Enfermedad rara, Ultra-Huérfana y Olvidada',
                text: this.item.DxEnfermedadHuerfana,
                classTdItem: ''
              },
              {label: 'Diagnóstico de VIH', text: this.item.DxVIH, classTdItem: ''},
              {label: 'Diagnóstico de Cáncer en cuidado paliativo', text: this.item.DxCancerPaliativo, classTdItem: ''},
              {
                label: 'Diagnóstico de Enfermedad Renal Crónica Estadio V',
                text: this.item.DxEnfermedadRenalCronica,
                classTdItem: ''
              },
              {
                label: 'Diagnóstico Desnutrición Proteicocalórica en menores de 5 años5',
                text: this.item.DxDesnutricionProteicocalorica,
                classTdItem: ''
              }
            ]
          }
          break
        }
        case 'procedimientos': {
          this.data = {
            objeto: this.item,
            cantidadTotal: (this.item.CantTotal !== null ? Number(this.item.CantTotal) : 0),
            type: 'procedimiento',
            TipoTec: 'P',
            title: this.item.cup ? this.item.cup.codigo + ' - ' + this.item.cup.descripcion : '',
            subTitle: `${this.item.estado_junta}`,
            classSubTitle: this.item.EstJM === 2 ? 'error--text' : 'success--text',
            cantidadFormulada: (this.item.CantTotal !== null ? this.item.CantTotal : ''),
            table: [
              {label: 'Tipo prestación', text: this.item.tipo_prestacion},
              {label: 'Cantidad formulada', text: this.item.CantTotal !== null ? this.item.CantTotal : ''},
              {
                label: 'Tratamiento',
                text: this.item.CanForm + (this.item.CadaFreUso ? ' cada ' + this.item.CadaFreUso + (this.item.periodo_frecuencia_uso ? ' ' + this.item.periodo_frecuencia_uso : '') : '') + (this.item.Cant ? ' por ' + this.item.Cant + (this.item.periodo_duracion_tratamiento ? ' ' + this.item.periodo_duracion_tratamiento : '') : '')
              }
            ],
            list: [
              {title: 'Justificación no PBS', text: this.item.JustNoPBS},
              {title: 'Indicaciones o recomendaciones para el paciente', text: this.item.IndRec}
            ],
            causasRazones: [
              {label: 'Código Causa Solicitud 1.1 ¿Tiene CUPS?', text: this.item.CausaS11, classTdItem: ''},
              {
                label: 'Código Causa Solicitud 1.2 ¿Es una combinación de CUPS?',
                text: this.item.CausaS12,
                hint: '',
                icon: null
              },
              // {
              //   label: 'Código Causa Solicitud 2 ¿El procedimiento se encuentra en fase experimental?',
              //   text: this.item.CausaS2,
              //   classTdItem: ''
              // },
              {
                label: 'Código Causa Solicitud 3 ¿El Procedimiento se encuentra financiado con recursos de la UPC?',
                text: this.item.CausaS3,
                classTdItem: ''
              },
              {
                label: 'Código Causa Solicitud 4 ¿Utilizó lo existente en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: this.item.CausaS4,
                classTdItem: ''
              },
              {
                label: 'Procedimiento PBS Utilizado',
                text: (this.item.ProPBSUtilizado ? this.item.ProPBSUtilizado + ' - ' : '') + (this.item.procedimiento_utilizado ? this.item.procedimiento_utilizado.descripcion : 'El procedimiento no se encuentra registrado en la tabla de CUPS.'),
                classTdItem: ''
              },
              {
                label: 'Código Causa Solicitud 5 ¿Descartó lo existente en el Plan de Beneficios en Salud con cargo a la UPC?',
                text: this.item.CausaS5,
                classTdItem: ''
              },
              {
                label: 'Procedimiento PBS Descartado',
                text: (this.item.ProPBSDescartado ? this.item.ProPBSDescartado + ' - ' : '') + (this.item.procedimiento_descartado ? this.item.procedimiento_descartado.descripcion : 'El procedimiento no se encuentra registrado en la tabla de CUPS.'),
                classTdItem: ''
              },
              {
                label: 'Código Razón 5.1 - No existe alternativa ¿Lo descartó porque no existe alternativa en el PBS?',
                text: (this.item.RznCausaS51 === 1 ? 'SI' : this.item.RznCausaS51 === 0 ? 'NO' : this.item.RznCausaS51) + (this.item.DescRzn51 ? ': ' + this.item.DescRzn51 : ''),
                classTdItem: 'pl-10'
              },
              {
                label: 'Código Razón 5.2 - Evidencia científica disponible ¿Lo descartó porque tiene mejor evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
                text: (this.item.RznCausaS52 === 1 ? 'SI' : this.item.RznCausaS52 === 0 ? 'NO' : this.item.RznCausaS52) + (this.item.DescRzn52 ? ': ' + this.item.DescRzn52 : ''),
                classTdItem: 'pl-10'
              }
              // {
              //   label: 'Código Causa Solicitud 6 ¿Existe evidencia científica disponible sobre seguridad, eficacia y efectividad clínica?',
              //   text: this.item.CausaS6,
              //   classTdItem: ''
              // },
              // {
              //   label: 'Código Causa Solicitud 7 ¿El Procedimiento prescrito se realizará en Colombia?',
              //   text: this.item.CausaS7,
              //   classTdItem: ''
              // }
            ]
          }
          break
        }
        case 'dispositivos': {
          this.data = {
            objeto: this.item,
            cantidadTotal: (this.item.CantTotal !== null ? Number(this.item.CantTotal) : 0),
            type: 'dispositivo médico',
            TipoTec: 'D',
            title: this.item.dispositivo ? this.item.dispositivo.codigo + ' - ' + this.item.dispositivo.descripcion : '',
            subTitle: `${this.item.EstadoJunta}`,
            classSubTitle: this.item.EstJM === 2 ? 'error--text' : 'success--text',
            cantidadFormulada: (this.item.CantTotal !== null ? this.item.CantTotal : ''),
            table: [
              {label: 'Tipo prestación', text: this.item.tipo_prestador},
              {label: 'Cantidad formulada', text: this.item.CantTotal !== null ? this.item.CantTotal : ''},
              {
                label: 'Tratamiento',
                text: this.item.CanForm + (this.item.CadaFreUso ? ' cada ' + this.item.CadaFreUso + (this.item.frecuencia_uso ? ' ' + this.item.frecuencia_uso : '') : '') + (this.item.Cant ? ' por ' + this.item.Cant + (this.item.periodo_duracion_tratamiento ? ' ' + this.item.periodo_duracion_tratamiento : '') : '')
              }
            ],
            list: [
              {title: 'Justificación no PBS', text: this.item.JustNoPBS},
              {title: 'Indicaciones o recomendaciones para el paciente', text: this.item.IndRec}
            ],
            causasRazones: [
              {
                label: 'Código Causa Solicitud 1 ¿Agotó la cobertura del plan de beneficios en salud financiado con recursos de la UPC?',
                text: this.item.CausaS1,
                classTdItem: ''
              }
            ]
          }
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>