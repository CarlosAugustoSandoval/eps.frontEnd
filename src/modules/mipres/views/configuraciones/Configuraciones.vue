<template>
  <v-container fluid class="down-top-padding">
    <view-title/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list class="py-0">
            <v-list-item v-if="tokenPrincipalSubsidiado" @click="''">
              <v-list-item-avatar color="info">
                <v-icon dark>mdi-shield-key</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Token Principal Subsidiado</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">{{tokenPrincipalSubsidiado.descripcion}}</v-list-item-subtitle>
                <v-list-item-title class="text-wrap body-2">Token Actual: {{tokenPrincipalSubsidiado.value}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <registro-configuracion
                    text-button="Configurar"
                    text-tooltip="Configurar Token"
                    :configuracion="tokenPrincipalSubsidiado"
                />
              </v-list-item-action>
            </v-list-item>
            <v-list-item v-if="tokenPrincipalContributivo" @click="''">
              <v-list-item-avatar color="info">
                <v-icon dark>mdi-shield-key</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Token Principal Contributivo</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">{{tokenPrincipalContributivo.descripcion}}</v-list-item-subtitle>
                <v-list-item-title class="text-wrap body-2">Token Actual: {{tokenPrincipalContributivo.value}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <registro-configuracion
                    text-button="Configurar"
                    text-tooltip="Configurar Token"
                    :configuracion="tokenPrincipalContributivo"
                />
              </v-list-item-action>
            </v-list-item>
            <v-list-item v-if="tokenDiarioSuministrosSubsidiado" @click="''">
              <v-list-item-avatar color="success">
                <v-icon dark>mdi-shield-sun</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ tokenDiarioSuministrosSubsidiado.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">{{tokenDiarioSuministrosSubsidiado.descripcion}}</v-list-item-subtitle>
                <v-list-item-title class="text-wrap body-2">Token Actual: {{tokenDiarioSuministrosSubsidiado.value}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <c-tooltip
                    :disabled="!$vuetify.breakpoint.smAndDown"
                    left
                    tooltip="Sincronizar Token"
                >
                  <v-btn
                      v-if="$vuetify.breakpoint.smAndDown"
                      dark
                      fab
                      bottom
                      small
                      color="primary"
                      @click.stop="sincronizarToken(tokenDiarioSuministrosSubsidiado)"
                  >
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                  <v-btn
                      v-else
                      color="primary"
                      dark
                      @click.stop="sincronizarToken(tokenDiarioSuministrosSubsidiado)"
                  >
                    <v-icon left size="20">mdi-reload</v-icon>
                    Sincronizar
                  </v-btn>
                </c-tooltip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item v-if="tokenDiarioSuministrosContributivo" @click="''">
              <v-list-item-avatar color="success">
                <v-icon dark>mdi-shield-sun</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ tokenDiarioSuministrosContributivo.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">{{tokenDiarioSuministrosContributivo.descripcion}}</v-list-item-subtitle>
                <v-list-item-title class="text-wrap body-2">Token Actual: {{tokenDiarioSuministrosContributivo.value}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <c-tooltip
                    :disabled="!$vuetify.breakpoint.smAndDown"
                    left
                    tooltip="Sincronizar Token"
                >
                  <v-btn
                      v-if="$vuetify.breakpoint.smAndDown"
                      dark
                      fab
                      bottom
                      small
                      color="primary"
                      @click.stop="sincronizarToken(tokenDiarioSuministrosContributivo)"
                  >
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                  <v-btn
                      v-else
                      color="primary"
                      dark
                      @click.stop="sincronizarToken(tokenDiarioSuministrosContributivo)"
                  >
                    <v-icon left size="20">mdi-reload</v-icon>
                    Sincronizar
                  </v-btn>
                </c-tooltip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegistroConfiguracion from '@/modules/mipres/components/configuraciones/RegistroConfiguracion'
export default {
  name: 'Configuraciones',
  components: {RegistroConfiguracion},
  computed: {
    permisos() {
      return this.$store.getters.permisosModule('configuraciones-mipres')
    }
  },
  data: () => ({
    loading: false,
    configuraciones: [],
    tokenPrincipalSubsidiado: null,
    tokenPrincipalContributivo: null,
    tokenDiarioSuministrosSubsidiado: null,
    tokenDiarioSuministrosContributivo: null
  }),
  created() {
    this.getConfiguraciones()
  },
  methods: {
    async sincronizarToken(token) {
      let sincronizado = await this.confirm(
          {
            title: `Sincronizar ${token.title}`,
            subtitle: `¿Está seguro de sincronizar este registro de configuración?`,
            method: 'put',
            route: `mipres/configuraciones/${token.key}`,
            catchMessage: 'No ha sido posible sincronizar el registro de configuración.',
            buttonColor: 'primary',
            buttonText: 'Sincronizar'
          }
      )
      if (sincronizado.confirm) {
        this.getConfiguraciones()
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: `${token.title} sinronizado correctamente.`
        })
      }
    },
    getConfiguraciones() {
      this.axios.get(`mipres/configuraciones`)
          .then(response => {
            this.configuraciones = response.data
            this.tokenPrincipalSubsidiado = this.clone(this.configuraciones.find(x => x.key === 'tokenPrincipalSubsidiado'))
            this.tokenPrincipalSubsidiado.title = 'Token Principal Subsidiado'
            this.tokenPrincipalContributivo = this.clone(this.configuraciones.find(x => x.key === 'tokenPrincipalContributivo'))
            this.tokenPrincipalContributivo.title = 'Token Principal Contributivo'
            this.tokenDiarioSuministrosSubsidiado = this.clone(this.configuraciones.find(x => x.key === 'tokenDiarioSuministrosSubsidiado'))
            this.tokenDiarioSuministrosSubsidiado.title = 'Token Diario Suministros Subsidiado'
            this.tokenDiarioSuministrosContributivo = this.clone(this.configuraciones.find(x => x.key === 'tokenDiarioSuministrosContributivo'))
            this.tokenDiarioSuministrosContributivo.title = 'Token Diario Suministros Contributivo'
            this.loading = false
          })
          .catch(() => {
            this.$swal({
              icon: 'error',
              title: `Error al recuperar los datos de configuraciones MIPRES.`,
              text: ''
            })
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>