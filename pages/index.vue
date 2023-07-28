<template>
    <div>
        <v-container class="main_container">
            <v-row align-content="center">
                <v-col align="center">
                    <Carousel />
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="12" align="center">
                    <Timeline />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
.main_container {
    position: relative;
    top: 64px;
}
</style>
