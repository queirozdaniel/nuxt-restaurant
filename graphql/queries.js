import gql from "graphql-tag";

export const categoriesGql = gql`
  query {
    categories {
      data {
        id
        attributes {
          name
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
