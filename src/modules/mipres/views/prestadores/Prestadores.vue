<template>
  <v-container fluid class="down-top-padding">
    <view-title/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <data-table
              ref="tablaPrestadores"
              v-model="dataTable"
              @resetOption="item => resetOptions(item)"
          ></data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Prestadores',
  data: () => ({
    dataTable: {
      buttonZone: false,
      advanceFilters: false,
      nameItemState: 'tablaPrestadores',
      route: 'mipres/reps',
      makeHeaders: [
        {
          text: 'Prestador',
          align: 'left',
          sortable: false,
          value: 'codigohabilitacion',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: context.props.value.nombre,
                        subtitle: `Código:${context.props.value.codigohabilitacion} - ${context.props.value.tipo_identificacion}${context.props.value.nitsnit}`,
                        maxWidth: '400px'
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Contacto',
          align: 'left',
          sortable: false,
          value: 'email',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: context.props.value.email,
                        subtitle: `Teléfono(s):${context.props.value.telefono}`
                      }
                    }
                  })
            }
          }
        },
        {
          text: 'Ubicación',
          align: 'left',
          sortable: false,
          value: 'nompio',
          component: {
            functional: true,
            render: function (createElement, context) {
              return createElement(
                  'CItemList', {
                    props: {
                      item: {
                        title: `${context.props.value.nompio}, ${context.props.value.nomdepto}`,
                        subtitle: context.props.value.direccion
                      }
                    }
                  })
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
    resetOptions(item) {
      item.options = []
      return item
    }
  }
}
</script>

<style scoped>

</style>