<template>
    <div id="afterApp">
        <TabBar></TabBar>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
import TabBar from '../components/tabbar/TabBar'
export default {
    name: "AfterApp",
    components: {
        TabBar
    },
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isRouterAlive: true
        }
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style scoped>

</style>