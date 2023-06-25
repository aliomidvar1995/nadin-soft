<template>
    <v-app>
        <div class="profile" v-if="loading">
            <Loading />
        </div>
        <div class="profile" v-else>
            <h3>{{ user.name }}</h3>
            <v-btn @click="toggleTheme">toggle theme</v-btn>
        </div>
    </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import { useLocale } from 'vuetify'
import axiosInstance from '../axios'
import Loading from '../components/Loading.vue'

const theme = useTheme()

const loading = ref(true)

const user = ref({})

onMounted(() => {
    axiosInstance.get(`/users`)
    .then((res) => {
        user.value = res.data
        loading.value = false
    })
})


const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}


const { current } = useLocale()


const changeLocale = locale => current.value = locale

</script>

<style>
.profile {
    width: 300px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>