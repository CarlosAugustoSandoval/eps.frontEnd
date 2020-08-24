<template>
  <v-container fluid class="down-top-padding">
    <IndexViewTitle/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <DataTable
              ref="tablaPrescripciones"
              v-model="dataTable"
              @resetOption="item => resetOptions(item)"
          ></DataTable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IndexViewTitle from '@/components/globalComponents/IndexViewTitle'
import DataTable from '@/components/globalComponents/DataTable'
export default {
  name: 'Prescripciones',
  components: {DataTable, IndexViewTitle},
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
          value: 'prescripcion'
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
          value: 'NoIDPaciente'
        },
        {
          text: 'Profesional',
          align: 'left',
          sortable: false,
          value: 'NoIDProf'
        },
        {
          text: 'Avance entrega',
          tooltip: 'Ubicación Posible Caso',
          align: 'left',
          sortable: false,
          value: 'avance'
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
      item.options.push({event: 'entregar', icon: 'ti ti-package', tooltip: 'Entregar'})
      return item
    }
  }
}
</script>

<style scoped>

</style>