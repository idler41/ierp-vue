<template>
  <div class="menu-wrapper">

    <!-- 可展开目录-->
    <el-submenu v-if="isSubMenu(item)" :index="item.key">
      <template slot="title">
        <item :icon="item.icon" :title="item.title"/>
      </template>

      <template v-for="subItem in item.children">
        <sidebar-item
          :key="subItem.path"
          :item="subItem"
          :base-path="subItem.path"
        />
      </template>
    </el-submenu>

    <!-- 可点击目录 -->
    <template v-else>
      <app-link :to="item.path">
        <el-menu-item :index="item.key" :class="{'submenu-title-noDropdown': true}">
          <item :icon="item.icon" :title="item.title"/>
        </el-menu-item>
      </app-link>
    </template>

  </div>
</template>

<script>
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    isSubMenu(item) {
      return item.children && item.children.length && item.children.length > 0
    }
  }
}
</script>
