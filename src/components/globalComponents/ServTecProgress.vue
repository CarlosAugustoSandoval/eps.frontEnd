<template>
  <v-badge
      overlap
      bordered
  >
    <template v-slot:badge>
      <span>{{properties.cantidad}}</span>
    </template>
    <v-tooltip class="mr-1" top>
      <template v-slot:activator="{ on }">
        <v-progress-circular
            v-on="on"
            class="text-center"
            :rotate="180"
            :size="34"
            :width="4"
            :value="properties.porcentaje"
            color="primary"
        >
          {{ tipo }}
        </v-progress-circular>
      </template>
      <span>{{ properties.tooltip }}</span>
    </v-tooltip>
  </v-badge>
</template>

<script>
export default {
name: 'ServTecProgress',
  props: {
    prescripcion: {
      type: Object,
      default: null
    },
    tipo: {
      type: String,
      default: ''
    }
  },
  watch: {
    'prescripcion': {
      handler(val) {
        this && val && this.getProresData()
      },
      immediate: true
    },
    'tipo': {
      handler(val) {
        this && val && this.getProresData()
      },
      immediate: true
    }
  },
  data: () => ({
    properties: {
      cantidad: null,
      porcentaje: null,
      tooltip: null
    }
  }),
  methods: {
  getProresData() {
    if(this.tipo && this.prescripcion) {
      switch (this.tipo) {
        case 'M': {
          this.properties = {
            cantidad: this.prescripcion.items_m,
            porcentaje: (this.prescripcion.porcentaje_m || 0) * 100,
            tooltip: `Medicamentos: ${((this.prescripcion.porcentaje_m || 0) * 100).toFixed(1)}%`
          }
          break
        }
        case 'P': {
          this.properties = {
            cantidad: this.prescripcion.items_p,
            porcentaje: (this.prescripcion.porcentaje_p || 0) * 100,
            tooltip: `Procedimientos: ${((this.prescripcion.porcentaje_p || 0) * 100).toFixed(1)}%`
          }
          break
        }
        case 'D': {
          this.properties = {
            cantidad: this.prescripcion.items_d,
            porcentaje: (this.prescripcion.porcentaje_d || 0) * 100,
            tooltip: `Dispositivos médicos: ${((this.prescripcion.porcentaje_d || 0) * 100).toFixed(1)}%`
          }
          break
        }
        case 'N': {
          this.properties = {
            cantidad: this.prescripcion.items_n,
            porcentaje: (this.prescripcion.porcentaje_n || 0) * 100,
            tooltip: `Productos nutricionales: ${((this.prescripcion.porcentaje_n || 0) * 100).toFixed(1)}%`
          }
          break
        }
        case 'S': {
          this.properties = {
            cantidad: this.prescripcion.items_s,
            porcentaje: (this.prescripcion.porcentaje_s || 0) * 100,
            tooltip: `Servicios complementarios: ${((this.prescripcion.porcentaje_s || 0) * 100).toFixed(1)}%`
          }
          break
        }
      }
    }
  }
  }
}
</script>

<style scoped>

</style>