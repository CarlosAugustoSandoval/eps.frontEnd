<template>
  <v-dialog v-model="dialog" persistent max-width="1200px" v-if="permisos.show">
    <template v-slot:activator="{ on }">
      <v-badge
          v-on="on"
          overlap
          bordered
      >
        <template v-slot:badge>
          <span>{{ item.objeto.direccionamientos.length }}</span>
        </template>
        <c-tooltip top tooltip="Direccionamientos">
          <v-btn
              dark
              fab
              bottom
              small
              :color="item.objeto.EstJM && (item.objeto.EstJM === 1 || item.objeto.EstJM === 3) ? 'green' : 'red'"
              @click="dialog = (item.objeto.EstJM && (item.objeto.EstJM === 1 || item.objeto.EstJM === 3))"
          >
            <v-icon>fas fa-map-signs</v-icon>
          </v-btn>
        </c-tooltip>
      </v-badge>
    </template>
    <v-card>
      <v-toolbar class="elevation-0">
        <v-toolbar-title>
          <v-list-item class="px-0">
            <v-list-item-avatar size="40" color="green">
              <v-icon dark>fas fa-map-signs</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="truncate-content">
              <v-list-item-title class="title">Direccionamientos de {{ item.type }}</v-list-item-title>
              <v-list-item-subtitle class="caption">
                Prescripción: {{ documento.NoPrescripcion }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="my-0"></v-divider>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <card-servtec
                class="mb-3"
                :key-tecnologia="item.TipoTec"
                :documento="documento"
                :item="item.objeto"
                :boton-detalle="false"
                :boton-direccionamientos="false"
                expand
            />
          </v-col>
        </v-row>
        <v-window
            v-model="window"
            class="elevation-1"
        >
          <v-window-item>
            <v-card>
              <v-list dense two-line class="py-0">
                <v-list-item style="background-color: transparent !important;">
                  <v-list-item-content class="truncate-content py-0">
                    <v-list-item-title class="body-2">Direccionamientos registrados</v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Total direccionado: {{ cantidadDireccionada }} de {{ item.cantidadFormulada }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="ma-0">
                    <c-tooltip
                        left
                        :tooltip="
                          permisos.add
                            ? cantidadDireccionada >= Number(item.cantidadTotal)
                              ? 'Ya está cubierta la cantidad total a direccionar'
                              : 'Registrar direccionamiento'
                            : 'Sin permisos para registrar direccionamientos'
                        ">
                      <v-btn
                          dark
                          fab
                          small
                          :color="permisos.add && !(cantidadDireccionada >= Number(item.cantidadTotal)) ? 'blue' : 'grey'"
                          @click="window = permisos.add && !(cantidadDireccionada >= Number(item.cantidadTotal)) ? 1 : 0"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </c-tooltip>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider class="my-0"></v-divider>
              <v-simple-table dense v-if="item.objeto.direccionamientos.length">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-center"></th>
                    <th>Id</th>
                    <th>Código</th>
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
                  <tr v-for="(direccionamiento, indexDireccionamiento) in item.objeto.direccionamientos"
                      :key="`trDir${indexDireccionamiento}`">
                    <td class="text-center">
                      <c-tooltip top :tooltip="permisos.anular ? 'Anular' : 'Sin permisos para anular'">
                        <v-btn
                            dark
                            fab
                            x-small
                            depressed
                            :color="permisos.anular ? 'error' : 'grey'"
                            class="mr-1"
                            @click="anularDireccionamiento(direccionamiento)"
                        >
                          <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                      </c-tooltip>
                    </td>
                    <td>{{ direccionamiento.id_interno }}</td>
                    <td>{{ direccionamiento.IDDireccionamiento }}</td>
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
                    <td>{{ `${direccionamiento.TipoTec}${direccionamiento.CodSerTecAEntregar}` }}</td>
                    <td>{{ direccionamiento.FecMaxEnt }}</td>
                    <td>{{ direccionamiento.CodMunEnt }}</td>
                    <td>{{ `${direccionamiento.TipoIdProv}${direccionamiento.NoIDProv}` }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-row v-else justify="center" align="center" class="pa-3">
                <span class="text-body-1 grey--text">No hay direccionamientos registrados</span>
              </v-row>
            </v-card>
          </v-window-item>
          <v-window-item>
            <registro-direccionamiento
                v-if="window === 1"
                @cancelar="window = 0"
                :documento="documento"
                :tipo="tipo"
                :item="item"
            />
          </v-window-item>
        </v-window>
      </v-container>
      <loading :value="processingSection"></loading>
    </v-card>
    <!--    <detail-technologi-dialog ref="dialogInfoTechnologi"-->
    <!--                              @onProcess="processingSection = false"></detail-technologi-dialog>-->
    <!--    <confirmation-dialog-->
    <!--        ref="dialogCancel"-->
    <!--        color="error"-->
    <!--        heading="¿Anulación de entrega?"-->
    <!--        :message="`¿Está seguro de anular la entrega No. <strong>${selectedEntrega ? selectedEntrega.item.id : ''}</strong>?`"-->
    <!--        @onConfirm="cancelEntrega"-->
    <!--        @onCancel="selectedEntrega = null"-->
    <!--    >-->
    <!--    </confirmation-dialog>-->
  </v-dialog>
</template>

<script>
import RegistroDireccionamiento from './RegistroDireccionamiento'

export default {
  name: 'DialogDireccionamientos',
  props: {
    documento: {
      type: Object,
      default: null
    },
    tipo: {
      type: String,
      default: 'prescripción'
    },
    item: {
      type: Object,
      default: null
    }
  },
  components: {
    RegistroDireccionamiento,
    // RegistroEntrega: () => import('@/components/Prescripciones/ServiciosTecnologias/RegistroEntrega'),
    CardServtec: () => import('@/modules/mipres/components/servtecs/CardServtec')
  },
  computed: {
    cantidadDireccionada() {
      return this.item.objeto.direccionamientos && this.item.objeto.direccionamientos.length ? window.lodash.sum(this.item.objeto.direccionamientos.filter(z => (z.EstDireccionamiento === 1 || z.EstDireccionamiento === null) && !z.FecAnulacion).map(x => Number(x.CantTotAEntregar))) : 0
    },
    permisos() {
      return {
        show: true,
        add: true,
        anular: true
      }
      // return this.$store.getters.getPermissionModule('entregas')
    }
  },
  watch: {
    'dialog'(val) {
      if (val === false) this.window = 0
    }
  },
  data: () => ({
    selectedEntrega: null,
    processingSection: false,
    dialog: false,
    window: 0,
    headers: [
      {
        text: '',
        sortable: false
      },
      {
        text: 'Código',
        sortable: false
      },
      {
        text: 'Fecha Entrega',
        sortable: false
      },
      {
        text: 'Cantidad',
        align: 'center',
        sortable: false
      },
      {
        text: 'Servicio/Tecnología',
        align: 'center',
        sortable: false
      }
    ]
  }),
  methods: {
    getDetalleTechnologi(type, code) {
      this.processingSection = true
      this.$refs.dialogInfoTechnologi.getDetail(type, code)
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
      console.log('borrardo', borrardo)
      if (borrardo.confirm) {
        this.$emit('actualizado')
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `El direccionamiento se anuló correctamente.`
        })
      }
    },
    openDialogCancel(item) {
      this.selectedEntrega = item
      this.$refs.dialogCancel.open()
    },
    cancelEntrega() {
      this.$refs.dialogCancel.loading()
      this.axios.delete(`entregas/${this.selectedEntrega.item.id}`)
          .then(response => {
            console.log('okkk', response)
            this.item.objeto.entregas.splice(this.selectedEntrega.index, 1)
            this.$store.commit('snackbar', {
              color: 'success',
              message: `Se anuló la entrega No. ${this.selectedEntrega.item.id} de forma correcta`
            })
            this.$refs.dialogCancel.close()
          }).catch(e => {
        this.$refs.dialogCancel.loading(false)
        this.$store.commit('snackbar', {
          color: 'error',
          message: `al tratar de anular la entrega No. ${this.selectedEntrega.item.id}`,
          error: e
        })
      })
    }
  }
}
</script>

<style>
.badge-btn-entregas > span.v-badge__badge {
  height: 15px !important;
  width: 15px !important;
  font-size: 10px !important;
  right: -4px !important;
}
</style>