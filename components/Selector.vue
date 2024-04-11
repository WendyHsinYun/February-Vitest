<template lang="pug">
v-select(
  :model-value="modelValue"
  @update:modelValue="onUpdated"
  :items="items"
  :disabled='disabled'
  :clearable="clearable"
  color="primaryText"
  rounded="lg"
  density='compact'
  variant='outlined'
  single-line
  hide-details)
  template(v-slot:label)
    span {{ placeholder }}

  template(v-slot:selection="{ item }")
    span.text-body-2.text-primaryText.font-weight-medium {{ item.title }}

  template(v-slot:item="{ props, item }")
    v-list-item.listItem(v-bind="props" :title="item.title" color="primaryText")
      template(v-slot:title="{ title }")
        span.text-body-2.text-primaryText.font-weight-medium {{ title }}

</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const onUpdated = (value) => {
  emit('update:modelValue', value);
};

</script>

<style lang="sass" scoped>
.v-input
  color: $primaryText
.v-list-item
  border-radius: 4px

.listItem
  padding: 5px 8px !important
  min-height: 36px
  margin: 4px

:deep(.mdi-close-circle)
  font-size: 18px
  color: $primaryText
</style>
