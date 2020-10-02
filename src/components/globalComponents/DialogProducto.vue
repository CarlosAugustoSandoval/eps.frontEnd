<template>
  <v-dialog v-model="show" :max-width="maxWidth" :persistent="persistent" scrollable>
    <v-card>
      <loading :value="loading" absolute/>
      <v-card-title class="headline">
        <v-avatar color="primary" class="mr-2 white--text" size="40">{{detailTecnology && detailTecnology.avatar}}</v-avatar>
        {{ detailTecnology && detailTecnology.type }}
      </v-card-title>
      <v-divider/>
      <v-card-text class="pa-0" style="max-height: 600px;">
        <v-list two-line>
          <template v-for="(item, index) in detailTecnology && detailTecnology.items">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <p class="mb-0 text--secondary text-xs-justify">{{ item.description }}</p>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn
            block
            @click="close"
            text
            color="primary"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    heading: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: '500'
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    show: false,
    detailTecnology: null
  }),
  computed: {
    ...mapGetters([
      'cups',
      'complementarios',
      'nutricionales',
      'dispositivos'
    ])
  },
  methods: {
    async getDetail(type, code) {
      this.detailTecnology = null
      this.open()
      if (type === 'M') {
        await this.$store.dispatch('getCUMs', code)
            .then(response => {
              if (response.length) {
                const result = response[0]
                this.detailTecnology = {
                  avatar: 'M',
                  type: 'Medicamento',
                  items: [
                    {title: 'Código', description: `${type}${code}`},
                    {title: 'Descripción comercial', description: `${result.descripcioncomercial}`},
                    {title: 'Producto', description: `${result.producto}`},
                    {title: 'Principio activo', description: `${result.principioactivo}`},
                    {title: 'Forma farmacéutica', description: `${result.formafarmaceutica}`},
                    {title: 'Vía de administración', description: `${result.viaadministracion}`},
                    {title: 'Rol', description: `${result.nombrerol} - ${result.tiporol}`},
                    {title: 'Titular', description: `${result.titular}`}
                  ]
                }
                this.$emit('onProcess', true)
                this.loading = false
              } else {
                this.$emit('onProcess', false)
                this.close()
                this.$store.commit('SET_SNACKBAR', {
                  color: 'warning',
                  message: `Medicamento ${type + '' + code} no encontrado.`
                })
              }
            })
            .catch(e => {
              this.$emit('onProcess', false)
              this.close()
              this.$store.commit('SET_SNACKBAR', {
                color: 'error',
                message: `Error al recuperar el medicamento ${type + '' + code}`,
                error: e
              })
            })
      } else {
        switch (type) {
          case 'P': {
            let resultP = this.cups.find(x => x.codigo == code)
            if (resultP) {
              this.detailTecnology = {
                avatar: 'P',
                type: 'Procedimiento',
                items: [
                  {title: 'Código', description: `${type}${code}`},
                  {title: 'Descripción', description: `${resultP.descripcion}`}
                ]
              }
              this.$emit('onProcess', true)
              this.loading = false
            } else {
              this.$emit('onProcess', false)
              this.close()
              this.$store.commit('SET_SNACKBAR', {
                color: 'warning',
                message: `Procedimiento ${type + '' + code} no encontrado.`
              })
            }
            break
          }
          case 'N': {
            let resultN = this.nutricionales.find(x => x.codigo == code)
            if (resultN) {
              this.detailTecnology = {
                avatar: 'N',
                type: 'Producto de soporte nutricional',
                items: [
                  {title: 'Código', description: `${type}${code}`},
                  {title: 'Descripción', description: `${resultN.descripcion}`},
                  {title: 'Presentacion', description: `${resultN.presentacion} ${resultN.unidades}`},
                  {title: 'Forma', description: `${resultN.forma}`},
                  {title: 'Grupo', description: `${resultN.grupo}`}
                ]
              }
              this.$emit('onProcess', true)
              this.loading = false
            } else {
              this.$emit('onProcess', false)
              this.close()
              this.$store.commit('SET_SNACKBAR', {
                color: 'warning',
                message: `Producto de soporte nutricional ${type + '' + code} no encontrado.`
              })
            }
            break
          }
          case 'S': {
            let resultS = this.complementarios.find(x => x.codigo == code || x.codigo == ('0' + code))
            if (resultS) {
              this.detailTecnology = {
                avatar: 'S',
                type: 'Servicio complementario',
                items: [
                  {title: 'Código', description: `${type}${code}`},
                  {title: 'Descripción', description: `${resultS.descripcion}`}
                ]
              }
              this.$emit('onProcess', true)
              this.loading = false
            } else {
              this.$emit('onProcess', false)
              this.close()
              this.$store.commit('SET_SNACKBAR', {
                color: 'warning',
                message: `Servicio complementario ${type + '' + code} no encontrado.`
              })
            }
            break
          }
          case 'D': {
            let resultD = this.dispositivos.find(x => x.codigo == code)
            if (resultD) {
              this.detailTecnology = {
                avatar: 'D',
                type: 'Dispositivo',
                items: [
                  {title: 'Código', description: `${type}${code}`},
                  {title: 'Descripción', description: `${resultD.descripcion}`}
                ]
              }
              this.$emit('onProcess', true)
              this.loading = false
            } else {
              this.$emit('onProcess', false)
              this.close()
              this.$store.commit('SET_SNACKBAR', {
                color: 'warning',
                message: `Dispositivo ${type + '' + code} no encontrado.`
              })
            }
            break
          }
        }
      }
    },
    open() {
      this.loading = true
      this.show = true
    },
    close() {
      this.show = false
      this.loading = false
      this.$emit('onClose')
    }
  }
}
</script>
