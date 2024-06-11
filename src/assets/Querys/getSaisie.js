import { gql } from "@apollo/client";

export const GETSAISIEDAY = gql`
  query getSaisieDay($periode: String!) {
    getSaisieDay(filter: { periode: $periode }) {
      periode
    }
  }
`;

export const GETALLSAISIEUSER = gql`
  query getAllSaisie($id_utilisateur: Int) {
    getAllSaisie(filter: { id_utilisateur: $id_utilisateur }) {
      id_reservation
      id_utilisateur
      periode
      id_salle
      statut
    }
  }
`;
