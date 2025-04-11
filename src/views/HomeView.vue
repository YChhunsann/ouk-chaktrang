<template>
    <div class="min-h-screen bg-gray-900 text-white">
        <div class="container mx-auto flex justify-center items-start pt-12 gap-12">
            <div class="chess-board">
                <img src="@/assets/images/chessboard.png" alt="Chessboard" class="w-[600px] rounded-lg -ml-[250px]">
            </div>

            <GameControls @play-bots="handlePlayBots" />
        </div>
    </div>
</template>

<script>
import GameControls from '@/components/chess/GameControls.vue';

export default {
    components: { GameControls },
    methods: {
        handlePlayBots() {
            window.location.href = './build/web/index.html';
        }
    }
};
</script>