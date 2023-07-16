<template>
    <v-app style="background: #e5e8eb;">
        <v-app-bar app flat border class="px-md-6" >
            <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-md-4" />
            <v-app-bar-title class="font-weight-bold">
                Chat Connect
            </v-app-bar-title>
            <v-spacer />
            <v-icon icon="mdi-account" class="mr-1" />
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app floating class="px-6 py-4">
            <v-list>
                <v-list-item v-for="item in items" color="primary" :to="item.path" class="py-3">
                    <v-icon :icon="item.icon" class="mr-6" />
                    <v-list-item-title class="font-weight-bold" v-text="item.title" />
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
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