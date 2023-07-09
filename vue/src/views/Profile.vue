<template>
    <v-app>
        <div class="profile" v-if="loading">
            <Loading />
        </div>
        <div class="profile" v-else>
            <h3>{{ user.name }}</h3>
        </div>
    </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axiosInstance from '../axios'
import Loading from '../components/Loading.vue'


const loading = ref(true)

const user = ref({})

onMounted(() => {
    axiosInstance.get(`/users`)
    .then((res) => {
        user.value = res.data
        loading.value = false
    })
})

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