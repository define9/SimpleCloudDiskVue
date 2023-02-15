<template>
    <el-container>
        <Aside></Aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
import Aside from "@/components/Aside"
import axios from "axios"
import md5 from "js-md5"

export default {
    name: 'Index',
    components: {
        Aside,
    },
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
.el-container {
    height: 100vh;
}
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