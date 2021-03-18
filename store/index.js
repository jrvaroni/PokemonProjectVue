export const actions = {
  async getAllPokemons() {
    let res = await this.$axios.get(`pokemon/?limit=151`);
    return res;
  }
};
