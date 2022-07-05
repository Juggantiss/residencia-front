import { gql } from "@apollo/client";

export const GET_ASPIRANT_DATA = gql`
  query GET_ASPIRANT_DATA($ID: ID!) {
    usersPermissionsUser(id: $ID) {
      data {
        id
        attributes {
          username
          name
          firstLastName
          secondLastName
          email
          curp
          birthday
          phone
          gender
          aspirant {
            data {
              id
              attributes {
                statusRequest
                schoolProcedence
                document {
                  data {
                    id
                    attributes {
                      photo {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
