<template>
  <b-button-toolbar>
    <b-button
      variant="primary"
      class="create-task-control"
      @click="createTask"
    >
      create task
    </b-button>
  </b-button-toolbar>
</template>

<script>
export const EVENTS = {
  CREATE_TASK: 'toolbar:create-task',
};

export default {
  name: 'toolbar',
  methods: {
    createTask() {
      this.$emit(EVENTS.CREATE_TASK);
    },
  },
};
</script>
