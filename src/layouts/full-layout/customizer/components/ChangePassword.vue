<template>
  <v-dialog v-model="model" persistent max-width="500">
    <v-card v-if="user">
      <loading :value="loading"/>
      <v-list-item>
        <v-list-item-avatar :size="48" color="warning">
          <v-icon class="white--text">fas fa-user-lock</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Cambio de contraseña</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="ma-0"></v-divider>
      <ValidationObserver ref="formPassword" autocomplete="off">
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex xs12>
              <ValidationProvider name="Contraseña Actual" rules="required" vid="currentPassword" v-slot="{ errors }">
                <v-text-field
                    v-model="current_password"
                    :append-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    dense
                    outlined
                    label="Contraseña Actual"
                    :error-messages="errors"
                    :autocomplete="false"
                    @click:append="showCurrentPassword = !showCurrentPassword"
                    @input="() => {
                                  if (!current_password) password = null
                                }"
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 v-if="current_password">
              <ValidationProvider name="Nueva Contraseña"
                                  :rules="{minlength:8, required: true, is_not:current_password}" vid="password"
                                  v-slot="{ errors }">
                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    dense
                    outlined
                    label="Nueva Contraseña"
                    :error-messages="errors"
                    :autocomplete="false"
                    @click:append="showPassword = !showPassword"
                    @input="() => {
                                  if (!password) password_confirmation = null
                                }"
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
            <v-flex xs12 v-if="current_password && password">
              <ValidationProvider name="Confirmar Nueva Contraseña"
                                  :rules="{minlength:8, required: true, is_not:current_password, confirmed:'password'}"
                                  vid="passwordConfirmation" v-slot="{ errors }">
                <v-text-field
                    v-model="password_confirmation"
                    :append-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    dense
                    outlined
                    label="Confirmar Nueva Contraseña"
                    :error-messages="errors"
                    :autocomplete="false"
                    @click:append="showPasswordConfirmation = !showPasswordConfirmation"
                    :disabled="!password"
                ></v-text-field>
              </ValidationProvider>
            </v-flex>
          </v-layout>
        </v-container>
      </ValidationObserver>
      <v-divider class="ma-0"></v-divider>
      <v-card-actions>
        <v-btn color="primary" text @click.stop="model = false">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="submit">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data: () => ({
    current_password: null,
    password: null,
    password_confirmation: null,
    showCurrentPassword: false,
    showPassword: false,
    showPasswordConfirmation: false,
    model: false,
    loading: false
  }),
  computed: {
    ...mapState({
      user: state => state.auth && state.auth.user && state.auth.user.user
    })
  },
  watch: {
    'model'(val) {
      if (!val) {
        this.resetData()
      }
    }
  },
  methods: {
    open() {
      this.model = true
    },
    resetData() {
      this.current_password = null
      this.password = null
      this.password_confirmation = null
      this.showCurrentPassword = false
      this.showPassword = false
      this.showPasswordConfirmation = false
      this.$refs.formPassword.reset()
    },
    async submit() {
      this.$refs.formPassword.validate().then(result => {
        if (result) {
          this.loading = true
          this.axios.put('changepassword', {
            current_password: this.current_password,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
              .then(() => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `La contraseña se ha cambiado correctamente.`
                })
                this.loading = false
                this.model = false
              }).catch(() => {
            this.loading = false
            this.$swal({
              icon: 'error',
              title: `Error al cambiar la contraseña.`,
              text: ''
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
