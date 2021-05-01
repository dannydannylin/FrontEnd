<template>
    <div>
        <br/><br/><br/><br/>
        <div class="ui container">
            <div class="ui stackable grid">
                <div class="two wide column"></div>
                <div class="twelve wide column">
                    <table class="ui celled table">
                        <thead>
                        <tr>
                            <th>帳號</th>
                            <th>禁止發文</th>
                            <th>禁止留言</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in users" :key="user.password">
                            <td data-label="account" v-text="user.account">
                                James
                            </td>
                            <td data-label="level">
                                <div class="ui toggle checkbox">
                                    <input :id="user.account+'2'" type="checkbox"
                                           :checked="!user.post"
                                           @change="blockPost(!user.post, user.id, user.account)">
                                    <label :for="user.account+'2'"></label>
                                </div>
                            </td>
                            <td data-label="deleted">
                                <div class="ui toggle checkbox">
                                    <input :id="user.account+'2'" type="checkbox"
                                           :checked="!user.comment"
                                           @change="blockComment(!user.comment, user.id, user.account)">
                                    <label :for="user.account+'2'"></label>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="two wide column"></div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../../store";

export default {
    name: "MasterOperation",
    inject: ['reload'],
    data() {
        return {
            users : [
                {
                    id: 0,
                    account: "a",
                    password: "aaa",
                    level: "user",
                    post: false,
                    comment: false
                },
                {
                    id: 1,
                    account: "b",
                    password: "bbb",
                    level: "master",
                    post: false,
                    comment: false
                },
                {
                    id: 2,
                    account: "c",
                    password: "ccc",
                    level: "boss",
                    post: false,
                    comment: false
                },
                {
                    id: 3,
                    account: "d",
                    password: "ddd",
                    level: "user",
                    post: false,
                    comment: false
                }
            ]
        }
    },
    created() {
        this.updateData() ;
    },
    methods: {
        updateData() {
            const _this = this ;
            axios.get(axios.defaults.baseURL + "/controller/admin/master/users",
                {
                    headers: {
                        token: store.state.token
                    }
                })
                .then(function (resp) {
                    _this.users = resp.data ;
                    // 排序
                    _this.users.sort(
                        function(a, b) {
                            if (a.level < b.level)
                                return -1;
                            if (a.level > b.level)
                                return 1;
                            return 0;
                        })
                });
        },
        blockPost(block, id, account) {
            const _this = this ;
            if ( block ) {
                const msg = "您確定要讓用戶 " + account + " 可以發文嗎!?";
                if ( confirm( msg ) ){
                    axios.put(axios.defaults.baseURL + "/controller/admin/master/userPost/" + id
                        ,{},
                        {
                            headers: {
                                token: store.state.token
                            }
                        })
                        .then(function (resp) {
                            if ( resp.data ) {
                                alert("解除成功") ;
                            }
                            else {
                                alert("解除失敗") ;
                            }
                            _this.updateData();
                        });
                }
                else {
                    this.reload() ;
                }
            }
            else {
                const msg = "您確定要封鎖用戶 " + account + " 的發文功能嗎!?";
                if ( confirm( msg ) ){
                    axios.delete(axios.defaults.baseURL + "/controller/admin/master/userPost/" + id,
                        {
                            headers: {
                                token: store.state.token
                            }
                        })
                        .then(function (resp) {
                            if ( resp.data ) {
                                alert("封鎖成功") ;
                            }
                            else {
                                alert("封鎖失敗") ;
                            }
                            _this.updateData();
                        });
                }
                else {
                    this.reload() ;
                }
            }
        },
        blockComment(block, id, account) {
            const _this = this ;
            if ( block ) {
                const msg = "您確定讓此用戶 " + account + " 可以留言嗎!?";
                if ( confirm( msg ) ){
                    axios.put(axios.defaults.baseURL + "/controller/admin/master/userComment/" + id,{},
                        {
                            headers: {
                                token: store.state.token
                            }
                        })
                        .then(function (resp) {
                            if ( resp.data ) {
                                alert("解除成功") ;
                            }
                            else {
                                alert("解除失敗") ;
                            }
                            _this.updateData();
                        });
                }
                else {
                    this.reload() ;
                }
            }
            else {
                const msg = "您確定要封鎖用戶 " + account + " 留言功能嗎!?";
                if ( confirm( msg ) ){
                    axios.delete(axios.defaults.baseURL + "/controller/admin/master/userComment/" + id,
                        {
                            headers: {
                                token: store.state.token
                            }
                        })
                        .then(function (resp) {
                            if ( resp.data ) {
                                alert("封鎖成功") ;
                            }
                            else {
                                alert("封鎖失敗") ;
                            }
                            _this.updateData();
                        });
                }
                else {
                    this.reload() ;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>