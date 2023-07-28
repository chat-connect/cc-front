<template>
    <v-app class="main">
        <Navbar />
        <slot />        
    </v-app>
</template>

<style lang="scss" scoped>
.main {
    background: #f3efef;
}
</style>