<template>
  <h2 class="pt-5 pb-2">To-do Page</h2>
<TodoForm :editing="true"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'

export default {
  components: {
    TodoForm
  }
}
</script>

<style>

</style>