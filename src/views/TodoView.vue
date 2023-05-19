<template>
  <div class="container">
    <h1 class="heading text-center">Todo List</h1>
    <div class="main">
      <!-- form -->
      <div class="form">
        <div class="d-flex align-items-center justify-content-center">
          <a-input
            class="input"
            placeholder="Enter anything..."
            v-model:value="title"
            @keyup.enter="addItem"
          />
          <a-button @click="addItem">Add</a-button>
        </div>
        <div class="text-end">
          <a-select
            class="filter"
            v-model:value="filter"
          >
            <a-select-option value="all"> All </a-select-option>
            <a-select-option value="completed">Completed</a-select-option>
            <a-select-option value="incomplete">Incomplete</a-select-option>
          </a-select>
        </div>
      </div>
      <!-- todo-item -->
      <div class="list">
        <todo-item-comp
          v-for="(item, index) in listFiltered"
          :key="index"
          :item="item"
          :index="index"
          :removeItem="removeItem"
        ></todo-item-comp>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button, Select, SelectOption } from "ant-design-vue";
import { ref, reactive, computed } from "vue";

import TodoItemComp from "@/components/TodoItemComp.vue";

export default {
  components: {
    AInput: Input,
    AButton: Button,
    ASelect: Select,
    ASelectOption: SelectOption,
    // components
    TodoItemComp,
  },
  setup() {
    const filter = ref("all");
    const title = ref("");
    const list = reactive([]);

    // Function
    function resetValue() {
      title.value = "";
    }

    function addItem() {
      if (title.value.trim() !== "") {
        const newItem = {
          title: title.value,
          isCompleted: false,
        };

        list.push(newItem);
        resetValue();
      }
    }

    function removeItem(index) {
      console.log(index);
      list.splice(index, 1);
    }

    const listFiltered = computed(() =>
      filter.value === "completed"
        ? list.filter((item) => item.isCompleted)
        : filter.value === "incomplete"
        ? list.filter((item) => !item.isCompleted)
        : list,
    );

    return { filter, listFiltered, title, resetValue, addItem, removeItem };
  },
};
</script>

<style scoped>
.container {
  background-color: #fad1bb;
  height: 100%;
}

.heading {
  color: #c68beb;
}

.main {
  width: 400px;
  margin: 0 auto;
}

.filter {
  width: 130px;
  text-align: left;
}

.list {
  margin: 40px auto 0;
  width: 70%;
}
</style>
