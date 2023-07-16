<template>
    <div>
        <v-container 
            style="position: relative;
            top: 64px;"
        >
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
