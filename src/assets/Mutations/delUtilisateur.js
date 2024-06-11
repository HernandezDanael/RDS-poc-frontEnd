import { gql } from "@apollo/client";

export const DELUTILISATEUR = gql`
  mutation delUser($id_utilisateur: Int) {
    delUtilisateur(id_utilisateur: $id_utilisateur) {
      id_utilisateur
    }
  }
`;
