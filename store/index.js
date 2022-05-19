export const state = () => ({
  counter: 0,
});

export const getters = {
  readCounter(state) {
    return state.counter;
  },
};

export const mutations = {
  increment(state) {
    state.counter++;
  },
};

export const actions = {
  increment(context) {
    setTimeout(() => {
      context.commit("increment");
    }, 1000);
  },
};
