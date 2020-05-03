<template>
    <div class="col-7 px-0">
        <div class="px-4 py-5 chat-box bg-white" ref="messagesBody">
            <template v-for="(message, index, key) in MESSAGES">
                <Message :message="message"/>
            </template>
        </div>

        <Input/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Message from "./Message";
    import Input from "./Input";

    export default {
        data: () => ({
            eventSource: null
        }),
        components: {Message, Input},
        computed: {
            ...mapGetters(["HUBURL"]),
            MESSAGES() {
                return this.$store.getters.MESSAGES(this.$route.params.id);
            }
        },
        methods: {
            scrollDown() {
                this.$refs.messagesBody.scrollTop = this.$refs.messagesBody.scrollHeight;
            },
            addMessage(data) {
                this.$store.commit("ADD_MESSAGE", {
                    conversationId: this.$route.params.id,
                    payload: data
                })
            }
        },
        mounted() {
            const vm = this;
            this.$store.dispatch("GET_MESSAGES", this.$route.params.id)
                .then(() => {
                    this.scrollDown();
                    if (this.eventSource === null) {
                        let url = new URL(this.HUBURL);
                        url.searchParams.append('topic', `/conversations/${this.$route.params.id}`)
                        this.eventSource = new EventSource(url, {
                            withCredentials: true
                        })

                        this.eventSource.onmessage = function (event) {
                            vm.addMessage(JSON.parse(event.data))
                        }
                    }

                })
        },
        watch: {
            MESSAGES: function (val) {
                this.$nextTick(() => {
                    this.scrollDown();
                })
            }
        },
        beforeDestroy() {
            if (this.eventSource instanceof EventSource) {
                this.eventSource.close();
            }
        }
    }
</script>
