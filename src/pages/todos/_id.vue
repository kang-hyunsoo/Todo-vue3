<template>
  <h2 class="pt-5">Todo Page</h2>
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