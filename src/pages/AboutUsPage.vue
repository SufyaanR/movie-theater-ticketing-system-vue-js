<script setup>
</script>

<template>
  <div class="about-page main">
    <div class="card">
      <h1>
        <strong>
          About Us
        </strong>
      </h1>
      <p><strong>Group RB12</strong></p>

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


.card{
  width: 80vw;
  background: transparent;
  padding: 50px;
}

.group-name {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 20px;
}

.intro {
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
  background: transparent;
  border: 2px solid transparent;
  padding: 20px;
  border-radius: 12px;
  transition: ease-in-out 0.3s;
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
