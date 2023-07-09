<template>
    <a-layout style="min-height: 100vh;">
        <a-layout-header class="header">
            <div class="logo" />
            <a-menu v-model="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item @click="logout" key="1">logout</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu v-model="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
                    :style="{ height: '100%', borderRight: 0 }">
                    <a-sub-menu key="sub1">
                        <template #title>
                            <span>
                                <laptop-outlined />
                                Dashboard Menu
                            </span>
                        </template>
                        <a-menu-item key="1">
                            <router-link :to="{name: 'Dashboard'}">Dashboard</router-link>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <router-link :to="{name: 'Todos'}">Todos</router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <router-link :to="{name: 'Weather'}">Weather</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <template #title>
                            <span>
                                <user-outlined />
                                Profile Menu
                            </span>
                        </template>
                        <a-menu-item key="4">
                            <router-link :to="{name: 'Profile'}">Profile</router-link>
                        </a-menu-item>
                        <a-menu-item key="5">
                            <router-link :to="{name: 'EditProfile'}">Edit Profile</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding: 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axios';

const router = useRouter()

const selectedKeys1 = ref([])
const selectedKeys2 = ref([])

const collapsed = ref(false)
const openKeys = ref(['sub1'])

function logout() {
    axiosInstance.post(`/logout`)
    .then((res) => {
        localStorage.removeItem('token')
        router.push({name: 'Login'})
    })
    .then((err) => {
        console.log(err);
    })
}

</script>

<style>
#components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

.site-layout-background {
    background: #fff;
}
</style>