<template>
    <div class="welcome-page">
        <div class="container">
            <h1 class="title">Welcome to Pollock!</h1>
            <p class="subtitle">Here you will find everything you need to know about Pollock.</p>

            <div class="features">
                <div class="feature">
                    <i class="fas fa-search"></i>
                    <h3>Create Polls</h3>
                    <p>Create polls with different options and settings</p>
                </div>

                <div class="feature">
                    <i class="fas fa-users"></i>
                    <h3>Manage Polls</h3>
                    <p>View all your polls to edit, delete or close them</p>
                </div>

                <div class="feature">
                    <i class="fas fa-info-circle"></i>
                    <h3>View Votes</h3>
                    <p>Look at your votes and edit them afterwards</p>
                </div>

                <div class="feature">
                    <i class="fas fa-info-circle"></i>
                    <h3>Token Search</h3>
                    <p>Search your polls and your votes with unique tokens</p>
                </div>
            </div>

            <div class="actions">
                <a href="#" class="btn">Mehr erfahren</a>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "HomePage",
};
</script>
  
<style>
.welcome-page {
    background-color: #f5f5f5;
    height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding-top: 5rem;
}

.title {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.subtitle {
    font-size: 2rem;
    color: #777;
    margin-bottom: 2rem;
}

.features {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
}

.feature {
    width: 33%;
    text-align: center;
    padding: 2rem;
}

.feature i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #4a90e2;
}

.feature h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.feature p {
    font-size: 1.25rem;
    color: #777;
    line-height: 1.5;
    margin-bottom: 2rem;
}

.actions {
    display: flex;
    justify-content: center;
}

.btn {
    background-color: transparent;
    border: 2px solid #4a90e2;
    color: #4a90e2;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease-in-out;
}

.btn:hover {
    background-color: #4a90e2;
    color: #fff;
}
</style>