<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <CreateRoom />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import CreateRoom from "@/components/Room/CreateRoom.vue";

export default {
  components: {
    CreateRoom,
  },
};
</script>
