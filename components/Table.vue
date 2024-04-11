<template lang="pug">
v-table
  thead.pe-2
    tr
      th(width='2.5%') 
        v-checkbox-btn(
          :model-value="selectAll" 
          @update:modelValue="onSelectedAll")
      th(width='4.5%').text-center #
      th(width='10%' @click='sortTable("name")' style='cursor: pointer') 
        p.d-flex.align-center
          span name 
          div(v-if='sortedColumn.column !== "name"')
            v-icon(size='14') mdi-unfold-more-horizontal
          div(v-else-if='sortedColumn.order')
            v-icon(size='14') mdi-arrow-up-thin
          div(v-else)
            v-icon(size='14') mdi-arrow-down-thin

      th(width='8%') email
      th(width='10%') phone
      th(width='10%') address

      th(width='10%' @click='sortTable("register")' style='cursor: pointer')          
        p.d-flex.align-center
          span register time
          div(v-if='sortedColumn.column !== "register" ')
            v-icon(size='14') mdi-unfold-more-horizontal
          div(v-else-if='sortedColumn.order')
            v-icon(size='14') mdi-arrow-up-thin
          div(v-else)
            v-icon(size='14') mdi-arrow-down-thin
      th(width='10%' @click='sortTable("login")'  style='cursor: pointer')          
        p.d-flex.align-center
          span last login
          div(v-if='sortedColumn.column !== "login" ')
            v-icon(size='14') mdi-unfold-more-horizontal
          div(v-else-if='sortedColumn.order')
            v-icon(size='14') mdi-arrow-up-thin
          div(v-else)
            v-icon(size='14') mdi-arrow-down-thin
      th(width='10%' @click='sortTable("level")' style='cursor: pointer')          
        p.d-flex.align-center
          span customer level
          div(v-if='sortedColumn.column !== "level"')
            v-icon(size='14') mdi-unfold-more-horizontal
          div(v-else-if='sortedColumn.order')
            v-icon(size='14') mdi-arrow-up-thin
          div(v-else)
            v-icon(size='14') mdi-arrow-down-thin
      th(width='5%')

  tbody
    tr(v-for='(value, key, i) of tableData' :key='key')
      td(width='2.5%')
        v-checkbox-btn(
          :model-value="modelValue"
          @update:modelValue="onSelected"
          :value="key")
      td(width='4.5%').text-center
        span {{ i+1 }}
      td(width='10%').pe-4
        span {{ value.name }}
      td(width='8%')
        span {{ value.email }}
      td(width='10%')
        span {{ value.phone }}
      td(width='10%' @click='expandAddress(key)' style='cursor: pointer')
        p.d-flex.justify-space-between.align-center
          span {{ expandRows[key] ? value.address : value.address.substr(0, 10) }}
          v-icon(size='12') mdi-chevron-down
      td(width='10%')
        span {{ formatTimestamp(value.register) }}
      td(width='10%')
        span {{ formatTimestamp(value.login) }}
      td(width='10%')
        span {{ value.level }}
      td(width='5%').text-center
</template>

<script setup>
import _ from 'lodash';

const props = defineProps({
  rawData: {
    type: Object,
    default: () => {},
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  selectAll: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    default: null,
  },
  sortedColumn: {
    type: Object,
    default: { column: null, order: 0 },
  },
});

const emit = defineEmits(['update:modelValue', 'onSelectAll', 'onSortColumn']);

const tableData = ref(props.rawData);

watch(
  () => props.rawData,
  (newValue) => {
    tableData.value = newValue;
  },
  { deep: true },
);

const onSelected = (value) => {
  emit('update:modelValue', value);
};

const onSelectedAll = (value) => {
  emit('onSelectAll', value);
};

const expandRows = ref({});

const expandAddress = (key) => {
  if (key in expandRows.value) {
    expandRows.value[key] = !expandRows.value[key];
  } else {
    expandRows.value[key] = true;
  }
};

const sortTable = (col) => {
  emit('onSortColumn', col);
};
</script>

<style lang="sass">
thead
  background-color: $background
  border: 1px solid $line
</style>
