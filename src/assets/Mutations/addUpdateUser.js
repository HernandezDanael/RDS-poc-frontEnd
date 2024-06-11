import { gql } from "@apollo/client";

export const ADDUPDATEUSER = gql`
  mutation addUpdateUtilisateur(
    $id_utilisateur: Int
    $mdp: String
    $adresse: String
    $siret: String
    $email: String
    $num_tel: Int
    $nom: String
    $prenom: String
    $droit: String
    $ligue: Int
    $nb_reservation_gratuite: Int
    $amphi: Int
    $statut: String
    $identifiant: String
  ) {
    addUpdateUtilisateur(
      filter: {
        id_utilisateur: $id_utilisateur
        mdp: $mdp
        adresse: $adresse
        siret: $siret
        email: $email
        num_tel: $num_tel
        nom: $nom
        prenom: $prenom
        droit: $droit
        ligue: $ligue
        nb_reservation_gratuite: $nb_reservation_gratuite
        amphi: $amphi
        statut: $statut
        identifiant: $identifiant
      }
    ) {
      id_utilisateur
      mdp
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
      identifiant
    }
  }
`;
