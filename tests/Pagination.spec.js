import { mount } from "@vue/test-utils";
import Pagination from "@/Pagination.vue";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import vuetify from '/plugins/vuetify.ts';
import { expect } from "vitest";

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Pagination", () => {
  it('computes page indices and length correctly', async () => {
    const wrapper = mount(Pagination, {
      global: {
        plugins: [vuetify],
      },
      props: {
        modelValue: 3,
        pageSize: 10,
        customerTotal: 45,
      }
    });

    expect(wrapper.vm.pageStartIndex).toBe(20);
    expect(wrapper.vm.pageEndIndex).toBe(30);
    expect(wrapper.vm.pageLength).toBe(5);

    await wrapper.setProps({
      modelValue: 5, 
    });

    expect(wrapper.vm.pageStartIndex).toBe(40);
    expect(wrapper.vm.pageEndIndex).toBe(45);
    expect(wrapper.vm.pageLength).toBe(5);
  });
});