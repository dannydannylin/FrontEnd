<template>
    <div>
        <br/><br/><br/>
        <div class="ui container">
            <div class="ui grid">
                <div class="ui attached segment">
                    <div class="ui padded vertical segment">
                        <div class="ui mobile reversed stackable grid">
                            <div class="eleven wide column">
                                <img src="https://picsum.photos/id/1/800/600" class="ui rounded image" alt="">
                            </div>
                            <div class="five wide column">
                                <div class="ui top attached segment">
                                    <h3>關於作者</h3>
                                </div>
                                <div class="ui attached segment">
                                    <h4 class="my-normal-font" v-text="about">
                                        我是天才我是天才我是天才我是天才我是天才我是天才我是天才
                                    </h4>
                                </div>
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
        name: "about",
        data() {
            return {
                about: ""
            }
        },
        methods: {
            aboutMe() {
                const _this = this ;
                axios.get(axios.defaults.baseURL + "/controller/aboutMe")
                    .then(function (resp) {
                        _this.about = resp.data ;
                    })
            }
        },
        created() {
            // this.aboutMe();
        }
    }
</script>

<style scoped>

</style>