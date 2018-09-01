<template>
    <div id="app">
        <div class="container py-3">
            <div class="text-center" v-if="!proxies">
                <h1>Loading</h1>
            </div>
            <div class="row" v-else>
                <div class="col-sm-4 col-md-3 mb-3">
                    <ProxyFilter :countries="countries" @change="onChangeFilter"/>
                </div>
                <div class="col-sm-8 col-md-9">
                    <ProxyList :proxies="filteredProxies"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProxyList from './components/ProxyList'
    import ProxyFilter from './components/ProxyFilter'
    import proxyService from './services/proxyService'

    export default {
        components: {
            ProxyList,
            ProxyFilter
        },

        async created() {
            this.proxies = await proxyService.getProxiesList()
        },

        computed: {
            filteredProxies() {
                const f = this.filter

                if (!f) {
                    return this.proxies
                }

                return this.proxies.filter(p => {

                    if (
                        (f.country !== null && p.country !== f.country) ||
                        (f.alive !== null && p.alive !== f.alive) ||
                        (f.proxyTypes.length && f.proxyTypes.indexOf(p.proxy_type) === -1)
                    ) {
                        return false
                    }

                    return true
                })
            },

            countries() {
                return window._.uniqBy(this.proxies, 'country').map(i => i.country)
            }
        },

        data: () => ({
            proxies: null,
            filter: null
        }),

        methods: {
            onChangeFilter(filter) {
                this.filter = filter
            }
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
</style>
