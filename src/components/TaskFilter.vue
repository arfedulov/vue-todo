<template>
  <div>
    <input type="checkbox" class="task-filter-done-control" v-model="doneModel" />
    <input type="text" class="task-filter-date-range-from-control" v-model="fromModel" />
    <input type="text" class="task-filter-date-range-to-control" v-model="toModel" />
  </div>
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
  return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

export default {
  name: 'task-filter',
  props: {
    done: Boolean,
    from: Date,
    to: Date,
  },
  computed: {
    doneModel: {
      get() {
        return this.done;
      },
      set(val) {
        this.toggleDone(val);
      },
    },
    fromModel: {
      get() {
        return formatDate(this.from);
      },
      set(val) {
        this.setRange([new Date(val), this.to]);
      },
    },
    toModel: {
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
      if (!done) {
        this.$emit(EVENTS.EXCLUDE_DONE);
      } else {
        this.$emit(EVENTS.INCLUDE_DONE);
      }
    },
    setRange(range) {
      this.$emit(EVENTS.USE_RANGE, range);
    },
  },
};
</script>
