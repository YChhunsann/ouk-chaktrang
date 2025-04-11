<template>
    <div class="game-view">
        <!-- Your chess board implementation goes here -->
        <h1>Playing in room: {{ roomId }}</h1>
        <!-- Implement your chess board component -->
    </div>
</template>

<script>
export default {
    props: {
        roomId: {
            type: String,
            required: true
        }
    },
    mounted() {
        // Notify server we're in the match
        this.$socket.emit('inMatch', this.roomId)
    }
}
</script>