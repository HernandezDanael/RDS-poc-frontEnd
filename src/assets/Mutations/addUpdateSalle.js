import { gql } from "@apollo/client";

export const ADDUPDATESALLE = gql`
  mutation addUpdateSalle(
    $id_salle: Int
    $description: String
    $statut: String
  ) {
    addUpdateSalle(
      filter: {
        id_salle: $id_salle
        description: $description
        statut: $statut
      }
    ) {
      id_salle
      description
      statut
    }
  }
`;
