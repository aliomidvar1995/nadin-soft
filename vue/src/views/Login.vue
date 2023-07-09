<template>
    <div class="login-form">
        <div>
            <a-form @submit.prevent="handleLogin">
                <a-form-item name="email">
                    <a-input v-model:value="email" placeholder="Email" />
                </a-form-item>
                <span class="error">{{ errors.email }}</span>
                <a-form-item name="password">
                    <a-input-password v-model:value="password" placeholder="Password" />
                </a-form-item>
                <span class="error">{{ errors.password }}</span>
                <div class="register-btn">
                    <a-button type="primary" html-type="submit">Login</a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axios';
import User from '@/classes/User'

const email = ref<User['email']>('')
const password = ref<User['password']>('')

const errors = ref({
    email: '',
    password: ''
})

const router = useRouter()

function handleLogin() {
    errors.value.email = ''
    errors.value.password = ''
    axiosInstance.post(`/login`, {
        email: email.value, 
        password: password.value
    })
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        // router.push({name: 'Dashboard'})
        location.replace('/dashboard')
    })
    .catch((err) => {
        if(err.response.data.errors.email) errors.value.email = err.response.data.errors.email[0]
        if(err.response.data.errors.password) errors.value.password = err.response.data.errors.password[0]
    })
}

</script>

<style>
.login-form {
    margin-top: 100px;
    width: 60%;
    margin-inline: auto;
}
form {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.register-link {
    text-decoration: none;
    color: black;
}
.register {
    margin-top: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
}
.error {
    color: #cc0000;
}
.login-btn {
    margin-inline: auto;
}
</style>
