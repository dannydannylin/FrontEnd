<template>
    <div>
        <br/><br/><br/>
        <div class="ui container">
            <div class="ui stackable grid">
                <div class="two wide column"></div>
                <div class="twelve wide column">
                    <!--header-->
                    <div class="ui top attached segment">
                        <div class="ui middle aligned two column stackable grid">
                            <div class="column">
                                <h3 class="ui blue header" style="font-size: x-large">
                                    所有看板
                                </h3>
                            </div>
                            <div class="right aligned column">
                                <h3 class="ui blue header" style="display: inline;">共</h3>
                                <h2 class="ui pink header" v-text="totalPage" style="display: inline;">6</h2>
                                <h3 class="ui blue header" style="display: inline;">篇</h3>
                            </div>
                        </div>
                    </div>

                    <!--列表-->
                    <div class="ui attached segment" v-for="article in articles">
                        <div class="ui padded vertical segment">
                            <div class="ui mobile reversed stackable grid">
                                <div class="eleven wide column">
                                    <h3 class="ui head">
                                        <a href="javascript: void(0)" style="color: black" @click="toArticle(article.id)">
                                            {{showTitle=article.title.length > 20 ? article.title.substring(0,19) + " .....": article.title}}
                                        </a>
                                    </h3>
                                    <p class="ui">
                                        <a href="javascript: void(0)" style="color: black" @click="toArticle(article.id)">
                                            {{showContent=article.content.length > 100 ? article.content.substring(0,99) + " .....": article.content}}
                                        </a>
                                    </p>
                                    <br/><br/><br/>
                                    <div class="ui stackable grid">
                                        <div class="twelve wide column">
                                            <div class="ui horizontal link list">
                                                <div class="item">
                                                    <!--頭像圖片-->
                                                    <img src="https://picsum.photos/id/1035/100/10" class="ui avatar image" alt="">
                                                    <div class="content">
                                                        <a href="javascript: void(0)" style="font-weight:bold;" class="item" v-text="article.user.account" @click="toAccount(article.user.id, article.user.account)">2222</a>
                                                    </div>
                                                </div>
                                                <div class="item">
                                                    <i class="calendar alternate outline icon" style="display: inline"></i>
                                                    <span>
                                                        {{ article.updateTime }}
                                                    </span>
                                                </div>
                                                <div class="item">
                                                    <i class="eye icon" style="display: inline"></i>
                                                    <span>{{article.views}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="right aligned four wide column">
                                            <a href="javascript: void(0)" v-text="article.type.name" class="ui label" @click="toIndex(article.type.id)">
                                                體育
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="five wide column">
                                    <!--文章圖片-->
                                    <img v-show="article.type.id===1" src="../../../public/sports.jpg" class="ui rounded image" alt="" width = "150" height = "150" style="margin-left: auto;margin-right: auto">
                                    <img v-show="article.type.id===2" src="../../../public/music.jpg" class="ui rounded image" alt="" width = "150" height = "150" style="margin-left: auto;margin-right: auto">
                                    <img v-show="article.type.id===3" src="../../../public/international.jpg" class="ui rounded image" alt="" width = "150" height = "150" style="margin-left: auto;margin-right: auto">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--底部-->
                    <div class="ui attached segment">
                        <div class="ui middle aligned three column stackable grid" >
                            <div class="column">
                                <a href="javascript: void(0)" class="ui blue basic button" style="font-weight:bold;" @click="prePage" v-if="this.pageCount>0">
                                    上一頁
                                </a>
                            </div>
                            <div class="center aligned column">
                                <div class="ui purple header">
                                    第 {{this.pageCount + 1}} 頁
                                </div>
                            </div>
                            <div class="right aligned column">
                                <a href="javascript: void(0)" class="my-bold ui blue basic button" style="font-weight:bold;" @click="nextPage" v-if="this.pageCount<Math.ceil(totalPage/3)-1">
                                    下一頁
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="two wide column">
                    <button class="ui blue large big button" style="position:fixed;bottom:6ch;right: 60px; !important;">
                        <a href="javascript: void(0)" style="color: black" @click="toPost()">
                            <i class="edit icon" style="color: black"></i>發文
                        </a>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    class User {
        constructor(id, account) {
            this.id = id ;
            this.account = account ;
        }
    }
    class Type {
        constructor(id, name) {
            this.id = id ;
            this.name = name ;
        }
    }

    export default {
        name: "index",
        data() {
            return {
                pageCount : 0,
                totalPage : 0,
                articles: [
                    // {
                    //     id: 1,
                    //     title: "我是標題1",
                    //     content: "我是內容1",
                    //     views: 25,
                    //     updateTime: "2012-12-15",
                    //     user: new User(1,"James"),
                    //     type: new Type(1,"體育")
                    // },
                    // {
                    //     id: 2,
                    //     title: "我是標題2",
                    //     content: "我是內容2",
                    //     views: 54,
                    //     updateTime: "2021-01-01",
                    //     user: new User(2,"Kevin"),
                    //     type: new Type(2,"音樂")
                    // },
                    // {
                    //     id: 3,
                    //     title: "我是標題3",
                    //     content: "我是內容3",
                    //     views: 98,
                    //     updateTime: "2002-09-14",
                    //     user: new User(3,"Mike"),
                    //     type: new Type(3,"國際")
                    // }
                ]
            }
        },
        methods: {
            toArticle(id) {
                this.$router.push('/index/article/'+id) ;
                // 改變 bar active 的地方
                this.$store.commit('change', '');
            },
            toAccount(id, name) {

                this.$router.push(
                    {
                        path: '/index/account/' + id,
                        query: { accountName : name }
                    }
                );
                // 改變 bar active 的地方
                this.$store.commit('change', '');
            },
            toIndex(id) {
                if ( id == 1 ) {
                    this.$router.push('/index/sports');
                    // 改變 bar active 的地方
                    this.$store.commit('change', '/index/sports');
                }
                else if ( id == 2 ) {
                    this.$router.push('/index/music');
                    // 改變 bar active 的地方
                    this.$store.commit('change', '/index/music');
                }
                else if ( id == 3 ) {
                    this.$router.push('/index/international');
                    // 改變 bar active 的地方
                    this.$store.commit('change', '/index/international');
                }
                else {
                    this.$router.push('/index/home');
                    // 改變 bar active 的地方
                    this.$store.commit('change', '/index/home');
                }

            },
            toPost() {
                this.$router.push('/index/post/');
                // 改變 active 的地方
                // 因為 post 不在 tabBar 裡
                // 所以不顯示 active
                this.$store.commit('change', '');
            },
            nextPage() {
                this.pageCount++ ;
                console.log(this.pageCount);
                const _this = this  ;
                axios.get(axios.defaults.baseURL + "/controller/index/" + this.pageCount)
                    .then(function (resp) {
                        _this.articles = resp.data.content ;
                    });

            },
            prePage() {
                this.pageCount-- ;
                const _this = this  ;
                axios.get(axios.defaults.baseURL + "/controller/index/" + this.pageCount)
                    .then(function (resp) {
                        _this.articles = resp.data.content ;
                    });

            }
        },
        created() {
            this.pageCount = 0 ;
            const _this = this  ;
            axios.get(axios.defaults.baseURL + "/controller/index/0")
                .then(function (resp) {
                    _this.articles = resp.data.content ;
            });
            axios.get(axios.defaults.baseURL + "/controller/totalPage/0")
                .then(function (resp) {
                    _this.totalPage = resp.data ;
                });
        }
    }
</script>

<style scoped>

</style>