export default function () {
  console.log(" TESTE Midl");
  if (store.state.categories.length == 0) {
    store.dispatch("nuxtServerInit");
  }
}
