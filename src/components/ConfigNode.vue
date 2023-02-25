<template>
    <el-container style="padding: 20px 0;">
        <el-main>
            <el-alert title="优先级越小越优先使用" type="success"></el-alert>
            <el-table v-loading="loading" :data="configList" style="width: 100%">
                <el-table-column prop="nodeId" label="标识" width="40">
                </el-table-column>
                <el-table-column prop="nodeName" label="节点名">
                </el-table-column>
                <el-table-column prop="nodeLocalPath" label="节点路径">
                </el-table-column>
                <el-table-column prop="nodeTypeName" label="节点类型">
                </el-table-column>
                <el-table-column prop="disable" label="启用" width="60">
                    <template slot-scope="scope">
                        <el-switch :value="!scope.row.disable" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="优先级">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.sort }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="剩余空间">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.remainingCapacity | capacityFilter }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" v-show="!scope.row.disable"
                            @click="handleUpdate(scope.$index, scope.row, true)">禁用</el-button>
                        <el-button size="mini" type="success" v-show="scope.row.disable"
                            @click="handleUpdate(scope.$index, scope.row, false)">启用</el-button>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <el-empty description="没有数据"></el-empty>
                </template>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize">
            </el-pagination>
        </el-footer>

        <!-- Form -->
        <el-dialog title="编辑节点" :visible.sync="dialogFormVisible">
            <el-form :model="node">
                <el-input v-model="node.nodeId" v-show="false"></el-input>
                <el-col :span="12">
                    <el-form-item label="节点名" :label-width="`120px`">
                        <el-input v-model="node.nodeName" autocomplete="off" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="节点类型" :label-width="`120px`">
                        <el-select v-model="node.nodeTypeId" placeholder="请选择角色">
                            <el-option label="本地" :value="0"></el-option>
                            <el-option label="三方OSS" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="禁用" :label-width="`120px`">
                        <el-switch v-model="node.disable" active-color="#FF0000"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="优先级" :label-width="`120px`">
                        <el-input-number v-model="node.sort" :min="0"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="路径" :label-width="`120px`">
                        <el-input v-model="node.nodeLocalPath">
                            <el-button slot="append" icon="el-icon-s-promotion" @click="verifyPath">点击校验路径</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
import axios from "axios"
import md5 from "js-md5"
import { capacityFilter } from "@/common"

export default {
    name: 'ConfigNode',
    data() {
        return {
            loading: false,
            dialogFormVisible: false,
            configList: [],
            total: 0,
            pageSize: 10,
            pageIndex: 1,
            node: {}
        }
    },
    methods: {
        refreshData() {
            this.loading = true
            axios.get(`/cloud_disk_api/cloud/configList?index=${this.pageIndex}&size=${this.pageSize}`)
                .then(res => {
                    res = res.data
                    if (res.code == 0) {
                        let page = res.data
                        this.total = page.total
                        this.configList = page.records
                    }
                }).finally(() => {
                    this.loading = false
                })
        },
        handleEdit(index, data) {
            this.node = Object.assign({}, data)
            this.dialogFormVisible = true
        },
        handleUpdate(index, data, disable) {
            if (disable) {
                this.$confirm('禁用后不可继续添加文件, 以前添加的可以读取, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateStatus(data, true)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            } else {
                this.updateStatus(data, false)
            }
        },
        updateStatus(data, disableStatus) {
            axios.put(`/cloud_disk_api/cloud/configStatus?id=${data.nodeId}&disable=${disableStatus}`).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    })
                    data.disable = disableStatus
                } else {
                    this.$message({
                        type: 'warning',
                        message: '更新失败'
                    })
                }
            })
        },
        update() {
            axios.put('/cloud_disk_api/cloud/config', this.node)
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        })
                    }
                })
            this.dialogFormVisible = false
        },
        verifyPath() {
            axios.get(`/cloud_disk_api/cloud/verifyPath?path=${this.node.nodeLocalPath}`)
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '节点路径可用, 容量: ' + capacityFilter(res.data.data)
                        })
                    } else {
                        this.$message({
                            type: 'warn',
                            message: '节点路径不可用'
                        })
                    }
                })
        }
    },
    mounted() {
        this.refreshData()
    },
    filters: {
        capacityFilter
    }
}
</script>

<style scoped>
.el-table {
    min-height: 90%;
}

.el-pagination {
    padding-left: 50%;
}

.el-main {
    padding-left: 0;
    padding-right: 0;
}
</style>
