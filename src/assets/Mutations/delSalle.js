import { gql } from "@apollo/client";

export const DELSALLE = gql`
  mutation delSalle($id_salle: Int) {
    delSalle(id_salle: $id_salle) {
      id_salle
    }
  }
`;
