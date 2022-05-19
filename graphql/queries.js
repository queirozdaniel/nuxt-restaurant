import gql from "graphql-tag";

export const categoriesGql = gql`
  query {
    categories {
      data {
        id
        attributes {
          name
          slug
          recipes {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const categoryGql = gql`
  query ($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          icon
          description
        }
      }
    }
  }
`;
