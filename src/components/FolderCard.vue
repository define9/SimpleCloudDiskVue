<template>
    <div class="folder">
        <img class="folder-folder" v-if="folder.type=='folder'" src="/folder.png"/>
        <img class="folder-pdf" v-else-if="folder.mimeType=='application/pdf'" src="/pdf.png"/>
        <img class="folder-img" v-else-if="folder.mimeType!=null&&folder.mimeType.substr(0,5)=='image'" src="/img.png"/>
        <img class="folder-txt" v-else-if="folder.mimeType!=null&&folder.mimeType.substr(0,4)=='text'" src="/txt.png"/>
        <img class="folder-txt" v-else src="/default.png"/>
        <div class="card-name">
            {{ folder.name }}
        </div>
        <span class="folder-date">
            {{ folder.date | dateFilter }}
        </span>
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
    filters: {
        dateFilter: function(value) {
            let dt = new Date(value)
            let now= new Date()
            
            let year = dt.getFullYear()
            let month = (dt.getMonth() + 1).toString().padStart(2, '0')
            let date = dt.getDate().toString().padStart(2, '0')
            let hour = dt.getHours().toString().padStart(2, '0')
            let minute = dt.getMinutes().toString().padStart(2, '0')
            if (year == now.getFullYear()) {
                return `${month}-${date} ${hour}:${minute}`
            }
            return `${year}/${month}-${date} ${hour}:${minute}`
        }
    }
}
</script>

<style scoped>

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

.folder-txt {
    width: 70px;
}

.folder:hover {
    background-color: rgb(245,245,246);
}

::-webkit-scrollbar {
    display: none;
}

.card-name {
    text-overflow: ellipsis;
    overflow-x: auto;
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