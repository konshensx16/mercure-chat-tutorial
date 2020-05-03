<template>
    <!-- Typing area -->
    <form action="#" class="bg-light">
        <div class="input-group">
            <input type="text" placeholder="Type a message" v-model="content" @keyup.enter="sendMessage" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light">
            <div class="input-group-append">
                <button id="button-addon2" type="submit" class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data: () => ({
            content: ''
        }),
        methods: {
            sendMessage() {
                this.$store.dispatch("POST_MESSAGE", {
                    conversationId: this.$route.params.id,
                    content: this.content
                }).
                    then(() => {
                        this.content = ''
                })
            }
        }
    }
</script>
