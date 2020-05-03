<template>
    <!-- Sender Message-->
    <div class="media w-50 mb-3" :class="{'ml-auto': message.mine}">
        <img v-if="!message.mine" src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
        <div class="media-body ml-3">
            <div class="rounded py-2 px-3 mb-2" :class="[message.mine ? 'bg-primary' : 'bg-light']">
                <p class="text-small mb-0" :class="[message.mine ? 'text-white' : 'text-muted']">{{ message.content }}</p>
            </div>
            <p class="small text-muted">{{ date }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: Object
        },
        computed: {
            date() {
                return new Date(this.message.createdAt).toLocaleString();
            }
        }
    }
</script>