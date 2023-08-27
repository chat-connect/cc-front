<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <ListRoomUser />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import ListRoomUser from "@/components/Room/ListRoomUser.vue";

export default {
    components: {
        ListRoomUser,
    },
};
</script>
