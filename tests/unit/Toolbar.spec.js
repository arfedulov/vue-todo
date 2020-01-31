import { shallowMount } from '@vue/test-utils';
import Toolbar, { EVENTS } from '@/components/Toolbar.vue';

describe('Toolbar', () => {
  it('emits `CREATE_TASK` event on create task btn click', () => {
    const onCreate = jest.fn();
    const wrapper = shallowMount(Toolbar, {
      listeners: {
        [EVENTS.CREATE_TASK]: onCreate,
      },
    });

    wrapper.find('.create-task-control').trigger('click');

    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
