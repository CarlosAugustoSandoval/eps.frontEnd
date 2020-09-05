<template>
  <div>
    <v-toolbar dense class="elevation-0" v-if="accesorios">
      <v-avatar :color="accesorios.color" class="mr-2">
        <v-icon dark>{{accesorios.icon}}</v-icon>
      </v-avatar>
      <v-toolbar-title>{{ accesorios.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          v-if="$vuetify.breakpoint.smAndUp"
          color="primary"
          @click="crearRol"
      >
        <v-icon left dark>mdi-plus</v-icon>
        Crear Rol
      </v-btn>
      <v-tooltip v-else top>
        <template v-slot:activator="{ on }">
          <v-btn
              v-on="on"
              dark
              fab
              small
              color="primary"
              @click="crearRol"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Crear Rol</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider class="my-2"></v-divider>
    <loading :value="loading"/>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th class="text-center"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rol, indexRol) in roles" :key="`rol${indexRol}`">
          <td>{{ rol.id }}</td>
          <td>{{ rol.name }}</td>
          <td class="text-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                    v-on="on"
                    dark
                    fab
                    x-small
                    depressed
                    color="red"
                    class="mr-1"
                    @click="borrarRol(rol)"
                >
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Eliminar Rol</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                    v-on="on"
                    dark
                    fab
                    x-small
                    depressed
                    color="orange"
                    @click="editarRol(rol.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Editar Rol</span>
            </v-tooltip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <registro-rol @guardado="getRoles" ref="registroRol" :accesorios="accesorios"></registro-rol>
  </div>
</template>

<script>

import RegistroRol from './RegistroRol'
export default {
  name: 'Roles',
  components: {RegistroRol},
  props: {
    accesorios: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    loading: false,
    roles: [],
    permisos: []
  }),
  created() {
    this.getRoles()
  },
  methods: {
    crearRol() {
      this.$refs.registroRol.open()
    },
    editarRol(rolId) {
      this.$refs.registroRol.open(rolId)
    },
    async borrarRol(rol) {
      let borrardo = await this.confirm(
          {
            title: 'Eliminar Rol',
            subtitle: `¿Está seguro de eliminar el rol ${rol.name}?`,
            route: `roles/${rol.id}`,
            catchMessage: 'No ha sido posible eliminar el registro:',
          }
      )
      if (borrardo.confirm) {
        this.getRoles()
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El rol se ha eliminado correctamente.`
        })
      }
    },
    getRoles() {
      this.loading = true
      this.axios.get(`roles`)
          .then(response => {
            this.roles = response.data.roles
            this.permisos = response.data.permisos
            this.loading = false
          })
          .catch(() => {
            this.$swal({
              icon: 'error',
              title: `Error al recuperar los roles.`,
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