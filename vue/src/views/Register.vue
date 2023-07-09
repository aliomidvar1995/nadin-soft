<template>
    <div class="register-form">
        <div>
            <form @submit.prevent="handleRegister">
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
                <div class="register-btn">
                    <a-button type="primary" html-type="submit">Register</a-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import axiosInstance from '../axios'
import { useRouter } from 'vue-router';
import User from '../classes/User';



const name = ref<User['name']>('')
const email = ref<User['email']>('')
const password = ref<User['password']>('')
const password_confirmation = ref<User['password_confirmation']>('')

const router = useRouter()

const errors = ref({
    name: '' as string,
    email: '' as string,
    password: '' as string,
    password_confirmation: '' as string
})


function handleRegister(): void {
    errors.value.name = ''
    errors.value.email = ''
    errors.value.password = ''
    errors.value.password_confirmation = ''
    axiosInstance.post(`/users`, {
        name: name.value, 
        email: email.value, 
        password: password.value, 
        password_confirmation: password_confirmation.value
    })
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        // router.push({name: 'Dashboard'})
        location.replace('/dashboard')
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
    margin-top: 100px;
    width: 60%;
    margin-inline: auto;
}
.error {
    color: #cc0000;
}
.register-btn {
    margin-inline: auto;
}
</style>