<template>
    <v-container>
       <v-row align-content="center">
           <v-col cols="12" align-content="center">
               <EditProfile />
           </v-col>
       </v-row>
    </v-container>
</template>

<script lang="ts">
import EditProfile from "@/components/Profile/EditProfile.vue";

export default {
    components: {
        EditProfile,
    },
};
</script>
