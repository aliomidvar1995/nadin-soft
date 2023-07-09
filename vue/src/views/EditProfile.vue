<template>
    <div class="register-form">
        <div class="loading" v-if="loading">
            <Loading />
        </div>
        <div v-else>
            <form @submit.prevent="handleEditProfile">
                <a-form-item name="name">
                    <a-input v-model:value="name" placeholder="Name" />
                </a-form-item>
                <span class="error">{{ errors.name }}</span>
                <a-form-item name="email">
                    <a-input v-model:value="email" placeholder="Email" />
                </a-form-item>
                <span class="error">{{ errors.email }}</span>
                <a-form-item name="password">
                    <a-input-password v-model:value="password" placeholder="Password" />
                </a-form-item>
                <span class="error">{{ errors.password }}</span>
                <a-form-item name="password_confirmation">
                    <a-input-password v-model:value="password_confirmation" placeholder="Password Confirmation" />
                </a-form-item>
                <span class="error">{{ errors.password_confirmation }}</span>
                <div class="profile-btn">
                    <a-button type="primary" html-type="submit">Edit Profile</a-button>
                </div>
                <div class="profile-btn">
                    <a-button class="delete-btn" @click="handleDeleteProfile">Delete Profile</a-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axiosInstance from '../axios'
import { useRouter } from 'vue-router';
import Loading from '../components/Loading.vue'
import User from '@/classes/User';



const name = ref<User['name']>('')
const email = ref<User['email']>('')
const password = ref<User['password']>('')
const password_confirmation = ref<User['password_confirmation']>('')

const router = useRouter()

const errors = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const loading = ref<boolean>(true)


onMounted(() => {
    axiosInstance.get(`/users`)
    .then((res) => {
        name.value = res.data.name
        email.value = res.data.email
        loading.value = false
    })
})

function handleDeleteProfile(): void {
    axiosInstance.delete(`/users`)
    .then((res) => {
        localStorage.removeItem('token')
        router.push({name: 'Login'})
    })
}

function handleEditProfile() {
    errors.value.name = ''
    errors.value.email = ''
    errors.value.password = ''
    errors.value.password_confirmation = ''

    axiosInstance.put(`/users`, {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
    })
    .then((res) => {
        router.push({name: 'Profile'})
        // location.replace('/dashboard')
    })
    .catch((err) => {
        if(err.response.data.errors.name) errors.value.name = err.response.data.errors.name[0]
        if(err.response.data.errors.email) errors.value.email = err.response.data.errors.email[0]
        if(err.response.data.errors.password) errors.value.password = err.response.data.errors.password[0]
        if(err.response.data.errors.password_confirmation) errors.value.password_confirmation = err.response.data.errors.password_confirmation[0]
    })
}
</script>

<style>
.register-form {
    margin-top: 80px;
}

.login-link {
    text-decoration: none;
    color: black;
}

.login {
    margin-top: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
}

.error {
    color: #cc0000;
}
.loading {
    display: flex;
    justify-content: center;
}
.profile-btn {
    display: flex;
    justify-content: center;
}
.delete-btn {
    border-color: red;
    color: red;
}
</style>