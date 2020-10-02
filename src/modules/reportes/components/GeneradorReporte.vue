<template>
    <v-card v-if="reporte">
      <loading :value="loading" absolute/>
        <ValidationObserver ref="formVariables" autocomplete="off">
            <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar color="pink" class="white--text">
                        {{reporte.id}}
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="mb-0"><h6 class="title mb-0">{{reporte.nombre}}</h6></v-list-item-title>
                        <v-list-item-subtitle>
                            {{reporte.descripcion}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action v-if="reporte && reporte.variables && !reporte.variables.length">
                        <v-tooltip top>
                            <template v-slot:activator="{on}">
                                <v-btn color="primary" icon large @click="descargar" :loading="loading" v-on="on">
                                    <v-icon large>mdi-file-download</v-icon>
                                </v-btn>
                            </template>
                            <span>Descargar Reporte</span>
                        </v-tooltip>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-container v-if="reporte.variables && reporte.variables.length">
                <v-row justify="center" align="center">
                    Parámetros del Reporte
                </v-row>
                <v-row justify="center" align="center">
                    <template v-for="(variable, indexVariable) in reporte.variables">
                        <v-col class="pb-0" cols="12" sm="12" md="6" :key="`variable${indexVariable}`">
                            <c-texto
                                    v-if="variable.type === 'text' && !variable.parameter"
                                    v-model="variable.value"
                                    :label="variable.label"
                            >
                            </c-texto>
                            <c-number
                                    v-if="variable.type === 'number'"
                                    v-model.number="variable.value"
                                    :label="variable.label"
                                    rules="min:0"
                                    :min="0"
                                    :step="0.1"
                                    :vid="`input${variable.type}${indexVariable}`"
                                    :name="variable.label"
                            >
                            </c-number>
                            <c-date
                                    v-if="variable.type === 'date'"
                                    v-model="variable.value"
                                    :label="variable.label"
                                    :max="moment().format('YYYY-MM-DD')"
                            >
                            </c-date>
                        </v-col>
                    </template>
                </v-row>
            </v-container>
            <v-card-actions v-if="reporte && reporte.variables && reporte.variables.length">
                <v-spacer></v-spacer>
                <v-btn color="primary" dark large @click="descargar" :loading="loading">
                    <v-icon large left>mdi-file-download</v-icon>
                    Descargar Reporte
                </v-btn>
            </v-card-actions>
        </ValidationObserver>
    </v-card>
</template>

<script>
    export default {
        name: 'GeneradorReporte',
        props: {
            reporte: {
                type: Object,
                default: null
            }
        },
        data: () => ({
            loading: false
        }),
        methods: {
            descargar () {
                this.$refs.formVariables.validate().then(result => {
                    if (result) {
                        this.loading = true
                        let data = null
                        if (this.reporte.variables && this.reporte.variables.length) {
                            data = this.clone(this.reporte.variables).reduce(function(result, item) {
                                result[item.ref.substr(1)] = item.value
                                return result
                            }, {})
                        }
                        this.axios({
                            url: `ejecutar-reporte/${this.reporte.id}`,
                            method: 'POST',
                            data: data,
                            responseType: 'blob'
                        })
                            .then((response) => {
                                if (response.status === 204) {
                                    this.$store.commit('SET_SNACKBAR', {color: 'info', message: `El reporte no contiene registros para exportar.`})
                                } else {
                                    const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))
                                    window.open(url,'_blank')
                                }
                                this.loading = false
                            })
                            .catch((error) => {
                                this.loading = false
                                this.$store.commit('SET_SNACKBAR', {color: 'error', message: `al descargar el reporte.`, error: error})
                            })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>