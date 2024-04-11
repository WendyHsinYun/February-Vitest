<template lang="pug">
v-btn.btn(
  @click="click"
  color='primary'
  rounded='lg'
  variant='flat'  
  :prepend-icon="prependIcon"
  :active='active'
  :height='height'
  :block='block')
  template(v-slot:default)
    span.text-white.text-capitalize {{ text }}
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
</style>
