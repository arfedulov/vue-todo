<template>
  <b-card tag="article" :bg-variant="cardBackground">
    <b-form-checkbox class="task-status-control" v-model="statusModel" />
    <b-card-title>
      <b-form-input
        :state="titleValueIsValid"
        v-if="editable"
        type="text"
        class="task-title-control"
        v-model="titleModel"
      />
      <template v-else>{{title}}</template>
      <b-form-invalid-feedback v-for="message of titleErrors" :key="message" :state="true">
        {{message}}
      </b-form-invalid-feedback>
    </b-card-title>
    <b-card-text>
      <b-form-textarea v-if="editable" class="task-content-control" v-model="contentModel" />
      <template v-else>{{content}}</template>
    </b-card-text>
    <footer>
      <b-button-group>
        <b-button variant="danger" class="task-remove-control" @click="removeTask">delete</b-button>
        <b-button variant="warning" v-if="!editable" @click="turnOnEditableMode">edit</b-button>
        <b-button variant="primary" v-else @click="onSubmit">stop editing</b-button>
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
      titleErrors: [],
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
    cardBackground() {
      return this.done ? 'success' : 'default';
    },
    titleValueIsValid() {
      return !this.titleErrors.length;
    },
  },
  methods: {
    removeTask() {
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
    validateForm() {
      this.titleErrors = [];
      if (this.title === '') {
        this.titleErrors.push('Title field should not be empty');
      }
      if (this.title.length > 25) {
        this.titleErrors.push('Title should not be longer than 25 characters');
      }
      return this.titleErrors.length === 0;
    },
    onSubmit() {
      const valid = this.validateForm();
      if (valid) {
        this.editable = false;
      }
    },
    turnOnEditableMode() {
      this.editable = true;
    },
  },
};
</script>
