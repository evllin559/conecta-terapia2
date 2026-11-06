<script setup>
import { useDemoStore } from '../composables/useDemoStore.js'
const {route} = useDemoStore()
</script>
<template>
<header class="top"><nav class="nav"><a @click="route('home')" class="brand" href="#inicio">conecta<span>terapia</span> ✳</a><div class="links"><button @click="route('profile')" class="btn ghost">Ver perfil</button><button @click="route('dashboard')" class="btn secondary">Painel profissional</button></div></nav></header></template>