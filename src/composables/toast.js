import {onUnmounted, ref} from "vue";

export const useToast = () => {
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);

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