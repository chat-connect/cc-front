<template>
     <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <ChatChannel />
            </v-col>
        </v-row>
     </v-container>
 </template>

<script lang="ts">
import ChatChannel from "@/components/Channel/ChatChannel.vue";

export default {
  components: {
    ChatChannel,
  },
};
</script>
