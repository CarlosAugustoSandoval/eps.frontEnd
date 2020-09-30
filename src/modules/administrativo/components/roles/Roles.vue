<template>
  <div>
    <v-toolbar dense class="elevation-0" v-if="accesorios">
      <v-avatar :color="accesorios.color" class="mr-2">
        <v-icon dark>{{accesorios.icon}}</v-icon>
      </v-avatar>
      <v-toolbar-title>{{ accesorios.title }}</v-toolbar-title>
      <template v-if="permisos.crear">
        <v-spacer></v-spacer>
        <v-btn
            v-if="$vuetify.breakpoint.smAndUp"
            color="primary"
            @click="crearRol"
        >
          <v-icon left dark>mdi-plus</v-icon>
          Crear Rol
        </v-btn>
        <c-tooltip
            v-else
            top
            tooltip="Crear Rol"
        >
          <v-btn
              dark
              fab
              small
              color="primary"
              @click="crearRol"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </c-tooltip>
      </template>
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
            <c-tooltip
                top
                tooltip="Eliminar Rol"
                v-if="permisos.borrar"
            >
              <v-btn
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
            </c-tooltip>
            <c-tooltip
                top
                tooltip="Editar Rol"
                v-if="permisos.editar"
            >
              <v-btn
                  dark
                  fab
                  x-small
                  depressed
                  color="orange"
                  @click="editarRol(rol.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </c-tooltip>
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
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('roles')
    }
  },
  data: () => ({
    loading: false,
    roles: []
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