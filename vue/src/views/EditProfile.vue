<template>
    <div class="register-form">
        <div class="loading" v-if="loading">
            <Loading />
        </div>
        <div v-else>
            <v-sheet width="300" class="mx-auto">
                <v-form @submit.prevent="handleEditProfile">
                    <v-text-field v-model="name" :rules="rules" label="Name"></v-text-field>
                    <span class="error">{{ errors.name }}</span>
                    <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
                    <span class="error">{{ errors.email }}</span>
                    <v-text-field type="password" v-model="password" :rules="rules" label="Password"></v-text-field>
                    <span class="error">{{ errors.password }}</span>
                    <v-text-field type="password" v-model="password_confirmation" :rules="rules"
                        label="Password Confirmation"></v-text-field>
                    <span class="error">{{ errors.password_confirmation }}</span>
                    <v-btn type="submit" color="warning" block class="mt-2">Edit</v-btn>
                    <v-btn color="error" class="mt-4" block @click="handleDeleteProfile">Delete</v-btn>
                </v-form>
            </v-sheet>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../axios'
import { useRouter } from 'vue-router';
import Loading from '../components/Loading.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const router = useRouter()

const errors = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const loading = ref(true)


onMounted(() => {
    axiosInstance.get(`/users`)
    .then((res) => {
        name.value = res.data.name
        email.value = res.data.email
        loading.value = false
    })
})

function handleDeleteProfile() {
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
</style>