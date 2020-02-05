<template>
  <b-card tag="article" :bg-variant="done ? 'success' : 'default'">
    <b-form-checkbox class="task-status-control" v-model="statusModel" />
    <b-card-title>
      <b-form-input v-if="editable" type="text" class="task-title-control" v-model="titleModel" />
      <template v-else>{{title}}</template>
    </b-card-title>
    <b-card-text>
      <b-form-textarea v-if="editable" class="task-content-control" v-model="contentModel" />
      <template v-else>{{content}}</template>
    </b-card-text>
    <footer>
      <b-button-group>
        <b-button variant="danger" class="task-remove-control" @click="remove">delete</b-button>
        <b-button variant="warning" v-if="!editable" @click="editable=true">edit</b-button>
        <b-button variant="primary" v-else @click="editable=false">save</b-button>
      </b-button-group>
    </footer>
  </b-card>
</template>

<script>
export const EVENTS = {
  TASK_CHANGE: 'task:change',
  TASK_DELETE: 'task:delete',
  TASK_DONE: 'task:done',
  TASK_UNDONE: 'task:undone',
};

export default {
  name: 'task',
  props: {
    id: { type: Number, required: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    done: { type: Boolean, default: false },
    updatedAt: { type: Date, required: true },
  },
  data() {
    return {
      editable: false,
    };
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
      set(val) {
        this.setStatus(val);
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
        id: this.id,
        title: this.title,
        content: this.content,
        updatedAt: new Date(),
        [propName]: val,
      });
    },
  },
};
</script>
