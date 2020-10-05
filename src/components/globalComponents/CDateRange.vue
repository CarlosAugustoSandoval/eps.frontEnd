<template>
  <v-menu
      ref="menuFecha"
      v-model="menuFecha"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="model"
      transition="scale-transition"
      offset-y
      min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
        <v-text-field
            v-model="dateFormatted"
            :label="label"
            :placeholder="placeholder"
            prepend-inner-icon="mdi-calendar-range"
            readonly
            outlined
            v-on="on"
            :dense="dense"
            :disabled="disabled"
            :error-messages="errors"
            :clearable="clearable"
            :hint="hint"
            persistent-hint
        />
      </ValidationProvider>
    </template>
    <v-date-picker
        v-model="model"
        :min="min"
        :max="max"
        scrollable
        no-title
        range
    />
  </v-menu>
</template>

<script>
export default {
  name: 'CDateRange',
  props: {
    value: {
      type: [Array],
      default: () => []
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: 'Seleccionar rango de fechas'
    },
    name: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: null
    },
    min: {
      type: [Number, String],
      default: null
    },
    max: {
      type: [Number, String],
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    model: [],
    menuFecha: false
  }),
  computed: {
    dateFormatted: {
      get: function () {
        if (this.$refs && this.$refs.menuFecha && this.value && this.value.length === 2) {
          this.$refs.menuFecha.save(this.model)
        }
        return this.value ? this.value.join(' ~ ') : []
      },
      set: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  watch: {
    model: {
      handler(val) {
        if (typeof val !== 'undefined' && val !== null) {
          if (val.length === 2 && (val[0] !== val[1]) && !this.moment(val[1]).isAfter(val[0], 'day')) {
            this.$emit('input', [val[1], val[0]])
          } else {
            this.$emit('input', val)
          }
        } else {
          this.$emit('input', [])
        }
      },
      immediate: false
    },
    value: {
      handler(val) {
        this.model = ((typeof val !== 'undefined' && val !== null) ? val : [])
      },
      immediate: true
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style scoped>

</style>