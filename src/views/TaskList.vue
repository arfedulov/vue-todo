<template>
  <div>
    <task-filter></task-filter>
    <ul>
      <li v-for="task of tasks" :key="task.id">
        <task :id="task.id" :title="task.title" :content="task.content"></task>
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
  // TODO: add methods for dispatching store actions
};
</script>
