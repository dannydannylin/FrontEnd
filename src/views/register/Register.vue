<template>
    <div>
        <br/><br/><br/><br/><br/><br/><br/>
        <div class="ui container" style="max-width: 10cm !important;" >
            <div class="ui middle aligned center aligned grid">
                <div class="column">
                    <h2 class="ui blue image header">
                        <div class="content">
                            註冊帳號
                        </div>
                    </h2>
                    <div class="ui large form">
                        <div class="ui stacked segment">
                            <span v-text="error" style="color: red; font-weight:bold;"></span>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" placeholder="帳號" v-model="user.account" required @blur="checkAccount">
                                    <button style="border: 0px; background-color: white; color: green;" v-show="goodAccount">
                                        <i class="check icon"></i>
                                        此帳號合法
                                    </button>
                                    <button style="border: 0px; background-color: white; color: red;" v-show="badAccount" :class="{'shake' : animated}">
                                        <i class="exclamation icon"></i>
                                        帳號已註冊
                                    </button>
                                    <button style="border: 0px; background-color: white; color: red;" v-show="noAccount" :class="{'shake' : animated}">
                                        <i class="exclamation icon"></i>
                                        請輸入帳號
                                    </button>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="lock icon"></i>
                                    <input type="password" placeholder="密碼" v-model="user.password" required @blur="checkPassword">
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="lock icon"></i>
                                    <input type="password" placeholder="確認密碼" v-model="passwordAgain" required @blur="checkPassword">
                                </div>
                                <div style="color: red" v-show="basPasswordAgain" :class="{'shake' : animated}">
                                    <i class="exclamation icon"></i>
                                    密碼不相同
                                </div>
                            </div>

                            <div class="ui right aligned container">
                                <button class="ui blue blue button" @click="toLogin">
                                    返回
                                </button>
                                <button class="ui blue blue button" type="submit" id="register" @click="register">
                                    註冊
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
          return {
              error: "",
              passwordAgain: "",
              goodAccount: false,
              badAccount: false,
              noAccount: false,
              basPasswordAgain: false,
              user : {
                  account: "",
                  password: ""
              },
              animated: false
          }
        },
        methods : {
            checkAccount() {
                const _this = this ;

                // 如果帳號沒填
                if ( _this.user.account === '' ) {
                    _this.noAccount = true ;
                    _this.goodAccount = false ;
                    _this.badAccount = false ;
                }
                else {
                    _this.noAccount = false ;
                    axios.post(axios.defaults.baseURL + "/controller/verify",
                        {"account" : _this.user.account}).then(function (reps){
                        // 驗證成功 !!
                        // 此帳號沒有使用過
                        if ( reps.data ) {
                            _this.goodAccount = true ;
                            _this.badAccount = false ;
                        }
                        else {
                            _this.goodAccount = false ;
                            _this.badAccount = true ;
                        }
                    })
                }

            },
            checkPassword() {
                if ( this.user.password === this.passwordAgain ) {
                    this.basPasswordAgain = false ;
                }
                else {
                    this.basPasswordAgain = true ;
                }
            },
            register() {
                // 如果帳號還是非法的
                if ( this.badAccount || this.noAccount || this.basPasswordAgain ) {
                    const self = this
                    self.animated = true
                    setTimeout(() => {
                        self.animated = false
                    }, 1000)
                }
                else {
                    this.error = "註冊中....." ;
                    const _this = this ;
                    axios.post(axios.defaults.baseURL + "/controller/register",
                        _this.user, {timeout: 5000})
                    .then(function (reps){
                        if ( reps.data ) {
                            _this.error = "註冊成功!!!" ;
                            alert("註冊成功，請用此帳號登入");
                            _this.$router.replace('/login');
                        }
                    }).catch(function (){
                        _this.error = "資料庫關閉，無法註冊" ;
                    });
                }
            },
            toLogin() {
                this.$router.replace('/login');
            }
        }
    }
</script>

<style scoped>
.shake {
    animation: shake 0.92s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
}
@keyframes shake {
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>