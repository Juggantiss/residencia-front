import { gql } from "@apollo/client";

export const GET_ME_DATA = gql`
  {
    me {
      id
      username
      email
      confirmed
      blocked
      role {
        id
        name
      }
    }
  }
`;

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
                observations
                schoolProcedence
                address {
                  data {
                    id
                    attributes {
                      street
                      number
                      municipality
                      zipCode
                      suburb
                    }
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
                      certificate {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                      curp {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                      pago {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                      birthCertificate {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                      ficha {
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
    generals {
      data {
        id
        attributes {
          cicloEscolar
          numeroFicha
          aula
          diaExamen
          horaExamen
        }
      }
    }
  }
`;

export const GET_STATS_ASPIRANTS = gql`
  query StatsAspirants {
    aspirants: aspirants {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsEnviado: aspirants(filters: { statusRequest: { eq: "enviado" } }) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsAprobado: aspirants(
      filters: { statusRequest: { eq: "aprobado" } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsHombres: aspirants(
      filters: { user: { gender: { eq: "Hombre" } } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsMujeres: aspirants(
      filters: { user: { gender: { eq: "Mujer" } } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsRegistrado: aspirants(
      filters: { statusRequest: { eq: "registrado" } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsFormularios: aspirants(
      filters: { statusRequest: { eq: "formularios" } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsGenerales: aspirants(
      filters: { statusRequest: { eq: "generales" } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsDocumentos: aspirants(
      filters: { statusRequest: { eq: "documentos" } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsObservaciones: aspirants(
      filters: { statusRequest: { eq: "observaciones" } }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsAdministracion: aspirants(
      filters: {
        specialtyOption: {
          specialty: { description: { eq: "Administracion" } }
        }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsConstruccion: aspirants(
      filters: {
        specialtyOption: { specialty: { description: { eq: "Construccion" } } }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsOfimatica: aspirants(
      filters: {
        specialtyOption: { specialty: { description: { eq: "Ofimatica" } } }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsEnfermeria: aspirants(
      filters: {
        specialtyOption: { specialty: { description: { eq: "Enfermeria" } } }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    aspirantsProgramacion: aspirants(
      filters: {
        specialtyOption: { specialty: { description: { eq: "Programacion" } } }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`;
