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
                address {
                  data {
                    id
                  }
                }
                specialtyOption {
                  data {
                    id
                    attributes {
                      specialty {
                        data {
                          id
                          attributes {
                            description
                          }
                        }
                      }
                    }
                  }
                }
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

export const GET_SPECIALTIES = gql`
  {
    specialties {
      data {
        value: id
        attributes {
          label: description
        }
      }
    }
  }
`;

export const GET_LIST_ASPIRANTS = gql`
  {
    aspirants {
      data {
        id
        attributes {
          user {
            data {
              id
              attributes {
                name
                firstLastName
                secondLastName
                gender
                birthday
              }
            }
          }
          status: statusRequest
          specialtyOption {
            data {
              id
              attributes {
                specialty {
                  data {
                    id
                    attributes {
                      description
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
