<template>
    <div>
        <br/><br/><br/>
        <div>
            <div class="ui container">
                <div class="ui grid">
                    <div class="three wide column"></div>
                    <div class="ui ten wide column">
                        <div class="ui container">
                            <div class="ui grid">
                                <div class="six wide column"></div>
                                <div class="six wide column">
                                    <div class="text">
                                        <img src="https://picsum.photos/id/1/155/155" class="ui circular image" alt="">
                                        <p style="color: white;font-size: xx-large">
                                            <i class="male icon link"></i>
                                            <span v-text="this.$route.query.accountName">
                                                林天才
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <div class="ui eight wide column">
                            <div class="ui top attached segment">
                                <h3>
                                    興趣 :<span v-text="user.interests" style="color: chocolate">11</span>
                                </h3>
                            </div>
                            <div class="ui attached segment">
                                <h3>
                                    性別 :<span v-text="user.gender" style="color: chocolate">11</span>
                                </h3>
                            </div>
                            <div class="ui attached segment">
                                <h3>
                                    等級 :<span v-text="user.level" style="color: chocolate">11</span>
                                </h3>
                            </div>
                        </div>
                        <br/><br/>

                        <!--header-->
                        <div class="ui eight wide column">
                            <div class="ui top attached segment">
                                <div class="ui middle aligned two column stackable grid">
                                    <div class="column">
                                        <h3 class="ui blue header" style="font-size: x-large">所有文章</h3>
                                    </div>
                                    <div class="right aligned column">
                                        <h3 class="ui blue header" style="display: inline;">共</h3>
                                        <h2 class="ui pink header" v-text="totalPage" style="display: inline;">6</h2>
                                        <h3 class="ui blue header" style="display: inline;">篇</h3>
                                    </div>
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
                                                        <img src="https://picsum.photos/id/1035/100/10" class="ui avatar image" alt="">
                                                        <div class="content">
                                                            <a href="javascript: void(0)" class="my-author-style" v-text="article.user.account" @click="toAccount(article.user.id, article.user.account)">
                                                                林宣佑
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <i class="calendar alternate outline icon" style="display: inline"></i>
                                                        <span v-text="article.updateTime">
                                                        2020-01-01
                                                    </span>
                                                    </div>
                                                    <div class="item">
                                                        <i class="eye icon" style="display: inline" >
                                                            <span v-text="article.views">2095</span>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="right aligned four wide column">
                                                <a href="javascript: void(0)" v-text="article.type.name" class="ui label">
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
                    <div class="three wide column"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    class User {
        constructor(id, account, level) {
            this.id = id ;
            this.account = account ;
            this.level = level ;
        }
    }
    class Type {
        constructor(id, name) {
            this.id = id ;
            this.name = name ;
        }
    }

    export default {
        data() {
            return {
                user: {
                    interests: "睡覺、打球",
                    gender: "男",
                    level: "牛"
                },
                pageCount : 0,
                totalPage : 0,
                articles: [
                    {
                        id: 1,
                        title: "我是標題1",
                        content: "我是內容1",
                        views: 25,
                        updateTime: "2012-12-15",
                        user: new User(1,"James", "master"),
                        type: new Type(1,"體育")
                    },
                    {
                        id: 2,
                        title: "我是標題2",
                        content: "我是內容2",
                        views: 54,
                        updateTime: "2021-01-01",
                        user: new User(2,"Kevin", "user"),
                        type: new Type(2,"音樂")
                    },
                    {
                        id: 3,
                        title: "我是標題3",
                        content: "我是內容3",
                        views: 98,
                        updateTime: "2002-09-14",
                        user: new User(3,"Mike", "master"),
                        type: new Type(3,"國際")
                    }
                ]
            }
        },
        methods : {
            nextPage() {
                this.pageCount++ ;
                const _this = this  ;
                axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/account/" +
                    this.$route.params.id + "/" + this.pageCount )
                    .then(function (resp) {
                        _this.articles = resp.data.content ;
                    });

            },
            prePage() {
                this.pageCount-- ;
                const _this = this  ;
                axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/account/" +
                    this.$route.params.id + "/" + this.pageCount )
                    .then(function (resp) {
                        _this.articles = resp.data.content ;
                    });

            },
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
            }
        },
        created() {
            const _this = this  ;
            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/account/" +
                this.$route.params.id + "/0" )
                .then(function (resp) {
                _this.articles = resp.data.content ;
            });
            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/accountTotalPage/" + this.$route.params.id)
                .then(function (resp) {
                    _this.totalPage = resp.data ;
                });

            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/user/" + this.$route.params.id)
                .then(function (resp) {
                    _this.user = resp.data ;
                    if ( _this.user.gender === 'male' )
                        _this.user.gender = "男" ;
                    else if ( _this.user.gender === 'female' )
                        _this.user.gender = "女" ;
                    if ( _this.user.level === 'user' )
                        _this.user.level = "小學生" ;
                    else if ( _this.user.level === 'master' )
                        _this.user.level = "版主" ;
                    else if ( _this.user.level === 'boss' )
                        _this.user.level = "神" ;
                });
        }
    }
</script>

<style scoped>
    h3 {
        display: inline;
    }
</style>