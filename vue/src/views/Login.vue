<template>
    <div class="login-form">
        <div>
            <v-sheet width="300" class="mx-auto">
                <v-form @submit.prevent="handleLogin">
                    <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
                    <span class="error">{{ errors.email }}</span>
                    <v-text-field type="password" v-model="password" :rules="rules" label="Password"></v-text-field>
                    <span class="error">{{ errors.password }}</span>
                    <v-btn type="submit" block class="mt-2">Login</v-btn>
                </v-form>
            </v-sheet>
        </div>
        <div class="register">
            <span>Not registered yet? &nbsp;</span>
            <router-link class="register-link" :to="{name: 'Register'}">register</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axios';

const email = ref('')
const password = ref('')

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
</style>
