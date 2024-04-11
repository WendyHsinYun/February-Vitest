<template lang="pug">
v-dialog(width="auto" persistent)
  v-card(width='540px')
    v-card-title.px-6.py-5
      v-row(no-gutters).justify-space-between
        v-col.d-flex.align-center(cols='auto') 
          p.title Change Customers' Levels
        v-col.d-flex.align-center(cols='auto') 
          v-icon(@click='close' style='cursor: pointer;') mdi-close

    v-card-text.px-6.py-3
      v-row.pb-2
        v-col.d-flex.align-center.pb-0(cols="12")
          p.text-secondaryText Change 
            span.font-weight-bold.me-1 {{ selectedCustomers.join(', ') }} 
            span to 
            span.font-weight-bold {{ level }} 
            span.ms-1 level. 

    v-card-actions.px-6.py-5
      v-row
        v-col(cols="6")
          ButtonSecondary(:click="close" text="Cancel" height="40" block)
        v-col(cols="6")
          ButtonPrimary(:click="submit" text="Confirm" height="40" block)

</template>

<script setup>
import _ from 'lodash';

const props = defineProps({
  selectedCustomers: {
    type: Array,
    default: () => [],
  },
  level: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['close', 'submit']);

const submit = () => {
  emit('submit');
};

const close = () => {
  emit('close');
};
</script>
