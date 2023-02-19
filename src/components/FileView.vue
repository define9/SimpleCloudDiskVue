<template>
    <div class="root">
        <el-header>
            <el-breadcrumb separator=">">
                <el-breadcrumb-item v-for="path, i in currentPath" :key="i"
                 :to="i!=currentPath.length - 1?{path:`/file?folderId=${path.id}`}:''"
                 @click.native="refreshPath(i)">
                    {{ path.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main  v-loading="mainLoading">
            <el-row :gutter="20" v-if="folderTree.content!=null&&folderTree.content.length>0">
                <el-col :span="24 / folderCountRow" v-for="folder, i in folderTree.content" :key="i">
                    <div class="folder-card">
                        <FolderCard :folder="folder" @click.native="click(folder)"></FolderCard>
                    </div>
                </el-col>
            </el-row>
            <el-empty v-if="folderTree.content==null||folderTree.content.length<=0" description="这里什么都没有"></el-empty>
        </el-main>
    </div>
</template>

<script>
import axios from 'axios'
import FolderCard from "./FolderCard"

export default {
    name: 'FileView',
    data() {
        return {
            currentPath: [],
            folderTree: [],
            mainLoading: false,
            folderCountRow: 1, // 每行显示的个数, 可以把被24整除最好 1,2,3,4,6,8,12,24
        }
    },
    components: {
        FolderCard
    },
    methods: {
        click(card){
            if (card.type == "folder") {
                this.currentPath.push({
                    id: card.id,
                    name: card.name
                })
                // 跳转路由
                this.$router.push('/file?folderId=' + card.id)
            } else {
                alert('点击了一个文件')
            }
        },
        refreshPath(i) {
            if (i == this.currentPath.length - 1) {
                return
            }
            this.currentPath = this.currentPath.filter((item, index) => index <= i)
        }
    },
    mounted() {
        this.folderCountRow = (document.documentElement.clientWidth - 300) / 164
        this.mainLoading = true
        axios.get("/cloud_disk_api/cloud/directory?needPath=true")
            .then(res => {
                this.folderTree = res.data.data
                this.currentPath = this.folderTree.path
            }).finally(()=>{
                this.mainLoading = false
            })
    },
    watch: {
        '$route.query.folderId': {
            handler() {
                let folderId = this.$route.query.folderId
                if (folderId == null) return
                this.mainLoading = true
                axios.get(`/cloud_disk_api/cloud/directory?folderId=${folderId}`)
                .then(res => {
                    this.folderTree = res.data.data
                }).finally(()=>{
                    this.mainLoading = false
                })
            },
            deep: true
        },
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

.folder-card {
    height: 207px;
    width: 164px;
    text-align: center;
    user-select:none;
    margin: auto;
}

.el-header {
    height: 40px;
    padding: 0 40px;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 24px;
    -ms-flex-pack: justify;
    justify-content: space-between;
    white-space: nowrap;
    -ms-flex-negative: 0;
    font-weight: 500;
    flex-shrink: 0;
}
</style>