import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import Toolbar, { EVENTS } from '@/components/Toolbar.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Toolbar', () => {
  it('emits `CREATE_TASK` event on create task btn click', () => {
    const onCreate = jest.fn();
    const wrapper = mount(Toolbar, {
      listeners: {
        [EVENTS.CREATE_TASK]: onCreate,
      },
      localVue,
    });

    wrapper.find('.create-task-control').trigger('click');

    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
