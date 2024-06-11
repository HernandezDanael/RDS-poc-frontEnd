import { gql } from "@apollo/client";

export const GETALLSALLE = gql`
  query getAllSalle {
    getAllSalle {
      id_salle
      description
      statut
    }
  }
`;
