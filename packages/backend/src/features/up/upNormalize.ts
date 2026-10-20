import type { RawUpDocument, RawUpEnfant, UnitePatrimoniale } from "./upTypes";

/**
 * Some API strings are double-escaped: they contain the literal text `\u00E8`, `\/` or `\"`
 * instead of the character itself (e.g. "Pavillon de Penthi\u00E8vre").
 */
export const decodeUpString = (value: string): string =>
  value
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/\\\//g, "/")
    .replace(/\\"/g, '"')
    .replace(/\u00A0/g, " ");

const clean = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const decoded = decodeUpString(value).replace(/\s+/g, " ").trim();
  return decoded.length ? decoded : null;
};

export const normalizeUp = (doc: RawUpDocument): UnitePatrimoniale => {
  const adresse = doc.adresses?.[0];
  const coord = doc.coord?.[0];

  return {
    id: String(doc._id),
    identifiant: clean(doc.UPA_IDENTIFIANT),
    intitule: clean(doc.EPA_INTITULE) ?? clean(doc.UPA_INTITULE_COMPLET) ?? String(doc._id),
    intituleComplet: clean(doc.UPA_INTITULE_COMPLET),
    referenceMerimee: clean(doc.UPI_REFERENCE_MERIMEE),
    niveau: clean(doc.NIVEAU),
    protection: clean(doc.TYPEPROTECTION),
    typeImmeuble: clean(doc.TYPEIMMEUBLE),
    autresAppellations: (doc.autreAppellations ?? []).map(clean).filter((v): v is string => !!v),
    adresse: adresse
      ? {
          rue: clean(adresse.rue),
          commune: clean(adresse.commune),
          communeCodeInsee: clean(adresse.commune_code_insee),
          departementCode: clean(adresse.departement_code),
        }
      : null,
    coordonnees:
      coord && typeof coord.latitude === "number" && typeof coord.longitude === "number"
        ? { latitude: coord.latitude, longitude: coord.longitude }
        : null,
    enfantsIds: (doc.enfants ?? []).map((e) => String(e.epa_id)),
    complete: true,
  };
};

/** Fallback when a child listed in "enfants" has no document of its own in the API response. */
export const upFromEnfantSummary = (enfant: RawUpEnfant, parent: UnitePatrimoniale): UnitePatrimoniale => {
  const intitule = clean(enfant.appellation) ?? String(enfant.epa_id);
  return {
    id: String(enfant.epa_id),
    identifiant: null,
    intitule,
    intituleComplet: parent.intituleComplet ? `${parent.intituleComplet} | ${intitule}` : null,
    referenceMerimee: null,
    niveau: null,
    protection: clean(enfant.protection),
    typeImmeuble: clean(enfant.type),
    autresAppellations: [],
    adresse: null,
    coordonnees: null,
    enfantsIds: [],
    complete: false,
  };
};
