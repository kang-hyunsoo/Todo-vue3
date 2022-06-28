<template>
  <h2 class="pt-5">Todo Page</h2>
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
        :disabled="!todoUpdated"
    >
      Save
    </button>
    <button
        @click="moveToTodoListPage"
        class="btn btn-outline-dark ml-2">
      Cancel
    </button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
  <div id="test"></div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
import _ from 'lodash';
import Toast from "../../components/Toast";

export default {
  components : {
    Toast
  },

  setup() {
    onBeforeMount(() => {
      console.log(document.querySelector(('#test')))
    });
    onMounted(() => {
      console.log(document.querySelector(('#test')))

    });
    onBeforeUpdate(() => {
      console.log('before update')
    })
    onUpdated(() => {
      console.log('update!')
    })
    onBeforeUnmount(() => {
      console.log('before unmount')
    })
    onUnmounted(() => {
      // unmount하기 전에 쓸데없는 메모리를 잡아먹는 것을 정리하는 역할
      console.log('unmounted')

    })
    console.log('test!!')
    const router = useRouter()
    const route = useRoute()
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');

    const getTodo = async() => {
      try {

      const res = await axios.get(`http://localhost:3000/todos/${todoId}` )
      todo.value = {...res.data};
      originalTodo.value = {...res.data};
      loading.value = false;
      } catch (error) {
        console.log(error)
        triggerToast('Something went wrong', 'danger')
      }
    }

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    })

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed
    }

    const moveToTodoListPage = () => {
      router.push({name: 'Todos'})

    }

    const triggerToast = (message, type = 'success') => {
      toastMessage.value = message;
      toastAlertType.value = type;
      showToast.value = true
      setTimeout(() => {
        toastMessage.value = ''
        toastAlertType.value = ''
        showToast.value = false
      }, 3000)
    }

    const onSave = async() => {
      try {

      const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
        subject: todo.value.subject,
        completed: todo.value.completed
      });

      originalTodo.value = {...res.data};
      triggerToast('Successfully Saved!');
      }
    catch (error) {
        console.log(error)
        triggerToast('Something went wrong', 'danger')
      }
    }
  getTodo()
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType
    }
  }

}
</script>

<style>

</style>