<template>
    <div>
        <label>Select your city: &nbsp;</label>
        <a-select style="width: 200px">
            <a-select-option v-for="city in cities" :key="city.city"
                :value="city.city" @click="select(city.lat, city.lng, city.city)">{{ city.city }}</a-select-option>
        </a-select>

        <div class="card">
            <a-card :title="city" :bordered="false" style="width: 300px; text-align: center;;">
            <div style="display: flex; justify-content: space-between;">
                <span>{{ temperature + ' C°' }}</span>
                <img width="50" src="../assets/temp.png" alt="">
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>{{ windSpeed + ' km/h' }}</span>
                <img width="50" src="../assets/wind.png" alt="">
            </div>
            </a-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref } from "vue";
import cities from "@/json/cities.json"

const temperature = ref("temperature")
const windSpeed = ref("wind speed")


const city = ref<string>("city")

function select(lat: number, lng: number, selectedCity: string): void {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
    .then((res) => {
        console.log(res.data);
        temperature.value = res.data.current_weather.temperature
        windSpeed.value = res.data.current_weather.windspeed
        city.value = selectedCity
    })
}

</script>

<style>
.card {
    border-radius: 5px;
    box-shadow: 0 0 15px 0 lightgrey;
    padding: 30px; 
    width: fit-content; 
    margin-inline: auto;
    margin-top: 50px;
}
</style>