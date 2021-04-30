import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 讓上面的 tarBar 顯示 active
        show: "/index",
        token: window.localStorage.
            getItem('token' || '[]') == null ? '' :
                window.localStorage.getItem('token' || '[]')

    },
    mutations: {
        change(state, path) {
            this.state.show = path ;
        },
        login(state, token) {
            state.token = token ;
            window.localStorage.setItem('token', token) ;
        },
        logout(state) {
            state.token = '' ;
            window.localStorage.removeItem('token') ;
        }
    }
})

export default store