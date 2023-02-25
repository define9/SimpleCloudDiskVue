<template>
    <el-container>
        <el-header>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="userList">
                    <user-list></user-list>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-header>
        <el-main>

        </el-main>
    </el-container>
</template>

<script>
import axios from "axios"
import md5 from "js-md5"
import UserList from "./UserList.vue"

export default {
    name: 'Manager',
    components: {
        UserList
    },
    data() {
        return {
            menuDataSource: [
                {name: '用户管理'}
            ],
            activeName: "userList"
        }
    },
    methods: {
        handleClick() {
            
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.el-container {
    padding: 20px;
}
.el-tabs {
    height: 100%;
}
</style>
