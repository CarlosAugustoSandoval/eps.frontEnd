<template>
  <v-row>
    <loading :value="loading"/>
    <v-col cols="12" md="6" lg="7" xl="8" class="primary d-none d-md-flex align-center justify-center">
      <v-container>
        <div class="pa-10">
          <v-row justify="center">
            <v-col cols="8" xl="6">
              <div>
                <h2
                    class="display-1 white--text font-weight-medium"
                >La mejor solución para interactuar con el MIPRES</h2>
                <h6
                    class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                >Solo configure su token y empiece a descargar y reportar la información de MIPRES.</h6>
<!--                <v-btn class="mt-4 text-capitalize" x-large outlined color="white">Leer más</v-btn>-->
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <v-col cols="12" md="6" lg="5" xl="4" class="d-flex align-center py-0">
      <v-container fluid class="py-0">
        <div class="px-10 py-0">
          <v-row justify="center">
            <v-col cols="12" sm="8" md="12" class="py-0">
              <v-row justify="center">
                <img v-if="darkMode" :height="$vuetify.breakpoint.smAndUp ? 360 : 280" src="@/assets/images/logo-light-session.png"/>
                <img v-else :height="$vuetify.breakpoint.smAndUp ? 360 : 280" src="@/assets/images/logo-session.png"/>
              </v-row>
              <v-row justify="center" class="mb-2" no-gutters>
                <v-col cols="12" class="text-center">
                  <h2 :class="`font-weight-bold blue-grey--text text--${darkMode ? 'lighten-3' : 'darken-2'}`">
                    Inicio de Sesión
                  </h2>
                </v-col>
              </v-row>
              <ValidationObserver class="mb-5" ref="formLogin" v-slot="{ invalid }" tag="form" autocomplete="off" @submit.prevent="login">
                <c-texto
                    v-model="email"
                    label="Nombre de Usuario"
                    rules="required|email"
                    name="nombre de usuario"
                    :dense="false"
                />
                <c-password
                    v-model="password"
                    label="Contraseña"
                    rules="required"
                    name="contraseña"
                    :dense="false"
                />
                <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                  <v-checkbox
                      v-model="remember"
                      label="Recordarme"
                  ></v-checkbox>
<!--                  <div class="ml-auto">-->
<!--                    <router-link tag="a" class="link" :to="{name: 'ForgotPassword'}" exact>¿Olvidó la Contraseña?</router-link>-->
<!--                  </div>-->
                </div>
                <v-btn
                    :disabled="invalid"
                    color="primary"
                    block
                    class="mr-4"
                    submit
                    type="submit"
                >Iniciar Sesión</v-btn>
              </ValidationObserver>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: null,
    password: null,
    remember: false,
    loading: false
  }),
  methods: {
    login() {
      this.$refs.formLogin.validate().then(result => {
        if (result) {
          this.loading = true
          this.$store.dispatch('login', { email: this.email, password: this.password, remember_token: this.remember })
              .then(resolve => {
                if (resolve) this.$router.push({name: 'Home'})
                this.loading = false
              })
        }
      })
    }
  }
}
</script>
