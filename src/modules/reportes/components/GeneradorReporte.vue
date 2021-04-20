<template>
  <v-dialog v-model="dialog" persistent max-width="720px">
    <v-card v-if="reporte">
      <loading :value="loading" absolute/>
      <v-card-title class="py-0">
        <v-list-item-avatar color="primary" class="white--text">
          {{ reporte.id }}
        </v-list-item-avatar>
        <v-list-item-content class="pa-0">
          <p class="title ma-0">{{ reporte.nombre }}</p>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn large icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-card-title>
      <v-card-text class="py-0 body-1">
        {{ reporte.descripcion }}
      </v-card-text>
      <ValidationObserver ref="formVariables" autocomplete="off">
        <v-container v-if="reporte.variables && reporte.variables.length">
          <v-row justify="center" align="center">
            Parámetros del Reporte
          </v-row>
          <v-row justify="center" align="center">
            <template v-for="(variable, indexVariable) in reporte.variables">
              <v-col class="pb-0" cols="12" sm="12" md="6" :key="`variable${indexVariable}`">
                <c-texto
                    v-if="variable.type === 'text' && !variable.parameter"
                    v-model="variable.value"
                    :label="variable.label"
                >
                </c-texto>
                <c-number
                    v-if="variable.type === 'number'"
                    v-model.number="variable.value"
                    :label="variable.label"
                    rules="min:0"
                    :min="0"
                    :step="0.1"
                    :vid="`input${variable.type}${indexVariable}`"
                    :name="variable.label"
                >
                </c-number>
                <c-date
                    v-if="variable.type === 'date'"
                    v-model="variable.value"
                    :label="variable.label"
                    :max="moment().format('YYYY-MM-DD')"
                >
                </c-date>
              </v-col>
            </template>
          </v-row>
        </v-container>
        <v-card-actions v-if="reporte && reporte.variables && reporte.variables.length">
          <v-btn text color="primary" @click="close" :loading="loading">
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="descargar" :loading="loading">
            Descargar
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'GeneradorReporte',
  data: () => ({
    dialog: false,
    loading: false,
    reporte: null
  }),
  methods: {
    descargar() {
      this.$refs.formVariables.validate().then(result => {
        if (result) {
          this.descargaDirecta()
        }
      })
    },
    descargaDirecta () {
      this.$emit('loading', true)
      this.loading = true
      let data = null
      if (this.reporte.variables && this.reporte.variables.length) {
        data = this.clone(this.reporte.variables).reduce(function (result, item) {
          result[item.ref.substr(1)] = item.value
          return result
        }, {})
      }
      this.axios({
        url: `ejecutar-reporte/${this.reporte.id}`,
        method: 'POST',
        data: data,
        responseType: 'blob'
      })
          .then((response) => {
            if (response.status === 204) {
              this.$store.commit('SET_SNACKBAR', {
                color: 'info',
                message: `El reporte no contiene registros para exportar.`
              })
            } else {
              const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))
              window.open(url, '_blank')
            }
            this.close()
          })
          .catch((error) => {
            this.$emit('loading', false)
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {color: 'error', message: `al descargar el reporte.`, error: error})
          })
    },
    close () {
      this.$emit('loading', false)
      this.dialog = false
      this.loading = false
      setTimeout(() => {
        this.reporte = null
      }, 500)
    },
    open (reporte) {
      this.reporte = reporte
      if (reporte.variables && reporte.variables.length) {
        this.dialog = true
      } else {
        this.descargaDirecta()
      }
    }
  }
}
</script>

<style scoped>

</style>