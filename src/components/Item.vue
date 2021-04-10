<template>
  <li>
    <p>
      <input type="checkbox" v-model="changCheckds" :id="item.id" />
      <label :for="item.id" :class="item.isComplete ? 'del' : ''">{{ item.title }}-{{ item.id }}</label>
    </p>
    <p>
      <button @click="btnSubmit" class="info" v-if="!item.isComplete">标记为已完成</button>
      <button @click="btnDelete" class="danger">删除</button>
    </p>
  </li>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { IToDo } from '../types/todo';
export default defineComponent({
  name: 'ToDoItem',
  props: {
    item: {
      type: Object as () => IToDo,
      required: true,
    },
    delTodo: {
      type: Function,
      required: true,
    },
    changeComplete: {
      type: Function,
      required: true,
    },
    changCheckd: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const del = ref(false);

    const changCheckds = computed({
      get() {
        return props.item.isCheck;
      },
      set(val) {
        props.changCheckd(props.item, val);
      },
    });

    const btnDelete = () => {
      props.delTodo(props.index);
    };

    const btnSubmit = () => {
      props.changeComplete(props.index);
    };

    return {
      changCheckds,
      del,
      btnDelete,
      btnSubmit,
    };
  },
});
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
li .del {
  text-decoration: line-through;
}
li:hover {
  background-color: #fcdccd;
}
li p:last-child {
  display: none;
}
li:hover p:last-child {
  display: block;
}
</style>
