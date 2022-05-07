<script>

//send a request to the server to get the user's info 
// localhost:4000/api/v1/user/me/profile
const getUserInfo = async () => {
    const response = await fetch('http://localhost:4000/api/v1/user/me/settings');
    const data = await response.json();
    return data;
}

</script>

<template>
    ahoj
    {{ getUserInfo() }}

</template>