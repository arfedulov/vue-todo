import { shallowMount } from '@vue/test-utils';
import Task, { EVENTS } from '@/components/Task.vue';

describe('Task', () => {
  it('emits `task:change` event on `title` change with updated `title` and previous `content` as a payload', () => {
    const onChange = jest.fn(() => {});
    const CONTENT = 'asdfgh';

    const wrapper = shallowMount(Task, {
      propsData: {
        id: 12345,
        content: CONTENT,
      },
      listeners: {
        [EVENTS.TASK_CHANGE]: onChange,
      },
    });

    const TITLE = 'qwert';

    wrapper.vm.editable = true;
    wrapper.find('.task-title-control').setValue(TITLE);

    const EXPECT = {
      title: TITLE,
      content: CONTENT,
    };

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, EXPECT);
  });

  it('emits `task:change` event on `content` change with updated `content` and previous `title` as a payload', () => {
    const onChange = jest.fn(() => {});
    const TITLE = '1234';

    const wrapper = shallowMount(Task, {
      propsData: {
        id: 12345,
        title: TITLE,
      },
      listeners: {
        'task:change': onChange,
      },
    });

    const CONTENT = 'poiuy';

    wrapper.vm.editable = true;
    wrapper.find('.task-content-control').setValue(CONTENT);

    const EXPECT = {
      title: TITLE,
      content: CONTENT,
    };

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, EXPECT);
  });

  it('emits `task:done` event on checking `done` checkbox with task `id` as a payload', () => {
    const onDone = jest.fn(() => {});
    const ID = 5453645;

    const wrapper = shallowMount(Task, {
      propsData: {
        id: ID,
        done: false,
      },
      listeners: {
        [EVENTS.TASK_DONE]: onDone,
      },
    });

    wrapper.find('.task-status-control').trigger('click');

    const EXPECT = ID;

    expect(onDone).toBeCalledTimes(1);
    expect(onDone).toBeCalledWith(EXPECT);
  });

  it('emits `task:undone` event on unchecking `done` checkbox with task `id` as a payload', () => {
    const onUndone = jest.fn(() => {});
    const ID = 5355464;

    const wrapper = shallowMount(Task, {
      propsData: {
        id: ID,
        done: true,
      },
      listeners: {
        [EVENTS.TASK_UNDONE]: onUndone,
      },
    });

    wrapper.find('.task-status-control').trigger('click');

    const EXPECT = ID;

    expect(onUndone).toBeCalledTimes(1);
    expect(onUndone).toBeCalledWith(EXPECT);
  });

  it('emits `task:delete` event on delete btn click with task `id` as a payload', () => {
    const ID = 65785907;
    const onDelete = jest.fn(() => {});

    const wrapper = shallowMount(Task, {
      propsData: {
        id: ID,
      },
      listeners: {
        [EVENTS.TASK_DELETE]: onDelete,
      },
    });

    wrapper.find('.task-remove-control').trigger('click');

    const EXPECT = ID;

    expect(onDelete).toBeCalledTimes(1);
    expect(onDelete).toBeCalledWith(EXPECT);
  });
});
