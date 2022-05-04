<script setup>
import '@/assets/css/mainPage.css'
</script>


<template>
    <div class="header">
        <div class="header-text">
            <h1>
                Kimoko
            </h1>
            <h2>
                A place to share your thoughts
            </h2>
        </div>
    </div>
    <div class="auth">
        <a href="" class="auth-box auth-github">
            <span class="">
                Login through Github
            </span>
        </a>
        <a href="" class="auth-box auth-discord">
            <span href="{{ route('login') }}" class="">
                Login through Discord
            </span>

        </a>

    </div>
</template>