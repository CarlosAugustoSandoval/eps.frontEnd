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
              :color="esPrecripcion ? (item.objeto.EstJM && (item.objeto.EstJM === 1 || item.objeto.EstJM === 3) ? 'green' : item.objeto.EstJM === 2 ? 'red' : 'grey lighten-2') : 'green'"
              @click="dialog = esPrecripcion ? (item.objeto.EstJM && (item.objeto.EstJM === 1 || item.objeto.EstJM === 3)) : true"
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
                {{ esPrecripcion ? `Prescripción: ${documento.NoPrescripcion}` : `Tutela: ${documento.NoTutela}`}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            @click="close"
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
                :tipo="tipo"
                :boton-detalle="false"
                :boton-direccionamientos="false"
                expand
            />
          </v-col>
        </v-row>
        <v-window
            v-model="window"
            class="elevation-0"
        >
          <v-window-item>
            <v-card flat class="elevation-0">
              <loading :value="loadingDocumento" absolute/>
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
              <template v-if="item.objeto.nodireccionamientos.length">
                <v-card>
                  <v-subheader class="font-weight-bold">Registro de No Direccionamiento</v-subheader>
                  <tabla-no-direccionamientos
                      @actualizado="$emit('actualizado')"
                      :nodireccionamientos="item.objeto.nodireccionamientos"
                  />
                </v-card>
                <v-card class="mt-3">
                  <v-subheader class="font-weight-bold">Registros de Direccionamientos</v-subheader>
                  <tabla-direccionamientos
                      @actualizado="$emit('actualizado')"
                      :direccionamientos="item.objeto.direccionamientos"
                  />
                </v-card>
              </template>
              <v-card v-else>
                <tabla-direccionamientos
                    @actualizado="$emit('actualizado')"
                    :direccionamientos="item.objeto.direccionamientos"
                />
              </v-card>
            </v-card>
          </v-window-item>
          <v-window-item>
            <registro-direccionamiento
                v-if="window === 1"
                @cancelar="window = 0"
                :documento="documento"
                :tipo="tipo"
                :item="item"
                @guardado="$emit('actualizado')"
            />
          </v-window-item>
        </v-window>
      </v-container>
      <loading :value="processingSection"/>
    </v-card>
  </v-dialog>
</template>

<script>
import RegistroDireccionamiento from './RegistroDireccionamiento'
import TablaDireccionamientos from './TablaDireccionamientos'
import TablaNoDireccionamientos from './TablaNoDireccionamientos'

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
    },
    loadingDocumento: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TablaNoDireccionamientos,
    TablaDireccionamientos,
    RegistroDireccionamiento,
    CardServtec: () => import('@/modules/mipres/components/servtecs/CardServtec')
  },
  computed: {
    esPrecripcion() {
      return this && this.tipo === 'prescripción'
    },
    cantidadDireccionada() {
      return this.item.objeto.direccionamientos && this.item.objeto.direccionamientos.length ? window.lodash.sum(this.item.objeto.direccionamientos.filter(z => (z.EstDireccionamiento === 1 || z.EstDireccionamiento === 2 || z.EstDireccionamiento === null) && !z.FecAnulacion).map(x => Number(x.CantTotAEntregar))) : 0
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
    close() {
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>