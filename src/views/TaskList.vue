<template>
  <div>
    <toolbar class="toolbar" @toolbar:create-task="createTask"></toolbar>
    <task-filter
      class="task-filter"
      @task-filter:include-done="filterByDoneStatus(true)"
      @task-filter:exclude-done="filterByDoneStatus(false)"
      @task-filter:use-range="filterByRange"
    >
    </task-filter>
    <div class="task-list">
      <task
        v-for="task of filteredTasks" :key="task.id"
        class="task"
        :id="task.id"
        :title="task.title"
        :content="task.content"
        :done="task.done"
        :updatedAt="task.updatedAt"
        @task:delete="deleteTask"
        @task:change="updateTask"
        @task:done="updateTask({id: task.id, done: true})"
        @task:undone="updateTask({id: task.id, done: false})"
      />
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import Toolbar from '@/components/Toolbar.vue';

// eslint-disable-next-line no-restricted-globals
const isValidDate = date => date && !isNaN(date.getTime());

export const filterTasks = (tasks, filters) => {
  const { range, done: includeDoneAlso } = filters;
  const filtered = (tasks || []).filter((task) => {
    let result = includeDoneAlso ? true : !task.done;
    if (isValidDate(range[0])) {
      result = task.updatedAt >= range[0] && result;
    }
    if (isValidDate(range[1])) {
      result = task.updatedAt <= range[1] && result;
    }
    if (isValidDate(range[0]) && isValidDate(range[1])) {
      result = task.updatedAt >= range[0]
        && task.updatedAt <= range[1] && result;
    }
    return result;
  });

  return filtered;
};

export default {
  name: 'task-list',
  components: {
    Task,
    TaskFilter,
    Toolbar,
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
      this.filters = {
        ...this.filters,
        range,
      };
    },
    filterByDoneStatus(done) {
      this.filters = {
        ...this.filters,
        done,
      };
    },
  },
};
</script>

<style scoped>
  .task-list {
    padding: 10px;
  }
  .task {
    max-width: 40em;
    margin: 10px auto;
  }
  .task-filter {
    margin: 25px auto;
    width: fit-content;
  }
  .toolbar {
    margin: 10px 25px;
  }
</style>
