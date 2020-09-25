<template>
    <ValidationProvider :name="name" :vid="vid" :rules="rules" v-slot="{ errors }">
        <v-combobox
                v-model="model"
                :filter="filter"
                :hide-no-data="!search"
                :items="items"
                :search-input.sync="search"
                hide-selected
                :label="label"
                multiple
                small-chips
                outlined
                :error-messages="errors"
        >
            <template v-slot:no-data>
                <v-list-item>
                    <span class="subheading">Creando item: </span>
                    <v-chip
                            :color="`${colors[nonce - 1]} lighten-3`"
                            label
                            small
                    >
                        {{ search }}
                    </v-chip>
                </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                        v-if="item === Object(item)"
                        v-bind="attrs"
                        :color="`${item.color} lighten-3`"
                        :input-value="selected"
                        label
                        small
                >
          <span class="pr-2">
            {{ item.text }}
          </span>
                    <v-icon
                            small
                            @click="parent.selectItem(item)"
                    >mdi-close</v-icon>
                </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
                <v-text-field
                        v-if="editing === item"
                        v-model="editing.text"
                        autofocus
                        flat
                        background-color="transparent"
                        hide-details
                        solo
                        @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                        v-else
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                >
                    {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                    <v-btn
                            icon
                            @click.stop.prevent="edit(index, item)"
                    >
                        <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-combobox>
    </ValidationProvider>
</template>

<script>
    export default {
        name: 'CComboBox',
        props: {
            value: {
                type: [Number, String, Object, Array],
                default: null
            },
            itemValue: {
                type: String,
                default: null
            },
            itemText: {
                type: String,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: null
            },
            items: {
                type: Array,
                default: () => [
                    { header: 'Seleccionar o Crear un item' }
                ]
            },
            name: {
                type: String,
                default: null
            },
            vid: {
                type: String,
                default: null
            },
            outlined: {
                type: Boolean,
                default: true
            },
            rules: {
                type: String,
                default: null
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true
            },
            hideDetails: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            model: [],
            activator: null,
            attach: null,
            colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
            editing: null,
            index: -1,
            nonce: 1,
            menu: false,
            x: 0,
            search: null,
            y: 0,
        }),
        watch: {
            model: {
                handler(val, prev) {
                    if (val && prev && val.length === prev.length) return
                    if (val) {
                        this.model = val.map(v => {
                            if (typeof v === 'string') {
                                v = {
                                    text: v,
                                    color: this.colors[this.nonce - 1],
                                }
                                this.items.push(v)
                                this.nonce++
                            }
                            return v
                        })
                    }
                    this.$emit('input', (typeof val !== 'undefined') ? this.model : [])
                },
                immediate: false
            },
            // model: {
            //     handler(val) {
            //         this.$emit('input', (typeof val !== 'undefined') ? val : null)
            //     },
            //     immediate: false
            // },
            value: {
                handler(val) {
                    this.model = ((typeof val !== 'undefined') ? val : null)
                },
                immediate: true
            }
        },
        methods: {
            edit (index, item) {
                if (!this.editing) {
                    this.editing = item
                    this.index = index
                } else {
                    this.editing = null
                    this.index = -1
                }
            },
            filter (item, queryText, itemText) {
                if (item.header) return false

                const hasValue = val => val != null ? val : ''

                const text = hasValue(itemText)
                const query = hasValue(queryText)

                return text.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            }
        }
    }
</script>

<style scoped>

</style>