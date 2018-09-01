<template>
    <div class="card">
        <div class="card-header" :class="{'border-bottom-0': hidden}">
            <a href="javascript:void(0)" @click.prevent="hidden = !hidden">Filter</a>
        </div>
        <div class="card-body" v-if="!hidden">
            <form>
                <div class="form-group">
                    <label for="country-select">Country</label>
                    <select class="form-control" id="country-select" v-model="country">
                        <option :value="null">All</option>
                        <template v-for="item in countries">
                            <option :key="item" :value="item">{{ item }}</option>
                        </template>
                    </select>
                </div>

                <div class="form-group">
                    <label for="alive-type">Alive</label>
                    <select class="form-control" id="alive-type" v-model="alive">
                        <option :value="null">All</option>
                        <option :value="true">Alive</option>
                        <option :value="false">Not alive</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Type</label>

                    <template v-for="(type, index) in proxyTypesNames">
                        <div class="mb-2" :key="type">
                            <ProxyFilterToggleGroup
                                    :type="type" :checked="proxyTypes[index]" @click="clickProxyType(index)"/>
                        </div>
                    </template>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import ProxyFilterToggleGroup from './ProxyFilterToggleGroup'
    import {PROXY_TYPES} from '../constants'

    export default {
        props: {
            countries: Array
        },

        components: {
            ProxyFilterToggleGroup
        },

        watch: {
            '$data': {
                handler() {
                    this.emitChanges()
                },
                deep: true
            }
        },

        created() {
            this.emitChanges()
        },

        computed: {
            proxyTypesNames() {
                return PROXY_TYPES
            }
        },

        data: () => ({
            proxyTypes: {0: false, 1: false, 2: false},
            hidden: false,
            alive: null,
            country: null
        }),

        methods: {
            clickProxyType(index) {
                this.proxyTypes[index] = !this.proxyTypes[index]
            },

            emitChanges() {
                const filter = Object.assign({}, this.$data, {

                    proxyTypes: Object
                        .keys(this.proxyTypes)
                        .filter(i => this.proxyTypes[i])
                        .map(i => +i)
                })

                this.$emit('change', filter)
            }
        }
    }
</script>