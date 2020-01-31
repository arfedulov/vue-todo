import { shallowMount } from '@vue/test-utils';
import TaskFilter, { EVENTS } from '@/components/TaskFilter.vue';

describe('TaskFilter', () => {
  it('emits `INCLUDE_DONE` event on checking `done` checkbox', () => {
    const onCheck = jest.fn();
    const wrapper = shallowMount(TaskFilter, {
      propsData: {
        done: false,
      },
      listeners: {
        [EVENTS.INCLUDE_DONE]: onCheck,
      },
    });

    wrapper.find('.task-filter-done-control').trigger('click');

    expect(onCheck).toHaveBeenCalledTimes(1);
  });

  it('emits `EXCLUDE_DONE` event on unchecking `done` checkbox', () => {
    const onCheck = jest.fn();
    const wrapper = shallowMount(TaskFilter, {
      propsData: {
        done: true,
      },
      listeners: {
        [EVENTS.EXCLUDE_DONE]: onCheck,
      },
    });

    wrapper.find('.task-filter-done-control').trigger('click');

    expect(onCheck).toHaveBeenCalledTimes(1);
  });

  it('emits `USE_RANGE` event with [start, end] as a payload on selecting start date', () => {
    const onRangeSelect = jest.fn();
    const FROM = new Date('2015-01-01');
    const TO = new Date('2015-01-15');
    const wrapper = shallowMount(TaskFilter, {
      propsData: {
        from: FROM,
        to: TO,
      },
      listeners: {
        [EVENTS.USE_RANGE]: onRangeSelect,
      },
    });

    const INPUT_VALUE = '2020-01-15';
    const EXPECT = [new Date(INPUT_VALUE), TO];

    wrapper.find('.task-filter-date-range-from-control').setValue(INPUT_VALUE);
    expect(onRangeSelect).toHaveBeenCalledTimes(1);
    expect(onRangeSelect).toHaveBeenCalledWith(EXPECT);
  });

  it('emits `USE_RANGE` event with [start, end] as a payload on selecting end date', () => {
    const onRangeSelect = jest.fn();
    const FROM = new Date('2016-01-01');
    const TO = new Date('2016-01-15');
    const wrapper = shallowMount(TaskFilter, {
      propsData: {
        from: FROM,
        to: TO,
      },
      listeners: {
        [EVENTS.USE_RANGE]: onRangeSelect,
      },
    });

    const INPUT_VALUE = '2020-01-21';
    const EXPECT = [FROM, new Date(INPUT_VALUE)];

    wrapper.find('.task-filter-date-range-to-control').setValue(INPUT_VALUE);
    expect(onRangeSelect).toHaveBeenCalledTimes(1);
    expect(onRangeSelect).toHaveBeenCalledWith(EXPECT);
  });
});
