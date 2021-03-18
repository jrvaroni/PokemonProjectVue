<template>
  <div class="box_container p-5">
    <div v-for="(item, i) in pokemon" :key="i" class="box">
      <div class="image">
        <img :src="`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`" />
      </div>
      <p>{{item.name}}</p>
      <p>{{item.id }}</p>
    </div>
  </div>
</template>

<script>

const _headers = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}
export default {
  data() {
    return {
      pokemon: []
    }
  },
  methods: {
    async fetchPokemon(params) {
      const api = params.url;
      const { data } = await this.$axios.get(api, _headers)
      this.pokemon.push(data)
      this.pokemon.sort((a, b) => a.id - b.id)
    },
    async getAllPokemons() {
      let res = await this.$store.dispatch("getAllPokemons");
      res.data.results.forEach(async (pokemon) => {
        await this.fetchPokemon(pokemon)
      })
    }
  },
  mounted() {
    this.getAllPokemons()
  }
}
</script>

<style scoped>
.box_container {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
}

.box {
    background-color: #eee;
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);
    margin: 10px;
    padding: 20px;
    text-align: center;
    height: 220px;
}

.box .image {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    text-align: center;
}

.box .image img {
  max-width: 90%;
  margin-top: 20px;
}
</style>
