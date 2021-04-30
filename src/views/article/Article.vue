<template>
    <div>
        <br/><br/><br/>
        <div>
            <div class="ui container">
                <div class="ui stackable grid">
                    <div class="two wide column"></div>
                    <div class="twelve wide column">
                        <!--header-->
                        <div class="ui top attached segment">
                            <div class="ui middle aligned three column stackable grid">
                                <div class="column">
                                    <h3 class="ui blue header" v-text="article.title" style="font-size: xx-large">
                                        玉山雪景好美好美好美好美
                                    </h3>
                                </div>
                                <div class="column"></div>
                                <div class="right aligned column">
                                    <div class="simple ui dropdown">
                                        <i class="big angle down icon"></i>
                                        <div class="menu" v-if="article.user.account===user.username">
                                            <div class="item">
                                                <div style="color: black" @click="editArticle(article.id)">
                                                    編輯
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="color: black" @click="deleteArticle(article.id)">
                                                    刪除
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript: void(0)" class="ui green label" v-text="article.type.name" @click="toPage(article.type.id)">
                                        風景版
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!--文章-->
                        <div class="ui attached segment">
                            <div class="ui stackable grid">
                                <div class="ui thirteen wide column">
                                    <div class="ui horizontal link list">
                                        <div class="item">
                                            <img src="https://picsum.photos/id/1035/100/10" class="ui avatar image" alt="">
                                            <div class="content">
                                                <a href="#" class="my-author-style" v-text="article.user.account">
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
                                <div class="ui right aligned three wide column">
                                    <div class="item">
                                        <div class="ui orange label"v-text="level">
                                            高級模範生
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--文章圖片-->
<!--                        <div class="ui attached segment">-->
<!--                            <img src="https://picsum.photos/id/1036/800/450" class="ui fluid rounded image" alt="">-->
<!--                        </div>-->
                        <!--章內文-->
                        <div id="content" class="ui attached segment" v-text="article.content" style="padding-left:1em; padding-right: 1em">
                            安安我是內容。
                        </div>

                        <!--留言區-->
                        <div class="ui attached segment">
                            <br/>
                            <div class="ui blue segment">
                                <h3 class="ui dividing header">留言區</h3>
                                <div class="ui comments" v-for="comment in comments">
                                    <div class="comment">
                                        <a class="avatar">
                                            <img src="https://picsum.photos/id/1037/100/100">
                                        </a>
                                        <div class="content">
                                            <a class="author" v-text="comment.user.account">Matt</a>
                                            <div class="metadata">
                                            <span class="date" v-text="comment.updateTime">
                                                Today at 5:42PM
                                            </span>
                                                <!-- 修改 -->
                                                <span></span>
                                                <span></span>
                                                <div class="simple ui dropdown">
                                                    <i class="ellipsis horizontal icon"></i>
                                                    <div class="menu" v-if="comment.user.account===user.username || user.username===article.user.account">
                                                        <div class="item">
                                                            <div style="color: black" @click="editComment(comment.id)">
                                                                編輯
                                                            </div>
                                                        </div>
                                                        <div class="item">
                                                            <div style="color: black" @click="deleteComment(comment.id)">
                                                                刪除
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="text" v-text="comment.content">
                                                我是留言
                                            </div>
