<template>
     <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <ChatComponent />
            </v-col>
        </v-row>
     </v-container>
 </template>

<script lang="ts">
import ChatComponent from "@/components/Channel/ChatComponent.vue";

export default {
  components: {
    ChatComponent,
  },
};
</script>
