<template lang="pug">
v-text-field(
  :model-value="modelValue"
  @update:modelValue="onUpdate"
  :rules="rules"
  :validate-on="validateOn"
  :clearable="clearable"
  color="line"
  hide-details
  rounded="lg"
  density='compact'
  variant='outlined'
  single-line)
  template(v-slot:label)
    span.text-line {{ placeholder }}
  template(v-if='prependIcon' v-slot:prepend-inner)
    slot

</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  validateOn: {
    type: String,
    default: 'submit',
  },
  maxLength: {
    type: Number,
    default: 0,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  prependIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const onUpdate = (value) => {
  emit('update:modelValue', value);
};
</script>

<style lang="sass" scoped>
:deep(.v-field__field)
  input
    color: $secondaryText
    font-size: 14px
    font-weight: 500

:deep(.v-field__input)
  padding: 13px 12px !important
  height: 40px !important

:deep(.v-input__details)
  padding-inline: 0 !important
  align-items: flex-start
  font-size: 11px


:deep(.v-field__clearable) > .v-icon
  font-size: 18px
  color: $secondaryText
</style>
