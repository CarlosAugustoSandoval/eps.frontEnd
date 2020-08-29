<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         :viewBox="viewBox"
         :aria-labelledby="name"
         role="presentation"
    >
        <title :id="name">{{name}} icon</title>
        <slot></slot>
    </svg>
</template>

<script>
    export default {
        name: 'IconBase',
        props: {
            name: {
                type: String,
                default: null
            },
            viewBox: {
                type: String,
                default: '0 0 500.000000 500.000000'
            },
            width: {
                type: [Number, String],
                default: 18
            },
            height: {
                type: [Number, String],
                default: 18
            }
        }
    }
</script>

<style scoped>

</style>