<template>
    <v-container>
        <v-row align-content="center">
            <v-col align-content="center">
                <CreateComponent />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import CreateComponent from "@/components/Channel/CreateComponent.vue";

export default {
  components: {
    CreateComponent,
  },
};
</script>
