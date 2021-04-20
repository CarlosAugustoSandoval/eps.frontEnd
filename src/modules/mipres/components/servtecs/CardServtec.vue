<template>
  <div>
    <v-expansion-panels v-if="expand && data">
      <v-expansion-panel>
        <v-expansion-panel-header class="px-3 py-0">
          <v-list>
            <v-list-item class="pl-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-list-item-avatar v-on="on" color="primary" class="white--text font-weight-bold">{{ data.TipoTec }}</v-list-item-avatar>
                </template>
                <span>{{data.type}}</span>
              </v-tooltip>
              <v-list-item-content class="truncate-content pa-0">
                <p class="body-1 ma-0">{{ data.title }}</p>
                <v-list-item-subtitle class="caption" :class="data.classSubTitle || ''">{{ data.subTitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action v-if="botonDireccionamientos">
                <dialog-direccionamientos
                    :loading-documento="loadingDocumento"
                    @actualizado="$emit('actualizado')"
                    v-if="botonDireccionamientos"
                    :documento="documento"
                    :item="data"
                    :tipo="tipo"
                />
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pa-0">
          <v-divider class="my-0"></v-divider>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
              <tr v-for="(item, indexItem) in data.table" :key="`tr${indexItem}`">
                <td>{{ item.label }}</td>
                <td class="pl-0">{{ item.text }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <template v-else>
      <v-card style="contain: content !important;" class="elevation-1">
        <template v-if="data">
          <v-toolbar class="elevation-0">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-list-item-avatar v-on="on" color="primary" class="white--text font-weight-bold">{{ data.TipoTec }}</v-list-item-avatar>
              </template>
              <span>{{data.type}}</span>
            </v-tooltip>
            <v-toolbar-title>
              <v-list-item-content>
                <v-list-item-title class="py-1 mb-0">{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle class="caption mb-0" :class="data.classSubTitle || ''">{{ data.subTitle }}</v-list-item-subtitle>
                <v-list-item-subtitle
                    v-if="item.nodireccionamientos && item.nodireccionamientos.length"
                    class="caption red--text"
                >
                  Registra {{ item.nodireccionamientos.length }} No Direccionamiento{{ item.nodireccionamientos.length > 1 ? 's' : ''}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <dialog-full-servtec
                v-if="botonDetalle"
                class="mr-2"
                :item="item"
                :documento="documento"
                :tipo="tipo"
                :key-tecnologia="keyTecnologia"
            />
            <dialog-direccionamientos
                :loading-documento="loadingDocumento"
                @actualizado="$emit('actualizado')"
                v-if="botonDireccionamientos && data.objeto.EstJM !== 2 && data.objeto.EstJM !== 4"
                :documento="documento"
                :item="data"
                :tipo="tipo"
            />
          </v-toolbar>
          <v-divider class="mb-0"></v-divider>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
              <tr v-for="(item, indexItem) in data.table" :key="`tr${indexItem}`">
                <td>{{ item.label }}</td>
                <td class="pl-0">{{ item.text }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <template v-if="fullDetalle">
            <v-divider class="ma-0"></v-divider>
            <v-card-text>
              <template v-for="(itemList, indexList) in data.list.filter(x => x.visible !== false)">
                <v-list-item two-line class="pa-0" :key="`itemList${indexList}`">
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ itemList.title }}</v-list-item-subtitle>
                    <p class="pt-1 mb-0" v-html="itemList.text"/>
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="`itemListDivider${indexList}`" class="ma-0"></v-divider>
              </template>
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                  <tr v-for="(itemcr, indexItemcr) in data.causasRazones" :key="`tr${indexItemcr}`">
                    <td class="text-justify" :class="itemcr.classTdItem">{{ itemcr.label }}</td>
                    <td class="text-justify" min-width="140" max-width="50%">
                      {{
                        itemcr.text === 0 ? 'NO' : itemcr.text === 1 ? 'SI' : itemcr.text === 'null' ? '' : itemcr.text
                      }}
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </template>
        </template>
      </v-card>
    </template>
  </div>
</template>

<script>
import DialogFullServtec from '@/modules/mipres/components/servtecs/DialogFullServtec'
import DialogDireccionamientos from '@/modules/mipres/components/direccionamientos/DialogDireccionamientos'
import {contentMedicamentoP, contentComplementarioP, contentNutricionalP, contentProcedimientoP, contentDispositivoP} from './distribuidorPrescripcion'
import {contentMedicamentoT, contentComplementarioT, contentNutricionalT, contentProcedimientoT, contentDispositivoT} from './distribuidorTutela'

export default {
  name: 'CardServtec',
  props: {
    item: {
      type: Object,
      default: null
    },
    keyTecnologia: {
      type: String,
      default: 'M'
    },
    documento: {
      type: Object,
      default: null
    },
    tipo: {
      type: String,
      default: 'prescripción'
    },
    loadingDocumento: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    botonDireccionamientos: {
      type: Boolean,
      default: true
    },
    fullDetalle: {
      type: Boolean,
      default: false
    },
    botonDetalle: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DialogDireccionamientos,
    DialogFullServtec
  },
  data: () => ({
    data: null
  }),
  watch: {
    'item'(val) {
      val && this.assignData()
    }
  },
  computed: {
    esPrescripcion() {
      return this && this.tipo && this.tipo === 'prescripción'
    }
  },
  created() {
    this.assignData()
  },
  methods: {
    assignData() {
      console.log('this.itemzzzzz', this.item)
      switch (this.keyTecnologia) {
        case 'M': {
          this.data = this.esPrescripcion ? contentMedicamentoP(this.item): contentMedicamentoT(this.item)
          break
        }
        case 'S': {
          this.data = this.esPrescripcion ? contentComplementarioP(this.item) : contentComplementarioT(this.item)
          break
        }
        case 'N': {
          this.data = this.esPrescripcion ? contentNutricionalP(this.item) : contentNutricionalT(this.item)
          break
        }
        case 'P': {
          this.data = this.esPrescripcion ? contentProcedimientoP(this.item) : contentProcedimientoT(this.item)
          break
        }
        case 'D': {
          this.data = this.esPrescripcion ? contentDispositivoP(this.item) : contentDispositivoT(this.item)
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>