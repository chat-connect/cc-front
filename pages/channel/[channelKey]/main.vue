<template>
     <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <ChannelChat />
            </v-col>
        </v-row>
     </v-container>
 </template>

<script lang="ts">
import ChannelChat from "@/components/Channel/ChannelChat.vue";

export default {
  components: {
    ChannelChat,
  },
};
</script>
