<template>
  <div>
    <ValidationProvider :name="servicioTecnologiaName" :rules="rules" v-slot="{ errors }">
      <v-autocomplete
          v-if="tipoControl === 'CUM'"
          key="tipoControlCUM"
          label="Medicamento CUM"
          v-model="servicioTecnologiaObjeto"
          item-value="consecutivocum"
          :items="cums"
          :loading="loading"
          :search-input.sync="search"
          no-filter
          placehoder="Buscar por código, descripción comercial o principo activo"
          no-data-text="No hay resultados para mostrar"
          return-object
          outlined
          :error-messages="errors"
          persistent-hint
          :hint="servicioTecnologiaObjeto ? servicioTecnologiaObjeto.descripcioncomercial : ''"
          @change="cum => servicioTecnologia = cum ? `${cum.expediente}-${cum.consecutivocum}` : null"
      >
        <template v-slot:selection="data">
          <v-list-item class="pa-0" style="width: 100% !important;">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title class="body-2">
                {{ data.item.expediente }}-{{ data.item.consecutivocum }} | {{ data.item.principioactivo }}
              </v-list-item-title>
              <v-list-item-subtitle class="caption">{{ data.item.producto }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item="data">
          <div style="width: 100% !important;">
            <v-list-item class="pa-0">
              <v-list-item-content class="text-truncate pa-0">
                <v-list-item-title class="body-2">
                  {{ data.item.expediente }}-{{ data.item.consecutivocum }} | {{ data.item.principioactivo }}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">{{ data.item.producto }}</v-list-item-subtitle>
                <v-list-item-subtitle class="caption">{{ data.item.descripcioncomercial }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </v-autocomplete>
      <c-texto
          v-if="tipoControl === 'IUM'"
          key="tipoControlIUM"
          v-model="servicioTecnologia"
          label="Medicamento Código IUM"
          rules="required"
          name="medicamento código IUM"
      />
      <v-autocomplete
          v-if="tipoControl === 'P'"
          key="tipoControlP"
          label="Procedimiento"
          v-model="servicioTecnologiaObjeto"
          item-value="codigo"
          :items="cups"
          :filter="filterTecnologias"
          placehoder="Buscar por código o descripción"
          no-data-text="No hay resultados para mostrar"
          return-object
          outlined
          :error-messages="errors"
          hide-selected
          clearable
          @change="cup => servicioTecnologia = cup ? cup.codigo : null"
      >
        <template v-slot:selection="data">
          <v-list-item class="pa-0" style="width: 100% !important;">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title>{{ data.item.descripcion }}</v-list-item-title>
              <v-list-item-subtitle>Código: {{ data.item.codigo }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item="data">
          <div style="width: 100% !important;">
            <v-list-item class="pa-0">
              <v-list-item-content class="text-truncate pa-0">
                <v-list-item-title class="body-2">{{ data.item.descripcion }}</v-list-item-title>
                <v-list-item-subtitle class="caption">Código: {{ data.item.codigo }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </v-autocomplete>
      <v-autocomplete
          v-if="tipoControl === 'S'"
          key="tipoControlS"
          label="Servicio Complementario"
          v-model="servicioTecnologiaObjeto"
          item-value="codigo"
          :items="complementarios"
          :filter="filterTecnologias"
          placehoder="Buscar por código o descripción"
          no-data-text="No hay resultados para mostrar"
          return-object
          outlined
          :error-messages="errors"
          hide-selected
          @change="complementario => servicioTecnologia = complementario ? complementario.codigo : null"
      >
        <template v-slot:selection="data">
          <v-list-item class="pa-0" style="width: 100% !important;">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title class="body-2">{{ data.item.descripcion }}</v-list-item-title>
              <v-list-item-subtitle class="caption">Código: {{ data.item.codigo }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item="data">
          <div style="width: 100% !important;">
            <v-list-item class="pa-0">
              <v-list-item-content class="text-truncate pa-0">
                <v-list-item-title class="body-2">{{ data.item.descripcion }}</v-list-item-title>
                <v-list-item-subtitle class="caption">Código: {{ data.item.codigo }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </v-autocomplete>
      <v-autocomplete
          v-if="tipoControl === 'D'"
          key="tipoControlD"
          label="Dispositivo médico"
          v-model="servicioTecnologiaObjeto"
          item-value="codigo"
          :items="dispositivos"
          :filter="filterTecnologias"
          placehoder="Buscar por código o descripción"
          no-data-text="No hay resultados para mostrar"
          return-object
          outlined
          :error-messages="errors"
          hide-selected
          @change="dispositivo => servicioTecnologia = dispositivo ? dispositivo.codigo : null"
      >
        <template v-slot:selection="data">
          <v-list-item class="pa-0" style="width: 100% !important;">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title class="body-2">{{ data.item.descripcion }}</v-list-item-title>
              <v-list-item-subtitle class="caption">Código: {{ data.item.codigo }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item="data">
          <div style="width: 100% !important;">
            <v-list-item class="pa-0">
              <v-list-item-content class="text-truncate pa-0">
                <v-list-item-title class="body-2">{{ data.item.descripcion }}</v-list-item-title>
                <v-list-item-subtitle class="caption">Código: {{ data.item.codigo }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </v-autocomplete>
      <v-autocomplete
          v-if="tipoControl === 'N'"
          key="tipoControlN"
          label="Producto nutricional"
          v-model="servicioTecnologiaObjeto"
          item-value="codigo"
          :items="nutricionales"
          :filter="filterNutricionales"
          placehoder="Buscar por código o descripción"
          no-data-text="No hay resultados para mostrar"
          return-object
          outlined
          :error-messages="errors"
          hide-selected
          @change="nutricional => servicioTecnologia = nutricional ? nutricional.codigo : null"
      >
        <template v-slot:selection="data">
          <v-list-item class="pa-0" style="width: 100% !important;">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title class="body-2">{{ data.item.codigo }} | {{ data.item.nombre_comercial }}</v-list-item-title>
              <v-list-item-subtitle class="caption">{{ [data.item.nombre_comercial, data.item.descripcion, data.item.presentacion_comercial, data.item.unidades].filter(x => x).join(' ') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item="data">
          <div style="width: 100% !important;">
            <v-list-item class="pa-0">
              <v-list-item-content class="text-truncate pa-0">
                <v-list-item-title class="body-2">{{ data.item.codigo }} | {{ data.item.nombre_comercial }}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{ [data.item.descripcion, data.item.presentacion_comercial, data.item.unidades].filter(x => x).join(' ') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </template>
      </v-autocomplete>
    </ValidationProvider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InputSerach',
  props: {
    documento: {
      type: Object,
      default: null
    },
    tipo: {
      type: String,
      default: 'prescripción'
    },
    item: {
      type: Object,
      default: null
    },
    rules: {
      type: String,
      default: null
    }
  },
  data: () => ({
    tipoControl: null,
    loading: false,
    search: '',
    cums: [],
    servicioTecnologiaObjeto: null,
    servicioTecnologiaName: null,
    servicioTecnologia: null,
    filterTecnologias: (item, queryText) => {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(`${item.codigo} ${item.descripcion}`)
      const query = hasValue(queryText)
      return text.toString().toLowerCase().includes(query.toString().toLowerCase())
    },
    filterNutricionales: (item, queryText) => {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(`${item.codigo} ${item.nombre_comercial} ${item.descripcion}`)
      const query = hasValue(queryText)
      return text.toString().toLowerCase().includes(query.toString().toLowerCase())
    }
  }),
  watch: {
    'search' : {
      handler (val) {
        val && this.buscarCUM(val)
      },
      immediate: false
    },
    'servicioTecnologia' : {
      handler (val) {
        this.$emit('retornaCodigo', val)
      },
      immediate: false
    }
  },
  computed: {
    ...mapGetters([
      'cups',
      'complementarios',
      'nutricionales',
      'dispositivos'
    ])
  },
  created() {
    switch (this.item.TipoTec) {
      case 'M' :
        switch (this.item.objeto.TipoMed) {
          case 1:
            this.tipoControl = 'CUM'
            this.servicioTecnologiaName = 'medicamento CUM'
            if (this.item.title) {
              const rTemporal = this.item.title.split('[')
              const rFinal = rTemporal[1] ? rTemporal[1].split(']') : null
              if(rFinal[0]) this.buscarCUM(rFinal[0])
            }
            break
          case 2:
            this.tipoControl = 'IUM'
            this.servicioTecnologiaName = 'código medicamento IUM'
            break
          case 3:
            this.tipoControl = 'MAGISTRAL'
            this.servicioTecnologiaName = 'medicamento formula magistral'
            this.servicioTecnologia = ' '
            break
        }
        break
      case 'P' :
        this.tipoControl = 'P'
        this.servicioTecnologiaName = 'procedimiento'
        break
      case 'D' :
        this.tipoControl = 'D'
        this.servicioTecnologiaName = 'dispositivo médico'
        break
      case 'N' :
        this.tipoControl = 'N'
        this.servicioTecnologiaName = 'producto de soporte nutricional'
        break
      case 'S' :
        this.tipoControl = 'S'
        this.servicioTecnologiaName = 'servicio complementario'
        break
    }
  },
  methods: {
    buscarCUM: window.lodash.debounce( async function (parametro) {
      if (parametro) {
        this.loading = true
        await this.$store.dispatch('getCUMs', parametro)
            .then(response => {
              this.cums = response
            })
        this.loading = false
      }
    }, 500)
  }
}
</script>

<style scoped>

</style>