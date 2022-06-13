export const state = () => ({
  favorites: null,
});

export const getters = {
  favorites(state) {
    return state.favorites;
  },
};

export const mutations = {
  setFavorites(state, payload) {
    state.favorites = payload;
  },
  addRecipe(state, payload) {
    state.favorites.push(payload);
  },
  removeRecipe(state, payload) {
    const myRecipe = state.favorites.find((recipe) => recipe.id === payload);
    const index = state.favorites.indexOf(myRecipe);
    state.favorites.splice(index, 1);
  },
};

export const actions = {
  async getFavorites({ commit }) {
    let client = this.app.apolloProvider.defaultClient;
    let id = this.app.$auth.user.id;
    const query = {
      context: {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      },
      query: require("../graphql/userFavorites.gql"),
      fetchPolicy: "no-cache",
      variables: { id },
    };
    await client
      .query(query)
      .then(({ data }) => {
        commit(
          "setFavorites",
          data.usersPermissionsUser.data.attributes.favorites.data
        );
      })
      .catch((e) => console.log(e));
  },
};
