<template>
  <div class="item d-flex align-items-center justify-content-between">
    <div
      class="title"
      :class="{ completed: item.completed }"
    >
      {{ item.title }}
    </div>
    <div class="action d-flex">
      <div
        class="action-item action__check d-flex align-items-center justify-content-center"
        @click="changeComplete"
      >
        <check-circle-filled />
      </div>
      <div
        class="action-item action__delete d-flex align-items-center justify-content-center"
        @click="removeItem(index)"
      >
        <delete-filled />
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleFilled, DeleteFilled } from "@ant-design/icons-vue";
import { toRefs } from "vue";

export default {
  props: ["item", "index", "removeItem"],
  components: {
    CheckCircleFilled,
    DeleteFilled,
  },
  setup(props) {
    const { item } = toRefs(props);
    function changeComplete() {
      item.value.completed = true;
    }

    return {
      changeComplete,
    };
  },
};
</script>

<style scoped>
.item {
  background-color: #fff;
  border-radius: 999px;
  overflow: hidden;
}

.item + .item {
  margin-top: 10px;
}

.title {
  padding-left: 14px;
  font-size: 16px;
  font-weight: 500;
}

.action-item {
  color: #fff;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
}

.action__check {
  background-color: #92b9e3;
}

.action__delete {
  background-color: #6c7ee1;
}

.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
