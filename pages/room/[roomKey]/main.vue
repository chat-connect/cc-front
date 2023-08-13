<template>
     <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <RoomChat />
            </v-col>
        </v-row>
     </v-container>
 </template>

<script lang="ts">
import RoomChat from "@/components/Room/RoomChat.vue";

export default {
  components: {
    RoomChat,
  },
};
</script>
