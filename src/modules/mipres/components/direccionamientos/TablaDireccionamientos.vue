<template>
  <div>
    <v-simple-table dense v-if="direccionamientos.length">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center"></th>
          <th>ID</th>
          <th>
            <c-tooltip top tooltip="Número de Entrega">
              <a>Entrega</a>
            </c-tooltip>
          </th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Cantidad</th>
          <th>Servicio/Tecnología</th>
          <th>
            <c-tooltip top tooltip="Fecha Maxima de Entrega">
              <a>Fecha M.E.</a>
            </c-tooltip>
          </th>
          <th>
            <c-tooltip top tooltip="Municipio de Entrega">
              <a>Municipio</a>
            </c-tooltip>
          </th>
          <th>Proveedor</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(direccionamiento, indexDireccionamiento) in direccionamientos"
            :key="`trDir${indexDireccionamiento}`">
          <td class="text-center">
            <c-tooltip
                v-if="direccionamiento.EstDireccionamiento !== 2"
                top
                :tooltip="permisos.anular ? 'Anular' : 'Sin permisos para anular'"
            >
              <v-btn
                  dark
                  fab
                  x-small
                  depressed
                  :color="permisos.anular ? 'error' : 'grey'"
                  class="my-1"
                  @click="permisos.anular ? anularDireccionamiento(direccionamiento) : ''"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </c-tooltip>
            <c-tooltip
                v-if="direccionamiento.EstDireccionamiento === null"
                top
                :tooltip="permisos.reenviar ? 'Reenviar' : 'Sin permisos para reenviar'"
            >
              <v-btn
                  dark
                  fab
                  x-small
                  depressed
                  :color="permisos.reenviar ? 'blue' : 'grey'"
                  class="my-1"
                  @click="reenviarDireccionamiento(direccionamiento)"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </c-tooltip>
          </td>
          <td>{{ direccionamiento.ID }}</td>
          <td>{{ direccionamiento.NoEntrega }}</td>
          <td>
            {{
              direccionamiento.FecAnulacion
                  ? 'Anulado'
                  : direccionamiento.EstDireccionamiento === null
                  ? 'Preregistro'
                  : direccionamiento.EstDireccionamiento
            }}
          </td>
          <td>{{ direccionamiento.FecDireccionamiento }}</td>
          <td>{{ direccionamiento.CantTotAEntregar }}</td>
          <td>
            <a @click="getDetailSerTec(direccionamiento.TipoTec, direccionamiento.CodSerTecAEntregar)">{{ `${direccionamiento.TipoTec}${direccionamiento.CodSerTecAEntregar}` }}</a>
          </td>
          <td>{{ direccionamiento.FecMaxEnt }}</td>
          <td>{{ direccionamiento.CodMunEnt }}</td>
          <td>
            <c-item-list
                v-if="direccionamiento.prestador"
                :item="{ title:direccionamiento.prestador.nombre, subtitle:`${direccionamiento.prestador.tipo_identificacion}${direccionamiento.prestador.nitsnit}` }"
            />
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row v-else justify="center" align="center" class="pa-3">
      <span class="text-body-1 grey--text">No hay direccionamientos registrados</span>
    </v-row>
    <dialog-producto
        ref="dialogProducto"
    />
  </div>
</template>

<script>
export default {
  name: 'TablaDirecciomientos',
  props: {
    direccionamientos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('direccionamientos')
    }
  },
  methods: {
    getDetailSerTec (tipo, codigo) {
      this.$refs.dialogProducto.getDetail(tipo, codigo)
    },
    async anularDireccionamiento(direccionamiento) {
      let borrardo = await this.confirm(
          {
            title: 'Anular Direccionamiento',
            subtitle: `¿Está seguro de anular el direccionamiento id <strong>${direccionamiento.id_interno}</strong>?`,
            route: `mipres/direccionamientos/${direccionamiento.id_interno}`,
            catchMessage: 'No ha sido posible anular el direccionamiento:',
            buttonText: 'Si, Anular'
          }
      )
      if (borrardo.confirm) {
        this.$emit('actualizado')
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El direccionamiento se anuló correctamente.`
        })
      }
    },
    async reenviarDireccionamiento(direccionamiento) {
      const registro = this.clone(direccionamiento)
      registro.FecDireccionamiento = this.moment().format('YYYY-MM-DD')
      let reenviado = await this.confirm(
          {
            title: 'Reenviar Direccionamiento',
            subtitle: `¿Está seguro de reenviar el direccionamiento id <strong>${registro.id_interno}</strong>?`,
            route: `mipres/direccionamientos/${registro.id_interno}`,
            method: 'put',
            data: registro,
            catchMessage: 'No ha sido posible reenviar el direccionamiento:',
            buttonText: 'Si, Reenviar',
            buttonColor: 'Primary'
          }
      )
      if (reenviado.confirm) {
        this.$emit('actualizado')
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El direccionamiento se reenvió correctamente.`
        })
      }
    }
  }
}
</script>

<style scoped>

</style>