<template>
  <div>
    <task-filter></task-filter>
    <ul>
      <li v-for="task of tasks" :key="task.id">
        <task
          class="task"
          :id="task.id"
          :title="task.title"
          :content="task.content"
          @task:delete="deleteTask"
          @task:change="updateTask"
          @task:done="updateTask({id: task.id, done: true})"
          @task:undone="updateTask({id: task.id, done: false})"
        >
        </task>
      </li>
    </ul>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import TaskFilter from '@/components/TaskFilter.vue';

export default {
  name: 'task-list',
  components: {
    task: Task,
    'task-filter': TaskFilter,
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  created() {
    this.$store.dispatch('syncTasks');
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },
    createTask() {
      this.$store.dispatch('createTask');
    },
    updateTask(task) {
      this.$store.dispatch('updateTask', task);
    },
  },
};
</script>
