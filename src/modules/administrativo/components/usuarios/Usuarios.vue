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
      >
        <v-icon left dark>mdi-plus</v-icon>
        Crear Usuario
      </v-btn>
      <v-tooltip v-else top>
        <template v-slot:activator="{ on }">
          <v-btn
              v-on="on"
              dark
              fab
              small
              color="primary"
              @click="crearUsuario"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Crear Usuario</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider class="my-2"></v-divider>
    <data-table
        ref="tablaUsuarios"
        v-model="dataTable"
        @resetOption="item => resetOptions(item)"
        @borrarUsuario="item => borrarUsuario(item)"
        @editarUsuario="item => editarUsuario(item.id)"
    ></data-table>
    <registro-usuario @guardado="$refs && $refs.tablaUsuarios ? $refs.tablaUsuarios.reloadPage() : ''" ref="registroUsuario" :accesorios="accesorios"></registro-usuario>
  </div>
</template>

<script>
import RegistroUsuario from './RegistroUsuario'
export default {
  name: 'Usuarios',
  components: {RegistroUsuario},
  props: {
    accesorios: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    dataTable: {
      buttonZone: false,
      nameItemState: 'tablaUsuarios',
      route: 'users',
      makeHeaders: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Correo Electrónico',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Opciones',
          align: 'center',
          sortable: false,
          actions: true,
          singlesActions: true
        }
      ]
    }
  }),
  methods: {
    crearUsuario() {
      this.$refs.registroUsuario.open()
    },
    editarUsuario(usuarioId) {
      this.$refs.registroUsuario.open(usuarioId)
    },
    async borrarUsuario(usuario) {
      let borrardo = await this.confirm(
          {
            title: 'Eliminar Usuario',
            subtitle: `¿Está seguro de eliminar el usuario <strong>${usuario.name}</strong>?`,
            route: `users/${usuario.id}`,
            catchMessage: 'No ha sido posible eliminar el registro del usuario:',
          }
      )
      if (borrardo.confirm) {
        this.$refs.tablaUsuarios.reloadPage()
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El usuario se ha eliminado correctamente.`
        })
      }
    },
    resetOptions(item) {
      item.options = []
      item.options.push({event: 'borrarUsuario', icon: 'mdi-trash-can', tooltip: 'Eliminar Usuario', color: 'red'})
      item.options.push({event: 'editarUsuario', icon: 'mdi-pencil', tooltip: 'Editar Usuario', color: 'orange'})
      return item
    }
  }
}
</script>

<style scoped>

</style>