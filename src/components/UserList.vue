<template>
    <el-container style="padding: 20px 0;">
        <el-main>
            <el-table v-loading="loading" :data="userList" style="width: 100%">
                <el-table-column prop="userId" label="标识" width="40">
                </el-table-column>
                <el-table-column label="头像" width="60">
                    <template slot-scope="scope">
                        <el-avatar :src="scope.row.avatar"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="用户名">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.username }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="nick" label="昵称">
                </el-table-column>
                <el-table-column prop="role" label="角色" width="100">
                </el-table-column>
                <el-table-column prop="capacity" label="容量(MB)" width="90">
                </el-table-column>
                <el-table-column prop="disable" label="启用" width="60">
                    <template slot-scope="scope">
                        <el-switch :value="!scope.row.disable" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="150">
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="150">
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
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize">
            </el-pagination>
        </el-footer>

        <!-- Form -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
            <el-form :model="user">
                <el-input v-model="user.userId" v-show="false"></el-input>
                <el-col :span="12">
                    <el-form-item label="用户名" :label-width="`120px`">
                        <el-input v-model="user.username" autocomplete="off" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="昵称" :label-width="`120px`">
                        <el-input v-model="user.nick" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色" :label-width="`120px`">
                        <el-select v-model="user.roleId" placeholder="请选择角色">
                            <el-option label="管理员" :value="1"></el-option>
                            <el-option label="普通用户" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="容量(MB)" :label-width="`120px`">
                        <el-input-number v-model="user.capacity" :min="0"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="禁用" :label-width="`120px`">
                        <el-switch v-model="user.disable" active-color="#FF0000"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="邮箱" :label-width="`120px`">
                        <el-input v-model="user.email" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" :label-width="`120px`">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="user.remark">
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

export default {
    name: 'UserList',
    data() {
        return {
            loading: false,
            dialogFormVisible: false,
            userList: [],
            total: 0,
            pageSize: 10,
            pageIndex: 1,
            user: {}
        }
    },
    methods: {
        refreshData() {
            this.loading = true
            axios.get(`/cloud_disk_api/user/userList?index=${this.pageIndex}&size=${this.pageSize}`)
                .then(res => {
                    res = res.data
                    if (res.code == 0) {
                        let page = res.data
                        this.total = page.total
                        this.userList = page.records
                    }
                }).finally(() => {
                    this.loading = false
                })
        },
        handleEdit(index, data) {
            this.user = data
            this.dialogFormVisible = true
        },
        handleUpdate(index, data, disable) {
            if (disable) {
                this.$confirm('禁用后用户不可登陆, 是否继续?', '提示', {
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
            axios.put(`/cloud_disk_api/user/status?userId=${data.userId}&disableStatus=${disableStatus}`).then(res => {
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
            axios.put('/cloud_disk_api/user/', this.user)
                .then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        })
                    }
                })
            this.dialogFormVisible = false
        }
    },
    mounted() {
        this.refreshData()
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
