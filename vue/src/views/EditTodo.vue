<template>
    <div>
        <div class="loading" v-if="loading">
            <Loading />
        </div>
        <div v-else>
            <form class="todo-input">
                <a-input v-model:value="content" placeholder="Todo" />
                <a-button @click.prevent="handleEditTodo" type="submit">submit</a-button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import Loading from "../components/Loading.vue"
import axiosInstance from "@/axios";
import { useRouter } from "vue-router";
import Todo from "@/classes/Todo"


const props = defineProps<{id: string}>()

const content = ref<Todo["content"]>('')

const loading = ref<boolean>(true)

const router = useRouter()

onMounted(() => {
    axiosInstance.get(`/todos/${props.id}`)
    .then((res) => {
        content.value = res.data.content
        loading.value = false
    })
})

function handleEditTodo(): void {
    console.log(123);
    
    axiosInstance.put(`/todos/${props.id}`, {content: content.value})
    .then((res) => {
        router.push({name: "Todos", params: {page: 1}})
    })
}


</script>

<style>

</style>