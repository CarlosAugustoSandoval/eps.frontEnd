<template>
  <v-dialog
      v-model="dialog"
      width="620"
      persistent
  >
    <v-card>
      <loading :value="loading" absolute/>
      <v-card-title>
        <v-avatar v-if="accesorios" :color="accesorios.color" class="mr-2">
          <v-icon dark>{{ accesorios.icon }}</v-icon>
        </v-avatar>
        {{ !usuario.id ? 'Nuevo Usuario' : `Edición de Usuario` }}
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <template v-if="usuario && usuario.id">
        <v-card-text>
          <v-card>
            <v-subheader>Datos Básicos</v-subheader>
            <ValidationObserver ref="formUsuario" tag="form" autocomplete="off">
              <v-container fluid class="py-0">
                <v-row justify="center" align="center">
                  <v-col cols="12" class="pb-0">
                    <c-texto
                        v-model="usuario.name"
                        label="Nombre de Usuario"
                        rules="required"
                        name="nombre de usuario"
                    />
                  </v-col>
                  <v-col cols="12" class="pb-0">
                    <c-texto
                        v-model="usuario.email"
                        label="Correo Electrónico"
                        rules="required|email"
                        name="correo electrónico"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </ValidationObserver>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  @click="guardarUsuario"
              >
                <v-icon>mdi-content-save</v-icon>
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-card-text v-if="roles.length">
          <v-card>
            <v-subheader>Roles Asignados</v-subheader>
            <v-list dense>
              <v-list-item v-for="(rol, indexRol) in roles" :key="`rol${indexRol}`">
                <v-list-item-content>
                  <v-list-item-title>{{ rol.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch @change="changeRol(rol)" :loading="rol.loading" :readonly="rol.loading"
                            v-model="usuario.roles" :value="rol"></v-switch>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              text
              block
              color="primary"
              @click="close"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <ValidationObserver ref="formUsuario" tag="form" autocomplete="off">
          <v-container fluid class="py-0">
            <v-row justify="center" align="center">
              <v-col cols="12" class="pb-0">
                <c-texto
                    v-model="usuario.name"
                    label="Nombre de Usuario"
                    rules="required"
                    name="nombre de usuario"
                />
              </v-col>
              <v-col cols="12" class="pb-0">
                <c-texto
                    v-model="usuario.email"
                    label="Correo Electrónico"
                    rules="required|email"
                    name="correo electrónico"
                />
              </v-col>
            </v-row>
          </v-container>
        </ValidationObserver>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
              text
              color="primary"
              @click="close"
          >
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              @click="guardarUsuario"
          >
            <v-icon>mdi-content-save</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegistroUsuario',
  props: {
    accesorios: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    dialog: false,
    loading: false,
    direct_permissions_availables: [],
    roles: [],
    usuario: null,
    makeUsuario: {
      id: null,
      name: null,
      email: null,
      password: null,
      permissions: [],
      roles: []
    }
  }),
  created() {
    this.usuario = this.clone(this.makeUsuario)
  },
  methods: {
    changeRol(rol) {
      rol.loading = true
      this.axios.put(`users/${this.usuario.id}/role/${rol.id}`).then(() => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: 'El rol se actualizó correctamente',
        })
        rol.loading = false
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          message: `Error al actualizar el rol ${rol.name}`,
          error: error
        })
        rol.loading = false
        this.getUsuario(this.usuario.id)
      })
    },
    guardarUsuario() {
      this.$refs.formUsuario.validate().then(result => {
        if (result) {
          this.loading = true
          let request = this.usuario.id
              ? this.axios.put(`users/${this.usuario.id}`, this.usuario)
              : this.axios.post(`users`, this.usuario)
          request
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El usuario se ha ${this.usuario.id ? 'editado' : 'guardado'} correctamente.`
                })
                if (!this.usuario.id) await this.cleanShow(response)
                this.$emit('guardado')
                this.loading = false
              })
              .catch(() => {
                this.$swal({
                  icon: 'error',
                  title: `Error al guardar el usuario.`,
                  text: ''
                })
                this.loading = false
              })
        }
      })
    },
    open(usuarioId = null) {
      if (usuarioId) {
        this.getUsuario(usuarioId)
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.usuario = this.clone(this.makeUsuario)
      this.$refs.formUsuario.reset()
    },
    getUsuario(usuarioId) {
      this.loading = true
      this.axios.get(`users/${usuarioId}`)
          .then(async response => {
            await this.cleanShow(response)
            this.loading = false
          })
          .catch(() => {
            this.$swal({
              icon: 'error',
              title: `Error al recuperar el usuario con ID ${usuarioId}.`,
              text: ''
            })
            this.loading = false
          })
    },
    async cleanShow(response) {
      response.data.user.roles.forEach(x => {
        delete x.pivot
        delete x.permissions
        x.loading = false
      })
      response.data.roles.forEach(x => {
        x.loading = false
      })
      this.roles = response.data.roles
      this.direct_permissions_availables = response.data.direct_permissions_availables
      this.usuario = response.data.user
    }
  }
}
</script>

<style scoped>

</style>