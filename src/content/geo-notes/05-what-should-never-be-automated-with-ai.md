---
status: draft
slug: what-should-never-be-automated-with-ai
category: Using AI at work
title: "What Should Never Be Automated With AI?"
seoTitle: "What Should Never Be Automated With AI?"
description: "Keep people in control of high-impact decisions, irreversible actions, restricted information, and work that cannot be verified, contested, or safely recovered."
author: Keith Staggers
authorUrl: https://www.keithstaggers.com/about/
datePublished: 2026-08-20
dateModified: 2026-08-20
lastReviewed: 2026-08-20
readingTime: 9 min read
tags:
  - human oversight
  - responsible AI
  - AI automation
hub:
  topic: choose
  question: "What should never be automated with AI?"
---

# What Should Never Be Automated With AI?

**Never give AI unsupervised final authority over high-impact decisions, restricted-data access, or irreversible actions when a mistake could affect a person’s health, safety, rights, employment, money, or ability to appeal. AI may assist with a bounded step, but a qualified person must control the decision, verify the evidence, stop the process, explain the outcome, and provide a workable path for correction.**

The important boundary is not “AI or no AI.” It is the difference between AI helping a person prepare work and AI becoming the unaccountable final decision-maker.

The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) treats trustworthy AI as a lifecycle responsibility involving validity, safety, security, transparency, privacy, and fairness. It also asks organizations to make explicit go/no-go decisions instead of assuming that AI is appropriate for every business problem.

## Do not automate the final high-impact decision

Do not let a general-purpose AI system independently make the final decision to:

- diagnose, treat, triage, or deny care;
- hire, fire, promote, discipline, schedule, or set compensation;
- approve or deny credit, housing, insurance, benefits, or other essential services;
- impose a legal, disciplinary, or safety consequence;
- authorize a large or unusual payment;
- grant access to protected systems or information; or
- publish a consequential claim in someone else’s name.

Those activities can involve different laws and professional requirements. The general operating rule is that a qualified person must review the relevant evidence, exercise the required authority, document the decision, and remain reachable for questions or appeal.

