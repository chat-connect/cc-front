<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <ListFollowers />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import ListFollowers from "@/components/Follow/ListFollowers.vue";

export default {
    components: {
        ListFollowers,
    },
};
</script>