<!--                                            <div class="actions">-->
<!--                                                <a class="reply">回復</a>-->
<!--                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ui reply form">
                                <div class="field">
                                    <textarea v-model="comment.content" placeholder="請輸入回復....." required></textarea>
                                </div>
                                <button type="submit" id="publish-btn" class="ui blue button" @click="sendComment">
                                    <i class="icon edit"></i>新增回復
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="two wide column"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import store from "../../store";

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
        name: "Article",
        data() {
            return {
                user: {
                    username: "",
                    comment: false
                },
                // 這篇文章的 level
                level: "level啦",
                article: {
                    id: 1,
                    title: "我是標題1",
                    content: "我是內容1",
                    views: 25,
                    updateTime: "2012-12-15",
                    user: new User(1,"James", "user"),
                    type: new Type(1,"體育")
                },
                // 這單純只是假資料
                // 沒有雙向綁定的問題
                comments: [
                    {
                        user: new User(2, "Mike", "user"),
                        content: "我是留言1",
                        updateTime: "2020-01-09"
                    },
                    {
                        user: new User(5, "Curry", "user"),
                        content: "我是留言2",
                        updateTime: "2021-03-17"
                    }
                ],
                comment: {
                    id : "",
                    articleId: this.$route.params.id,
                    user : {
                        id: 0,
                        account: ""
                    },
                    content: "",
                    updateTime: (new Date()).toString()
                }
            }
        },
        methods: {
            toPage(id) {
                if ( id === 1 )
                    this.$router.push('/index/sports');
                else if ( id === 2 )
                    this.$router.push('/index/music');
                else if ( id === 3 )
                    this.$router.push('/index/international');
                else
                    this.$router.push('/index/home');
            },
            editArticle(id) {
                this.$router.replace({
                    path: '/index/post', query: {
                        title: this.article.title,
                        content: this.article.content,
                        id: id,
                        modify: true
                    }
                });
            },
            deleteArticle(id) {
                const _this = this ;
                axios.delete("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/article/" + id,
                    {
                        headers: {
                            token: store.state.token
                        }
                    })
                    .then(function (reps) {
                        if (reps.data) {
                            alert("刪除成功");
                            _this.$router.replace('/index/home');
                        } else {
                            alert("刪除失敗");
                        }
                    });
            },
            userMethod() {
                this.comment.user.account = this.user.username;
            },
            sendComment() {

                if ( !this.user.comment ) {
                    alert("你目前不能留言喔") ;
                    this.comment.content = "" ;
                    return ;
                }

                const _this = this ;
                const articleId = this.$route.params.id ;

                this.userMethod();

                axios.post("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/comments/", this.comment)
                    .then(function (reps){
                        if ( reps.data ) {
                            // 再發送一次請求
                            // 達到刷新頁面的效果
                            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/comments/" + articleId)
                                .then(function (reps){
                                    _this.comments = reps.data ;
                                    // 清空輸入欄
                                    _this.comment.content = "" ;
                                })
                        }
                        else {
                            alert("留言失敗嗚嗚");
                        }
                    })
            },
            deleteComment(id) {

                if ( !this.user.comment ) {
                    alert("你目前不能刪除自己的留言喔") ;
                    return ;
                }

                const _this = this ;
                const articleId = this.$route.params.id ;
                axios.delete("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/comments/" + id)
                    .then(function (reps){
                        if ( reps.data ) {
                            // 再發送一次請求
                            // 達到刷新頁面的效果
                            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/comments/" + articleId)
                                .then(function (reps){
                                    _this.comments = reps.data ;
                                })
                        }
                        else {
                            alert("刪除失敗");
                        }
                    })
            },
            editComment(id) {

            },
            changeLevelName(_this) {
                if ( _this.article.user.level === "boss" )
                    _this.level = "神" ;
                else if ( _this.article.user.level === "master" )
                    _this.level = "版主" ;
                else if ( _this.article.user.level === "user" )
                    _this.level = "小學生" ;
            }

        },
        created() {

            // 拿 username
            axios.post("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/userInfo",
                { "token" : store.state.token } )
                .then(function (resp) {
                    _this.user.username = resp.data['account'] ;
                    _this.user.comment = resp.data['comment'] ;
                });

            const articleId = this.$route.params.id ;
            const _this = this ;
            // 拿文章
            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/article/" + articleId)
                .then(function (reps){
                if ( reps.data !== null ) {
                    _this.article = reps.data ;
                    _this.changeLevelName(_this);
                    // 更新點閱次數
                    axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/article/addViews/" + articleId)
                        .then(function (reps){

                        });
                }
            });

            // 拿留言
            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/comments/" + articleId)
                .then(function (reps){
                    _this.comments = reps.data ;
                })
        }
    }
</script>

<style scoped>

</style>