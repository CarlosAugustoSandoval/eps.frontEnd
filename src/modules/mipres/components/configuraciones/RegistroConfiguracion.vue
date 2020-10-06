<template>
  <v-dialog v-model="dialog" persistent max-width="620px">
    <template v-slot:activator="{ on }">
      <c-tooltip
          :disabled="!$vuetify.breakpoint.smAndDown"
          left
          :tooltip="textTooltip"
      >
        <v-btn
            v-if="$vuetify.breakpoint.smAndDown"
            dark
            fab
            bottom
            small
            color="primary"
            v-on="on"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-btn
            v-else
            color="primary"
            dark
            v-on="on"
        >
          <v-icon left size="20">mdi-cog</v-icon>
          {{ textButton }}
        </v-btn>
      </c-tooltip>
    </template>
    <v-card>
      <v-toolbar class="elevation-0">
        <v-toolbar-title>
          <v-list-item class="px-0">
            <v-list-item-avatar size="40" color="red">
              <v-icon dark>mdi-cog</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="truncate-content">
              <v-list-item-title class="title">Registro de Configuración</v-list-item-title>
              <v-list-item-subtitle class="caption text-wrap">
                {{ registro ? registro.title : '' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click="cancelar"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="my-0"></v-divider>
      <ValidationObserver ref="formConfiguracion" tag="form" autocomplete="off">
        <v-container fluid v-if="registro">
          <v-row>
            <v-col cols="12" class="pb-0">
              <c-texto
                  v-model="registro.value"
                  label="Token"
                  name="Token"
                  rules="required"
              />
            </v-col>
          </v-row>
        </v-container>
      </ValidationObserver>
      <loading :value="loading"/>
      <v-card-actions>
        <v-btn
            text
            color="primary"
            @click="cancelar"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="guardar"
        >
          <v-icon>mdi-content-save</v-icon>
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'RegistroConfiguracion',
  props: {
    textButton: {
      type: String,
      default: null
    },
    textTooltip: {
      type: String,
      default: null
    },
    configuracion: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    registro: null,
    loading: false,
    dialog: false
  }),
  computed: {
    ...mapGetters([
      'causasnoentrega'
    ])
  },
  watch: {
    'dialog': {
      handler(val) {
        if (val) this.open()
        else this.cancelar()
      },
      immediate: false
    }
  },
  methods: {
    guardar() {
      this.$refs.formConfiguracion.validate().then(result => {
        if (result) {
          this.loading = true
          this.axios.put(`mipres/configuraciones/${this.registro.key}`, {value: this.registro.value} )
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El registro de configuración se ha guardado correctamente.`
                })
                this.$emit('actualizado', response.data)
                this.cancelar()
              })
              .catch(e => {
                this.$swal({
                  icon: 'error',
                  title: `Error al guardar el registro de configuración.`,
                  text: e.response.data && e.response.data.type ? `Error ${e.response.data.type}, ${e.response.data.message}` : ''
                })
                this.loading = false
              })
        }
      })
    },
    open() {
      this.registro = this.clone(this.configuracion)
    },
    cancelar() {
      this.dialog = false
      this.loading = false
      setTimeout(() => {
        this.registro = null
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>