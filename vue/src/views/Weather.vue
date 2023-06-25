<template>
    <div>
        <label>Select your city: &nbsp;</label>
        <a-select style="width: 200px">
            <a-select-option @click="select(city.lat, city.lng, city.city)" v-for="city in cities" :key="city.city"
                :value="city.city">{{ city.city }}</a-select-option>
        </a-select>

        <v-card class="mx-auto" max-width="368">
            <v-card-item :title="city">
                <template v-slot:subtitle>
                    <v-icon icon="mdi-alert" size="18" color="error" class="me-1 pb-1"></v-icon>

                    Extreme Weather Alert
                </template>
            </v-card-item>

            <v-card-text class="py-0">
                <v-row align="center" no-gutters>
                    <v-col class="text-h3" cols="6">
                        {{ temperature }}&deg;C
                    </v-col>

                    <v-col cols="6" class="text-right">
                        <v-icon color="error" icon="mdi-weather-hurricane" size="88"></v-icon>
                    </v-col>
                </v-row>
            </v-card-text>

            <div class="d-flex py-3 justify-space-between">
                <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                    <v-list-item-subtitle>{{ windSpeed }} km/h</v-list-item-subtitle>
                </v-list-item>
            </div>

            <v-expand-transition>
                <div v-if="expand">
                    <div class="py-2">
                        <v-slider v-model="time" :max="6" :step="1" :ticks="labels" class="mx-4" color="primary"
                            density="compact" hide-details show-ticks="always" thumb-size="10"></v-slider>
                    </div>

                    <v-list class="bg-transparent">
                        <v-list-item v-for="item in forecast" :key="item.day" :title="item.day" :append-icon="item.icon"
                            :subtitle="item.temp">
                        </v-list-item>
                    </v-list>
                </div>
            </v-expand-transition>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn @click="expand = !expand">
                    {{ !expand ? 'Full Report' : 'Hide Report' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue";
import cities from "../json/cities.json"

const temperature = ref()
const windSpeed = ref()


const city = ref("")

function select(lat, lng, selectedCity) {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
        .then((res) => {
            console.log(res.data);
            temperature.value = res.data.current_weather.temperature
            windSpeed.value = res.data.current_weather.windspeed
            city.value = selectedCity
        })
}

</script>

<style></style>