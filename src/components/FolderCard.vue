<template>
    <div class="folder-card">
        <div class="folder">
            <img class="folder-folder" v-if="folder.type=='folder'" src="/folder.png"/>
            <img class="folder-pdf" v-if="folder.mimeType=='application/pdf'" src="/pdf.png"/>
            <img class="folder-img" v-if="folder.mimeType.substr(0,5)=='image'" src="/img.png"/>
            <div>
                {{ folder.name }}
            </div>
            <span class="folder-date">
                {{ folder.date }}
            </span>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import md5 from "js-md5"

export default {
    name: 'FolderCard',
    data() {
        return {
        }
    },
    props: {
        folder: {
            type: Object,
	        default: () => {}
        }, // 一个文件夹卡片, 对应 folderTree.json 一个content
    },
    methods: {

    },
    mounted() {
    },
}
</script>

<style scoped>

.folder-card {
    height: 207px;
    width: 164px;
    text-align: center;
    user-select:none;
    margin: auto;
}

.folder {
    border-radius: 5px;
    cursor: pointer;
    max-width: 123px;
    margin: auto;
}

.folder img{
    margin-top: 2px;
    -webkit-user-drag: none;
}

.folder-folder {
    width: 115px;
    height: 90px;
}

.folder-pdf {
    width: 100px;
    height: 90px;
}

.folder-img {
    width: 90px;
}

.folder:hover {
    background-color: rgb(245,245,246);
}

::-webkit-scrollbar {
    display: none;
}

.folder-date {
    width: 100%;
    text-align: center;
    font-size: 12px;
    line-height: 1.6;
    color: var(--context_tertiary);
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
</style>