# OvaCare — Privacy Information

## 1. Purpose

OvaCare is a health education prototype that provides general information about PCOS and related symptoms.

This document explains the intended privacy practices for the project. The final version must reflect the application's actual implementation.

## 2. Personal and Health Information

Health information can be sensitive.

Please do not enter your name, phone number, home address, medical records, or other identifying details into OvaCare unless the application clearly explains why the information is needed and how it will be handled.

Use fictional information when testing the application.

## 3. Symptom Diary

OvaCare may include an optional symptom diary.

If this feature is implemented, the application should explain:
- What information is collected.
- Why the information is collected.
- Where the information is stored.
- Who can access it.
- How long it is retained.
- How users can request deletion.

The diary should be optional. Users should be able to access the app's main educational features without being required to save diary entries.

Do not claim that diary entries are anonymous unless the implementation has been reviewed to support that claim.

## 4. Data Storage and Retention

The project team intends to limit the collection and retention of user data.

If the team implements a 30-day retention period, it must also implement and verify the deletion process. Data may remain in logs, backups, or other systems unless these are addressed separately.

Until the storage and deletion behaviour has been verified, the application must not promise that all data is automatically deleted after 30 days.

## 5. AI Processing

When a user submits a message, it may be processed by an external AI service to generate a response.

Before launch, the team should review the provider's current privacy and data-use terms, disclose relevant processing to users, and avoid sending unnecessary identifying or sensitive information.

Use fictional test messages during development and demonstrations.

## 6. Security

The project team should:
- Keep API keys and secrets out of source code and public repositories.
- Store secrets in appropriate environment variables.
- Restrict database access to authorised services and team members.
- Avoid logging sensitive health information unnecessarily.
- Review database permissions before deployment.

## 7. User Choice and Deletion

Users should be informed about optional data storage before it is enabled.

If symptom diary storage is implemented, provide a clear way to delete entries and explain any limitations.

Do not state that users can delete their information unless the feature actually works.

## 8. Contact

For privacy questions, users can contact the OvaCare project team through the contact details provided in the application.

## Important Note

This document describes intended privacy practices for a hackathon prototype. It is not a guarantee that every listed safeguard has already been implemented.

The final privacy notice must be reviewed and updated to match the deployed application's actual data collection, AI processing, storage, access, and deletion behaviour.

