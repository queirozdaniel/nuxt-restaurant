<template>
  <v-btn small color="primary" @click="back">{{ label }}</v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: 'Voltar'
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>