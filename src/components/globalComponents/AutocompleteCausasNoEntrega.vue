<template>
  <ValidationProvider :name="name" :vid="vid" :rules="rules" v-slot="{ errors }">
    <v-autocomplete
        ref="theRefS"
        label="Causa de no entrega"
        v-model="model"
        item-value="id"
        :items="causasAplicables"
        :filter="filterCausas"
        placehoder="Buscar por número de identificación, código de habilitación o nombre"
        no-data-text="No hay resultados para mostrar"
        outlined
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :error-messages="errors"
        :hide-details="hideDetails"
    >
      <template v-slot:selection="data">
        <v-list-item class="pa-0" style="width: 100% !important;">
          <v-list-item-content class="text-truncate pa-0">
            <v-list-item-title class="body-2">{{ data.item.causa }}</v-list-item-title>
            <v-list-item-subtitle class="caption">Aplica a: {{ data.item.aplica_a }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:item="data">
        <div style="width: 100% !important;">
          <v-list-item class="pa-0">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title class="body-2">{{ data.item.causa }}</v-list-item-title>
              <v-list-item-subtitle class="caption">Aplica a: {{ data.item.aplica_a }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SelectComplete',
  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null
    },
    dense: {
      type: Boolean,
      default: true
    },
    TipoTec: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    cantidad: {
      type: Number,
      default: null
    },
    vid: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: null
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    model: null,
    filterCausas: (item, queryText) => {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.id + ' ' + item.causa + ' ' + item.aplica_a)
      const query = hasValue(queryText)
      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
    }
  }),
  computed: {
    ...mapGetters([
      'causasnoentrega'
    ]),
    causasAplicables() {
      const tipos = {
        M: 'medicamentos',
        P: 'procedimientos',
        D: 'dispositivos',
        N: 'nutricionales',
        S: 'complementarios'
      }
      if (this.causasnoentrega && this.causasnoentrega.length && this.TipoTec) {
        if(this.cantidad !== null) {
          return this.causasnoentrega.filter(x => (x[tipos[this.TipoTec]] === 1) && (this.cantidad > 0 ? x.aplica_a !== 'No entrega total' : x.aplica_a === 'No entrega total'))
        } else {
          return this.causasnoentrega.filter(x => (x[tipos[this.TipoTec]] === 1))
        }
      }
      return []
    }
  },
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
      immediate: false
    },
    value: {
      handler(val) {
        this.model = ((typeof val !== 'undefined') ? val : null)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>