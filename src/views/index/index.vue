<template>
    <el-container>
        <div class="aside-div">
            <Aside class="aside"></Aside>
        </div>
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
    height: 100%;
}

.aside-div {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    width: 240px;
}

.aside {
    background-color: rgb(245, 245, 246);
    height: 100%;
    min-height: 580px;
    position: relative;
}
::-webkit-scrollbar {
    display: none;
}

.el-main {
    padding: 0;
    flex: 1;
}
</style>