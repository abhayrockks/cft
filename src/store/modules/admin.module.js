import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    namespaced: true,
    state: {
        topics: [],
    },
    getters: {
    },
    actions: {
        async addTopics({ commit }, payload) {
            try {
                commit('empty_topics')
                const resp = await firebase.firestore().collection("topics").add({name: payload.name, created: payload.created});
                await firebase.firestore().collection("topics").doc(resp.id).set({id: resp.id},{merge: true})
                const data = await firebase.firestore().collection("topics").get()
                data.docs.forEach((doc) => {
                    commit('set_topics', doc.data())
                })
                return { success: true }
            } catch (error) {
                return { success: false, msg: error };
            }
        },
        async getTopics({ commit }) {
            try {
                commit('empty_topics')
                const data = await firebase.firestore().collection("topics").get()
                data.docs.forEach((doc) => {
                    commit('set_topics', doc.data())
                })
            } catch (error) {
                return { success: false, msg: error };
            }
        },
        async editTopics({ commit }, payload) {
            try {
                commit('empty_topics')
                await firebase.firestore().collection("topics").doc(payload.id).set({name: payload.name},{merge: true})
                const data = await firebase.firestore().collection("topics").get()
                data.docs.forEach((doc) => {
                    commit('set_topics', doc.data())
                })
                return { success: true }
            } catch (error) {
                return { success: false, msg: error };
            }
        },
        async deleteTopic({ commit }, payload) {
            try {
                commit('empty_topics')
                await firebase.firestore().collection("topics").doc(payload).delete()
                const data = await firebase.firestore().collection("topics").get()
                data.docs.forEach((doc) => {
                    commit('set_topics', doc.data())
                })
                return { success: true }
            } catch (error) {
                return { success: false, msg: error };
            }
        }
    },
    mutations: {
        set_topics: (state, data) => {
            state.topics.push(data);
        },
        empty_topics: (state) => {
            state.topics = [];
        },
    }
}