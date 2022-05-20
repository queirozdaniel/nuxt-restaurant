export const state = () => ({
  counter: 0,
  categories: [],
});

export const getters = {
  readCategories(state) {
    return state.categories;
  },
  readCounter(state) {
    return state.counter;
  },
};

export const mutations = {
  addCategories(state, payload) {
    state.categories = payload;
  },
  increment(state) {
    state.counter++;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    // return new Promise((resolve, reject) => {
    const client = this.app.apolloProvider.defaultClient;
    const query = {
      query: require("../graphql/categories.gql"),
    };

    await client
      .query(query)
      .then(({ data }) => {
        commit("addCategories", data.categories.data);
        // resolve();
      })
      .catch((error) => {
        console.error(error);
        // reject();
      });
    // });
  },
  increment(context) {
    setTimeout(() => {
      context.commit("increment");
    }, 1000);
  },
};
