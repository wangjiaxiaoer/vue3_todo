<template>
  <h2>TodoList</h2>
  <div class="todolist">
    <ToDoHeader :addTodo="addTodo" />
    <ToDoList :todos="todos" :delTodo="delTodo" :changeComplete="changeComplete" :changCheckd="changCheckd" />
    <ToDoFooter
      :todos="todos"
      :checkAll="checkAll"
      :completeBtn="completeBtn"
      :unfinishedBtn="unfinishedBtn"
      :completeAll="completeAll"
      :delComplete="delComplete"
      :delAll="delAll"
      :delSelected="delSelected"
      :total="total"
      :count="count"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed, toRefs, watch } from 'vue';
import ToDoHeader from './components/Header.vue';
import ToDoList from './components/List.vue';
import ToDoFooter from './components/Footer.vue';
import { IToDo } from './types/todo';
import { saveTodos, readTodos } from './utils/localStorageUtils';

export default defineComponent({
  name: 'App',
  components: {
    ToDoHeader,
    ToDoList,
    ToDoFooter,
  },
  setup() {
    const state = reactive<{ todos: IToDo[] }>({
      todos: [],
    });
    const data = reactive<{ list: IToDo[] }>({
      list: [],
    });

    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos();
        data.list = readTodos();
      }, 0);
    });

    const addTodo = (todo: IToDo) => {
      state.todos.unshift(todo);
      data.list = state.todos;
    };

    const delTodo = (index: number) => {
      state.todos.splice(index, 1);
    };

    const total = computed(() => {
      return data.list.length;
    });
    const count = computed(() => {
      return data.list.reduce((pre, todo) => pre + (todo.isComplete ? 1 : 0), 0);
    });

    const changeComplete = (index: number) => {
      state.todos.forEach((todo, idx) => {
        if (idx === index) {
          todo.isComplete = true;
        }
      });
    };

    const changCheckd = (todo: IToDo, isCheck: boolean) => {
      todo.isCheck = isCheck;
    };

    const delSelected = () => {
      let i = 0;
      data.list = state.todos = state.todos.filter((todo: IToDo) => {
        if (!todo.isCheck) i++;

        if (i == state.todos.length) alert('请选择一条待办事项');

        return !todo.isCheck;
      });
    };

    const delComplete = () => {
      data.list = state.todos = state.todos.filter((todo: IToDo) => !todo.isComplete);
    };

    const delAll = () => {
      data.list.length = state.todos.length = 0;
    };

    const completeBtn = () => {
      state.todos = data.list.filter((todo: IToDo) => todo.isComplete === true);
      console.log(state.todos);
    };

    const unfinishedBtn = () => {
      state.todos = data.list.filter((todo: IToDo) => {
        return todo.isComplete === false;
      });
    };

    const completeAll = () => {
      state.todos = data.list.filter((todo: IToDo) => {
        return todo;
      });
    };

    const checkAll = (isCheck: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCheck = isCheck;
      });
    };

    // 数据本地化
    watch(() => state.todos, saveTodos, { deep: true });

    return {
      total,
      count,
      addTodo,
      delTodo,
      changeComplete,
      checkAll,
      completeBtn,
      unfinishedBtn,
      completeAll,
      changCheckd,
      delSelected,
      delComplete,
      delAll,
      ...toRefs(state),
      ...toRefs(data),
    };
  },
});
</script>

<style>
* {
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
}
.todolist {
  width: 1000px;
  margin: 20px auto 50px;
  color: #333;
}
h2 {
  text-align: center;
  font-size: 24px;
}
.todolist button {
  border: 0;
  color: #fff;
  height: 30px;
  border-radius: 3px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.4);
  padding: 0 10px;
  cursor: pointer;
}

.todolist button.danger {
  height: 30px;
  background-color: #c0392b;
  color: #fff;
}
.todolist button.danger:hover,
.todolist button.danger:active {
  background-color: #e74c3c;
}
.todolist button.info {
  background-color: #27ae60;
}
.todolist button.info:hover,
.todolist button.info:active {
  background-color: #2ecc71;
}
.todolist button.primery {
  background: #2980b9;
}
.todolist button.primery:hover,
.todolist button.primery:active {
  background: #3498db;
}
.todolist button + button {
  margin-left: 10px;
}

.todolist input[type='checkbox'] {
  vertical-align: middle;
  margin-right: 10px;
}
</style>