For employment, the U.S. Equal Employment Opportunity Commission states that federal employment-discrimination laws apply when software, algorithms, and AI are used in employment decisions. Its [Artificial Intelligence and the ADA resources](https://www.eeoc.gov/eeoc-disability-related-resources/artificial-intelligence-and-ada) address ways algorithmic tools can disadvantage applicants or employees with disabilities.

## Do not automate an irreversible outside action without a human gate

An outside action changes something beyond the draft: it sends, publishes, charges, deletes, signs, approves, denies, updates a system of record, or contacts another person.

Require a human approval gate before a consequential outside action. The gate should state:

1. who reviews;
2. which evidence they examine;
3. what counts as accept, revise, reject, or escalate;
4. what the tool is permitted to do after approval; and
5. where the approval and final result are recorded.

For low-risk, reversible actions, a team may decide that sampling and monitoring are enough. That decision should be explicit and based on actual impact, not convenience.

## Do not automate work that cannot be independently checked

AI can produce a fluent answer even when the source is missing, ambiguous, or wrong. If no qualified person can verify the important facts, the output should not control a decision or outside action.

Verification needs a source of truth. Examples include an approved record, a current public authority, a calculation that can be reproduced, or a domain expert who can inspect the reasoning and evidence.

When the only check is “it sounds right,” keep the task manual or narrow it to a draft that cannot cause harm.

## Do not automate restricted information through an unapproved system

Do not connect an AI workflow to patient, employee, customer, legal, financial, security, or proprietary information unless the tool, account, integration, purpose, access, retention, and vendor relationship are authorized.

In healthcare, HHS states that a cloud service provider handling electronic PHI on behalf of a covered entity or business associate is itself a business associate, even when the information is encrypted and the provider lacks the key; the parties must have the required agreement and comply with the HIPAA Rules. See [HHS Guidance on HIPAA and Cloud Computing](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html).

Never test a privacy or security control with real restricted data. Use a synthetic marker that the process is expected to reject.

## Do not automate a process that has no owner or fallback

If nobody can answer “Who stops this?” and “How does the work continue safely?” the workflow is not ready.

The owner must be able to:

- approve the intended purpose;
- define allowed and prohibited inputs;
- review incidents and user reports;
- suspend the process;
- authorize changes;
- maintain the manual fallback; and
- decide whether the workflow may resume.

NIST’s [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) calls for clear roles, monitoring, appeal and override, decommissioning, incident response, recovery, and change management. Those are operating requirements, not paperwork added after launch.

## Do not automate unstable exceptions just because normal cases work

AI is often most useful on common, patterned work. Novel crises, conflicting goals, emotionally charged conversations, rare events, and situations requiring consent or professional judgment may not behave like the examples used to build the workflow.

Route exceptions to a person. Do not hide uncertainty behind a confidence score that the operator does not understand.

## Use five questions to find the boundary

### 1. Consequence

What is the most serious plausible harm if the result is wrong or late? Higher consequence requires stronger evidence and human control.

### 2. Reversibility

Can the action be safely undone? A draft can be rejected. A disclosure, missed emergency, public accusation, or completed transaction may not be repairable.

### 3. Contestability

Can the affected person understand that a decision occurred, reach a responsible person, correct bad information, and appeal? If not, do not automate the final decision.

### 4. Observability

Will the team know that the workflow failed, drifted, or acted twice? Quiet failures require stronger preventive controls or a manual process.

### 5. Ownership

Which person has authority to accept the residual risk, stop the process, and answer for the outcome? If the answer is a vendor, model, committee, or “the team,” ownership is not clear enough.

## A practical green, yellow, red model

| Zone | Example | Boundary |
|---|---|---|
| Green | Reformat an approved public paragraph into a draft checklist | Human checks before use; no private data or outside action |
| Green | Draft agenda options from synthetic or public information | Person selects and edits the final agenda |
| Yellow | Summarize approved internal material | Authorized tool and data; qualified reviewer compares with source |
| Yellow | Draft a staffing or performance discussion aid | No final decision; verify inputs, bias risks, policy, and human authority |
| Yellow | Prepare a customer email | Person verifies facts and approves before sending |
| Red | Make the final employment, clinical, legal, financial, or safety determination | Keep accountable human decision authority and required professional review |
| Red | Send restricted information to an unapproved AI account | Do not proceed |
| Red | Take an irreversible outside action when failure cannot be detected or recovered | Redesign or keep manual |

The zone can change when the data, audience, tool, action, or consequence changes.

## A synthetic example

A small company wants AI to help process customer refund requests. A safer boundary is for AI to extract the order number and draft a summary from approved sample data while a trained employee verifies the record and makes the decision under the refund policy.

Allowing the model to decide, issue the payment, and send the message without review would combine a financial decision, an outside action, customer communication, and duplicate-payment risk. The tool may still help, but it should not own the final step.

## Limitations

This is a practical decision framework, not a universal list of prohibited technologies or legal advice. Specialized, regulated systems may be authorized for uses that would be inappropriate for a general-purpose AI tool, and different jurisdictions impose different duties.

Human review must be meaningful. A rushed click by someone who cannot see the source, reject the output, or change the outcome is not an effective approval gate.

## Primary sources

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [NIST AI RMF Playbook](https://airc.nist.gov/docs/AI_RMF_Playbook.pdf)
- [NIST Artificial Intelligence Risk Management Framework: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [EEOC Artificial Intelligence and the ADA](https://www.eeoc.gov/eeoc-disability-related-resources/artificial-intelligence-and-ada)
- [Joint U.S. agency statement on enforcement efforts against discrimination and bias in automated systems](https://www.ftc.gov/system/files/ftc_gov/pdf/EEOC-CRT-FTC-CFPB-AI-Joint-Statement%28final%29.pdf)
- [HHS Guidance on HIPAA and Cloud Computing](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html)

*Written by [Keith Staggers](https://www.keithstaggers.com/about/), AI trainer, workflow builder, nurse leader, and author. Last reviewed August 20, 2026.*

