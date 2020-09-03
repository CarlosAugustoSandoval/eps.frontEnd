<template>
  <v-dialog
      v-model="dialog"
      width="720"
      persistent
  >
    <v-card>
      <loading :value="loading" absolute></loading>
      <v-card-title>
        <v-avatar v-if="accesorios" :color="accesorios.color" class="mr-2">
          <v-icon dark>{{ accesorios.icon }}</v-icon>
        </v-avatar>
        {{ !rol.id ? 'Nuevo Rol' : `Edición de Rol ID: ${rol.id}` }}
        <v-spacer></v-spacer>
        <v-btn
            dark
            icon
            @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-container fluid class="py-0">
        <v-row justify="center" align="center">
          <v-col cols="12" class="pb-0">
            <ValidationObserver ref="formRol" tag="form" autocomplete="off">
              <ValidationProvider name="nombre rol" rules="required" v-slot="{ errors }">
                <v-text-field
                    v-model="rol.name"
                    dense
                    outlined
                    clearable
                    :error-messages="errors"
                    label="Nombre Rol"
                >
                  <template v-slot:append-outer>
                    <v-btn color="primary" class="mt-n1" v-if="$vuetify.breakpoint.smAndUp" @click="guardarRol">
                      <v-icon left dark>mdi-content-save</v-icon>
                      Guardar
                    </v-btn>
                    <v-tooltip v-else top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                            v-on="on"
                            dark
                            fab
                            small
                            color="primary"
                            class="mt-n2"
                            @click="guardarRol"
                        >
                          <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                      </template>
                      <span>Guardar</span>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </ValidationObserver>
          </v-col>
          <v-col cols="12" v-if="rol && rol.id && permissions && permissions.length">
            <v-subheader style="height: 12px !important;">
              <v-icon left small>mdi-key</v-icon>
              Permisos
            </v-subheader>
            <v-list dense>
              <template v-for="(permiso, indexPermiso) in permissions">
                <v-list-item :key="`permiso${indexPermiso}`">
                  <v-list-item-content>
                    <v-list-item-title>{{ permiso.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ permiso.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch @change="changePermiso(permiso)" :loading="permiso.loading" :readonly="permiso.loading"
                              v-model="rol.permissions" :value="permiso"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            block
            color="primary"
            @click="close"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegistroRol',
  props: {
    accesorios: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    dialog: false,
    loading: false,
    rol: null,
    permissions: [],
    makeRol: {
      id: null,
      name: null,
      permissions: []
    }
  }),
  created() {
    this.rol = this.clone(this.makeRol)
  },
  methods: {
    changePermiso(permiso) {
      permiso.loading = true
      this.axios.put(`roles/${this.rol.id}/permission/${permiso.id}`).then(response => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: response.data.message,
        })
        permiso.loading = false
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          message: `Error al actualizar el permiso ${permiso.name}`,
          error: error
        })
        permiso.loading = false
        this.getRol(this.rol.id)
      })
    },
    guardarRol() {
      this.$refs.formRol.validate().then(result => {
        if (result) {
          this.loading = true
          let request = this.rol.id
              ? this.axios.put(`roles/${this.rol.id}`, this.rol)
              : this.axios.post(`roles`, this.rol)
          request
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El rol se ha ${this.rol.id ? 'editado' : 'guardado'} correctamente.`
                })
                if (this.rol.id) {
                  this.rol = response.data
                } else {
                  await this.cleanShow(response)
                }
                this.$emit('guardado')
                this.loading = false
              })
              .catch(() => {
                this.$swal({
                  icon: 'error',
                  title: `Error al guardar el rol.`,
                  text: ''
                })
                this.loading = false
              })
        }
      })
    },
    async cleanShow(response) {
      response.data.role.permissions.forEach(x => {
        delete x.pivot
        x.loading = false
      })
      response.data.permissions.forEach(x => {
        x.loading = false
      })
      this.rol = response.data.role
      this.permissions = response.data.permissions
    },
    open(rolId = null) {
      if (rolId) {
        this.getRol(rolId)
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.rol = this.clone(this.makeRol)
      this.$refs.formRol.reset()
    },
    getRol(rolId) {
      this.loading = true
      this.axios.get(`roles/${rolId}`)
          .then(async response => {
            await this.cleanShow(response)
            this.loading = false
          })
          .catch(() => {
            this.$swal({
              icon: 'error',
              title: `Error al recuperar el rol con ID ${rolId}.`,
              text: ''
            })
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>