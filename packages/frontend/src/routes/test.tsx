import { createFileRoute, redirect } from "@tanstack/react-router";
import { isDev } from "../envVars";
import { getStateReportHtmlString } from "@cr-vif/pdf/constat";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!isDev) throw redirect({ to: "/", search: { document: "constats" } });
  },
});

function RouteComponent() {
  const htmlString = getStateReportHtmlString(mockData);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
}

const mockData = {
  stateReport: {
    id: "752722d5-039c-491c-8c07-ef3c7d804c9a",
    "id:1": "752722d5-039c-491c-8c07-ef3c7d804c9a",
    nature_edifice: "église",
    reference_pop: "PA00083918",
    adresse: null,
    commune: "Aire-sur-l'Adour",
    code_postal: null,
    commune_historique: "Aire-sur-l'Adour",
    reference_cadastrale: null,
    periode_construction: "12e siècle;18e siècle",
    nature_protection: "classé MH",
    parties_protegees: "Eglise du Mas-d'Aire ou Sainte-Quitterie : classement par liste de 1840",
    description: null,
    observations: null,
    titre_edifice: "Eglise Sainte-Quitterie du Mas d'Aire",
    nature_visite: null,
    visite_partielle_details: null,
    date_visite: "2025-11-13 09:09:43.1",
    personnes_presentes: null,
    redacted_by: "Martin Ledoux",
    proprietaire: null,
    proprietaire_email: null,
    proprietaire_representant: null,
    proprietaire_representant_email: null,
    etat_general: null,
    proportion_dans_cet_etat: null,
    etat_commentaires: null,
    plan_situation: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-731b-708a-bc84-443ba6b465bd.jpg",
    plan_edifice: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-6a82-70aa-aca3-bfa9458e8a45.jpg",
    vue_generale: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-5fec-71c9-ad63-b2b8a26d9efe.jpg",
    preconisations: null,
    preconisations_commentaires: null,
    attachment_id: null,
    bilan_quinquennal: null,
    service_id: "udap-landes",
    created_by: "7d663e1b-a010-45ea-ba60-5534e532ae84",
    created_at: "2025-11-13 09:09:43.1",
    disabled: 0,
    createdByName: "Martin Ledoux",
    attachments: [
      {
        id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-5fec-71c9-ad63-b2b8a26d9efe.jpg",
        state_report_id: "752722d5-039c-491c-8c07-ef3c7d804c9a",
        attachment_id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-5fec-71c9-ad63-b2b8a26d9efe.jpg",
        is_deprecated: 0,
        label: null,
        service_id: "udap-landes",
        created_at: "2025-11-15 15:54:12.908",
        file: "blob:http://localhost:5173/05daad6b-805b-4a8b-8d51-d8bd2c0d2e9a",
      },
      {
        id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-6a82-70aa-aca3-bfa9458e8a45.jpg",
        state_report_id: "752722d5-039c-491c-8c07-ef3c7d804c9a",
        attachment_id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-6a82-70aa-aca3-bfa9458e8a45.jpg",
        is_deprecated: 0,
        label: null,
        service_id: "udap-landes",
        created_at: "2025-11-15 15:54:15.779",
        file: "blob:http://localhost:5173/f6776643-84ab-4909-8948-62c20e0b3ada",
      },
      {
        id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-731b-708a-bc84-443ba6b465bd.jpg",
        state_report_id: "752722d5-039c-491c-8c07-ef3c7d804c9a",
        attachment_id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8839-731b-708a-bc84-443ba6b465bd.jpg",
        is_deprecated: 0,
        label: null,
        service_id: "udap-landes",
        created_at: "2025-11-15 15:54:17.82",
        file: "blob:http://localhost:5173/42300b9e-7302-4a9e-84e6-61eab64a61fc",
      },
    ],
  },
  visitedSections: [
    {
      id: "c67ef4d1-07b2-4d20-be19-56b5d2e66308",
      state_report_id: "752722d5-039c-491c-8c07-ef3c7d804c9a",
      section: "Fondations, sols, sous-sols",
      etat_general: "",
      proportion_dans_cet_etat: "",
      commentaires: "",
      service_id: "udap-landes",
      attachments: [
        {
          id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8838-0d20-7303-ac91-94fcb00b5c65.jpg",
          visited_section_id: "c67ef4d1-07b2-4d20-be19-56b5d2e66308",
          attachment_id: "752722d5-039c-491c-8c07-ef3c7d804c9a/images/019a8838-0d20-7303-ac91-94fcb00b5c65.jpg",
          is_deprecated: 0,
          label: null,
          created_at: "2025-11-15 15:52:46.274",
          service_id: "udap-landes",
          file: "blob:http://localhost:5173/3f3d666d-341d-456a-a761-bea1694a6a72",
        },
      ],
    },
  ],
};
