<template>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <Input
            label="Subject"
            :error="subjectError"
            v-model:subject="todo.subject"
<!--            v-model을 여러개 사용하고 싶으면 v-model:이름="" 으로 적으면 됨-->
        />
      </div>
      <div v-if="editing" class="col-6">
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
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea class="form-control" v-model="todo.body" ></textarea>
        </div>
      </div>
    </div>
    <button
        type="submit"
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
      {{editing ?  'Update' : 'Create'}}
    </button>
    <button
        @click="moveToTodoListPage"
        class="btn btn-outline-dark ml-2">
      Cancel
    </button>
  </form>
  <transition name="fade">
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
  </transition>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { ref, computed, onUpdated } from 'vue';
import _ from 'lodash';
import Toast from "@/components/Toast";
import { useToast } from "@/composables/toast";
import Input from '@/components/Input'

export default {
  components : {
    Toast,
    Input
  },
  props : {
    editing: {
      type: Boolean,
      default: false
    }

  },

  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const todo = ref({
      subject: '',
      completed: false,
      body: ''
    });
    onUpdated(() => {
      console.log(todo.value.subject)
    })

    const originalTodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;
    const subjectError = ref('');

    const {
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast
    } = useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`)
        todo.value = {...res.data};
        originalTodo.value = {...res.data};
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error)
        // triggerToast('Something went wrong', 'danger')
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

    if (props.editing) {
      getTodo();
    }


    const onSave = async () => {
      if(!todo.value.subject) {
        subjectError.value = 'Subject is required'
        return
      }

      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body
        }

        if (props.editing) {
          res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
          originalTodo.value = {...res.data};

        } else {
          res = await axios.post(`http://localhost:3000/todos`, data);
          todo.value.subject = '';
          todo.value.body = '';
        }

        const message = `Successfully ${props.editing ? 'Updated!' : 'Created!'}`
        triggerToast(message);
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
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
      subjectError,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
    }
  }

}
</script>


<style scoped>
/*각 태그에 data-xxxxxx라는 고유의 아이디가 적용됨*/
  .text-red {
    color: darkred;
  }

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-form,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);

}
</style>

<!--두 개의 style tag를 만들어서 하나만 global하게 동작도 가능-->
<!--<style>-->

<!--</style>-->