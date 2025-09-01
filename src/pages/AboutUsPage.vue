<script setup>
</script>

<template>
  <div class="about-page main">
    <div class="about-container">
      <h2 class="title"><strong>About Us</strong></h2>
      <p class="group-name"><strong>Group RB12</strong></p>

      <p class="intro">
        Members of our group:
      </p>

      <div class="members-grid">
        <div class="member-card">
          <h3>Ruth Ifeoma Onwutali</h3>
          <p>222369345</p>
        </div>

        <div class="member-card">
          <h3>Siya Rasmeni</h3>
          <p>222906073</p>
        </div>

        <div class="member-card">
          <h3>Sufyaan Muzaffar Rawoot</h3>
          <p>221075127</p>
        </div>

        <div class="member-card">
          <h3>Lyle Jason Smal</h3>
          <p>223236012</p>
        </div>

        <div class="member-card">
          <h3>Christian Smith</h3>
          <p>221242597</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.about-container {
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 15px;
  max-width: 1400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 255, 127, 0.2);
}

.title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #00FF7F;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.group-name {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 20px;
}

.intro {
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.member-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  padding: 20px;
  border-radius: 12px;
  cursor: default;
}

.member-card h3 {
  margin: 0;
  font-size: 1rem;
  color: white;
}

.member-card p {
  margin: 5px 0 0;
  color: #00FF7F;
  font-weight: bold;
}

.member-card:hover {
  border-color: #00FF7F;
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 255, 127, 0.3);
}

</style>
