<template lang="pug">
v-row(no-gutters).justify-center
  v-col.d-flex.align-center(cols="auto")
    span(v-if="customerTotal > 0").text-body-2.text-secondaryText.font-weight-bold ({{ pageStartIndex + 1 }}-{{ pageEndIndex }} / {{ customerTotal }})
    span(v-else).text-body-2.text-secondaryText.font-weight-bold (0 / {{ customerTotal }}) 

  v-col.d-flex.align-center.ms-4.me-6(cols="auto")
    v-pagination(
      :model-value="modelValue"
      @update:modelValue="onUpdated"
      :length="pageLength"
      :total-visible="pageTotalVisible"
      show-first-last-page
      first-icon="mdi-chevron-double-left"
      last-icon="mdi-chevron-double-right"
      density="compact"
      rounded="circle")

</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  customerTotal: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);

const pageTotalVisible = ref(7);

const pageStartIndex = computed(() => {
  return (props.modelValue - 1) * props.pageSize;
});

const pageEndIndex = computed(() => {
  return props.modelValue * props.pageSize > props.customerTotal
    ? props.customerTotal
    : props.modelValue * props.pageSize;
});

const pageLength = computed(() => {
  return Math.ceil(props.customerTotal / props.pageSize);
});

const onUpdated = (value) => {
  emit('update:modelValue', value);
};
</script>

<style lang="sass" scoped>
:deep(.v-pagination > .v-pagination__list)
  .v-btn
    .v-btn__content
      font-size: 14px !important
</style>
