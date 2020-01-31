<template>
  <button class="create-task-control" @click="createTask">create task</button>
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
