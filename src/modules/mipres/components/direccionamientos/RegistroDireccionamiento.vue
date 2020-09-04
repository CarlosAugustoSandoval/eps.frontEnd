<template>
  <v-card flat>
    <loading :value="loading" absolute></loading>
    <v-card-title class="py-2">Nuevo Direccionamiento</v-card-title>
    <v-divider></v-divider>
    <ValidationObserver ref="formDireccionamiento" tag="form" autocomplete="off">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <input-serach
                :documento="documento"
                :tipo="tipo"
                :item="item"
                @retornaCodigo="codigo => direccionamiento.CodSerTecAEntregar = codigo"
            />
          </v-col>
        </v-row>
      </v-container>
    </ValidationObserver>
    <v-card-actions>
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
</template>

<script>
import InputSerach from '../servtecs/InputSerach'
export default {
  name: 'RegistroDireccionamiento',
  components: {InputSerach},
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
      NoSubEntrega: null,
      TipoIdProv: null,
      NoIDProv: null,
      CodMunEnt: null,
      FecMaxEnt: null,
      CantTotAEntregar: null,
      DirPaciente: null,
      CodSerTecAEntregar: null,
      FecAnulacion: null,
      FecDireccionamiento: null,
      EstDireccionamiento: null,
      created_at: null,
      updated_at: null,
      user_id: null
    }
  }),
  created() {
    this.direccionamiento = this.clone(this.makeDireccionamiento)
  },
  methods: {
    guardarDireccionamiento() {
      this.$refs.formDireccionamiento.validate().then(result => {
        if (result) {
          this.loading = true
          this.axios.post(`mipres/direccionamientos`, this.direccionamiento)
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El direccionamiento se ha guardado correctamente.`
                })
                console.log('el response del edit', response)
                this.$emit('guardado', response.data)
                this.loading = false
              })
              .catch(() => {
                this.$swal({
                  icon: 'error',
                  title: `Error al guardar el direccionamiento.`,
                  text: ''
                })
                this.loading = false
              })
        }
      })
    },
    cancelar() {
      this.$emit('cancelar')
      this.direccionamiento = this.clone(this.makeDireccionamiento)
    }
  }
}
</script>

<style scoped>

</style>