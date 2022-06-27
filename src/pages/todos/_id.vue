<template>
  <h1>Todo Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Todo Subject</label>
          <input
              type="text"
              class="form-control"
              v-model="todo.subject">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
                type="button"
                class="btn"
                :class="todo.completed ? 'btn-success' : 'btn-danger'"
                @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'Incomplete' }}</button>
          </div>
        </div>
      </div>
    </div>

    <button
        type="submit"
        class="btn btn-primary"
    >
      Save
    </button>
    <button
        @click="moveToTodoListPage"
        class="btn btn-outline-dark ml-2">
      Cancel
    </button>
  </form>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const todo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;

    const getTodo = async() => {
      const res = await axios.get(`http://localhost:3000/todos/${todoId}` )
      todo.value = res.data;
      loading.value = false;
    }

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed
    }

    const moveToTodoListPage = () => {
      router.push({name: 'Todos'})

    }

    const onSave = async() => {
      const res =  await axios.put(`http://localhost:3000/todos/${todoId}`, {
        subject: todo.value.subject,
        completed: todo.value.completed
      });
      console.log(res)
    }
  getTodo()
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave
    }
  }

}
</script>

<style>

</style>