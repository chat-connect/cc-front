<template>
    <div>
        <v-app-bar
            app
            flat
            border
            class="px-md-6"
        >
            <img class="image_circle user_icon" src="~/assets/image/sample_icon.png" @click="drawer = !drawer">
            <v-app-bar-title class="font-weight-bold">
                Chat Connect
            </v-app-bar-title>
            <v-spacer />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app floating class="px-6 py-4">
            <v-list>
                <v-list-item v-for="item in items" color="primary" :to="item.path" class="py-3">
                    <v-icon :icon="item.icon" class="mr-6" />
                    <v-list-item-title class="font-weight-bold" v-text="item.title" />
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
const items = [
    {
        title: 'item1',
        path: '/item1',
        icon: 'mdi-numeric-1'
    },
    {
        title: 'item2',
        path: '/item2',
        icon: 'mdi-numeric-2'
    }]

const drawer = useState('drawer', () => false)
</script>

<style>
img.user_icon {
	width: 55px;
	height: 55px;
	object-fit:cover;
	border-radius:50%;
}
</style>