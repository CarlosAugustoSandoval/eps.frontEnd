<template>
  <v-row>
    <v-col cols="12" md="6" lg="7" xl="8" class="info d-none d-md-flex align-center justify-center">
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
                <v-btn class="mt-4 text-capitalize" x-large outlined color="white">Leer más</v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <v-col cols="12" md="6" lg="5" xl="4" class="d-flex align-center">
      <v-container>
        <div class="pa-10">
          <v-row justify="center">
            <v-col cols="12" sm="8" md="12">
              <v-row justify="center">
                <img src="@/assets/images/logo-session.png"/>
              </v-row>
              <v-row justify="center" class="my-4" no-gutters>
                <v-col cols="12" class="text-center">
                  <h2 class="font-weight-bold blue-grey--text text--darken-2">¿Se te olvidó la contraseña?</h2>
                </v-col>
                <v-col cols="12" class="text-center">
                  <h6
                      class="subtitle-1 mt-4 font-weight-regular"
                  >Ingrese su correo electrónico para enviarle un enlace de reinicio.</h6>
                </v-col>
              </v-row>
              <ValidationObserver class="mb-5" ref="formRememberPassword" v-slot="{ invalid }" tag="form" autocomplete="off" @submit.prevent="remember">
                <CTexto
                    v-model="email"
                    label="Correo Electrónico"
                    rules="required|email"
                    name="correo electrónico"
                    :dense="false"
                />
                <v-btn
                    :disabled="invalid"
                    color="info"
                    block
                    submit
                    @click="remember"
                >Recordar Contraseña</v-btn>
                <v-btn
                    class="mt-3"
                    color="orange"
                    block
                    submit
                    :to="{name: 'Login'}"
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
  name: "RememberPassword",
  data: () => ({
    email: null
  }),
  methods: {
    remember() {
      this.$refs.formRememberPassword.validate().then(result => {
        if (result) {
          console.log('result', result)
        }
      })
    }
  }
};
</script>
