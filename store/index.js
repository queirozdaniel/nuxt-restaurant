export const state = () => ({
  categories: [],
  loadedRecipes: [],
});

export const getters = {
  readCategories(state) {
    return state.categories;
  },
  readLoadedRecipes(state) {
    return state.loadedRecipes;
  },
};

export const mutations = {
  addCategories(state, payload) {
    state.categories = payload;
  },
  addLoadedRecipes(state, payload) {
    state.loadedRecipes = payload;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const client = this.app.apolloProvider.defaultClient;
    const query = {
      query: require("../graphql/categories.gql"),
    };

    await client
      .query(query)
      .then(({ data }) => {
        commit("addCategories", data.categories.data);
        // commit("addLoadedRecipes", data.recipes.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // });
  },
  searchRecipe({ commit }, payload) {
    const client = this.app.apolloProvider.defaultClient;
    const query = {
      query: require("../graphql/searchRecipe.gql"),
      variables: { term: payload },
    };
    client
      .query(query)
      .then(({ data }) => {
        commit("addLoadedRecipes", data.recipes.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
