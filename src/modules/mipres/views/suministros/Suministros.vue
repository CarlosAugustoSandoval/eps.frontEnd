<template>
  <v-container fluid class="down-top-padding">
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <sincronizador
            @sincronizado="$refs && $refs.tablaSuministros.reloadPage()"
        />
      </template>
    </view-title>
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
    <dialog-prescripcion
        ref="dialogPrescripcion"
    />
    <dialog-tutela
        ref="dialogTutela"
    />
    <dialog-producto
        ref="dialogProducto"
    />
  </v-container>
</template>

<script>
import RegistroSuministro from '@/modules/mipres/components/suministros/RegistroSuministro'
import Sincronizador from '@/modules/mipres/components/sincronizador/Sincronizador'
import DialogPrescripcion from '@/modules/mipres/components/prescripciones/DialogPrescripcion'
import DialogTutela from '@/modules/mipres/components/tutelas/DialogTutela'

export default {
  name: 'Suministros',
  components: {
    DialogTutela,
    RegistroSuministro,
    Sincronizador,
    DialogPrescripcion
  },
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
              if (context.props.value.NoPrescripcion || context.props.value.NoTutela) {
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
                          scopedSlots: {
                            title: () => createElement(
                                ((vm.permisos.prescripciones.ver && context.props.value.NoPrescripcion) || (vm.permisos.tutelas.ver && context.props.value.NoTutela)) ? 'a' : 'div',
                                {
                                  class: ['v-list-item__title'],
                                  on: {
                                    click: () => {
                                      (vm.permisos.prescripciones.ver && context.props.value.NoPrescripcion)
                                          ? vm.verPrescripcion(context.props.value)
                                          : (vm.permisos.tutelas.ver && context.props.value)
                                          ? vm.verTutela(context.props.value)
                                          : ''
                                    }
                                  }
                                },
                                context.props.value.NoPrescripcion || context.props.value.NoTutela
                            )
                          },
                          props: {
                            item: {
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
                        title: context.props.value.FecDireccionamiento ? `${context.props.value.FecDireccionamiento ? vm.moment(context.props.value.FecDireccionamiento).format('DD/MM/YYYY') : ''} - ${context.props.value.FecMaxEnt ? vm.moment(context.props.value.FecMaxEnt).format('DD/MM/YYYY') : ''}` : ''
                      }
                    },
                    scopedSlots: {
                      subtitle: () => context.props.value.FecDireccionamiento
                          ? createElement(
                              'div',
                              {
                                class: ['v-list-item__subtitle text-truncate']
                              },
                              [
                                createElement(
                                    'a',
                                    {
                                      on: {
                                        click: () => {
                                          vm && vm.$refs && vm.$refs.dialogProducto.getDetail(context.props.value.TipoTec, context.props.value.CodSerTecAEntregar)
                                        }
                                      }
                                    },
                                    `${context.props.value.TipoTec}${context.props.value.CodSerTecAEntregar}`
                                ),
                                ` | ${context.props.value.CantTotAEntregar}`
                              ]
                          )
                          : createElement('')
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
                        title: context.props.value.FecEntrega ? vm.moment(context.props.value.FecEntrega).format('DD/MM/YYYY') : '',
                        subtitle2: context.props.value.CausaNoEntrega ? `CNE:${context.props.value.CausaNoEntrega}` : null
                      }
                    },
                    scopedSlots: {
                      subtitle: () => context.props.value.FecEntrega
                          ? createElement(
                              'div',
                              {
                                class: ['v-list-item__subtitle text-truncate']
                              },
                              [
                                createElement(
                                    'a',
                                    {
                                      on: {
                                        click: () => {
                                          vm && vm.$refs && vm.$refs.dialogProducto.getDetail(context.props.value.TipoTec, context.props.value.CodTecEntregado)
                                        }
                                      }
                                    },
                                    `${context.props.value.TipoTec}${context.props.value.CodSerTecAEntregar}`
                                ),
                                ` | ${context.props.value.CantTotEntregada}`
                              ]
                          )
                          : createElement('')
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
                        // subtitle: context.props.value.EstRepEntrega ? `Estado:${context.props.value.EstRepEntrega}` : null,
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
                        tooltip: vm.permisos.suministros.crear ? 'Registrar Suministro' : 'Sin permisos para registrar suministros'
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
                              color: vm.permisos.suministros.crear ? 'orange' : 'grey',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.permisos.suministros.crear ? vm.registrarSuministro(context.props.value) : ''
                              }
                            }
                          },
                          [
                            createElement(
                                'v-icon',
                                'mdi-alert'
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
                        tooltip: vm.permisos.suministros.anular ? 'Anular Suministro' : 'Sin permisos para anular suministros'
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
                              color: vm.permisos.suministros.anular ? 'red' : 'grey',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.permisos.suministros.anular ? vm.anularSuministro(context.props.value) : ''
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
                        subtitle: context.props.value.FecFacturacion ? `${context.props.value.TipoTec}${context.props.value.CodSerTecAEntregado} | ${context.props.value.CantTotEntregada}` : '',
                        subtitle2: context.props.value.FecFacturacion ? context.props.value.ValorTotFacturado ? `Facturado: $${context.props.value.ValorTotFacturado}` : '' : '',
                        subtitle3: context.props.value.FecFacturacion ? context.props.value.Copago ? `Copago: $${context.props.value.Copago}` : context.props.value.CuotaModer ? `Cuota Moderadora: $${context.props.value.CuotaModer}` : null : ''
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
                        tooltip: vm.permisos.datosfacturacion.crear ? 'Registrar Datos Facturados' : 'Sin permisos para registrar datos de facturación'
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
                              color: vm.permisos.datosfacturacion.crear ? 'orange' : 'grey',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.permisos.datosfacturacion.crear ? vm.registrarDatosFacturados(context.props.value) : ''
                              }
                            }
                          },
                          [
                            createElement(
                                'v-icon',
                                'mdi-alert'
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
                      class: ['ml-1'],
                      props: {
                        top: true,
                        tooltip: vm.permisos.datosfacturacion.anular ? 'Anular Datos Facturados' : 'Sin permisos para anular datos de facturación'
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
                              color: vm.permisos.datosfacturacion.anular ? 'red' : 'grey',
                              loading: context.props.value.loading
                            },
                            on: {
                              click: () => {
                                vm.permisos.datosfacturacion.anular ? vm.anularDatosFacturados(context.props.value) : ''
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
  computed: {
    permisos() {
      return {
        tutelas: this.$store.getters.permisosModule('tutelas'),
        prescripciones: this.$store.getters.permisosModule('prescripciones'),
        suministros: this.$store.getters.permisosModule('suministros'),
        datosfacturacion: this.$store.getters.permisosModule('datosfacturacion')
      }
    }
  },
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
      this.$store.dispatch('getSuministroMipres', {NoPrescripcion: item.NoPrescripcion || item.NoTutela})
          .then(() => {
            this.$refs.tablaSuministros.reloadPage()
            item.loading = false
            this.$store.commit('SET_SNACKBAR', {
              color: 'success',
              message: `Sincronización Completa, Prescripción No ${item.ID}.`
            })
          })
    },
    verPrescripcion(item) {
      this.$refs.dialogPrescripcion.open(item)
    },
    verTutela(item) {
      this.$refs.dialogTutela.open(item)
    },
    resetOptions(item) {
      item.options = []
      item.loading = false
      if (this.permisos.suministros.sincronizar) item.options.push({
        event: 'sincronizar',
        icon: 'mdi-reload',
        tooltip: 'Sincronizar',
        color: 'blue'
      })
      return item
    }
  }
}
</script>

<style scoped>

</style>