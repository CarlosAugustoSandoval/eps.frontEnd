<template>
  <v-tooltip :disabled="disabled" :top="top" :right="right" :bottom="bottom" :left="left">
    <template v-slot:activator="{on}">
      <div v-on="on" style="display:inline-block !important; margin: auto !important;">
        <slot/>
      </div>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'CTooltip',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: String,
      default: ''
    }
  }
}
</script>
