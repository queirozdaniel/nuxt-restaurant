export default function ({ store }) {
  if (store.state.categories.length == 0) {
    store.dispatch("nuxtServerInit");
  }
}
