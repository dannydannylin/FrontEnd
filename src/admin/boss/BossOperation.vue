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
                                <th>密碼</th>
                                <th>等級</th>
                                <th>封鎖此用戶</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.password">
                                <td data-label="account" v-text="user.account">
                                    James
                                </td>
                                <td data-label="password" v-text="user.password">
                                    24
                                </td>
                                <td data-label="level">
                                    <select class="ui compact blue basic dropdown label"
                                            v-model="user.level"
                                            @change="levelChange(user, user.level, user.account)"
                                            :disabled="user.level==='boss'">
                                        <option value="user" :selected="user.level==='user'">
                                            小學生
                                        </option>
                                        <option value="master" :selected="user.level==='master'">
                                            版主
                                        </option>
                                        <option value="boss" :selected="user.level==='boss'">
                                            神
                                        </option>
                                    </select>
                                </td>
                                <td data-label="deleted">
                                    <div class="ui toggle checkbox">
                                        <input :id="user.account+'2'" type="checkbox"
                                               :checked="user.block"
                                               @change="blockUser(user.block, user.id, user.account)"
                                               :disabled="user.level==='boss'">
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
    name: "BossOperation",
    inject: ['reload'],
    data() {
        return {
            users : [
                {
                    id: 0,
                    account: "a",
                    password: "aaa",
                    level: "user",
                    block: false
                },
                {
                    id: 1,
                    account: "b",
                    password: "bbb",
                    level: "master",
                    block: false
                },
                {
                    id: 2,
                    account: "c",
                    password: "ccc",
                    level: "boss",
                    block: true
                },
                {
                    id: 3,
                    account: "d",
                    password: "ddd",
                    level: "user",
                    block: true
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
            axios.get("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/admin/boss/users",
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
        levelChange(user, newLevel, account) {
            const _this = this ;
            const msg = "您確定要修改用戶 " + account + " 的權限嗎!?";
            if ( confirm( msg ) ){
                axios.post("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/admin/boss/users/" + user.id
                    , { level : newLevel },
                    {
                        headers: {
                            token: store.state.token
                        }
                    })
                    .then(function (resp){
                        if ( resp.data ) {
                            alert("修改成功") ;
                        }
                        else {
                            alert("修改失敗") ;
                        }
                    _this.updateData() ;
                })
            }
            else {
                _this.updateData() ;
            }
        },
        blockUser(block, id, account) {
            const _this = this ;
            if ( block ) {
                const msg = "您確定解除用戶 " + account + " 的封鎖嗎!?";
                if ( confirm( msg ) ){
                    axios.put("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/admin/boss/users/" + id,{},
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
                const msg = "您確定要封鎖用戶 " + account + " 嗎!?";
                if ( confirm( msg ) ){
                    axios.delete("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/admin/boss/users/" + id,
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