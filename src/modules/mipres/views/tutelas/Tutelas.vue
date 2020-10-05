<template>
  <v-container fluid class="down-top-padding">
    <view-title/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <data-table
              ref="tablaTutelas"
              v-model="dataTable"
              @resetOption="item => resetOptions(item)"
              @detalleTutela="item => verTutela(item)"
          ></data-table>
        </v-card>
      </v-col>
    </v-row>
    <dialog-tutela
        v-if="permisos.ver"
        ref="dialogTutela"
    />
  </v-container>
</template>

<script>
// @detalleTutela="item => $router.push({ name: 'Tutela', params: {NoTutela: item.NoTutela }})"
import DialogTutela from '@/modules/mipres/components/tutelas/DialogTutela'
export default {
  name: 'Tutelas',
  components: {
    DialogTutela
  },
  data: (vm) => ({
    dataTable: {
      buttonZone: false,
      advanceFilters: false,
      nameItemState: 'tablaTutelas',
      route: 'mipres/tutelas',
      makeHeaders: [
        {
          text: 'Tutela',
          align: 'left',
          sortable: false,
          value: 'NoTutela',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: context.props.value.NoTutela,
                        subtitle: context.props.value.FTutela ? vm.moment(context.props.value.FTutela).format('DD/MM/YYYY') : ''
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Fallo',
          align: 'left',
          sortable: false,
          value: 'NroFallo',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: context.props.value.NroFallo,
                        subtitle: context.props.value.FFalloTutela ? vm.moment(context.props.value.FFalloTutela).format('DD/MM/YYYY') : ''
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Paciente',
          align: 'left',
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
              let componentes = []
              if (context.props.value.items_m) componentes.push(createElement('ServTecProgress', {
                class: ['mr-2 mt-2'],
                props: {
                  prescripcion: context.props.value,
                  tipo: 'M'
                }
              }))
              if (context.props.value.items_p) componentes.push(createElement('ServTecProgress', {
                class: ['mr-2 mt-2'],
                props: {
                  prescripcion: context.props.value,
                  tipo: 'P'
                }
              }))
              if (context.props.value.items_s) componentes.push(createElement('ServTecProgress', {
                class: ['mr-2 mt-2'],
                props: {
                  prescripcion: context.props.value,
                  tipo: 'S'
                }
              }))
              if (context.props.value.items_n) componentes.push(createElement('ServTecProgress', {
                class: ['mr-2 mt-2'],
                props: {
                  prescripcion: context.props.value,
                  tipo: 'N'
                }
              }))
              if (context.props.value.items_d) componentes.push(createElement('ServTecProgress', {
                class: ['mt-2'],
                props: {
                  prescripcion: context.props.value,
                  tipo: 'D'
                }
              }))
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
          value: 'EstadoTutela'
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
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('tutelas')
    }
  },
  methods: {
    verTutela(item) {
      this.$refs.dialogTutela.open(item)
    },
    resetOptions(item) {
      item.options = []
      if(this.permisos.ver) item.options.push({event: 'detalleTutela', icon: 'mdi-file-find', tooltip: 'Ver Tutela', color: 'success'})
      return item
    }
  }
}
</script>

<style scoped>

</style>