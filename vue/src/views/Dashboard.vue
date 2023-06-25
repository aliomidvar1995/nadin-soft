<template>
    <v-card class="mx-auto" max-width="450">
        <v-img src="../assets/house.jpg" cover :aspect-ratio="16 / 9">
        </v-img>
        <v-card-title class="flex-column align-start">
            <div class="text-h4 mb-2">
                {{ message }}
            </div>
            <div class="text-h6 font-weight-regular text-grey">
                {{ time }}
            </div>
        </v-card-title>
    </v-card>
</template>

<script setup>
import { ref } from "vue"


const message = ref('')


const time = ref((new Date()).toLocaleTimeString())
console.log((new Date(0,0,0,12,0,0)).getHours() > (new Date()).getHours());
function setMessage() {
    if(((new Date(0,0,0,6,0,0)).getHours() < (new Date()).getHours()) && ((new Date()).getHours() < (new Date(0,0,0,12,0,0)).getHours())) {
        message.value = 'Good morning'
    }
    else if(((new Date(0,0,0,12,0,0)).getHours() <= (new Date()).getHours()) && ((new Date()).getHours() < (new Date(0,0,0,16,0,0)).getHours())) {
        message.value = 'Good afternoon'
    }
    else if(((new Date(0,0,0,16,0,0)).getHours() <= (new Date()).getHours()) && ((new Date()).getHours() < (new Date(0,0,0,19,0,0)).getHours())) {
        message.value = 'Good evening'
    }
    else {
        message.value = 'Good night'
    }

}


setInterval(() => {
    time.value = (new Date()).toLocaleTimeString()
}, 1000)

setMessage()

console.log((new Date(0,0,0,12,0,0)).getHours());

</script>

<style></style>