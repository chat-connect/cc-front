<template>
    <v-bottom-navigation class="bottom_nav" height="83">
        <v-col cols="12">
            <v-form class="form-container">
                <v-textarea
                    color="primary"
                    label="Message"
                    class="align-end"
                    rows="1"
                ></v-textarea>
                <v-btn color="primary" class="send_button">
                    <v-icon class="send-icon">mdi-send</v-icon>
                </v-btn>
            </v-form>
        </v-col>
    </v-bottom-navigation>
</template>

<style lang="scss" scoped>
.form-container {
    display: flex;
    align-items: flex-start;
}

.send_button {
    align-self: flex-start;
    height: 58px;
}

.send-icon {
    font-size: 30px;
}

.bottom_nav {
    box-shadow: none !important;
}
</style>