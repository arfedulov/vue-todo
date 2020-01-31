<template>
  <article>
    <h1>
      <input type="text" class="task-title-control" v-model="titleModel" />
    </h1>
    <p>
      <textarea class="task-content-control" v-model="contentModel"></textarea>
    </p>
    <input type="checkbox" class="task-status-control" v-model="statusModel" />
    <button class="task-remove-control" @click="remove">delete</button>
  </article>
</template>

<script>
export const EVENTS = {
  TASK_CHANGE: 'task:change',
  TASK_DELETE: 'task:delete',
  TASK_DONE: 'task:done',
  TASK_UNDONE: 'task:undone',
};

export default {
  name: 'note',
  props: {
    id: { type: Number, required: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    done: { type: Boolean, default: false },
  },
  computed: {
    titleModel: {
      get() {
        return this.title;
      },
      set(val) {
        this.onChange('title', val);
      },
    },
    contentModel: {
      get() {
        return this.content;
      },
      set(val) {
        this.onChange('content', val);
      },
    },
    statusModel: {
      get() {
        return this.done;
      },
      set() {
        this.setStatus(!this.done);
      },
    },
  },
  methods: {
    remove() {
      this.$emit(EVENTS.TASK_DELETE, this.id);
    },
    setStatus(done) {
      if (done) {
        this.$emit(EVENTS.TASK_DONE, this.id);
      } else {
        this.$emit(EVENTS.TASK_UNDONE, this.id);
      }
    },
    onChange(propName, val) {
      this.$emit(EVENTS.TASK_CHANGE, {
        title: this.title,
        content: this.content,
        [propName]: val,
      });
    },
  },
};
</script>
