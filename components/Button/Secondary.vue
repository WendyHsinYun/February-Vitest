<template lang="pug">
v-btn.btn(
  @click="click"
  :color='color'
  rounded='lg'
  variant='flat'  
  :prepend-icon="prependIcon"
  :active='active'
  :height='height'
  :block='block')
  template(v-slot:default)
    span.text-primaryText.text-capitalize {{ text }}
</template>

<script setup>
const props = defineProps({
  click: {
    type: Function,
    default: () => {},
  },
  active: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  prependIcon: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '40',
  },
  block: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="sass" scoped>
.btn
  padding: 13px 25px
  font-size: 16px
  font-weight: 600
  border: 1px solid #D0D0D0
</style>
