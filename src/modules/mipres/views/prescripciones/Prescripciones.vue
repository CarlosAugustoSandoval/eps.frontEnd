<template>
  <v-container fluid class="down-top-padding">
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <sincronizador
            :visibles="[1]"
            @sincronizado="$refs && $refs.tablaPrescripciones.reloadPage()"
        />
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <v-card>
          <data-table
              ref="tablaPrescripciones"
              v-model="dataTable"
              @resetOption="item => resetOptions(item)"
              @detallePrescripcion="item => verPrescripcion(item)"
              @sincronizarPrescripcion="item => sincronizarPrescripcion(item)"
              @applyFilters="$refs && $refs.filtrosPrescripciones && $refs.filtrosPrescripciones.aplicaFiltros()"
          >
            <filtros
                slot="filters"
                ref="filtrosPrescripciones"
                :ruta-base="rutaBase"
                @filtra="val => dataTable.route = val"
            ></filtros>
            <template v-slot:tagsfilters="{tags}">
              <v-col cols="12" class="py-0">
                <c-chip-filters
                    v-for="(tag, keytag) in tags.CodAmbAte"
                    :key="`tag${keytag}`"
                    :text="tag.text"
                    @close="() => {
                      tags.CodAmbAte.splice(keytag, 1)
                      $refs && $refs.filtrosPrescripciones && $refs.filtrosPrescripciones.aplicaFiltros()
                    }"
                />
                <c-chip-filters
                    v-if="tags.direccionado"
                    :text="tags.direccionado.text"
                    @close="() => {
                      tags.direccionado = null
                      $refs && $refs.filtrosPrescripciones && $refs.filtrosPrescripciones.aplicaFiltros()
                    }"
                />
                <c-chip-filters
                    v-if="tags.fecha_between && tags.fecha_between.length"
                    :text="`Desde ${tags.fecha_between[0]} hasta ${tags.fecha_between[1]}`"
                    @close="() => {
                      tags.fecha_between = []
                      $refs && $refs.filtrosPrescripciones && $refs.filtrosPrescripciones.aplicaFiltros()
                    }"
                />
              </v-col>
            </template>
          </data-table>
        </v-card>
      </v-col>
    </v-row>
    <dialog-prescripcion
        v-if="permisos.ver"
        ref="dialogPrescripcion"
    />
  </v-container>
</template>

<script>
// @detallePrescripcion="item => $router.push({ name: 'Prescripcion', params: {NoPrescripcion: item.NoPrescripcion }})"
import Sincronizador from '@/modules/mipres/components/sincronizador/Sincronizador'
import DialogPrescripcion from '@/modules/mipres/components/prescripciones/DialogPrescripcion'
import Filtros from '@/modules/mipres/components/prescripciones/filtros/Filtros'
export default {
  name: 'Prescripciones',
  components: {
    Sincronizador,
    DialogPrescripcion,
    Filtros
  },
  data: (vm) => ({
    rutaBase: 'mipres/prescripciones',
    dataTable: {
      buttonZone: false,
      advanceFilters: true,
      titleFilters: 'Filtros Prescripciones',
      nameItemState: 'tablaPrescripciones',
      route: 'mipres/prescripciones',
      makeHeaders: [
        {
          text: 'Prescripción',
          align: 'left',
          sortable: false,
          value: 'NoPrescripcion',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: context.props.value.NoPrescripcion,
                        subtitle: context.props.value.FPrescripcion ? vm.moment(context.props.value.FPrescripcion).format('DD/MM/YYYY') : ''
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Amb. Atención',
          align: 'left',
          sortable: false,
          value: 'AmbitoAtencion'
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
          text: 'IPS',
          align: 'left',
          sortable: false,
          value: 'nombre_ips',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement('div', context.props.value.nombre_ips)
            }
          }
        },
        {
          text: 'Profesional',
          align: 'left',
          sortable: false,
          visibleColumn: false,
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
          text: 'Avance Direccionado',
          tooltip: 'Ubicación Posible Caso',
          align: 'center',
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
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('prescripciones')
    }
  },
  methods: {
    resetOptions(item) {
      item.options = []
      if(this.permisos.ver) item.options.push({event: 'detallePrescripcion', icon: 'mdi-file-find', tooltip: 'Ver Prescripción', color: 'success', btnClass: 'mr-1'})
      if(this.permisos.sincronizar) item.options.push({event: 'sincronizarPrescripcion', icon: 'mdi-reload', tooltip: 'Sincronizar', color: 'blue'})
      return item
    },
    verPrescripcion(item) {
      this.$refs.dialogPrescripcion.open(item)
    },
    sincronizarPrescripcion(item) {
      item.loading = true
      this.$store.dispatch('getPrescripcionMipres', { NoPrescripcion: item.NoPrescripcion, sync: true })
          .then(() => {
            this.$refs.tablaPrescripciones.reloadPage()
            item.loading = false
            this.$store.commit('SET_SNACKBAR', {
              color: 'success',
              message: `Sincronización Completa, Prescripción No ${item.NoPrescripcion}.`
            })
          })
    }
  }
}
</script>

<style scoped>

</style>