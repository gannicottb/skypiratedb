import { faArchive, faBolt, faBullseye, faChessRook, faDatabase, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

const TypeMap = {
  "Captain": faUser,
  "Structure": faChessRook,
  "Cannon": faBullseye,
  "Asset": faArchive,
  "Crew": faUsers,
  "Maneuver": faBolt,
  "Special Ammo": faDatabase
}

export const TypeIcon = ({ type }) => (
  <FontAwesomeIcon icon={TypeMap[type]} />
)