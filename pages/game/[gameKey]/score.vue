<template>
    <v-container>
       <v-row align-content="center">
           <v-col cols="12" align-content="center">
            <GameScore />
           </v-col>
       </v-row>
    </v-container>
</template>

<script lang="ts">
import GameScore from "@/components/Game/GameScore";

export default {
    components: {
        GameScore,
    },
};
</script>
