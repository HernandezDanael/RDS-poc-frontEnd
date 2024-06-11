import { gql } from "@apollo/client";

export const ADDUPDATESAISIE = gql`
  mutation addUpdateSaisie(
    $id_reservation: Int
    $id_utilisateur: Int
    $periode: String
    $id_salle: Int
    $statut: String
  ) {
    addUpdateSaisie(
      filter: {
        id_reservation: $id_reservation
        id_utilisateur: $id_utilisateur
        periode: $periode
        id_salle: $id_salle
        statut: $statut
      }
    ) {
      id_reservation
      id_utilisateur
      periode
      id_salle
      statut
    }
  }
`;

export const SUPPSAISE = gql`
  mutation suppSaise($id_reservation: Int) {
    suppSaise(id_reservation: $id_reservation) {
      id_reservation
    }
  }
`;
