<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="920"
  >
    <v-card>
      <v-toolbar dark color="pink">
        <v-icon left>mdi-file-table</v-icon>
        <v-toolbar-title>{{ item && item.id ? `Reporte No. ${item.id}` : `Nuevo Reporte` }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <loading :value="loading" absolute/>
      <v-container fluid>
        <ValidationObserver ref="formReporte" autocomplete="off">
          <v-row>
            <v-col class="pb-0" cols="12">
              <c-texto
                  v-model="item.nombre"
                  label="Nombre"
                  rules="required"
                  name="nombre"
              >
              </c-texto>
            </v-col>
            <v-col class="pb-0" cols="12">
              <c-text-area
                  v-model="item.descripcion"
                  label="Descripción"
                  name="descripción"
                  rules="required"
                  rows="1"
              >
              </c-text-area>
            </v-col>
            <v-col class="pb-0" cols="12">
              <ValidationProvider name="query" rules="required|integridadSQL" v-slot="{ errors }">
                <span
                    :class="focusCOdemirror ? errors[0] ? 'error--text' : 'primary--text' : errors[0] ? 'error--text' : ''"
                    class="caption v-label v-label--active theme--light">Sentencia SQL</span>
                <codemirror
                    v-model="item.query"
                    :options="cmOptions"
                    @focus="focusCOdemirror = true"
                    @blur="focusCOdemirror = false"
                ></codemirror>
                <v-card-actions>
                  <span class="red--text caption">{{ errors[0] }}</span>
                  <span class="caption grey--text text--darken-1"> {{ errors[0] ? '...' : '' }} Las variables se escriben con el prefijo ':' y sin espacios Ej. => :variable_uno</span>
                  <template v-if="item.query">
                    <v-spacer></v-spacer>
                    <v-btn color="green" dark class="mr-2" @click="probarSql" v-if="$vuetify.breakpoint.mdAndUp">
                      Probar Sentencia SQL
                      <v-icon right large>mdi-play</v-icon>
                    </v-btn>
                    <v-tooltip top v-else>
                      <template v-slot:activator="{on}">
                        <v-btn icon color="green" class="mr-2" v-on="on" @click="probarSql">
                          <v-icon large>mdi-play</v-icon>
                        </v-btn>
                      </template>
                      <span>Probar Sentencia SQL</span>
                    </v-tooltip>
                  </template>
                </v-card-actions>
              </ValidationProvider>
              <v-card v-if="item.variables && item.variables.length">
                <v-toolbar dense class="elevation-0">
                  <v-toolbar-title>Variables</v-toolbar-title>
                </v-toolbar>
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th style="height: 30px !important;">Referencia</th>
                      <th style="height: 30px !important;">Label Control</th>
                      <th style="height: 30px !important;">Tipo Control</th>
                      <th style="height: 15px !important;">Parametros</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(variable, indexVariable) in item.variables" :key="`variable${indexVariable}`">
                      <td style="height: 30px !important;">
                        {{ variable.ref }}
                      </td>
                      <td style="height: 30px !important;">
                        <c-texto
                            v-model="variable.label"
                            placeholder="Label"
                            rules="required"
                            name="label"
                            :vid="`label${indexVariable}`"
                            :outlined="false"
                        >
                        </c-texto>
                      </td>
                      <td style="height: 30px !important;">
                        <c-select-complete
                            v-model="variable.type"
                            placeholder="Tipo"
                            rules="required"
                            name="tipo control"
                            :vid="`tipo${indexVariable}`"
                            :outlined="false"
                            :items="tiposControl"
                            item-text="nombre"
                            item-value="id"
                        >
                        </c-select-complete>
                      </td>
                      <td style="height: 15px !important;">
                        <c-select-complete
                            v-if="variable.type === 'text'"
                            v-model="variable.parameter"
                            placeholder="Parametro"
                            name="parametro"
                            :vid="`tipo${indexVariable}`"
                            :outlined="false"
                            :items="parametros"
                            item-text="label"
                            item-value="value"
                        >
                        </c-select-complete>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col class="pb-0" cols="12">
              <c-combo-box
                  v-model="item.columns"
                  label="Columnas Visibles"
                  :items="item.items"
              >
              </c-combo-box>
            </v-col>
            <v-col class="pb-0" cols="12">
              <c-select-complete
                  v-model="item.roles"
                  label="Roles que visualizan"
                  rules="required"
                  name="roles que visualizan"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  multiple
              >
              </c-select-complete>
            </v-col>
          </v-row>
        </ValidationObserver>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              large
              @click.stop="close"
          >
            <v-icon>mdi-close</v-icon>
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              large
              color="pink"
              class="white--text"
              @click.stop="guardarReporte"
          >
            <v-icon left>fas fa-save</v-icon>
            Guardar Reporte
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/theme/solarized.css'

export default {
  name: 'RegistroReporte',
  components: {
    codemirror
  },
  data: () => ({
    focusCOdemirror: false,
    patron: /:(\w+)(?!\w)/g,
    cmOptions: {
      tabSize: 4,
      lineWrapping: false,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: 'text/x-mysql',
      theme: 'solarized light'
    },
    tiposControl: [
      {id: 'text', nombre: 'Texto'},
      {id: 'number', nombre: 'Número'},
      {id: 'date', nombre: 'Fecha'}
    ],
    parametros: [
      {label: 'Ninguno', value: null, item_text: null, item_value: null},
      {label: 'Departamentos', value: 'departamentos', item_text: 'nombre', item_value: 'id'},
      {label: 'Municipios', value: 'municipios', item_text: 'nombre', item_value: 'id'}
    ],
    loading: false,
    dialog: false,
    item: null,
    modelReporte: {
      id: null,
      descripcion: null,
      columns: [],
      query: '',
      nombre: null,
      user_id: null,
      created_at: null,
      updated_at: null,
      roles: [],
      variables: [],
      items: [
        {header: 'Seleccionar o Crear un item'}
      ]
    },
    roles: []
  }),
  watch: {
    'item.query': {
      handler() {
        this.reloadVariables()
      },
      immediate: false
    }
  },
  created() {
    this.item = this.clone(this.modelReporte)
  },
  methods: {
    probarSql() {
      this.loading = true
      this.axios.post(`test-query`, {query: this.item.query})
          .then(response => {
            console.log('respone test', response)
            this.$store.commit('SET_SNACKBAR', {color: 'success', message: `La sentencia SQL se ha probado correctamente.`})
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {color: 'error', message: `al probar la sentencia SQL.`, error: error})
          })
    },
    reloadVariables() {
      let campos = window.lodash.uniq(this.item.query.match(this.patron))
      if (campos) {
        let variablesGeneradas = []
        campos.forEach(x => {
          variablesGeneradas.push({ref: x, type: null, label: null})
        })
        let variablesNuevas = this.getVariablesNuevas(variablesGeneradas)
        if (variablesNuevas.length) this.item.variables.length ? this.item.variables = this.item.variables.concat(variablesNuevas) : this.item.variables = variablesNuevas
        this.removeVariables(variablesGeneradas)
      } else {
        this.item.variables = []
      }
    },
    removeVariables(variablesGeneradas) {
      if (this.item.variables.length) {
        this.item.variables = this.item.variables.filter(x => {
          return window.lodash.includes(variablesGeneradas.map(z => z.ref), x.ref)
        })
      }
    },
    getVariablesNuevas(variablesGeneradas) {
      if (this.item.variables.length) {
        let retorno = variablesGeneradas.filter(z => {
          return !window.lodash.includes(this.item.variables.map(x => x.ref), z.ref)
        })
        return !retorno ? [] : retorno
      } else {
        return variablesGeneradas
      }
    },
    guardarReporte() {
      this.$refs.formReporte.validate().then(result => {
        if (result) {
          this.loading = true
          let copy = this.clone(this.item)
          copy.variables.forEach((element) => {
            element.item_text = this.parametros.find(x => x.value === element.parameter).item_text
            element.item_value = this.parametros.find(x => x.value === element.parameter).item_value
          })
          copy.columns = copy.columns && copy.columns.length ? copy.columns.map(x => x.text).join(',') : null
          let request = copy.id ? this.axios.put(`reportes/${copy.id}`, copy) : this.axios.post(`reportes`, copy)
          request
              .then(response => {
                this.$emit('guardado', response.data)
                this.$store.commit('SET_SNACKBAR', {color: 'success', message: `El reporte se guardo correctamente.`})
                this.close()
              })
              .catch(error => {
                this.loading = false
                this.$store.commit('SET_SNACKBAR', {color: 'error', message: `al guardar el reporte.`, error: error})
              })
        }
      })
    },
    open(idReporte = null) {
      if (!this.roles.length) this.getRoles()
      if (idReporte) {
        this.getReporte(idReporte)
      }
      this.dialog = true
    },
    close() {
      this.$refs.formReporte.reset()
      this.dialog = false
      this.loading = false
      this.item = this.clone(this.modelReporte)
    },
    getReporte(idReporte) {
      this.loading = true
      this.axios.get(`reportes/${idReporte}`)
          .then(response => {
            if (response.data.columns && response.data.columns.length) {
              response.data.columns = response.data.columns.split(',').map(x => {
                return {text: x, color: 'purple'}
              })
              response.data.items = this.clone(response.data.columns).concat([{header: 'Seleccionar o Crear un item'}])
            }
            response.data.roles = response.data.roles && response.data.roles.length ? response.data.roles.map(x => x.id) : []
            this.item = response.data
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {color: 'error', message: `al recuperar el reporte.`, error: error})
          })
    },
    getRoles() {
      this.axios.get(`roles`)
          .then(response => {
            this.roles = response.data.roles
          })
          .catch(error => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'error',
              message: `al solicitar los roles disponibles.`,
              error: error
            })
          })
    }
  }
}
</script>

<style scoped>

</style>