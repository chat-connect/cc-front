<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <SearchUser />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import SearchUser from "@/components/User/SearchUser.vue";

export default {
  components: {
    SearchUser,
  },
};
</script>
