<template lang="pug">
v-row(no-gutters).align-center.justify-space-between
  v-col(cols='3').d-flex.align-center.py-2.ms-4
    InputSearch(v-model='search' :placeholder='"search contacts"' :prependIcon='true' :clearable='clearable')
      v-icon(color='secondaryText') mdi-magnify

  v-col(cols='4').d-flex.align-center.py-2.justify-space-around
    v-row
      v-col.d-flex.align-center
        p
          span.text-primaryText select {{ Object.keys(selected).length }}
          span.text-secondaryText.ms-1 of {{ Object.keys(tableData).length }} customers

      v-col.me-7(style='min-width: 150px')
        Selector(
          :model-value="level"
          @update:modelValue='onLevelSelected'
          :items="levels"
          :disabled="disabled"
          placeholder="Change level"
          )
</template>

<script setup>
import _ from 'lodash';

const props = defineProps({
  rawData: {
    type: Object,
    default: () => {},
  },
  selected: {
    type: Array,
    default: () => [],
  },
  level: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['onSearched', 'onLevelSelected']);

const tableData = ref(props.rawData);
const levels = [
  { title: 'Premium', value: 'Premium' },
  { title: 'Gold', value: 'Gold' },
  { title: 'General', value: 'General' },
];

const search = ref('');

const clearable = ref(true);

const disabled = computed(() => {
  return props.selected.length === 0;
});

watch(search, (newValue) => {
  emit('onSearched', newValue);
});

const onLevelSelected = (value) => {
  emit('onLevelSelected', value);
};
</script>
