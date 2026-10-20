import { Type, type Static } from "@sinclair/typebox";
import { Nullable } from "../../services/syncService";

/**
 * Raw document returned by the dataspace "patrinote/up" API.
 * Only the fields Patrinotes reads are typed; the API returns many more.
 */
export type RawUpDocument = {
  _id: string;
  UPA_IDENTIFIANT?: string;
  UPA_INTITULE_COMPLET?: string;
  EPA_INTITULE?: string;
  UPI_REFERENCE_MERIMEE?: string;
  UPI_LIEU_DIT?: string;
  NIVEAU?: string;
  TYPEPROTECTION?: string;
  TYPEIMMEUBLE?: string;
  CATEGORIEARCHITECTURALE?: string;
  autreAppellations?: string[];
  adresses?: RawUpAdresse[];
  coord?: { latitude: number; longitude: number }[];
  enfants?: RawUpEnfant[];
  DATE_CREATION?: string;
  DATE_MODIFICATION?: string;
  [key: string]: unknown;
};

export type RawUpAdresse = {
  rue?: string;
  numero?: string;
  commune?: string;
  commune_code_insee?: string;
  departement?: string;
  departement_code?: string;
  [key: string]: unknown;
};

export type RawUpEnfant = {
  epa_id: string;
  appellation?: string;
  protection?: string;
  type?: string;
};

export const upAdresseTSchema = Type.Object({
  rue: Nullable(Type.String()),
  commune: Nullable(Type.String()),
  communeCodeInsee: Nullable(Type.String()),
  departementCode: Nullable(Type.String()),
});

/** Normalized unité patrimoniale, as served to the frontend. */
export const upTSchema = Type.Object({
  id: Type.String(),
  identifiant: Nullable(Type.String()),
  intitule: Type.String(),
  intituleComplet: Nullable(Type.String()),
  referenceMerimee: Nullable(Type.String()),
  niveau: Nullable(Type.String()),
  protection: Nullable(Type.String()),
  typeImmeuble: Nullable(Type.String()),
  autresAppellations: Type.Array(Type.String()),
  adresse: Nullable(upAdresseTSchema),
  coordonnees: Nullable(Type.Object({ latitude: Type.Number(), longitude: Type.Number() })),
  enfantsIds: Type.Array(Type.String()),
  /** false when the API had no document for this id and it was built from the parent's "enfants" summary */
  complete: Type.Boolean(),
});

export type UnitePatrimoniale = Static<typeof upTSchema>;

/**
 * Whole hierarchy of a monument, flattened: every UP once, linked through `enfantsIds`
 * (sorted by name). The root is the monument itself.
 */
export const upTreeTSchema = Type.Object({
  rootId: Type.String(),
  ups: Type.Array(upTSchema),
});

export type UpTree = Static<typeof upTreeTSchema>;
