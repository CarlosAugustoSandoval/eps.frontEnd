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
  data: () => ({
    properties: {
      cantidad: null,
      porcentaje: null,
      tooltip: null
    }
  }),
  created() {
    switch (this.tipo) {
      case 'M': {
        this.properties = {
          cantidad: 3,
          porcentaje: 65,
          tooltip: `Medicamentos: 65%`
        }
        break
      }
      // case 'M': {
      //   this.properties = {
      //     cantidad: this.prescripcion.medicamentos.length,
      //     porcentaje: (this.prescripcion.DireccionadoM || 0) * 100,
      //     tooltip: `Medicamentos: ${(this.prescripcion.DireccionadoM || 0) * 100}%`
      //   }
      //   break
      // }
      // case 'P': {
      //   this.properties = {
      //     cantidad: this.prescripcion.procedimientos.length,
      //     porcentaje: (this.prescripcion.DireccionadoP || 0) * 100,
      //     tooltip: `Procedimientos: ${(this.prescripcion.DireccionadoP || 0) * 100}%`
      //   }
      //   break
      // }
      // case 'D': {
      //   this.properties = {
      //     cantidad: this.prescripcion.dispositivos.length,
      //     porcentaje: (this.prescripcion.DireccionadoD || 0) * 100,
      //     tooltip: `Dispositivos médicos: ${(this.prescripcion.DireccionadoD || 0) * 100}%`
      //   }
      //   break
      // }
      // case 'N': {
      //   this.properties = {
      //     cantidad: this.prescripcion.nutricionales.length,
      //     porcentaje: (this.prescripcion.DireccionadoN || 0) * 100,
      //     tooltip: `Productos nutricionales: ${(this.prescripcion.DireccionadoN || 0) * 100}%`
      //   }
      //   break
      // }
      // case 'S': {
      //   this.properties = {
      //     cantidad: this.prescripcion.complementarios.length,
      //     porcentaje: (this.prescripcion.DireccionadoS || 0) * 100,
      //     tooltip: `Servicios complementarios: ${(this.prescripcion.DireccionadoS || 0) * 100}%`
      //   }
      //   break
      // }
    }
  }
}
</script>

<style scoped>

</style>