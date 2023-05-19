<template>
  <div
    class="navigation"
    :class="theme === 'dark' ? 'dark-theme' : 'light-theme'"
  >
    <div class="text-end switch-theme">
      <a-switch
        :checked="theme === 'dark'"
        checked-children="Dark"
        un-checked-children="Light"
        @change="() => changeTheme()"
      />
    </div>
    <a-menu
      class="menu"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :theme="theme"
    >
      <a-menu-item key="1">
        <template #icon>
          <home-outlined />
        </template>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </a-menu-item>

      <a-menu-item key="2">
        <template #icon>
          <appstore-outlined />
        </template>
        <router-link :to="{ name: 'todo' }">Todo List</router-link>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation Three</template>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
        <a-sub-menu
          key="sub1-2"
          title="Submenu"
        >
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>

      <a-sub-menu key="sub2">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>Navigation Four</template>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

import { Menu, MenuItem, SubMenu, Switch } from "ant-design-vue";

import {
  MailOutlined,
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    // comp
    AMenu: Menu,
    AMenuItem: MenuItem,
    ASubMenu: SubMenu,
    ASwitch: Switch,

    // icons
    MailOutlined,
    HomeOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const state = reactive({
      theme: "dark",
      selectedKeys: ["1"],
      openKeys: ["sub1"],
    });
    const changeTheme = () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    };

    return {
      ...toRefs(state),
      changeTheme,
    };
  },
};
</script>

<style scoped>
.navigation {
  min-height: 100vh;
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}

.switch-theme {
  padding: 10px 10px 10px;
}
.menu {
  width: 256px;
}

.dark-theme {
  background-color: #001529;
}

.light-theme {
  background-color: #fff;
  border-right: 1px solid #fff;
}
</style>
