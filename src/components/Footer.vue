<template>
  <div class="footer">
    <p>
      <input type="checkbox" id="check" @click="checkAlll" v-model="isCheckAll" :disabled="total === 0" />
      <label for="check">全选</label>
      已完成
      <i>{{ count }}</i>
      / 全部
      <i>{{ total }}</i>
    </p>
    <p>
      <button class="danger" @click="delSelecteds">删除选中</button>
      <button class="danger" @click="delComplete" v-if="count > 0">删除已完成</button>
      <button class="danger" @click="delAlls" v-if="todos.length > 0">删除全部</button>
      <button class="primery" @click="completeBtns">已完成</button>
      <button class="primery" @click="unfinishedBtns">未完成</button>
      <button class="primery" @click="completeAlls">全部</button>
    </p>
  </div>
</template>
<script lang="ts">
import { IToDo } from '@/types/todo';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'ToDoFooter',
  props: {
    todos: {
      type: Array as () => IToDo[],
      required: true,
    },
    checkAll: {
      type: Function,
      required: true,
    },
    completeBtn: {
      type: Function,
      required: true,
    },
    unfinishedBtn: {
      type: Function,
      required: true,
    },
    completeAll: {
      type: Function,
      required: true,
    },
    delSelected: {
      type: Function,
      required: true,
    },
    delComplete: {
      type: Function,
      required: true,
    },
    delAll: {
      type: Function,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isCheckAll = computed({
      get() {
        return checkAlls.value > 0 && props.todos.length === checkAlls.value;
      },
      set(val) {
        props.checkAll(val);
      },
    });

    const checkAlls = computed(() => {
      return props.todos.reduce((pre, todo) => pre + (todo.isCheck ? 1 : 0), 0);
    });

    const completeBtns = () => {
      props.completeBtn();
    };

    const unfinishedBtns = () => {
      props.unfinishedBtn();
    };

    const completeAlls = () => {
      props.completeAll();
    };
    const delSelecteds = () => {
      props.delSelected();
    };
    const delCompletes = () => {
      props.delComplete();
    };
    const delAlls = () => {
      props.delAll();
    };
    return {
      isCheckAll,
      checkAlls,
      completeBtns,
      unfinishedBtns,
      completeAlls,
      delSelecteds,
      delCompletes,
      delAlls,
    };
  },
});
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #eee;
}
.footer input {
  vertical-align: middle;
  margin-right: 10px;
}
.footer label {
  margin-right: 20px;
}
i {
  color: #f00;
}
</style>