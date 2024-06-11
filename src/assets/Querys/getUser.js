import { gql } from "@apollo/client";

export const GETONEUSER = gql`
  query getUserByID($identifiant: String!, $mdp: String!) {
    utilisateur(filter: { identifiant: $identifiant, mdp: $mdp }) {
      id_utilisateur
      mdp
      identifiant
      adresse
      siret
      email
      num_tel
      nom
      prenom
      droit
      ligue
      nb_reservation_gratuite
      amphi
      statut
    }
  }
`;
export const GETALLUSER = gql`
  query getAllUsers {
    getAllUsers {
      id_utilisateur
      mdp
      identifiant
      adresse
      siret
      email
      num_tel
      nom
      prenom
      droit
      ligue
      nb_reservation_gratuite
      amphi
      statut
    }
  }
`;
