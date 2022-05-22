<template>
  <div>
    {{ recipe }}
    <div class="my-3">
      <app-ui-back-button />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({app, route}) {
    const client = app.apolloProvider.defaultClient
    const id = route.params.recipe

    const query = {
      query:require('../../../graphql/recipe.gql'),
      variables: { id }
    }
    let recipe = null

    await client.query(query).then(({ data }) => {
      recipe = data.recipe.data
    }).catch(e => console.log(e))

    return { recipe }
  }
}
</script>