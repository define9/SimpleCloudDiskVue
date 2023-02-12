<template>
    <el-aside width="240px">
        <div class="sider-top">
            <div class="sider-top-title">我是标题和logo</div>
        </div>
        <div class="sider-bottom">
            <div>我是容量</div>
            <div>我是用户信息</div>
        </div>
    </el-aside>
</template>

<script>
import axios from "axios"
import md5 from "js-md5"

export default {
    name: 'Aside',
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
    },
}
</script>

<style scoped>
.el-aside {
    background-color: rgb(245, 245, 246);
    overflow-y: scroll;
    min-height: 580px;
    position: relative;
}

::-webkit-scrollbar {
    display: none;
}

.sider-top {
    background-color: blue;
    height: 360px;
}

.sider-top .sider-top-title {
    background-color: brown;
    height: 96px;
}

.sider-bottom {
    background-color: green;
    height: 214px;
    position: absolute;
    bottom: 0;
}
</style>