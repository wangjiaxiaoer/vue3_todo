<template>
  <ul v-if="todos">
    <Item
      v-for="(item, index) in todos"
      :key="item.id"
      :item="item"
      :delTodo="delTodo"
      :index="index"
      :changeComplete="changeComplete"
      :changCheckd="changCheckd"
    />
  </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Item from './Item.vue';
export default defineComponent({
  name: 'ToDoList',
  components: {
    Item,
  },
  props: ['todos', 'delTodo', 'changeComplete', 'changCheckd'],
});
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  border: 1px solid #eee;
}
</style>