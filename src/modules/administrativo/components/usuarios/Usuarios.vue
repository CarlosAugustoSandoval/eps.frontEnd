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
            @click="crearUsuario"
        >
          <v-icon left dark>mdi-plus</v-icon>
          Crear Usuario
        </v-btn>
        <c-tooltip
            v-else
            top
            tooltip="Crear Usuario"
        >
          <v-btn
              dark
              fab
              small
              color="primary"
              @click="crearUsuario"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </c-tooltip>
      </template>
    </v-toolbar>
    <v-divider class="my-2"/>
    <data-table
        ref="tablaUsuarios"
        v-model="dataTable"
        @resetOption="item => resetOptions(item)"
        @borrarUsuario="item => borrarUsuario(item)"
        @editarUsuario="item => editarUsuario(item.id)"
    />
    <registro-usuario
        v-if="permisos.crear || permisos.editar"
        @guardado="$refs && $refs.tablaUsuarios ? $refs.tablaUsuarios.reloadPage() : ''"
        ref="registroUsuario"
        :accesorios="accesorios"
    />
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
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('usuarios')
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
            catchMessage: 'No ha sido posible eliminar el registro del usuario:'
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
      if(this.permisos.borrar) item.options.push({event: 'borrarUsuario', icon: 'mdi-trash-can', tooltip: 'Eliminar Usuario', color: 'red', btnClass: 'mr-1'})
      if(this.permisos.editar) item.options.push({event: 'editarUsuario', icon: 'mdi-pencil', tooltip: 'Editar Usuario', color: 'orange'})
      return item
    }
  }
}
</script>

<style scoped>

</style>