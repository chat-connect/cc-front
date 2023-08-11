<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <JoinRoom />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import JoinRoom from "@/components/Room/JoinRoom.vue";

export default {
  components: {
    JoinRoom,
  },
};
</script>
