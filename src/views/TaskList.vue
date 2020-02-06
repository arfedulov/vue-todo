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
        v-bind="task"
        @task:delete="deleteTask"
        @task:change="updateTask"
        @task:done="updateTask({id: task.id, done: true})"
        @task:undone="updateTask({id: task.id, done: false})"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Task from '@/components/Task.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import Toolbar from '@/components/Toolbar.vue';
import filterTasks from '@/utils/filterTasks';

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
    ...mapState({
      tasks: state => state.tasks,
    }),
    filteredTasks() {
      return filterTasks(this.tasks, this.filters);
    },
  },
  created() {
    this.syncTasks();
  },
  methods: {
    ...mapActions([
      'deleteTask',
      'createTask',
      'updateTask',
      'syncTasks',
    ]),
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
