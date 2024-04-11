<template lang="pug">
v-row.mt-7.ml-6.justify-space-between
  v-col(cols='auto')
    span.header.font-weight-bold.text-primaryText Contacts
  v-col(cols='auto')
    v-row
      v-col(cols='auto' width='160px')
        ButtonSecondary(:click="exportFile" :text='"Export data"' color="background" :prependIcon='"mdi-export"' height='53')
      v-col(cols='auto' width='160px')
        ButtonPrimary(:text='"Add data"' :prependIcon='"mdi-plus"' height='53' )

v-row.ml-6
  v-col(cols='12')
    v-card(color="background" variant="outlined" style='border: 1px solid #D0D0D0')

      TableFilter(
        :level='level' 
        :selected='selected'
        :rawData='tableData'
        @onSearched='onSearched'
        @onLevelSelected='onLevelSelected')

      Table(
        :rawData='tableData' 
        v-model='selected' 
        :selectAll='selectAll' 
        :sortedColumn='sortedColumn'
        @onSelectAll='onSelectAll'
        @onSortColumn='sortTable'
        )

  v-col(cols='12')
    Pagination(
      v-model="page"
      :pageSize='pageSize'
      :customerTotal='customerTotal'
    )

PopupLevel(
  v-if='levelPopup' 
  v-model='levelPopup' 
  :selectedCustomers='selectedCustomers'
  :level='level'
  @submit='onLevelChanged'
  @close='close()'
  )

</template>

<script setup>
import _ from 'lodash';
import dayjs from 'dayjs';
import { utils, writeFileXLSX } from 'xlsx';

const tableData = ref(customersData);
const originalData = ref(customersData);
const customerTotal = ref(Object.keys(tableData.value).length);

const page = ref(1);
const pageSize = ref(6);

const level = ref(null);
const levelPopup = ref(false);

const selected = ref([]);
const selectAll = ref(false);

const selectedCustomers = computed(() => {
  const array = [];

  for (const [key, value] of Object.entries(originalData.value)) {
    if (selected.value.includes(key)) {
      array.push(value.name);
    }
  }

  return array;
});

const search = ref('');
const searchResult = ref({});

const searchContact = (value) => {
  searchResult.value = {};

  const regex = new RegExp(value, 'i');

  for (const [entriesKey, entriesValue] of Object.entries(tableData.value)) {
    for (const [key, value] of Object.entries(entriesValue)) {
      const searchValue = [];

      if (key !== 'register' || 'login') {
        searchValue.push(value);
      }

      const searchString = JSON.stringify([...searchValue]);

      if (regex.test(searchString)) {
        searchResult.value[entriesKey] = entriesValue;
      }
    }
  }

  tableData.value = searchResult.value;
};

const debounce = _.debounce((value) => {
  searchContact(value);
}, 500);

watch(search, (newValue) => {
  if (newValue) {
    debounce(newValue);
  } else {
    debounce.cancel();
    getTableSlice();
  }
});

const getTableSlice = (page = 1) => {
  const startIndex = (page - 1) * pageSize.value;

  const endIndex =
    page * pageSize.value > customerTotal.value
      ? customerTotal.value
      : page * pageSize.value;

  const entries = Object.entries(originalData.value);
  const slicedTablaData = {};

  for (const [key, value] of entries.slice(startIndex, endIndex)) {
    slicedTablaData[key] = value;
  }

  tableData.value = slicedTablaData;
};

onMounted(() => {
  getTableSlice();
});

watch(page, (newValue) => {
  getTableSlice(newValue);
  selectAll.value = isSelectAll();
});

const sortedColumn = ref({ column: null, order: 0 });

const sortNumber = ([, a], [, b]) => {
  const order = sortedColumn.value.order;
  const col = sortedColumn.value.column;

  if (order === 1) {
    return Number(a[col]) - Number(b[col]);
  } else {
    return Number(b[col]) - Number(a[col]);
  }
};

const sortString = ([, a], [, b]) => {
  const order = sortedColumn.value.order;
  const col = sortedColumn.value.column;

  if (order === 1) {
    return a[col].localeCompare(b[col]);
  } else {
    return b[col].localeCompare(a[col]);
  }
};

const sortTable = (col) => {
  if (sortedColumn.value.column === col) {
    sortedColumn.value.order = 1 - sortedColumn.value.order;
  } else {
    sortedColumn.value = { column: col, order: 0 };
  }

  const entries = Object.entries(originalData.value);

  if (col === 'name' || 'level') {
    entries.sort(sortString);
  } else {
    entries.sort(sortNumber);
  }

  originalData.value = Object.fromEntries(entries);
  getTableSlice(page.value);
};

const onSearched = (value) => {
  search.value = value;
};

const onLevelSelected = (value) => {
  level.value = value;
  levelPopup.value = true;
};

const onSelectAll = (newValue) => {
  selectAll.value = !selectAll.value;

  const tableKeys = Object.keys(tableData.value);

  selected.value = newValue
    ? _.union(selected.value, _.difference(tableKeys, selected.value))
    : _.difference(selected.value, tableKeys);
};

const isSelectAll = () => {
  return (
    _.intersection(selected.value, Object.keys(tableData.value)).length ===
    Object.keys(tableData.value).length
  );
};

watch(selected, () => {
  selectAll.value = isSelectAll();
});

const onLevelChanged = () => {
  const copies = { ...originalData.value };

  for (const [key, value] of Object.entries(copies)) {
    if (selected.value.includes(key)) {
      value.level = level.value;
    }
  }
  getTableSlice(page.value);

  levelPopup.value = false;
  level.value = null;
  selected.value = [];
};

const close = () => {
  levelPopup.value = false;
  level.value = null;
};

const exportFile = () => {
  const copies = _.cloneDeep(originalData.value);
  const data = formatSheet(copies);

  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();

  const now = dayjs().format('YYYY-MM-DD');

  utils.book_append_sheet(wb, ws, 'sheet1');
  writeFileXLSX(wb, `${now}_sheet.xlsx`);
};
</script>

<style lang="sass">
.header
  font-size: 32px
</style>
