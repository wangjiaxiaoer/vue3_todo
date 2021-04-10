
<template>
  <div class="header">
    <input type="text" placeholder="请输入待办事项" v-model="title" @keyup.enter="add" />
    <button @click="add" class="info">添加</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ToDoHeader',
  props: {
    addTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const title = ref('');

    const add = () => {
      const text = title.value;

      if (!text.trim()) return alert('请输入待办事项');
      const todo = {
        id: Date.now(),
        title: text,
        isComplete: false,
        isCheck: false,
      };
      props.addTodo(todo);
      title.value = '';
    };
    return {
      title,
      add,
    };
  },
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.header button,
.header input {
  border: 0;
  height: 40px;
}
.header input {
  border: 1px solid #eee;
  padding-left: 10px;
  width: 100%;
}
.header button {
  width: 150px;
}
</style>