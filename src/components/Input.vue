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
      console.log(e.target.value)
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