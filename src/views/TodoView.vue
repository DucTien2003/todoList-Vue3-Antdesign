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
import { ref, computed } from "vue";

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
    const list = ref([]);

    // Function
    function resetValue() {
      title.value = "";
    }

    const axios = require("axios").default;
    const getList = () => {
      axios
        .get("https://ezo13.free.beeceptor.com/todos")
        .then(function (response) {
          list.value = response.data;
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    };

    getList();

    const addItem = () => {
      if (title.value.trim() !== "") {
        const newItem = {
          title: title.value,
          completed: false,
        };

        axios
          .post("https://ezo13.free.beeceptor.com/todos", newItem)
          .then((response) => {
            // Xử lý phản hồi thành công
            console.log(response.data);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });

        list.value.unshift(newItem);
        resetValue();
      }
    };

    function removeItem(index) {
      console.log(index);
      list.value.splice(index, 1);
    }

    const listFiltered = computed(() =>
      filter.value === "completed"
        ? list.value.filter((item) => item.completed)
        : filter.value === "incomplete"
        ? list.value.filter((item) => !item.completed)
        : list.value,
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
