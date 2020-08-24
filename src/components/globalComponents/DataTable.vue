<template>
    <div>
        <v-container
                v-if="value.filters || value.advanceFilters"
                fluid
                grid-list-md
                class="py-1 px-2"
        >
            <v-card
                    v-if="value.buttonZone"
                    class="mx-auto elevation-0"
            >
                <v-card-actions>
                    <slot name="top-actions-left"></slot>
                    <v-spacer></v-spacer>
                    <slot name="top-actions-right"></slot>
                    <v-btn v-if="value.advanceFilters" text color="primary"
                           @click="panelAdvanceFilters = !panelAdvanceFilters">
                        <v-icon>{{ panelAdvanceFilters ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        Filtros
                    </v-btn>
                </v-card-actions>

                <v-expand-transition v-if="value.advanceFilters">
                    <div v-show="panelAdvanceFilters">
                        <v-divider></v-divider>
                        <v-card flat>
                            <v-container
                                    fluid
                                    grid-list-md
                                    class="py-1 px-3"
                            >
                                <slot name="filters"></slot>
                            </v-container>
                            <v-divider class="ma-0 pa-0"></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn small color="primary" @click.stop="$emit('apply-filters')">Aplicar filtros
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-expand-transition>
            </v-card>
            <v-layout row wrap align-center justify-end fill-height v-if="value.filters">
                <v-flex xs1 style="height: 66px !important;">
                    <v-layout align-center justify-center fill-height>
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" icon large @click="reloadCurrentPage">
                                    <v-icon color="grey">mdi-cached</v-icon>
                                </v-btn>
                            </template>
                            <span>Recargar Registros</span>
                        </v-tooltip>
                    </v-layout>
                </v-flex>
                <v-flex xs11 sm6 md5 lg3 style="height: 66px !important;">
                    <v-select
                            label="Columnas visibles"
                            multiple
                            v-model="value.headers"
                            :items="value.makeHeaders.filter(x => !x.selectable)"
                            item-text="text"
                            item-value="id"
                            return-object
                            clearable
                    >
                        <template
                                slot="selection"
                                slot-scope="{ item, index }"
                        >
              <span
                      v-if="index === 0"
                      class="grey--text caption"
              >
                  {{`${value.headers.length} ${value.headers.length === 1 ? 'columna ' : 'columnas'} de ${value.makeHeaders.length} disponible${value.makeHeaders.length === 1 ? '' : 's'}`}}
              </span>
                        </template>
                    </v-select>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2 style="height: 66px !important;">
                    <v-select
                            label="Registros por página"
                            v-model="pagination.per_page"
                            :items="value.optionsPerPage"
                            item-text="text"
                            item-value="value"
                            @change="reloadCurrentPage"
                            hide-details
                    ></v-select>
                </v-flex>
                <v-flex xs12 sm12 md6 lg3 style="height: 66px !important;">
                    <v-text-field
                            v-model="value.search"
                            label="Buscar"
                            clearable
                            hide-details
                            prepend-icon="mdi-magnify"
                            @keyup.enter="reloadCurrentPage"
                    >
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
        <v-data-table
                item-key="id"
                :search="value.search"
                v-show="value.headers.length"
                :headers="value.headersTable"
                :items="value.items"
                :page.sync="pagination.current_page"
                hide-default-footer
                :server-items-length="value.items.length"
                :loading="value.visibleLoading && value.loading"
                loading-text="Cargando... por favor espere"
                class="elevation-0 pa-0 ma-0 mt-1"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
        >
            <template slot="headerCell" slot-scope="props">
                <v-tooltip top :disabled="!props.header.tooltip">
                    <template v-slot:activator="{ on }">
                        <span v-on="on" :class="props.header.tooltip ? 'subrayado-dot cursor-pointer' : ''">
                            {{ props.header.text }}
                        </span>
                    </template>
                    <span>{{ props.header.tooltip }}</span>
                </v-tooltip>
            </template>
            <template v-slot:progress>
                <v-progress-linear color="purple" :height="5" indeterminate></v-progress-linear>
            </template>
            <template v-slot:body="{ items }" v-if="value.items.length">
                <tbody>
                <tr v-for="(propitem, indexitem) in items" :key="'item' + indexitem">
                    <template v-for="(datHeader, index) in value.makeHeaders">
                        <td
                                v-if="value.headers.find(x => x.id === (index))"
                                :key="'td' + index"
                                :class="datHeader.classData"
                                :width="datHeader.width"
                                :style="propitem.colortrrgba ? `background-color: rgba(${propitem.colortrrgba}) !important; color: ${propitem.colortext} !important;` : ''"
                        >
                            <template v-if="datHeader.component">
                                <component
                                        :is="datHeader.component"
                                        :value="propitem"
                                ></component>
                            </template>
                            <template v-else-if="datHeader.actions">
                                <v-tooltip v-for="(option, i) in propitem.options" :key="'option' + index + i" top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                                v-on="on"
                                                class="ma-0"
                                                text
                                                icon
                                                :small="option.size === 'small'"
                                                :large="option.size === 'large'"
                                                :color="option.color ? option.color : 'accent'"
                                                @click.stop="$emit(option.event, propitem)"
                                                :loading="propitem.loading"
                                        >
                                            <v-icon
                                                    :color="option.color ? option.color : 'accent'"
                                                    :size="option.size ? option.size : ''"
                                            >
                                                {{option.icon}}
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{option.tooltip}}</span>
                                </v-tooltip>
                            </template>
                            <div v-else
                                 v-html="datHeader.value ? getProperty(propitem, datHeader.value.split('.')) : ''"></div>
                        </td>
                    </template>
                </tr>
                </tbody>
            </template>
            <template v-slot:no-data>
                <div class="text-center font-weight-bold">
                    No hay registros para mostrar
                </div>
            </template>
            <template v-slot:footer>
                <div class="text-center">
          <span class="title grey--text text--darken-1 text-center caption pa-1">
              Registros del {{ pagination.from }} al {{ pagination.to }} de {{ pagination.total }} totales
            </span>
                    <v-pagination v-model="pagination.current_page" :total-visible="7"
                                  :length="pagination.last_page" @input="reloadPage"></v-pagination>
                </div>
            </template>
        </v-data-table>
        <div v-show="!value.headers.length" class="title grey--text text-center pa-4">No hay columnas seleccionadas para
            mostrar
        </div>
    </div>
</template>
<script>
    import lodash from 'lodash'
    export default {
        name: 'DataTable',
        props: {
            showSelect: {
                type: [Boolean, String],
                default: false
            },
            value: Object
        },
        data: () => ({
            panelAdvanceFilters: false,
            selecteds: [],
            activePetition: false,
            filtrado: false,
            sortBy: [],
            sortDesc: [],
            stringSort: '',
            pagination: {
                current_page: 1,
                from: 1,
                last_page: 0,
                per_page: 15,
                to: 15,
                total: 0,
                next: null,
                prev: null,
                descending: null,
                sortBy: null
            }
        }),
        computed: {
            stateItem() {
                return (this.value && this.value.nameItemState) ? this.value.nameItemState : null
            },
            item() {
                return JSON.parse(JSON.stringify(this.stateItem ? this.$store.state.dataTable.tables[this.stateItem] : {}))
            },
            version() {
                return JSON.parse(JSON.stringify(this.stateItem ? this.$store.state.dataTable.tables[this.stateItem + 'Version'] : {}))
            }
        },
        watch: {
            'selecteds'(val) {
                this.$emit('selecteds', val)
            },
            'item'(val) {
                val && this.reloadPage()
            },
            'version'(val) {
                val && this.reloadHeaders(true)
            },
            'value.route': {
                handler (val) {
                    if (val) {
                        this.reloadCurrentPage()
                    }
                },
                immediate: true
            },
            'value.headers'(items) {
                this.value.headersTable = JSON.parse(JSON.stringify(this.showSelect ? items.filter(x => !x.selectable) : items)).sort((a, b) => {
                    if (a.id > b.id) {
                        return 1
                    }
                    if (a.id < b.id) {
                        return -1
                    }
                    return 0
                })
                if (this.value.nameItemState) {
                    localStorage.setItem(this.value.nameItemState, JSON.stringify(items))
                }
            },
            'value.search'(val) {
                !val && this.reloadPage()
            },
            // 'pagination'(val) {
            //     if (val) {
            //         this.pagination.current_page = 1
            //         this.reloadPage()
            //     }
            // },
            'sortBy': {
                handler (val, old) {
                    if (val !== old) {
                        this.formarSort()
                    }
                },
                immediate: false,
                deep: true
            },
            'sortDesc': {
                handler (val, old) {
                    if (val !== old) {
                        this.formarSort()
                    }
                },
                immediate: false,
                deep: true
            }
        },
        created() {
            // this.sortBy = this.value.makeHeaders.filter(x => x.sortable).map(z => z.value)
            this.$set(this.value, 'items', [])
            this.$set(this.value, 'loading', true)
            this.$set(this.value, 'filters', true)
            if (typeof this.value.buttonZone === 'undefined') {
                this.$set(this.value, 'buttonZone', false)
            }
            if (typeof this.value.advanceFilters === 'undefined') {
                this.$set(this.value, 'advanceFilters', false)
            }
            this.$set(this.value, 'search', '')
            this.$set(this.value, 'headers', [])
            this.$set(this.value, 'headersTable', [])
            if (!this.value.visibleLoading) this.$set(this.value, 'visibleLoading', true)
            if (!this.value.simplePaginate) this.$set(this.value, 'simplePaginate', false)
            if (!this.value.optionsPerPage) {
                this.$set(this.value, 'optionsPerPage', [
                    {
                        text: 15,
                        value: 15
                    },
                    {
                        text: 50,
                        value: 50
                    },
                    {
                        text: 100,
                        value: 100
                    },
                    {
                        text: 200,
                        value: 200
                    },
                    {
                        text: 500,
                        value: 500
                    },
                    {
                        text: 1000,
                        value: 1000
                    }
                ])
            }
            this.pagination.per_page = this.value.optionsPerPage[0].value
            // this.$set(this.value, 'pagination', {
            //     current_page: 1,
            //     from: 1,
            //     last_page: 0,
            //     per_page: this.value.optionsPerPage[0].value,
            //     to: 15,
            //     total: 0,
            //     next: null,
            //     prev: null,
            //     descending: null,
            //     sortBy: null
            // })
            if (this.stateItem && localStorage.getItem(this.stateItem + 'Version') === null) {
                this.reloadHeaders(true)
            } else if (this.stateItem && localStorage.getItem(this.stateItem + 'Version') && localStorage.getItem(this.stateItem + 'Version') !== this.version.toString()) {
                this.reloadHeaders(true)
            } else {
                this.reloadHeaders()
            }
            localStorage.setItem((this.stateItem + 'Version'), this.version)
            // setTimeout(() => {
            //     this.reloadCurrentPage()
            // }, 500)
        },
        methods: {
            formarSort: lodash.debounce(function () {
                this.stringSort = ''
                if (this.sortBy[0] && (typeof this.sortDesc[0] !== 'undefined')) {
                    console.log('sortBy', this.sortBy[0])
                    console.log('sortDesc', this.sortDesc[0])
                    this.stringSort = `&sort=${this.sortDesc[0] ? '-' : ''}${this.sortBy[0]}`
                }
                this.reloadPage()
            }, 500),
            deselectAll() {
                this.selecteds = []
            },
            getProperty(obj, array) {
                while (array.length) {
                    obj = obj[array.shift()]
                }
                return obj
            },
            reloadHeaders(force = false) {
                this.value.makeHeaders.forEach((item, index) => {
                    item.id = index
                    if (typeof item.visibleColumn === 'undefined') item.visibleColumn = true
                })
                if (this.value.nameItemState) {
                    if (force) {
                        localStorage.setItem(this.value.nameItemState, JSON.stringify(this.value.makeHeaders.filter(x => x.visibleColumn)))
                    } else {
                        if (localStorage.getItem(this.value.nameItemState) === null) {
                            localStorage.setItem(this.value.nameItemState, JSON.stringify(this.value.makeHeaders.filter(x => x.visibleColumn)))
                        }
                    }
                    this.value.headers = JSON.parse(localStorage.getItem(this.value.nameItemState))
                } else {
                    this.value.headers = JSON.parse(JSON.stringify(this.value.makeHeaders.filter(x => x.visibleColumn)))
                }
            },
            reloadCurrentPage() {
                this.pagination.current_page = 1
                this.activePetition = true
                this.reloadPage()
            },
            async reloadPage() {
                if (this.activePetition) {
                    this.activePetition = false
                    this.value.loading = true
                    // let stringSort = this.pagination.sortBy ? (`&sort=${(this.pagination.descending ? '-' : '')}${this.pagination.sortBy}`) : ''
                    this.axios.get(this.value.route + (this.value.route.indexOf('?') > -1 ? '&' : '?') + 'per_page=' + this.pagination.per_page + this.stringSort + '&page=' + this.pagination.current_page + '&filter[search]=' + ((this.value.search === null || typeof this.value.search === 'undefined') ? '' : this.value.search))
                        .then(response => {
                            this.filtrado = true
                            response.data.data.forEach(item => {
                                item.options = []
                                item.loading = false
                                item.disabled = false
                                this.$emit('resetOption', item)
                            })
                            response.data.per_page = this.value.optionsPerPage.find(page => page.value === parseInt(response.data.per_page)) ? parseInt(response.data.per_page) : -1
                            this.pagination.last_page = response.data.last_page
                            this.pagination.from = response.data.from
                            this.pagination.to = response.data.to
                            this.pagination.total = response.data.total
                            this.pagination.next = response.data.next_page_url
                            this.pagination.prev = response.data.prev_page_url
                            this.value.items = Object.freeze(response.data.data)
                            this.value.loading = false
                            this.activePetition = true
                        })
                        .catch(e => {
                            this.value.loading = false
                            this.activePetition = true
                            this.$store.commit('SET_SNACKBAR', {
                                color: 'error',
                                message: `al hacer la búsqueda de registros.`,
                                error: e
                            })
                        })
                }
            }
        }
    }
</script>

<style>
    .cursor-pointer {
        cursor: pointer !important;
    }

    .subrayado-dot {
        border-bottom: 0.107em dotted #9999CC !important;
    }
</style>
