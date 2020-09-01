import Vue from 'vue'
const Swal = require('sweetalert2')
Vue.mixin({
    data: () => ({
        esMovil: false
    }),
    computed: {
    },
    watch: {
        '$vuetify.breakpoint.name': {
            handler (val) {
                val && (this.esMovil = !!(navigator.userAgent.match(/Android/i) ||
                    navigator.userAgent.match(/webOS/i) ||
                    navigator.userAgent.match(/iPhone/i) ||
                    navigator.userAgent.match(/iPod/i) ||
                    navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/BlackBerry/i)))
            },
            immediate: true
        }
    },
    methods: {
        clone (object) {
            return JSON.parse(JSON.stringify(object))
        },
        async confirm(object) {
            let options = {
                icon: object['icon'] || 'warning',
                title: object['title'] || '',
                subtitle: object['subtitle'] || '',
                buttonColor: object['buttonColor'] || 'red',
                buttonText: object['buttonText'] || 'Si, Eliminar',
                timer: object['timer'] || 0,
                route: object['route'] || null,
                catchMessage: object['catchMessage'] || '',
            }
            let confirm = await Swal.fire({
                icon: options.icon,
                title: options.title,
                html:`<p style="margin-bottom: ${options.subtitle ? 6 : 0}px !important;">${options.subtitle}</p>`,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonColor: 'grey',
                confirmButtonColor: options.buttonColor,
                cancelButtonText: 'Cancelar',
                confirmButtonText: options.buttonText,
                timerProgressBar: options.timer > 0,
                timer: options.timer,
                showLoaderOnConfirm: true,
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: async () => {
                    if (options.route) {
                        return await new Promise(resolve => {
                            this.axios.delete(options.route)
                                .then(response => {
                                    resolve(response.data)
                                })
                                .catch((error) => {
                                    Swal.showValidationMessage(
                                        `${options.catchMessage} ${error}`
                                    )
                                    resolve(false)
                                })
                        })
                    } else {
                        return true
                    }
                },
            }).then(result => {
                return result
            })
            return { confirm: confirm.isConfirmed, value: confirm.value || null }
        }
    }
})