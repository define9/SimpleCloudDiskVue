<template>
    <div class="root">
        <el-header>

        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col class="folder" :span="folderSpan" v-for="folder in folderTree" :key="folder.id">
                    <div class="">
                        <img src="https://img.alicdn.com/imgextra/i1/O1CN01rGJZac1Zn37NL70IT_!!6000000003238-2-tps-230-180.png"/>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import axios from "axios"
import md5 from "js-md5"

export default {
    name: 'FileView',
    data() {
        return {
            currentFolder: [],
            folderTree: [],
            folderSpan: 4
        }
    },
    methods: {

    },
    mounted() {
        this.folderTree = require('@/assets/folderTree.json')
    },
}
</script>

<style scoped>
.root {
    height: 100%;
    background-color: rebeccapurple;
}
.el-header {
    height: 15vh;
}

.el-main {
    height: 80vh;
    margin: 10px;
}

.folder {
    height: 207px;
}

.folder img{
    width: 70%;
}

::-webkit-scrollbar {
    display: none;
}
</style>