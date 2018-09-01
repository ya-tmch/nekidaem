<template>
    <div>
        <span class="badge mr-2" :class="badgeClassName">{{ proxy.country }}</span>
        <span class="mr-2">Host: {{ `${proxy.host}:${proxy.port}` }}</span>
        <span class="mr-2">Type: {{ proxyType }}</span>
        <span>Last check: {{ proxy.last_check_time }}</span>
    </div>
</template>

<script>
    import {PROXY_TYPES} from '../constants'

    export default {
        props: [
            'proxy'
        ],

        computed: {
            badgeClassName() {
                return this.proxy.alive ? 'badge-success' : 'badge-danger'
            },

            proxyType() {
                if (this.proxy.proxy_type === null) {
                    return 'not specified'
                }

                for(let i in PROXY_TYPES) {
                    if (+i === this.proxy.proxy_type) {
                        return PROXY_TYPES[i]
                    }
                }

                return '***' + this.proxy.proxy_type + '***'
            }
        }
    }
</script>