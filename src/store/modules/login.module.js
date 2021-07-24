export default {
    namespaced: true,
    state: {
        handleMessage: "",
        username: "",
    },
    getters: {
        username: state => state.username
    },
    actions: {
        async handlelogin({ commit }, payload) {
            commit('set_users', payload);
        }
    },
    mutations: {
        handleMessage: (state, data) => {
            const message = data ? data : 'Oops something went wrong!'
            state.handleMessage = message;
        },
        set_users: (state, data) => {
            state.username = data;
        },
        del_info: (state) => {
            state.handleMessage = "";
            state.username = "";
        }
    }
}