<template>
    <div class="root">
        <el-header>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24 / folderCountRow" v-for="folder, i in folderTree.content" :key="i">
                    <FolderCard :folder="folder"></FolderCard>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import FolderCard from "./FolderCard"

export default {
    name: 'FileView',
    data() {
        return {
            currentFolder: [],
            folderTree: [],
            folderCountRow: 6, // 每行显示的个数, 可以把被24整除最好 1,2,3,4,6,8,12,24
        }
    },
    components: {
        FolderCard
    },
    methods: {

    },
    mounted() {
        this.folderTree = require('@/assets/folderTree.json')
    },
    watch: {
        '$store.state.machineInfo': {
            handler() {
                let width = this.$store.state.machineInfo.screenWidth
                this.folderCountRow = (width - 300) / 164
            },
            deep: true,
        }
    }
}
</script>

<style scoped>
.root {
    height: 100%;
    background-color: rgb(255,255,255);
}
.el-header {
    height: 15vh;
}

.el-main {
    height: 80vh;
    margin: 10px;
    overflow-x: hidden;
}

</style>