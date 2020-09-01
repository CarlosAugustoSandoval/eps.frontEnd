<template>
  <v-dialog
      v-model="dialog"
      width="620"
      persistent
  >
    <v-card>
      <loading :value="loading"></loading>
      <v-card-title>
        <v-avatar v-if="accesorios" :color="accesorios.color" class="mr-2">
          <v-icon dark>{{ accesorios.icon }}</v-icon>
        </v-avatar>
        {{ !usuario.id ? 'Nuevo Usuario' : `Edición del Usuario  ${usuario.name}` }}
        <v-spacer></v-spacer>
        <v-btn
            dark
            icon
            @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
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
                console.log('el response del edit', response)
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
            this.direct_permissions_availables = response.data.direct_permissions_availables
            this.roles = response.data.roles
            this.usuario = response.data.user
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
    }
  }
}
</script>

<style scoped>

</style>