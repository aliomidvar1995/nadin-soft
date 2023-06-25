<template>
    <v-sheet class="mx-auto">
        <div class="loading" v-if="loading">
            <Loading />
        </div>
        <template v-else>
            <v-form class="todo-form" @submit.prevent="handleEditTodo">
                <v-text-field v-model="content" :rules="rules" label="Todo"></v-text-field>
                <v-btn type="submit" style="height: 56px;margin-left: 10px;">Submit</v-btn>
            </v-form>
        </template>
    </v-sheet>
</template>

<script setup>
import { onMounted, ref } from "vue"
import Loading from "../components/Loading.vue"
import axiosInstance from "@/axios";
import { useRouter } from "vue-router";


const props = defineProps(["id"])

const content = ref('')

const loading = ref(true)

const router = useRouter()

onMounted(() => {
    axiosInstance.get(`/todos/${props.id}`)
    .then((res) => {
        content.value = res.data.content
        loading.value = false
    })
})

function handleEditTodo() {
    axiosInstance.put(`/todos/${props.id}`, {content: content.value})
    .then((res) => {
        router.push({name: "Todos", params: {page: 1}})
    })
}


</script>

<style>

</style>