<template>
    <div class="game-controls">
        <button @click="findMatch" :disabled="isSearching" class="play-button">
            {{ isSearching ? 'Searching for opponent...' : 'Play Online' }}
        </button>

        <button @click="$emit('play-bots')" class="bot-button">
            Play with Bots
        </button>
    </div>
</template>

<!-- <script>
import socketService from '@/services/socketService'; -->

<script>
import socketService from '@/services/socketService';

export default {
    data() {
        return {
            isSearching: false
        };
    },
    methods: {
        findMatch() {
            console.log('Starting match search...');
            this.isSearching = true;
            socketService.findMatch();

            socketService.onMatchFound((matchID) => {
                console.log(`Match found! Room ID: ${matchID}`);
                this.$router.push(`/game/${matchID}`);
            });

            // Add error handling for disconnects
            socketService.socket.on('disconnect', () => {
                console.log('Disconnected from server during matchmaking');
                this.isSearching = false;
            });
        }
    },
    beforeUnmount() {
        socketService.removeListeners();
    }
};
</script>
<style scoped>
.play-button {
    @apply flex items-center justify-center gap-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-xl transition-colors w-full;
}

.bot-button {
    @apply flex items-center justify-center gap-4 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-xl transition-colors w-full mt-4;
}

.play-button:disabled {
    @apply bg-green-800 cursor-not-allowed;
}
</style>