<template>
  <v-container fluid class="down-top-padding">
    <view-title/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <data-table
              ref="tablaSuministros"
              v-model="dataTable"
              @resetOption="item => resetOptions(item)"
              @sincronizar="item => sincronizarSuministro(item)"
          ></data-table>
        </v-card>
      </v-col>
    </v-row>
    <registro-suministro
        ref="registroSuministro"
        @actualizado="item => suministroActualizado(item)"
    />
  </v-container>
</template>

<script>
import RegistroSuministro from '@/modules/mipres/components/suministros/RegistroSuministro'
export default {
  name: 'Suministros',
  components: {RegistroSuministro},
  data: (vm) => ({
    dataTable: {
      buttonZone: false,
      advanceFilters: true,
      nameItemState: 'tablaSuministros',
      route: 'mipres/suministros',
      makeHeaders: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'ID'
        },
        {
          text: 'Prescripción/Tutela',
          align: 'left',
          sortable: false,
          value: 'NoPrescripcion',
          component: {
            functional: true,
            render: function (createElement, context) {
              let arrayComponet = []
              if(context.props.value.NoPrescripcion || context.props.value.NoTutela) {
                arrayComponet.push(
                    createElement(
                        'c-tooltip',
                        {
                          props: {
                            top: true,
                            tooltip: context.props.value.NoPrescripcion ? 'Prescripción' : 'Tutela'
                          }
                        },
                        [
                          createElement(
                              'v-icon',
                              {
                                props: {
                                  color: context.props.value.NoPrescripcion ? 'blue' : 'red'
                                }
                              },
                              context.props.value.NoPrescripcion ? 'mdi-alpha-p-box' : 'mdi-alpha-t-box'
                          )
                        ]
                    ),
                    createElement(
                        'CItemList', {
                          props: {
                            item: {
                              title: context.props.value.NoPrescripcion || context.props.value.NoTutela,
                              subtitle: context.props.value.FPrescripcion ? vm.moment(context.props.value.FPrescripcion).format('DD/MM/YYYY') : context.props.value.FPrescripcion ? vm.moment(context.props.value.FPrescripcion).format('DD/MM/YYYY') : '',
                              maxWidth: '400px'
                            }
                          }
                        })
                )
              }
              return createElement(
                  'div',
                  {
                    style: {
                      display: 'flex'
                    }
                  },
                  arrayComponet
              )
            }
          }
        },
        {
          text: 'Direccionamiento',
          align: 'left',
          sortable: false,
          value: 'FecDireccionamiento',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: `${context.props.value.FecDireccionamiento ? vm.moment(context.props.value.FecDireccionamiento).format('DD/MM/YYYY') : ''} - ${context.props.value.FecMaxEnt ? vm.moment(context.props.value.FecMaxEnt).format('DD/MM/YYYY') : ''}`,
                        subtitle: `${context.props.value.TipoTec}${context.props.value.CodSerTecAEntregar} | ${context.props.value.CantTotAEntregar}`
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Entrega',
          align: 'left',
          sortable: false,
          value: 'FecRepEntrega',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: `${context.props.value.FecEntrega ? vm.moment(context.props.value.FecEntrega).format('DD/MM/YYYY') : ''}`,
                        subtitle: `${context.props.value.TipoTec}${context.props.value.CodTecEntregado} | ${context.props.value.CantTotEntregada}`,
                        subtitle2: context.props.value.CausaNoEntrega ? `CNE:${context.props.value.CausaNoEntrega}` : null
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'R. Entrega',
          align: 'left',
          sortable: false,
          value: 'FecRepEntrega',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: `${context.props.value.FecRepEntrega ? vm.moment(context.props.value.FecRepEntrega).format('DD/MM/YYYY') : ''}`,
                        subtitle: context.props.value.EstRepEntrega ? `Estado:${context.props.value.EstRepEntrega}` : null,
                        subtitle2: `$${context.props.value.ValorEntregado}`
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Suministro',
          align: 'left',
          sortable: false,
          value: 'FecSuministro',
          component: {
            functional: true,
            render: function (createElement, context) {
              let arrayComponet = []
              if (!context.props.value.IDSuministro) {
                arrayComponet.push(createElement(
                    'c-tooltip',
                    {
                      props: {
                        top: true,
                        tooltip: 'Registrar Suministro'
                      }
                    },
                    [
                      createElement(
                          'v-btn',
                          {
                            props: {
                              dark: true,
                              xSmall: true,
                              fab: true,
                              color: 'green',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.registrarSuministro(context.props.value)
                              }
                            }
                          },
                          [
                            createElement(
                                'v-icon',
                                'mdi-clipboard-check'
                            ),
                          ]
                      )
                    ]
                ))
              } else {
                arrayComponet.push(
                    createElement(
                        'CItemList', {
                          class: ['mr-1'],
                          props: {
                            item: {
                              title: vm.moment(context.props.value.FecSuministro).format('DD/MM/YYYY')
                            }
                          }
                        })
                )
                arrayComponet.push(createElement(
                    'c-tooltip',
                    {
                      props: {
                        top: true,
                        tooltip: 'Anular Suministro'
                      }
                    },
                    [
                      createElement(
                          'v-btn',
                          {
                            props: {
                              dark: true,
                              xSmall: true,
                              fab: true,
                              color: 'red',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.anularSuministro(context.props.value)
                              }
                            }
                          },
                          [
                            createElement(
                                'v-icon',
                                'mdi-trash-can'
                            ),
                          ]
                      )
                    ]
                ))
              }
              return createElement(
                  'div',
                  {
                    style: {
                      display: 'flex'
                    }
                  },
                  arrayComponet
              )
            }
          }
        },
        {
          text: 'Facturación',
          align: 'left',
          sortable: false,
          value: 'FecFacturacion',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: `${context.props.value.FecFacturacion ? vm.moment(context.props.value.FecFacturacion).format('DD/MM/YYYY') : ''}`,
                        subtitle: `${context.props.value.TipoTec}${context.props.value.CodSerTecAEntregado} | ${context.props.value.CantTotEntregada}`,
                        subtitle2: `Facturado: $${context.props.value.ValorTotFacturado}`,
                        subtitle3: context.props.value.Copago ? `Copago: $${context.props.value.Copago}` : context.props.value.CuotaModer ? `Cuota Moderadora: $${context.props.value.CuotaModer}` : null
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Datos Facturados',
          align: 'left',
          sortable: false,
          value: 'CompAdm',
          component: {
            functional: true,
            render: function (createElement, context) {
              let arrayComponet = []
              if (!context.props.value.CompAdm) {
                arrayComponet.push(createElement(
                    'c-tooltip',
                    {
                      props: {
                        top: true,
                        tooltip: 'Registrar Datos Facturados'
                      }
                    },
                    [
                      createElement(
                          'v-btn',
                          {
                            props: {
                              dark: true,
                              xSmall: true,
                              fab: true,
                              color: 'green',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.registrarDatosFacturados(context.props.value)
                              }
                            }
                          },
                          [
                            createElement(
                                'v-icon',
                                'mdi-clipboard-check'
                            ),
                          ]
                      )
                    ]
                ))
              } else {
                arrayComponet.push(
                    createElement(
                        'CItemList', {
                          props: {
                            item: {
                              title: `${context.props.value.FecDatosFacturado ? vm.moment(context.props.value.FecDatosFacturado).format('DD/MM/YYYY') : ''}`,
                              subtitle: `ValTotCompAdm: $${context.props.value.ValTotCompAdm}`,
                              subtitle2: `ValTotHom: $${context.props.value.ValTotHom}`
                            }
                          }
                        })
                )
                arrayComponet.push(createElement(
                    'c-tooltip',
                    {
                      props: {
                        top: true,
                        tooltip: 'Anular Datos Facturados'
                      }
                    },
                    [
                      createElement(
                          'v-btn',
                          {
                            props: {
                              dark: true,
                              xSmall: true,
                              fab: true,
                              color: 'red',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.anularDatosFacturados(context.props.value)
                              }
                            }
                          },
                          [
                            createElement(
                                'v-icon',
                                'mdi-trash-can'
                            ),
                          ]
                      )
                    ]
                ))
              }
              return createElement(
                  'div',
                  {
                    style: {
                      display: 'flex'
                    }
                  },
                  arrayComponet
              )
            }
          }
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
    suministroActualizado(item) {
      console.log('item', item)
      this.$refs.tablaSuministros.reloadPage()
    },
    registrarSuministro(item) {
      this.$refs.registroSuministro.open(item)
    },
    async anularSuministro(item) {
      let borrardo = await this.confirm(
          {
            title: 'Anular Suministro',
            subtitle: `¿Está seguro de anular el suministro para el registro ID <strong>${item.ID}</strong>?`,
            route: `mipres/suministros/${item.IDSuministro}`,
            catchMessage: 'No ha sido posible anular el suministro:',
            buttonText: 'Si, Anular'
          }
      )
      if (borrardo.confirm) {
        this.$refs.tablaSuministros.reloadPage()
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El suministro del registro ${item.ID}, se anuló correctamente.`
        })
      }
    },
    registrarDatosFacturados(item) {
      console.log('aqui registra registrarDatosFacturados', item)
    },
    anularDatosFacturados(item) {
      console.log('aqui anularDatosFacturados siministri', item)
    },
    sincronizarSuministro(item) {
      item.loading = true
      this.axios.get(`mipres/sincronizar-suministro/${item.NoPrescripcion || item.NoTutela}`)
          .then(() => {
            this.$refs.tablaSuministros.reloadPage()
            item.loading = false
            this.$store.commit('SET_SNACKBAR', {
              color: 'success',
              message: `Sincronización Completa, Registro ID: ${item.ID}.`
            })
          })
          .catch((e) => {
            this.$swal({
              icon: 'error',
              title: `Error al sincronizar el suministro.`,
              text: `Error ${e.response.data.type}, ${e.response.data.message}`
            })
            item.loading = false
          })
    },
    resetOptions(item) {
      item.options = []
      item.loading = false
      item.options.push({event: 'sincronizar', icon: 'mdi-reload', tooltip: 'Sincronizar', color: 'blue'})
      return item
    }
  }
}
</script>

<style scoped>

</style>