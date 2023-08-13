<template>
    <v-container>
       <v-row align-content="center">
           <v-col align-content="center">
               <OpenChat />
           </v-col>
       </v-row>
    </v-container>
</template>

<script lang="ts">
import OpenChat from "@/components/Open/OpenChat.vue";

export default {
    components: {
        OpenChat,
    },
};
</script>
