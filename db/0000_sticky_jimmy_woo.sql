CREATE TABLE "clause_v2" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"position" integer,
	"udap_id" text,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delegation" (
	"id" text PRIMARY KEY NOT NULL,
	"createdBy" text NOT NULL,
	"delegatedTo" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internal_user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"password" text NOT NULL,
	"temporaryLink" text,
	"temporaryLinkExpiresAt" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merimee" (
	"rowid" integer,
	"ACMH" text,
	"ACTU" text,
	"ACURL" text,
	"ADRS" text,
	"AFFE" text,
	"AIRE" text,
	"APPL" text,
	"APRO" text,
	"ARCHEO" text,
	"AUTP" text,
	"AUTR" text,
	"BASE" text,
	"CADA" text,
	"CANT" text,
	"COLL" text,
	"COM" text,
	"CONTACT" text,
	"CONTIENT_IMAGE" text,
	"COOR" text,
	"COORM" text,
	"COPY" text,
	"COUV" text,
	"DATE" text,
	"DBOR" text,
	"DENO" text,
	"DENQ" text,
	"DEPL" text,
	"DESC" text,
	"DIMS" text,
	"DLAB" text,
	"DMAJ(DATE)" text,
	"DMIS(DATE)" text,
	"DOMN" text,
	"DOSADRS" text,
	"DOSS" text,
	"DOSURL" text,
	"DOSURLPDF" text,
	"DPRO" text,
	"DPT" text,
	"DPT_LETTRE" text,
	"EDIF" text,
	"ELEV" text,
	"ENER" text,
	"ESCA" text,
	"ETAG" text,
	"ETAT" text,
	"ETUD" text,
	"GENR" text,
	"HIST" text,
	"HYDR" text,
	"IDAGR" text,
	"IMAGE" text,
	"IMG" text,
	"IMPL" text,
	"INSEE" text,
	"INTE" text,
	"JATT" text,
	"JDAT" text,
	"LIENS" text,
	"LIEU" text,
	"LINHA" text,
	"LMDP" text,
	"LOCA" text,
	"LREG" text,
	"MFICH" text,
	"MHPP" text,
	"MICR" text,
	"MOSA" text,
	"MURS" text,
	"NBOR" text,
	"NOMS" text,
	"OBS" text,
	"PAFF" text,
	"PARN" text,
	"PART" text,
	"PDEN" text,
	"PERS" text,
	"PINT" text,
	"PLAN" text,
	"PLOC" text,
	"POP_ARRETE_PROTECTION" text,
	"POP_CONTIENT_GEOLOCALISATION" text,
	"POP_COORDINATES_POINT" text,
	"POP_COORDINATES_POLYGON" text,
	"POP_COORDONNEES" text,
	"POP_DATE" text,
	"POP_DOSSIER_PROTECTION" text,
	"POP_DOSSIER_VERT" text,
	"POP_FLAGS" text,
	"POP_HAS_LOCATION" text,
	"POP_IMPORT" text,
	"PPRO" text,
	"PREP" text,
	"PRODUCTEUR" text,
	"PROT" text,
	"PSTA" text,
	"REF" text PRIMARY KEY NOT NULL,
	"REFE" text,
	"REFIM" text,
	"REFJOC" text,
	"REFM" text,
	"REFMUS" text,
	"REFO" text,
	"REFP" text,
	"REG" text,
	"REMA" text,
	"REMP" text,
	"RENV" text,
	"REPR" text,
	"RFPA" text,
	"SCLD" text,
	"SCLE" text,
	"SCLX" text,
	"SITE" text,
	"STAT" text,
	"TECH" text,
	"THEM" text,
	"TICO" text,
	"TOIT" text,
	"TOUT" text,
	"TYPO" text,
	"VERT" text,
	"VIDEO" text,
	"VISI" text,
	"VOCA" text,
	"VOUT" text,
	"WADRS" text,
	"WCOM" text,
	"WEB" text,
	"WRENV" text,
	"ZONE" text
);
--> statement-breakpoint
CREATE TABLE "merimee_to_memoire" (
	"rowid" integer,
	"COPY" text,
	"NAME" text,
	"REF_MEMOIRE" text NOT NULL,
	"REF_MERIMEE" text NOT NULL,
	"URL" text,
	CONSTRAINT "merimee_to_memoire_pkey" PRIMARY KEY("REF_MEMOIRE","REF_MERIMEE")
);
--> statement-breakpoint
CREATE TABLE "pdf_snapshot" (
	"id" text PRIMARY KEY NOT NULL,
	"report_id" text,
	"html" text,
	"report" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "picture_lines" (
	"id" text PRIMARY KEY NOT NULL,
	"pictureId" text,
	"lines" text NOT NULL,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "pictures" (
	"id" text PRIMARY KEY NOT NULL,
	"reportId" text,
	"url" text,
	"createdAt" timestamp,
	"finalUrl" text
);
--> statement-breakpoint
CREATE TABLE "pop_immeubles" (
	"reference" text PRIMARY KEY NOT NULL,
	"destination_actuelle_de_l_edifice" text,
	"adresse_forme_index" text,
	"etablissement_affectataire_de_l_edifice" text,
	"autre_appellation_de_l_edifice" text,
	"nature_de_la_protection" text,
	"auteur_de_l_edifice" text,
	"cadastre" text,
	"commune_forme_index" text,
	"copyright" text,
	"type_de_couverture" text,
	"datation_de_l_edifice" text,
	"denomination_de_l_edifice" text,
	"lieu_de_conservation_d_un_element_architectural_deplace" text,
	"description_de_l_edifice" text,
	"dimensions_normalisees_des_edicules_uniquement" text,
	"date_de_label" text,
	"date_de_la_derniere_mise_a_jour" text,
	"date_de_creation_de_la_notice" text,
	"domaine" text,
	"typologie_du_dossier" text,
	"date_et_typologie_de_la_protection" text,
	"departement_format_numerique" text,
	"partie_d_elevation_exterieure" text,
	"source_de_l_energie_utilisee_par_l_edifice" text,
	"emplacement__forme_et_structure_de_l_escalier" text,
	"description_de_l_elevation_interieure" text,
	"etat_de_conservation" text,
	"cadre_de_l_etude" text,
	"genre_du_destinataire" text,
	"historique" text,
	"nom_du_cours_d_eau_traversant_ou_bordant_l_edifice" text,
	"identifiant_agregee" text,
	"cog_insee_lors_de_la_protection" text,
	"justification_attribution" text,
	"justification_de_la_datation" text,
	"liens_externes" text,
	"lieudit" text,
	"lien_vers_la_base_archiv_mh" text,
	"materiaux_du_gros_oeuvre" text,
	"observations" text,
	"precision_affectataire" text,
	"partie_constituante_non_etudiee" text,
	"partie_constituante" text,
	"precision_sur_la_denomination" text,
	"personnes_liees_a_l_edifice" text,
	"typologie_de_plan" text,
	"precision_de_la_localisation" text,
	"precision_de_la_protection" text,
	"description_de_l_iconographie" text,
	"typologie_de_la_protection" text,
	"precision_sur_le_statut_de_l_edifice" text,
	"reference_a_un_ensemble" text,
	"lien_vers_la_base_joconde" text,
	"lien_vers_la_base_palissy" text,
	"references_des_parties_constituantes_etudiees" text,
	"région" text,
	"département" text,
	"elements_remarquables_dans_l_edifice" text,
	"remploi" text,
	"renvoi_vers_une_notice_de_la_base_merimee_ou_palissy" text,
	"indexation_iconographique_normalisee" text,
	"siecle_de_campagne_secondaire_de_construction" text,
	"siecle_de_la_campagne_principale_de_construction" text,
	"format_abrege_du_siecle_de_construction" text,
	"typologie_de_la_zone_de_protection" text,
	"statut_juridique_de_l_edifice" text,
	"technique_du_decor_porte_de_l_edifice" text,
	"titre_editorial_de_la_notice" text,
	"materiaux_de_la_couverture" text,
	"couverts_ou_decouverts_du_jardin_de_l_edifice" text,
	"vocable___pour_les_edifices_cultuels" text,
	"typologie_du_couvrement" text,
	"adresse_forme_editoriale" text,
	"commune_forme_editoriale" text,
	"coordonnees_au_format_wgs84" text,
	"id" text
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"projectDescription" text,
	"redactedBy" text,
	"meetDate" timestamp,
	"applicantName" text,
	"applicantAddress" text,
	"projectCadastralRef" text,
	"projectSpaceType" text,
	"decision" text,
	"precisions" text,
	"contacts" text,
	"furtherInformation" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"serviceInstructeur" text,
	"pdf" text,
	"disabled" boolean,
	"udap_id" text,
	"redactedById" text,
	"applicantEmail" text,
	"city" text,
	"zipCode" text
);
--> statement-breakpoint
CREATE TABLE "sent_email" (
	"id" text PRIMARY KEY NOT NULL,
	"report_id" text,
	"sent_to" text NOT NULL,
	"sent_at" timestamp NOT NULL,
	"udap_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_instructeurs" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"short_name" text NOT NULL,
	"email" text,
	"tel" text,
	"udap_id" text
);
--> statement-breakpoint
CREATE TABLE "state_report" (
	"id" text PRIMARY KEY NOT NULL,
	"nature_edifice" text,
	"redacted_by_name" text,
	"redacted_by_id" text,
	"reference_pop" text,
	"adresse" text,
	"commune" text,
	"code_postal" text,
	"commune_historique" text,
	"reference_cadastrale" text,
	"periode_construction" text,
	"nature_protection" text,
	"parties_protegees" text,
	"description" text,
	"observations" text,
	"udap_id" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"disabled" boolean
);
--> statement-breakpoint
CREATE TABLE "suggested_email" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"udap_id" text NOT NULL,
	CONSTRAINT "suggested_email_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tmp_pictures" (
	"id" text PRIMARY KEY NOT NULL,
	"reportId" text,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"op_id" integer NOT NULL,
	"tx_id" integer,
	"entity_id" text NOT NULL,
	"type" text NOT NULL,
	"op" text NOT NULL,
	"data" text,
	"user_id" text NOT NULL,
	"created_at" timestamp,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "udap" (
	"id" text PRIMARY KEY NOT NULL,
	"department" text NOT NULL,
	"completeCoords" text,
	"visible" boolean,
	"name" text,
	"address" text,
	"zipCode" text,
	"city" text,
	"phone" text,
	"email" text,
	"marianne_text" text,
	"drac_text" text,
	"udap_text" text,
	"dept_number" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"udap_id" text NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "user_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_dept" (
	"user_id" text NOT NULL,
	"dept_number" text NOT NULL,
	CONSTRAINT "user_dept_pkey" PRIMARY KEY("user_id","dept_number")
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"default_emails" text,
	"udap_id" text
);
--> statement-breakpoint
CREATE TABLE "whitelist" (
	"email" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "delegation" ADD CONSTRAINT "delegation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delegation" ADD CONSTRAINT "delegation_delegatedTo_fkey" FOREIGN KEY ("delegatedTo") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internal_user" ADD CONSTRAINT "internal_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sent_email" ADD CONSTRAINT "sent_email_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "public"."report"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "state_report" ADD CONSTRAINT "state_report_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tmp_pictures" ADD CONSTRAINT "tmp_pictures_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_udap_id_fkey" FOREIGN KEY ("udap_id") REFERENCES "public"."udap"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dept" ADD CONSTRAINT "user_dept_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "merimee_dpt" ON "merimee" USING btree ("DPT" text_ops);--> statement-breakpoint
CREATE INDEX "merimee_insee" ON "merimee" USING btree ("INSEE" text_ops);--> statement-breakpoint
CREATE INDEX "merimee_producteur" ON "merimee" USING btree ("PRODUCTEUR" text_ops);--> statement-breakpoint
CREATE INDEX "merimee_to_memoire_ref_merimee" ON "merimee_to_memoire" USING btree ("REF_MERIMEE" text_ops);--> statement-breakpoint
CREATE INDEX "pop_immeubles_departement" ON "pop_immeubles" USING btree ("departement_format_numerique" text_ops);