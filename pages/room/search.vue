<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <SearchRoom />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import SearchRoom from "@/components/Room/SearchRoom.vue";

export default {
  components: {
    SearchRoom,
  },
};
</script>
