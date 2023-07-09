<template>
    <a-layout style="min-height: 100vh;">
        <a-layout-header class="header">
            <div class="logo" />
            <a-menu v-model="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">
                    <router-link :to="{name: 'Login'}">Login</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link :to="{name: 'Register'}">Register</router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout>
            <router-view></router-view>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedKeys1 = ref<string[]>([])

</script>
