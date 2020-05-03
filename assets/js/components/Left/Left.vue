<template>
    <div class="col-5 px-0">
        <div class="bg-white">

            <div class="bg-gray px-4 py-2 bg-light">
                <p class="h5 mb-0 py-1">Recent</p>
            </div>

            <div class="messages-box">
                <div class="list-group rounded-0">
                    <template v-for="(conversation, index, key) in CONVERSATIONS">
                        <Conversation :conversation="conversation" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Conversation from "./Conversation";

    export default {
        components: {Conversation},
        computed: {
          ...mapGetters(["CONVERSATIONS", "HUBURL", "USERNAME"])
        },
        methods: {
            updateConversations(data) {
                this.$store.commit("UPDATE_CONVERSATIONS", data)
            }
        },
        mounted() {
            const vm = this;
            this.$store.dispatch("GET_CONVERSATIONS")
                .then(() => {
                    let url = new URL(this.HUBURL);
                    url.searchParams.append('topic', `/conversations/${this.USERNAME}`)
                    const eventSource = new EventSource(url, {
                        withCredentials: true
                    })

                    eventSource.onmessage = function (event) {
                        vm.updateConversations(JSON.parse(event.data))
                    }
                })
        }
    }
</script>