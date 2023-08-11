<template>
     <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <ChatRoom />
            </v-col>
        </v-row>
     </v-container>
 </template>

<script lang="ts">
import ChatRoom from "@/components/Room/ChatRoom.vue";

export default {
  components: {
    ChatRoom,
  },
};
</script>
