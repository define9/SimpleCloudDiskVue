<template>
    <div class="dowebok" id="dowebok">
        <div class="form-container sign-up-container">
            <form @submit.prevent>
                <h1>注册</h1>
                <!-- <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>或使用邮箱注册</span> -->
                <input v-model="registerInfo.username" type="text" placeholder="账号(不可更改)">
                <input v-model="registerInfo.password" type="password" placeholder="密码">
                <input v-model="registerInfo.email" type="email" placeholder="电子邮箱">
                <div class="captcha">
                    <input v-model="captcha" type="text" placeholder="输入验证码(发送邮件)">
                    <img id="registerCaptchaImg" @click="refreshCaptcha" title="点击切换验证码"/>
                </div>
                <div class="emailVerify">
                    <input v-model="registerInfo.emailCode" type="text" placeholder="输入邮件验证码">
                    <el-button @click="sendEmailCode" size="mini" type="primary" round>发送邮件</el-button>
                </div>
                <button>注册</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form @submit.prevent>
                <h1>登录</h1>
                <!-- <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>或使用您的帐号</span> -->
                <input v-model="userInfo.username" type="text" placeholder="账号">
                <input v-model="userInfo.password" type="password" placeholder="密码">
                <div class="captcha">
                    <input v-model="captcha" type="text" placeholder="输入验证码">
                    <img id="loginCaptchaImg" @click="refreshCaptcha" title="点击切换验证码"/>
                </div>
                <!-- <a href="#">忘记密码？</a> -->
                <button @click="login">登录</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>已有帐号？</h1>
                    <p>请使用您的帐号进行登录</p>
                    <button class="ghost" id="signIn">登录</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>没有帐号？</h1>
                    <p>立即注册加入我们，和我们一起开始旅程吧</p>
                    <button class="ghost" id="signUp">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import md5 from "js-md5"

export default {
    name: 'Login',
    data() {
        return {
            userInfo: {
                username: '',
                password: ''
            },
            registerInfo: {
                username: '',
                password: '',
                email: '',
                emailCode: '',
            },
            captcha: '',
        };
    },
    methods: {
        login(needMD5 = true) {
            if (!this.verifyCaptcha()) return
            if (
                this.userInfo.username.length === 0 ||
                this.userInfo.password.length === 0
            ) {
                this.$message({
                    type: "warning",
                    message: "账号或密码为空",
                })
                return
            }
            axios
                .post(
                    `/cloud_disk_api/user/login?captcha=${this.captcha}`,
                    {
                        username: this.userInfo.username,
                        password: needMD5
                            ? md5(this.userInfo.password)
                            : this.userInfo.password
                    }
                )
                .then((res) => {
                    if (!res.data.success) {
                        this.$message({
                            type: "warning",
                            message: res.data.errMessage
                        })
                        document.getElementById('loginCaptchaImg').click()
                        return
                    }

                    document.cookie = "token=" + res.data.data.token;
                    this.userInfo.password = md5(this.userInfo.password);
                    this.$store.commit("UPDATEUSERINFO", {
                        userInfo: res.data.data.userInfo,
                        token: res.data.data.token,
                        isAuth: res.data.code === 0,
                    })
                    this.$router.replace("/");
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        message: "网络连接错误",
                    })
                })
        },
        refreshCaptcha(e) {
            e.target.src = "/cloud_disk_api/core/captcha?_=" + new Date().getTime()
        },
        sendEmailCode() {
            if (!this.verifyCaptcha()) return
            if (this.registerInfo.email.length === 0 || !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.registerInfo.email)) {
                this.$message({ type: "warning", message: "邮箱地址错误"})
                return
            }

            axios.get(`/cloud_disk_api/core/sendEmail?email=${this.registerInfo.email}&captcha=${this.captcha}`)
                .then((res) => {
                    if (res.data.success) {
                        this.$message({
                            type: "success",
                            message: "成功",
                        })
                    } else {
                        this.$message({
                            type: "error",
                            message: res.data.errMessage,
                        })
                        document.getElementById('registerCaptchaImg').click()
                    }
                }).catch(() => {
                    this.$message({
                        type: "error",
                        message: "网络连接错误",
                    })
                })
        },
        verifyCaptcha() {
            if (this.captcha.length === 0) {
                this.$message({
                    type: "warning",
                    message: "验证码为空",
                })
                return false
            }
            return true
        }
    },
    mounted() {
        var container = document.getElementById('dowebok')
        document.getElementById('signUp').addEventListener('click', function() {
            container.classList.add('right-panel-active')
            document.getElementById('registerCaptchaImg').src = "/cloud_disk_api/core/captcha?_=" + new Date().getTime()
        })
        document.getElementById('signIn').addEventListener('click', function() {
            container.classList.remove('right-panel-active')
            document.getElementById('loginCaptchaImg').src = "/cloud_disk_api/core/captcha?_=" + new Date().getTime()
            
        })
        document.getElementById('loginCaptchaImg').src = "/cloud_disk_api/core/captcha?_=" + new Date().getTime()
    },
}
</script>

<style scoped>

* {
    box-sizing: border-box;
}

h1 {
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

.dowebok {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin: auto;
    margin-top: 5%;
}

.form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding:  0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.social-container a:hover {
    background-color: #eee;
}

.form-container input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    outline: none;
}

button {
    border-radius: 20px;
    border: 1px solid #38b1fc;
    background: #38b1fc;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
}

button:active {
    transform: scale(.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background: transparent;
    border-color: #fff;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
}

.overlay {
    background: rgb(91,122,241);
    background: linear-gradient(to right, rgb(91,122,241), #ff416c) no-repeat 0 0 / cover;
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-right {
    right: 0;
    transform: translateY(0);
}

.overlay-left {
    transform: translateY(-20%);
}

/* Move signin to right */
.dowebok.right-panel-active .sign-in-container {
    transform: translateY(100%);
}

/* Move overlay to left */
.dowebok.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

/* Bring signup over signin */
.dowebok.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

/* Move overlay back to right */
.dowebok.right-panel-active .overlay {
    transform: translateX(50%);
}

/* Bring back the text to center */
.dowebok.right-panel-active .overlay-left {
    transform: translateY(0);
}

/* Same effect for right */
.dowebok.right-panel-active .overlay-right {
    transform: translateY(20%);
}

.captcha {
    margin-bottom: 10px;
}

.captcha img {
    width: 35%;
    height: 90%;
    cursor: pointer;
    vertical-align:middle;
}

.captcha input {
    width: 60%;
    margin: 0;
    margin-right: 5%;
    vertical-align:middle;
}

.emailVerify {
    margin-bottom: 10px;
    width: 100%;
}

.emailVerify input {
    width: 60%;
    margin: 0;
    margin-right: 5%;
    vertical-align:middle;
}

.emailVerify .el-button {
    width: 35%;
}
</style>