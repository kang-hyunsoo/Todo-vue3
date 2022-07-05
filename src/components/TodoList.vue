<template>
  <List
      :items="todos"
  >
    <template #default="{item, index}">
      <div class="card-body p-2 d-flex align-items-center" @click="moveToPage(item.id)" style="cursor: pointer">
        <div class="form-check flex-grow-1">
          <input 
            class="ml-2 mr-2"
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          >
          <span
            class="form-check-label"
            :class="{ todo: item.completed }"
          >
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>
  <teleport to="#modal">
    <DeleteModal v-if="showModal" @close="closeModal" @delete="deleteTodo"/>
  </teleport>
</template>

<script>
import {useRouter} from "vue-router";
import {ref} from  'vue'
import DeleteModal from "./DeleteModal";
import List from '@/components/List.vue'

export default {
  components: {
    DeleteModal,
    List,
  },
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo', 'delete-todo'],
    setup(props, { emit }) {
      const router = useRouter()
      const showModal = ref(false);
      const todoDeleteId = ref(null);

      const toggleTodo = (index, event) => {
        emit('toggle-todo', index, event.target.checked);
      };

      const openModal = (id) => {
        todoDeleteId.value = id;
        showModal.value = true;
      }

      const closeModal = () => {
        todoDeleteId.value = null
        showModal.value = false
      }
        const deleteTodo = () => {
          emit('delete-todo', todoDeleteId.value);
          closeModal()
        };

        const moveToPage = (todoId) => {
          console.log(todoId)
          // router.push('/todos/' + todoId);
          router.push({
            name: 'Todo',
            params: {
              id: todoId
            }
          })
        }



        return {
          showModal,
          toggleTodo,
          deleteTodo,
          moveToPage,
          openModal,
          closeModal
        };
    }
}

</script>

<style>

</style>