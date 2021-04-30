<template>
    <div>
        <br/><br/><br/><br/><br/><br/><br/>
        <div class="ui container" style="max-width: 10cm !important;" >
            <div class="ui middle aligned center aligned grid">
                <div class="column">
                    <h2 class="ui blue image header">
                        <div class="content">
                            登入帳號
                        </div>
                    </h2>
                    <div class="ui large form">
                        <div class="ui stacked segment">
                            <span v-text="error" style="color: red; font-weight:bold;"></span>
                            <div style="color:red;font-weight:bold"></div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" name="account" placeholder="帳號" v-model="user.account" required>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="lock icon"></i>
                                    <input type="password" name="password" placeholder="密碼" v-model="user.password" required>
                                </div>
                            </div>
                            <button class="ui fluid large blue button" @click="login">
                                登入
                            </button>
                        </div>
                    </div>
                    <div class="ui message">
                        <a href="javascript: void(0)" @click="register">
                            我要註冊
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    account: "",
                    password: ""
                },
                error: ""
            }
        },
        methods: {
            login() {
                const _this = this;
                axios.post("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/login", this.user).then(function (reps) {
                    if ( reps.data.stateCode === 200 ) {
                        _this.$store.commit('login', reps.data.token);
                        _this.$router.replace('/index/home');
                        _this.$store.commit('change', '/index/home');
                    }
                    else {
                        _this.error = "帳號密碼錯誤" ;
                    }
                });
            },
            register() {
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped>

</style>