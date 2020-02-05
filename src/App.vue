<template>
  <task-list></task-list>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import TaskList from '@/views/TaskList.vue';

export default {
  components: {
    'task-list': TaskList,
  },
};
</script>

<style>

</style>
