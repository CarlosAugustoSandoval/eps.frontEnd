<template>
  <v-row>
    <loading :value="loading" absolute/>
    <v-col cols="12" sm="12" md="6">
      <v-card flat>
        <v-card-text class="pt-0">
          <v-card class="elevation-1">
            <v-card-text class="py-0">
              <datos-persona-list
                  definicion="Paciente"
                  v-if="documento"
                  two-line
                  :sexo="direccionamiento.sexo"
                  :title="`${documento.identificacion_completa} - ${documento.nombre_completo}`"
                  :subtitle2="[direccionamiento.DirPaciente ? `<i class='fas fa-map-signs'></i> ${direccionamiento.DirPaciente}` : null, direccionamiento.celular ? `<a href='tel:${direccionamiento.celular}'><i class='mdi mdi-cellphone-iphone'></i>${direccionamiento.celular}</a>` : null].filter(x => x).join(' - ') "
              />
            </v-card-text>
          </v-card>
          <card-servtec
              class="mt-2"
              :key-tecnologia="item.TipoTec"
              :documento="documento"
              :item="item.objeto"
              :tipo="tipo"
              :boton-detalle="false"
              :boton-direccionamientos="false"
          />
        </v-card-text>
      </v-card>
    </v-col>
<!--    <v-divider vertical></v-divider>-->
    <v-col cols="12" sm="12" md="6">
      <v-card flat>
        <v-list dense class="py-0 pt-0">
          <v-list-item style="background-color: transparent !important;">
            <v-list-item-content class="truncate-content py-0">
              <v-list-item-title class="title">Nuevo Direccionamiento</v-list-item-title>
              <v-list-item-subtitle class="caption">
                Total direccionado: {{ cantidadDireccionada }} de {{ item.cantidadFormulada }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <ValidationObserver ref="formDireccionamiento" tag="form" autocomplete="off">
          <v-container fluid>
            <v-row>
              <v-col cols="12" v-if="item && item.objeto && item.objeto.nodireccionamientos && item.objeto.nodireccionamientos.length === 0">
                <c-radio
                    v-model="direccionamiento.tipo_registro"
                    label="Tipo de registro"
                    rules="required"
                    name="tipo de registro"
                    :items="[{value: true, text: 'Direccionamiento'}, {value: false, text: 'No Direccionamiento'}]"
                    item-text="text"
                    item-value="value"
                    :column="!$vuetify.breakpoint.smAndUp"
                >
                </c-radio>
              </v-col>
            </v-row>
            <template v-if="direccionamiento.tipo_registro">
              <!--          <v-card class="mb-4">-->
              <!--            <v-card-text>-->
              <!--              <h4>-->
              <!--                <v-icon left>fas fa-user</v-icon>-->
              <!--                Paciente-->
              <!--              </h4>-->
              <!--            </v-card-text>-->
              <!--            <v-card-text class="py-0">-->
              <!--              <v-row>-->
              <!--                <v-col cols="12" class="py-0">-->
              <!--                  <datos-persona-list-->
              <!--                      v-if="documento"-->
              <!--                      two-line-->
              <!--                      :sexo="direccionamiento.sexo"-->
              <!--                      :title="documento.nombre_completo"-->
              <!--                      :subtitle="documento.identificacion_completa"-->
              <!--                      :subtitle2="[direccionamiento.email ? `<i class='mdi mdi-email'></i> ${direccionamiento.email}` : null, direccionamiento.celular ? `<a href='tel:${direccionamiento.celular}'><i class='mdi mdi-cellphone-iphone'></i>${direccionamiento.celular}</a>` : null].filter(x => x).join(' - ') "-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--                <v-col cols="12" sm="6" md="4" class="pb-0" v-if="documento && documento.afiliado && !documento.afiliado.direccion">-->
              <!--                  <c-texto-->
              <!--                      v-model="direccionamiento.DirPaciente"-->
              <!--                      label="Dirección del Paciente"-->
              <!--                      rules="required"-->
              <!--                      name="dirección del paciente"-->
              <!--                      upper-case-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--                <v-col cols="12" sm="6" class="pb-0">-->
              <!--                  <c-texto-->
              <!--                      v-model="direccionamiento.email"-->
              <!--                      label="Correo Electrónico"-->
              <!--                      rules="email"-->
              <!--                      name="correo electrónico"-->
              <!--                      lower-case-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--                <v-col cols="12" sm="6" class="pb-0">-->
              <!--                  <c-texto-->
              <!--                      v-model="direccionamiento.celular"-->
              <!--                      rules="numeric|minlength:10"-->
              <!--                      name="Celular"-->
              <!--                      label="Celular"-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--              </v-row>-->
              <!--            </v-card-text>-->
              <!--          </v-card>-->
              <v-row>
                <v-col cols="12" class="pb-0">
                  <ValidationProvider name="proveedor" rules="required" v-slot="{ errors }">
                    <v-autocomplete
                        dense
                        label="Proveedor"
                        v-model="prestadorObjeto"
                        item-value="codigohabilitacion"
                        :items="prestadores"
                        :filter="filterPrestadores"
                        placehoder="Buscar por número de identificación, código de habilitación o nombre"
                        no-data-text="No hay resultados para mostrar"
                        return-object
                        outlined
                        :error-messages="errors"
                        hide-selected
                        @change="prestador => asignaPrestador(prestador)"
                        persistent-hint
                        :hint="prestadorObjeto ? [prestadorObjeto.telefono ? `Tel.${prestadorObjeto.telefono}`: null, `${prestadorObjeto.direccion} ${prestadorObjeto.nompio}, ${prestadorObjeto.nomdepto}`].filter(x => x).join(' | '): null"
                    >
                      <template v-slot:selection="data">
                        <v-list-item class="pa-0" style="width: 100% !important;">
                          <v-list-item-content class="text-truncate pa-0">
                            <v-list-item-title class="body-2">{{ data.item.nombre }}</v-list-item-title>
                            <v-list-item-subtitle class="caption">{{ `${data.item.tipo_identificacion}${data.item.nitsnit} | Código:${data.item.codigohabilitacion}` }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <template v-slot:item="data">
                        <div style="width: 100% !important;">
                          <v-list-item class="pa-0">
                            <v-list-item-content class="text-truncate pa-0">
                              <v-list-item-title class="body-2">{{ data.item.nombre }}</v-list-item-title>
                              <v-list-item-subtitle class="caption">{{ `${data.item.tipo_identificacion}${data.item.nitsnit} | Código:${data.item.codigohabilitacion}` }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                        </div>
                      </template>
                    </v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <input-serach
                      dense
                      :documento="documento"
                      :tipo="tipo"
                      :item="item"
                      rules="required"
                      @retornaCodigo="codigo => direccionamiento.CodSerTecAEntregar = codigo"
                  />
                </v-col>
                <v-col cols="12" sm="6" class="pb-0">
                  <c-date
                      v-model="direccionamiento.FecDireccionamiento"
                      :rules="`required|mindate:${moment(fechaMinimaDireccionamiento).format('DD/MM/YYYY')}`"
                      label="Direccionamiento"
                      name="fecha direccionamiento"
                      :min="moment(fechaMinimaDireccionamiento).format('YYYY-MM-DD')"
                  />
                </v-col>
                <v-col cols="12" sm="6" class="pb-0">
                  <c-date
                      v-model="direccionamiento.FecMaxEnt"
                      :rules="`required|mindate:${direccionamiento.FecDireccionamiento ? moment(direccionamiento.FecDireccionamiento).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')}`"
                      label="Maxima de Entrega"
                      name="fecha maxima de entrega"
                      :min="direccionamiento.FecDireccionamiento ? moment(direccionamiento.FecDireccionamiento).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')"
                  />
                </v-col>
                <v-col cols="12" sm="6" class="pb-0">
                  <c-number
                      v-model="direccionamiento.CantTotAEntregar"
                      label="Cantidad a Entregar"
                      :rules="`required|max:${cantidadMaximaAEntregar}`"
                      name="cantidad total a entregar"
                      min="0"
                      :max="cantidadMaximaAEntregar"
                      step="0.1"
                  />
                </v-col>
                <v-col cols="12" sm="6" class="pb-0">
                  <c-texto
                      v-model="direccionamiento.celular"
                      rules="numeric|minlength:10"
                      name="celular del paciente"
                      label="Celular del Paciente"
                  />
                </v-col>
                <v-col cols="12" class="pb-0" v-if="documento && documento.afiliado && !documento.afiliado.direccion">
                  <c-texto
                      v-model="direccionamiento.DirPaciente"
                      label="Dirección del Paciente"
                      rules="required"
                      name="dirección del paciente"
                      upper-case
                  />
                </v-col>
              </v-row>
              <!--          <v-card class="mb-4">-->
              <!--            <v-card-text>-->
              <!--              <h4>-->
              <!--                <v-icon left>fas fa-tags</v-icon>-->
              <!--                Servicio / Tecnología-->
              <!--              </h4>-->
              <!--            </v-card-text>-->
              <!--            <v-card-text class="py-0">-->
              <!--              <v-row>-->
              <!--                <v-col cols="12" class="pb-0">-->
              <!--                  <input-serach-->
              <!--                      :documento="documento"-->
              <!--                      :tipo="tipo"-->
              <!--                      :item="item"-->
              <!--                      rules="required"-->
              <!--                      @retornaCodigo="codigo => direccionamiento.CodSerTecAEntregar = codigo"-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--                <v-col cols="12" sm="6" md="4" class="pb-0">-->
              <!--                  <c-date-->
              <!--                      v-model="direccionamiento.FecDireccionamiento"-->
              <!--                      :rules="`required|mindate:${moment(fechaMinimaDireccionamiento).format('DD/MM/YYYY')}`"-->
              <!--                      label="Fecha Direccionamiento"-->
              <!--                      name="fecha direccionamiento"-->
              <!--                      :min="moment(fechaMinimaDireccionamiento).format('YYYY-MM-DD')"-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--                <v-col cols="12" sm="6" md="4" class="pb-0">-->
              <!--                  <c-date-->
              <!--                      v-model="direccionamiento.FecMaxEnt"-->
              <!--                      :rules="`required|mindate:${direccionamiento.FecDireccionamiento ? moment(direccionamiento.FecDireccionamiento).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')}`"-->
              <!--                      label="Fecha Maxima de Entrega"-->
              <!--                      name="fecha maxima de entrega"-->
              <!--                      :min="direccionamiento.FecDireccionamiento ? moment(direccionamiento.FecDireccionamiento).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')"-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--                <v-col cols="12" sm="6" md="4" class="pb-0">-->
              <!--                  <c-number-->
              <!--                      v-model="direccionamiento.CantTotAEntregar"-->
              <!--                      label="Cantidad Total a Entregar"-->
              <!--                      :rules="`required|max:${cantidadMaximaAEntregar}`"-->
              <!--                      name="cantidad total a entregar"-->
              <!--                      min="0"-->
              <!--                      :max="cantidadMaximaAEntregar"-->
              <!--                      step="0.1"-->
              <!--                  />-->
              <!--                </v-col>-->
              <!--              </v-row>-->
              <!--            </v-card-text>-->
              <!--          </v-card>-->
              <!--          <v-card>-->
              <!--            <v-card-text>-->
              <!--              <h4>-->
              <!--                <v-icon left>fas fa-store</v-icon>-->
              <!--                Proveedor-->
              <!--              </h4>-->
              <!--            </v-card-text>-->
              <!--            <v-card-text class="py-0">-->
              <!--              <v-row>-->
              <!--                <v-col cols="12" class="pb-0">-->
              <!--                  <ValidationProvider name="entidad" rules="required" v-slot="{ errors }">-->
              <!--                    <v-autocomplete-->
              <!--                        label="Entidad"-->
              <!--                        v-model="prestadorObjeto"-->
              <!--                        item-value="codigohabilitacion"-->
              <!--                        :items="prestadores"-->
              <!--                        :filter="filterPrestadores"-->
              <!--                        placehoder="Buscar por número de identificación, código de habilitación o nombre"-->
              <!--                        no-data-text="No hay resultados para mostrar"-->
              <!--                        return-object-->
              <!--                        outlined-->
              <!--                        :error-messages="errors"-->
              <!--                        hide-selected-->
              <!--                        @change="prestador => asignaPrestador(prestador)"-->
              <!--                        persistent-hint-->
              <!--                        :hint="prestadorObjeto ? [prestadorObjeto.telefono ? `Tel.${prestadorObjeto.telefono}`: null, `${prestadorObjeto.direccion} ${prestadorObjeto.nompio}, ${prestadorObjeto.nomdepto}`].filter(x => x).join(' | '): null"-->
              <!--                    >-->
              <!--                      <template v-slot:selection="data">-->
              <!--                        <v-list-item class="pa-0" style="width: 100% !important;">-->
              <!--                          <v-list-item-content class="text-truncate pa-0">-->
              <!--                            <v-list-item-title class="body-2">{{ data.item.nombre }}</v-list-item-title>-->
              <!--                            <v-list-item-subtitle class="caption">{{ `${data.item.tipo_identificacion}${data.item.nitsnit} | Código:${data.item.codigohabilitacion}` }}</v-list-item-subtitle>-->
              <!--                          </v-list-item-content>-->
              <!--                        </v-list-item>-->
              <!--                      </template>-->
              <!--                      <template v-slot:item="data">-->
              <!--                        <div style="width: 100% !important;">-->
              <!--                          <v-list-item class="pa-0">-->
              <!--                            <v-list-item-content class="text-truncate pa-0">-->
              <!--                              <v-list-item-title class="body-2">{{ data.item.nombre }}</v-list-item-title>-->
              <!--                              <v-list-item-subtitle class="caption">{{ `${data.item.tipo_identificacion}${data.item.nitsnit} | Código:${data.item.codigohabilitacion}` }}</v-list-item-subtitle>-->
              <!--                            </v-list-item-content>-->
              <!--                          </v-list-item>-->
              <!--                          <v-divider></v-divider>-->
              <!--                        </div>-->
              <!--                      </template>-->
              <!--                    </v-autocomplete>-->
              <!--                  </ValidationProvider>-->
              <!--                </v-col>-->
              <!--                <v-col class="pb-0" cols="12" sm="12" md="6">-->
              <!--                  <c-select-complete-->
              <!--                      :disabled="!direccionamiento.NoIDProv"-->
              <!--                      v-model="direccionamiento.CodDepEnt"-->
              <!--                      label="Departamento de Entrega"-->
              <!--                      name="departamento de entrega"-->
              <!--                      rules="required"-->
              <!--                      :items="departamentos"-->
              <!--                      item-text="nombre"-->
              <!--                      item-value="codigo_dane"-->
              <!--                      @change="direccionamiento.CodMunEnt = null"-->
              <!--                  >-->
              <!--                  </c-select-complete>-->
              <!--                </v-col>-->
              <!--                <v-col class="pb-0" cols="12" sm="12" md="6">-->
              <!--                  <c-select-complete-->
              <!--                      :disabled="!direccionamiento.CodDepEnt"-->
              <!--                      v-model="direccionamiento.CodMunEnt"-->
              <!--                      label="Municipio de Entrega"-->
              <!--                      name="municipio de entrega"-->
              <!--                      rules="required"-->
              <!--                      :items="departamentos.length && direccionamiento.CodDepEnt ? departamentos.find(x => x.codigo_dane === direccionamiento.CodDepEnt).municipios : []"-->
              <!--                      item-text="nombre"-->
              <!--                      item-value="codigo_dane"-->
              <!--                  >-->
              <!--                  </c-select-complete>-->
              <!--                </v-col>-->
              <!--              </v-row>-->
              <!--            </v-card-text>-->
              <!--          </v-card>-->
            </template>
            <v-row v-else>
              <v-col cols="12" class="pb-0">
                <autocomplete-causas-no-entrega
                    v-model="direccionamiento.CausaNoEntrega"
                    :tipo-tec="item.TipoTec"
                    :cantidad="cantidadDireccionada"
                    name="causa de no entrega"
                    rules="required"
                />
              </v-col>
            </v-row>
          </v-container>
        </ValidationObserver>
      </v-card>
    </v-col>
    <v-col cols="12" class="py-0">
      <v-card flat>
        <v-card-actions class="pa-0">
          <v-btn
              text
              color="primary"
              @click="cancelar"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              @click="guardarDireccionamiento"
          >
            <v-icon>mdi-content-save</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import InputSerach from '../servtecs/InputSerach'
import {mapGetters} from 'vuex'
export default {
  name: 'RegistroDireccionamiento',
  components: {
    InputSerach,
    CardServtec: () => import('@/modules/mipres/components/servtecs/CardServtec')
  },
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
  data: () => ({
    loading: false,
    prestadorObjeto: null,
    direccionamiento: null,
    makeDireccionamiento: {
      ID: null,
      IDDireccionamiento: null,
      id_interno: null,
      NoPrescripcion: null,
      TipoTec: null,
      ConTec: null,
      TipoIDPaciente: null,
      NoIDPaciente: null,
      NoEntrega: null,
      NoSubEntrega: 0,
      TipoIDProv: null,
      NoIDProv: null,
      CodMunEnt: null,
      CodDepEnt: null,
      FecMaxEnt: null,
      CantTotAEntregar: null,
      DirPaciente: null,
      CodSerTecAEntregar: null,
      FecAnulacion: null,
      FecDireccionamiento: null,
      EstDireccionamiento: null,
      created_at: null,
      updated_at: null,
      user_id: null,
      tipo_registro: true,
      CausaNoEntrega: null,
      sexo: null,
      email: null,
      celular: null
    },
    filterPrestadores: (item, queryText) => {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(`${item.codigohabilitacion} ${item.nitsnit} ${item.nombre}`)
      const query = hasValue(queryText)
      return text.toString().toLowerCase().includes(query.toString().toLowerCase())
    }
  }),
  computed: {
    esPrecripcion() {
      return this && this.tipo === 'prescripción'
    },
    cantidadMaximaAEntregar() {
      return this && this.item && this.cantidadDireccionada !== null ? Number(this.item.cantidadTotal) - this.cantidadDireccionada : 0
    },
    fechaMinimaDireccionamiento() {
      return this && this.item && this.item.objeto && this.item.objeto.direccionamientos.length ? (window.lodash.last(this.item.objeto.direccionamientos).FecMaxEnt) : this.moment().format('YYYY-MM-DD')
    },
    cantidadDireccionada() {
      return this.item.objeto.direccionamientos && this.item.objeto.direccionamientos.length ? window.lodash.sum(this.item.objeto.direccionamientos.filter(z => (z.EstDireccionamiento === 1 || z.EstDireccionamiento === null) && !z.FecAnulacion).map(x => Number(x.CantTotAEntregar))) : 0
    },
    ...mapGetters([
      'prestadores',
      'departamentos'
    ])
  },
  created() {
    this.direccionamiento = this.clone(this.makeDireccionamiento)
    if(this.documento.afiliado) {
      this.direccionamiento.sexo = this.documento.afiliado.gn_sexo_id
      this.direccionamiento.email = this.documento.afiliado.correo_electronico
      this.direccionamiento.celular = this.documento.afiliado.celular
      this.direccionamiento.DirPaciente = this.documento.afiliado.direccion
    }
  },
  methods: {
    guardarDireccionamiento() {
      this.$refs.formDireccionamiento.validate().then(result => {
        if (result) {
          this.loading = true
          this.direccionamiento.NoPrescripcion = this.esPrecripcion ? this.documento.NoPrescripcion : this.documento.NoTutela
          this.direccionamiento.TipoTec = this.item.TipoTec
          this.direccionamiento.ConTec = this.item.objeto.ConOrden
          this.direccionamiento.TipoIDPaciente = this.documento.TipoIDPaciente
          this.direccionamiento.NoIDPaciente = this.documento.NroIDPaciente
          this.direccionamiento.NoEntrega = this.item.objeto.direccionamientos.length ? (window.lodash.maxBy(this.item.objeto.direccionamientos, x => x.NoEntrega).NoEntrega + 1) : 1

          let data = this.direccionamiento.tipo_registro
              ? this.clone(this.direccionamiento)
              : {
                NoPrescripcion: this.esPrecripcion ? this.documento.NoPrescripcion : this.documento.NoTutela,
                TipoTec: this.item.TipoTec,
                ConTec: this.item.objeto.ConOrden,
                TipoIDPaciente: this.documento.TipoIDPaciente,
                NoIDPaciente: this.documento.NroIDPaciente,
                CausaNoEntrega: this.direccionamiento.CausaNoEntrega,
                NoPrescripcionAsociada: null,
                ConTecAsociada: null
              }
          this.axios.post(`mipres/${this.direccionamiento.tipo_registro ? 'direccionamientos' : 'nodireccionamientos'}`, data)
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El ${this.direccionamiento.tipo_registro ? '' : 'no '}direccionamiento se ha guardado correctamente.`
                })
                this.$emit('guardado', response.data)
                this.cancelar()
                this.loading = false
              })
              .catch(e => {
                this.$swal({
                  icon: 'error',
                  title: `Error al guardar el ${this.direccionamiento.tipo_registro ? '' : 'no '}direccionamiento.`,
                  text: e.response.data && e.response.data.type ? `Error ${e.response.data.type}, ${e.response.data.message}` : ''
                })
                this.loading = false
              })
        }
      })
    },
    asignaPrestador(prestador) {
      this.direccionamiento.TipoIDProv = prestador ? prestador.tipo_identificacion : null
      this.direccionamiento.NoIDProv = prestador ? prestador.nitsnit : null
      this.direccionamiento.CodDepEnt = prestador ? prestador.iddepto : null
      this.direccionamiento.CodMunEnt = prestador ? prestador.idmpio : null
    },
    cancelar() {
      this.$emit('cancelar')
      this.prestadorObjeto = null
      this.direccionamiento = this.clone(this.makeDireccionamiento)
    }
  }
}
</script>

<style scoped>

</style>