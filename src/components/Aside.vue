<template>
    <el-aside width="240px">
        <div class="sider-top">
            <div class="sider-top-title">我是标题和logo</div>
            <ul class="sider-top-list">
                <li @click="menuClick(item)" class="sider-top-item" v-for="(item, i) in topList" :key="i">
                    <span class="sider-top-item-icon">
                        <i :class="`iconfont ${item.icon}`"></i>
                    </span>
                    <div>
                        <span>{{ item.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sider-bottom">
            <div>我是容量</div>
            <div class="userInfo">
                <img/>
            </div>
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
            topList: []
        }
    },
    methods: {
        menuClick(item) {
            var lis = document.querySelectorAll(".sider-top .sider-top-item")
            lis.forEach(item => {
                item.style.backgroundColor = ''
            })
            event.currentTarget.style.backgroundColor = 'rgb(227,227,229)'
        }
    },
    mounted() {
        this.topList = require('@/assets/topList.json')
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
    height: 360px;
}

.sider-top .sider-top-title {
    background-color: brown;
    height: 96px;
}

.sider-top .sider-top-list {
    height: 264px;
    background-color: pink;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
}
.sider-top .sider-top-item {
    font-weight: 500;
    height: 44px;
    width: 216px;
    cursor: pointer;
    position: relative;
    list-style: none;
    padding-left: 12px;
    line-height: 14px;
    align-items: center;
    border-radius: 10px;
    display: flex;
    transition: background-color .5s ease;
    margin-top: 3px;
}
.sider-top .sider-top-item:hover {
    background-color: rgb(236, 236, 238);
}

.sider-top .sider-top-item .sider-top-item-icon {
    margin-right: 16px;
}

.sider-top .sider-top-item .sider-top-item-icon i {
    font-size: 23px;
}


.sider-bottom {
    background-color: green;
    height: 214px;
    position: absolute;
    bottom: 0;
    width: 240px;
}

.sider-bottom .userInfo {
    height: 75px;
    width: 192px;
    background-color: azure;
    position: absolute;
    bottom: 0;
    padding: 0 24px;
    vertical-align: middle;
}

.sider-bottom .userInfo img {
    width: 32px;
    height: 32px;
    margin-top: 21px;
}
</style>