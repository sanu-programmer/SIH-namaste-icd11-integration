# SIH-namaste-icd11-integration
<--Develop API code to integrate NAMASTE and or the International Classification of Diseases (ICD-11) via the Traditional Medicine Module 2 (TM2) into existing EMR systems that comply with Electronic Health Record (EHR) Standards for India. -->

Background

India’s Ayush sector is rapidly transitioning from paper-based records to interoperable digital health systems. Central to this transformation are two key coding systems: the National AYUSH Morbidity & Standardized Terminologies Electronic (NAMASTE) codes, which provide over 4,500 standardized terms for Ayurveda, Siddha and Unani disorders, WHO Standardised International Terminologies for Ayurveda and the WHO’s ICD-11, Chapter – 26, Traditional Medicine Module 2 (TM2), which integrates 529 disorder categories and 196 pattern codes into the global ICD framework. Harmonising these vocabularies within Electronic Medical Record (EMR) platforms not only enables accurate clinical documentation and decision support but also ensures compliance with India’s 2016 EHR Standards—mandating FHIR R4 APIs, SNOMED CT and LOINC semantics, ISO 22600 access control, ABHA-linked OAuth 2.0 authentication, and robust audit trails for consent and versioning.

To operationalize this dual-coding approach, EMR vendors must implement a lightweight terminology micro-service that ingests NAMASTE CSV and synchronises with the WHO-11 ICD-API (Including Biomedicine and TM2). Within the EMR user interface, diagnosis entries should support auto-complete widgets that return both NAMASTE and ICD-11 (TM2 and Biomedicine) codes, comply with the Coding rules of ICD-11 framework and store them together in the patient’s Problem List resource. This integration empowers clinicians to combine traditional and biomedical insights, facilitates Ayush insurance claims under global ICD-11 coding rules, and provides the Ministry of Ayush with real-time morbidity analytics aligned with national and international reporting standards.

Description

Design and prototype an API integration that brings India’s NAMASTE terminologies, WHO Standardised International terminology and the WHO ICD-11 (Traditional Medicine Module 2 (TM2) & Biomedicine) into a FHIR-compliant Electronic Medical Record (EMR) system. Your goal is to enable clinicians to record traditional medicine diagnoses (Ayurveda, Siddha, Unani) using NAMASTE codes, then automatically map them to global ICD-11 (TM2 and Biomedicine) identifiers—supporting dual/double-coding (One code denoting Ayurveda/Siddha/Unani (TM) and another denoting Biomedicine) for interoperability, analytics and insurance claims.

Your deliverable is a lightweight micro-service or FHIR terminology plugin offering:
• A FHIR compliant resource for NAMASTE codes linking to WHO International Terminologies of Ayurveda, ICD-11 (TM2 and Biomedicine) and compliant with ICD-11 Coding rules.
• A REST endpoint for auto-complete value-set lookup.
• A translation operation converting NAMASTE ↔ TM2 codes.
• An encounter upload endpoint that ingests FHIR Bundles with both code systems.
• OAuth 2.0–secured access using ABHA tokens and audit-ready metadata.

Teams should demonstrate

1. Ingesting the NAMASTE CSV export and generating FHIR CodeSystem + ConceptMap.
2. Fetching TM2, Biomedicine updates from the WHO ICD-API and merging into your service.
3. A simple web or CLI interface to search NAMASTE terms, WHO International Terminologies of Ayurveda, see mapped TM2 codes, and construct a FHIR ProblemList entry.
4. Version tracking and consent metadata to satisfy India’s 2016 EHR Standards (FHIR R4, ISO 22600, SNOMED-CT/LOINC semantics).

Expected Solution

A lightweight, FHIR R4–compliant terminology micro-service—built to India’s 2016 EHR Standards—that exposes a NAMASTE CodeSystem, WHO International Terminologies of Ayurveda, an ICD-11 TM2, Biomedicine ConceptMap, an auto-complete value-set lookup endpoint, a NAMASTE↔TM2 translate operation; ICD-11 Biomedicine look up and a secure FHIR Bundle upload interface (for enabling double coding).