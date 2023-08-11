<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <CreateChannel />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import CreateChannel from "@/components/Channel/CreateChannel.vue";

export default {
  components: {
    CreateChannel,
  },
};
</script>
