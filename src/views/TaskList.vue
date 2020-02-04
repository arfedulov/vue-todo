<template>
  <div>
    <task-filter
      @task-filter:include-done="filterByDoneStatus(true)"
      @task-filter:exclude-done="filterByDoneStatus(false)"
      @task-filter:use-range="filterByRange"
    >
    </task-filter>
    <ul>
      <li v-for="task of filteredTasks" :key="task.id">
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

export const filterTasks = (tasks, filters) => {
  const { range, done } = filters;
  const filtered = (tasks || []).filter((task) => {
    let result = true;
    if (done) {
      result = task.done;
    }
    if (range[0]) {
      result = task.updatedAt >= range[0];
    }
    if (range[1]) {
      result = task.updatedAt <= range[1];
    }
    if (range[0] && range[1]) {
      result = task.updatedAt >= range[0] && task.updatedAt <= range[1];
    }
    if (range[0] && range[1] && done) {
      result = task.updatedAt >= range[0] && task.updatedAt <= range[1] && task.done;
    }
    return result;
  });

  return filtered;
};

export default {
  name: 'task-list',
  components: {
    task: Task,
    'task-filter': TaskFilter,
  },
  data() {
    return {
      filters: {
        range: [],
        done: false,
      },
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    filteredTasks() {
      return filterTasks(this.$store.state.tasks, this.filters);
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
    filterByRange(range) {
      this.filters.range = range;
    },
    filterByDoneStatus(done) {
      this.filters.done = done;
    },
  },
};
</script>
