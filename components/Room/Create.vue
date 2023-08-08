<template>
    <v-container>
        <v-card class="base_card" flat>
            <v-col cols="12">
                <h2>New Room</h2>
                <v-form>
                    <v-text-field label="Name"></v-text-field>
                    <v-textarea label="Explanation" rows="5"></v-textarea>
                </v-form>
                <v-row justify="end">
                    <v-col cols="4">
                        <v-btn flat block variant="tonal" color="primary" class="text-right" @click="">Create</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-container>
</template>
  
<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>
