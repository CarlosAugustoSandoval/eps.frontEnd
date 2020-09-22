<template>
  <div>
    <v-simple-table dense v-if="nodireccionamientos.length">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center"></th>
          <th>No Direccionamiento</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>
            <c-tooltip top tooltip="Tipo de Servicio/Tecnología">
              <a>Tipo Serv/Tec</a>
            </c-tooltip>
          </th>
          <th>Causa No Entrega</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(nodireccionamiento, indexDireccionamiento) in nodireccionamientos"
            :key="`trDir${indexDireccionamiento}`">
          <td class="text-center">
            <c-tooltip
                v-if="nodireccionamiento.EstDireccionamiento !== 2"
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
                  @click="anularNoDireccionamiento(nodireccionamiento)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </c-tooltip>
          </td>
          <td>{{ nodireccionamiento.IDNODireccionamiento }}</td>
          <td>{{ nodireccionamiento.EstNODireccionamiento }}</td>
          <td>{{ nodireccionamiento.FecNODireccionamiento }}</td>
          <td>{{ nodireccionamiento.TipoTec }}</td>
          <td>{{
              causasnoentrega && causasnoentrega.length && nodireccionamiento.CausaNoEntrega && causasnoentrega.find(x => x.id === nodireccionamiento.CausaNoEntrega)
                  ? causasnoentrega.find(x => x.id === nodireccionamiento.CausaNoEntrega).causa
                  : nodireccionamiento.CausaNoEntrega
            }}
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row v-else justify="center" align="center" class="pa-3">
      <span class="text-body-1 grey--text">No hay direccionamientos registrados</span>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'TablaNoDireccionamientos',
  props: {
    nodireccionamientos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'causasnoentrega'
    ]),
    permisos() {
      return {
        show: true,
        add: true,
        anular: true
      }
    }
  },
  methods: {
    async anularNoDireccionamiento(nodireccionamiento) {
      let borrardo = await this.confirm(
          {
            title: 'Anular No Direccionamiento',
            subtitle: `¿Está seguro de anular el no direccionamiento <strong>${nodireccionamiento.IDNODireccionamiento}</strong>?`,
            route: `mipres/nodireccionamientos/${nodireccionamiento.IDNODireccionamiento}`,
            catchMessage: 'No ha sido posible anular el no direccionamiento:',
            buttonText: 'Si, Anular'
          }
      )
      if (borrardo.confirm) {
        this.$emit('actualizado')
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El no direccionamiento se anuló correctamente.`
        })
      }
    }
  }
}
</script>

<style scoped>

</style>