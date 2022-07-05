<template>
  <div class="form-group">
    <label class="pb-2">{{ label }}</label>
    <input
        :value="subject"
        type="text"
        class="form-control"
        @input="onInput"
    >
    <div v-if="error" class="text-red">
      {{error}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },

  },
  setup(props, { emit }) {
    const onInput = (e) => {
      // 컴포넌트에 v-model 사용시 update:props-name
      emit('update:subject', e.target.value)
    }
  return {
    onInput
  }
  }
}
</script>

<style scoped>
.text-red {
  color: darkred;
}
</style>