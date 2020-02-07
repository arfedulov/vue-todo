<template>
  <b-input-group>
    <b-form-checkbox inline class="task-filter-done-control" v-model="showFinished">
      display done also
    </b-form-checkbox>
    <b-form-input
      placeholder="from date yyyy-mm-dd"
      type="text"
      class="task-filter-date-range-from-control"
      v-model="showFromDate"
    />
    <b-form-input
      placeholder="to date yyyy-mm-dd"
      type="text"
      class="task-filter-date-range-to-control"
      v-model="showToDate"
    />
  </b-input-group>
</template>

<script>
export const EVENTS = {
  INCLUDE_DONE: 'task-filter:include-done',
  EXCLUDE_DONE: 'task-filter:exclude-done',
  USE_RANGE: 'task-filter:use-range',
};

const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default {
  name: 'task-filter',
  props: {
    done: { type: Boolean, default: false },
    from: { type: Date, default: null },
    to: { type: Date, default: null },
  },
  computed: {
    showFinished: {
      get() {
        return this.done;
      },
      set(val) {
        this.toggleDone(val);
      },
    },
    showFromDate: {
      get() {
        return formatDate(this.from);
      },
      set(val) {
        this.setRange([new Date(val), this.to]);
      },
    },
    showToDate: {
      get() {
        return formatDate(this.to);
      },
      set(val) {
        this.setRange([this.from, new Date(val)]);
      },
    },
  },
  methods: {
    toggleDone(done) {
      const event = done ? EVENTS.INCLUDE_DONE : EVENTS.EXCLUDE_DONE;
      this.$emit(event);
    },
    setRange(range) {
      this.$emit(EVENTS.USE_RANGE, range);
    },
  },
};
</script>

<style scoped>
  .task-filter-done-control {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
</style>
