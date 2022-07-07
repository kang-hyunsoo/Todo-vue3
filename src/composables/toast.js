import {onUnmounted,  computed} from "vue";
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    const showToast = computed(() => store.state.showToast);
    const toastMessage = computed(()=> store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const timeout = computed(() => store.state.timeout);

    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true
        timeout.value = setTimeout(() => {
            toastMessage.value = ''
            toastAlertType.value = ''
            showToast.value = false
        }, 2000)
    }
    onUnmounted(() => {
        // unmount하기 전에 쓸데없는 메모리를 잡아먹는 것을 정리하는 역할
        clearTimeout(timeout.value);

    })
    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
    }
}