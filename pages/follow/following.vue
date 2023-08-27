<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
               <ListFollowing />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import ListFollowing from "@/components/Follow/ListFollowing.vue";

export default {
    components: {
        ListFollowing,
    },
};
</script>
