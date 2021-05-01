<template>
    <div class="home">
        <nav class="ui inverted attached segment">
            <div class="ui container">
                <div class="ui inverted stackable menu">
                    <h1 class="ui blue header item">安安論壇</h1>
                    <a href="javascript: void(0)" class="item my-font" :class="{active:this.$store.state.show==='/index/home'}" @click="jump('/index/home')">
                        <i class="home icon"></i>首頁
                    </a>
                    <div class="simple ui dropdown item my-font">
                        <i class="align center icon"></i>看板
                        <i class="dropdown icon"></i>
                        <div class="menu">
                            <a href="javascript: void(0)" class="item" :class="{active:this.$store.state.show==='/index/sports'}" @click="jump('/index/sports')">
                                <i class="baseball ball icon"></i> 體育
                            </a>
                            <a href="javascript: void(0)" class="item" :class="{active:this.$store.state.show==='/index/music'}" @click="jump('/index/music')">
                                <i class="music icon"></i> 音樂
                            </a>
                            <a href="javascript: void(0)" class="item" :class="{active:this.$store.state.show==='/index/international'}" @click="jump('/index/international')">
                                <i class="globe icon"></i> 國際
                            </a>
                        </div>
                    </div>
                    <a href="javascript: void(0)" class="item my-font" :class="{active:this.$store.state.show==='/index/about'}" @click="jump('/index/about')">
                        <i class="question circle outline icon"></i>關於作者
                    </a>
                    <div class="right item">
                        <div class="ui icon input">
                            <input type="text" placeholder="搜尋" class="my-search">
                            <i class="search icon link"></i>
                        </div>
                    </div>
                    <div class="right menu">
                        <div class="ui purple label item" style="font-weight: bold">
                            {{this.name}}
                        </div>
                        <div class="simple ui inline dropdown item">
                            <div class="text">
                                <img src="https://picsum.photos/id/1/100/100" class="ui avatar image" alt="">
                                <span v-text="this.username">林天才</span>
                            </div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item" @click="myAccount">
                                    我的帳戶
                                </div>
                                <div class="item" @click="modifyAccount">
                                    修改資料
                                </div>
                                <div class="item" @click="myAuth" v-if="this.level!=='user'">
                                    <span style="color: red; font-weight: bold">
                                        超級權限
                                    </span>
                                </div>
                                <div class="item" @click="logout">
                                    登出
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

    import store from "../../store";

    export default {
        name: "TabBar",
        data() {
            return {
                username : "",
                level: "",
                name: "",
            }
        },
        methods: {
            jump(path) {
                this.$router.replace(path);
                this.$store.commit('change', path);
            },
            logout() {
                this.$store.commit('logout');
                this.$router.replace('/login');
            },
            myAccount() {
                const _this = this ;
                axios.get(axios.defaults.baseURL + "/controller/userId/" + this.username)
                    .then(function (resp){
                        const userId = resp.data ;
                        _this.$router.push(
                            {
                                path: '/index/account/' + userId,
                                query: { accountName : _this.username }
                            }
                        );
                    })

                // 改變 bar active 的地方
                this.$store.commit('change', '');
            },
            modifyAccount() {

            },
            myAuth() {
                if ( this.level === 'boss' ) {
                    this.$router.replace('/admin/boss');
                }
                else if ( this.level === 'master' ) {
                    this.$router.replace('/admin/master');
                }
            }
        },
        created() {
            const _this = this ;
            axios.post(axios.defaults.baseURL + "/controller/userInfo",
                { "token" : store.state.token } )
                .then(function (resp) {
                    _this.username = resp.data['account'] ;
                    _this.level = resp.data['level'];
                    if ( _this.level === 'boss' ) {
                        _this.name = "神" ;
                    }
                    else if ( _this.level === 'master' ) {
                        _this.name = "版主" ;
                    }
                    else if ( _this.level === 'user' ) {
                        _this.name = "小學生" ;
                    }
                    else {
                        _this.name = "狗" ;
                    }
                });
        }
    }
</script>

<style scoped>

</style>