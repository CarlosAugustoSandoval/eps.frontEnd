<template>
  <v-container fluid class="down-top-padding">
    <ViewTitle/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <DataTable
              ref="tablaPrescripciones"
              v-model="dataTable"
              @resetOption="item => resetOptions(item)"
              @detallePrescripcion="item => $router.push({ name: 'Prescripcion', params: {NoPrescripcion: item.NoPrescripcion }})"
          ></DataTable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Prescripciones',
  data: () => ({
    dataTable: {
      buttonZone: false,
      advanceFilters: true,
      nameItemState: 'tablaPrescripciones',
      route: 'mipres/prescripciones',
      makeHeaders: [
        {
          text: 'Prescripción',
          align: 'left',
          sortable: false,
          value: 'NoPrescripcion'
        },
        {
          text: 'Amb. Atención',
          align: 'left',
          sortable: false,
          value: 'AmbitoAtencion'
        },
        {
          text: 'Paciente',
          align: 'center',
          sortable: false,
          value: 'NoIDPaciente',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: [context.props.value.PAPaciente, context.props.value.SAPaciente, context.props.value.PNPaciente, context.props.value.SNPaciente].filter(x => x).join(' '),
                        subtitle: `${context.props.value.TipoIDPaciente}${context.props.value.NroIDPaciente}`
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Profesional',
          align: 'left',
          sortable: false,
          value: 'NoIDProf',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: [context.props.value.PAProfS, context.props.value.SAProfS, context.props.value.PNProfS, context.props.value.SNProfS].filter(x => x).join(' '),
                        subtitle: `${context.props.value.TipoIDProf}${context.props.value.NumIDProf}`
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Avance entrega',
          tooltip: 'Ubicación Posible Caso',
          align: 'left',
          sortable: false,
          value: 'avance',
          component: {
            functional: true,
            render: function (createElement, context) {
              // console.log('value', context.props.value)
              let componentes = []
              componentes.push(createElement('ServTecProgress', {
                props: {
                  prescripcion: context.props.value,
                  tipo: 'M'
                }
              }))
              // if (context.props.value.medicamentos.length) componentes.push(createElement('ServTecProgress', {
              //   props: {
              //     prescripcion: context.props.value,
              //     tipo: 'M'
              //   }
              // }))
              // if (context.props.value.procedimientos.length) componentes.push(createElement('ServTecProgress', {
              //   props: {
              //     prescripcion: context.props.value,
              //     tipo: 'P'
              //   }
              // }))
              // if (context.props.value.complementarios.length) componentes.push(createElement('ServTecProgress', {
              //   props: {
              //     prescripcion: context.props.value,
              //     tipo: 'S'
              //   }
              // }))
              // if (context.props.value.nutricionales.length) componentes.push(createElement('ServTecProgress', {
              //   props: {
              //     prescripcion: context.props.value,
              //     tipo: 'N'
              //   }
              // }))
              // if (context.props.value.dispositivos.length) componentes.push(createElement('ServTecProgress', {
              //   props: {
              //     prescripcion: context.props.value,
              //     tipo: 'D'
              //   }
              // }))
              return createElement(
                  `div`,
                  componentes
              )
            }
          }
        },
        {
          text: 'Estado',
          align: 'left',
          sortable: false,
          visibleColumn: false,
          value: 'EstadoPrescripcion'
        },
        {
          text: 'Usuario',
          align: 'left',
          sortable: false,
          visibleColumn: false,
          value: 'usuario'
        },
        {
          text: 'Opciones',
          align: 'center',
          sortable: false,
          actions: true,
          singlesActions: true
        }
      ]
    }
  }),
  methods: {
    resetOptions(item) {
      item.options = []
      item.options.push({event: 'detallePrescripcion', icon: 'fas fa-file-prescription', tooltip: 'Ver Prescripción'})
      return item
    }
  }
}
</script>

<style scoped>

</style>