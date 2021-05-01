<template>
    <div>
        <br/><br/><br/>
        <div class="ui container">
            <div class="ui stackable grid">
                <div class="two wide column"></div>
                <div class="twelve wide column">
                    <form id="article-form" class="ui form">
                        <div class="required field">
                            <div style="text-align: center; color: orange" v-show="errorStyleSelect">請選擇版面</div>
                            <div class="ui left labeled input">
                                <select class="ui compact blue basic dropdown label" v-model="article.type.name">
                                    <option value="" disabled selected>選擇版面</option>
                                    <option value="SPORTS">體育版</option>
                                    <option value="MUSIC">音樂版</option>
                                    <option value="INTERNATIONAL">國際板</option>
                                </select>
                            </div>
                            <input :style="errorStyleTitle" type="text" name="title" placeholder="標題" v-model="article.title">
                        </div>
                        <div class="required field">
                            <textarea :style="errorStyleContent" rows="15" placeholder="內文" name="content" v-model="article.content">
                            </textarea>
                        </div>
                        <div class="ui right aligned container">
                            <button type="button" class="ui button" onclick="window.history.go(-1)">
                                返回
                            </button>
                            <button type="button" id="publish-btn" class="ui blue button" @click="submitForm()">
                                發文
                            </button>
                        </div>
                    </form>
                </div>
                <div class="two wide column"></div>
            </div>
        </div>
    </div>
</template>

<script>

    import store from "../../store";

    export default {
        name: "Post",
        data() {
          return {
              user : {
                  username: "",
                  post: false
              },
              article : {
                  id : this.$route.query.id,
                  title : this.$route.query.title,
                  content: this.$route.query.content,
                  views: 0,
                  updateTime: (new Date()).toString(),
                  user : {
                      id: 0,
                      account: ""
                  },
                  type: {
                      id: 0,
                      name: ""
                  }
              },
              errorStyleTitle: {
                  "border-color": "",
                  "border-width": ""
              },
              errorStyleContent: {
                  "border-color": "",
                  "border-width": ""
              },
              errorStyleSelect: false
          }
        },
        methods: {
            submitForm() {
                // 檢查有沒有沒填或亂填
                this.prevent() ;
                // 不放行
                if ( this.errorStyleSelect
                    || this.errorStyleContent["border-color"] !== ""
                    || this.errorStyleTitle["border-color"] !== "" ) {
                   alert("有地方沒填") ;
                }
                // 放行
                else {
                    this.gogo() ;
                }

            },
            typeMethod() {
                if ( this.article.type.name === "SPORTS" ) {
                    this.article.type.id = 1 ;
                }
                else if ( this.article.type.name === "MUSIC" ) {
                    this.article.type.id = 2 ;
                }
                else if ( this.article.type.name === "INTERNATIONAL" ) {
                    this.article.type.id = 3 ;
                }
            },
            userMethod() {
                this.article.user.account = this.user.username;
            },
            prevent() {

                // 如果沒有選擇版面
                if ( this.article.type.name === "" ) {
                    this.errorStyleSelect = true ;
                }
                else {
                    this.errorStyleSelect = false ;
                    this.canGo = false ;
                }
                if ( typeof this.article.title === 'undefined'
                    || this.article.title.trim() === ''
                    || this.article.title === '' ) {
                    this.errorStyleTitle["border-color"] = "red" ;
                    this.errorStyleTitle["border-width"] = "2px" ;
                }
                else {
                    this.errorStyleTitle["border-color"] = "" ;
                    this.errorStyleTitle["border-width"] = "" ;
                }
                if ( typeof this.article.content === 'undefined'
                    || this.article.content.trim() === ''
                    || this.article.content === "" ) {
                    this.errorStyleContent["border-color"] = "red" ;
                    this.errorStyleContent["border-width"] = "2px" ;
                }
                else {
                    this.errorStyleContent["border-color"] = "" ;
                    this.errorStyleContent["border-width"] = "" ;
                }
            },
            gogo() {

                const _this = this ;
                this.typeMethod();
                this.userMethod();

                if ( !this.user.post ) {
                    alert("打這麼久卻不能發文，真可憐!!!") ;
                    _this.$router.replace('/index/home');
                    return ;
                }

                // 修改文章
                if ( this.$route.query.modify ) {
                    axios.put(axios.defaults.baseURL + "/controller/article/" + this.$route.query.id,
                        this.article, {
                            headers : {
                                token : store.state.token
                            }
                        } )
                        .then(function (reps) {
                            if ( reps.data ) {
                                alert("更新成功!!!");
                                _this.$router.replace('/index/home');
                            }
                            else {
                                alert("更新失敗!!!");
                            }
                        });
                }
                // 發新文章
                else {
                    axios.post(axios.defaults.baseURL + "/controller/article", this.article)
                        .then(function (reps) {
                            if ( reps.data ) {
                                alert("發文成功!!!");
                                _this.$router.replace('/index/home');
                            }
                            else {
                                alert("發文失敗!!!");
                            }
                        });
                }

            }
        },
        created() {
            const _this = this ;
            // 拿 user info
            axios.post(axios.defaults.baseURL + "/controller/userInfo",
                { "token" : store.state.token } )
                .then(function (resp) {
                    _this.user.username = resp.data['account'] ;
                    _this.user.post = resp.data['post'] ;
                });
        }
    }
</script>

<style scoped>

</style>