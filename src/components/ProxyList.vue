<template>
    <div class="card">
        <div class="card-header">
            <span>List</span>
        </div>
        <div class="card-body">
            <template v-for="p in proxies">
                <ProxyListItem class="mb-2" :key="p.id" :proxy="p"/>
            </template>
        </div>
    </div>
</template>

<script>
    import ProxyListItem from "./ProxyListItem"

    export default {
        components: {
            ProxyListItem
        },

        props: {
            proxies: Array
        }
    }
</script>