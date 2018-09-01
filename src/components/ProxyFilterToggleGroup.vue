<template>
    <div class="btn-group-toggle">
        <label class="btn btn-block" :class="className" @click.prevent="$emit('click')">
            <input type="checkbox" :checked="checked" autocomplete="off">
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            type: String,
            checked: Boolean,
        },

        computed: {
            label() {
                return window._.upperFirst(this.type)
            },

            className() {
                return this.checked ? 'btn-primary active' : 'btn-outline-primary'
            }
        }
    }
</script>