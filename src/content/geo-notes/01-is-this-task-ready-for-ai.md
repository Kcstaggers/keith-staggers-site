---
status: draft
slug: is-this-task-ready-for-ai
category: Using AI at work
title: "Is This Task Ready for AI? Use This 7-Question Assessment"
seoTitle: "Is This Task Ready for AI? A 7-Question Assessment"
description: "Use seven practical questions to decide whether a work task is ready for a small, supervised AI pilot or should stay manual."
author: Keith Staggers
authorUrl: https://www.keithstaggers.com/about/
datePublished: 2026-08-20
dateModified: 2026-08-20
lastReviewed: 2026-08-20
readingTime: 8 min read
tags:
  - AI workflow assessment
  - AI readiness
  - responsible AI
hub:
  topic: choose
  question: "Is this task ready for AI?"
relatedTool: /workflow-readiness/
---

# Is This Task Ready for AI? Use This 7-Question Assessment

**A task is ready for an AI pilot when the result is clear, the inputs are permitted, a person can verify the output, and the team can stop and finish safely without the tool. If the data permission, human owner, failure boundary, or fallback is unclear, the task is not ready yet.**

AI readiness is not a judgment about whether a tool can produce something impressive in a demonstration. It is a judgment about whether a real person can use the process repeatedly, recognize a bad result, and remain responsible for what happens next.

The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) organizes AI risk work around four continuing functions: Govern, Map, Measure, and Manage. For a small team, the seven questions below turn that lifecycle thinking into a practical first conversation.

## The seven-question AI task assessment

Give one point for each clear **yes**. A “yes, probably” is a no until the missing fact is resolved.

### 1. Is the outcome specific and repeatable?

Name the finished result without naming the AI tool.

Good examples include “produce a first draft of the weekly public newsletter from approved source notes” or “classify incoming requests into five existing categories for a person to review.” “Help with marketing” and “make us more efficient” are not defined outcomes.

A task does not have to happen every day, but another person should be able to recognize when it begins and what complete looks like.

### 2. Are the inputs permitted and no more sensitive than necessary?

Write down every input the process will receive: text, documents, recordings, images, account data, or links. Confirm that the organization permits those inputs to enter that specific tool and account.

Do not treat removing a name as automatic permission. Context, dates, unusual events, job details, and combinations of facts can still identify a person. When permission is uncertain, stop and ask the privacy, security, compliance, or data owner responsible for the information.

### 3. Can a person verify the result?

The reviewer needs an available source of truth and enough knowledge to use it. A draft summary is checkable when the reviewer can compare it with the approved source. A confident prediction about an unfamiliar situation may not be.

Write the check as an action: “compare every owner and due date with the approved meeting record,” not “make sure it looks right.” If nobody can verify the important facts, AI is creating a new risk rather than reducing work.

### 4. Is a mistake visible, limited, and reversible?

Ask what happens when the output is wrong. A formatting error in an internal draft is usually easier to contain than an incorrect message sent to a customer, a changed account record, or a recommendation that affects a person’s employment or care.

Start with work where the AI output remains a draft, outside actions are turned off, and a person can reject the result before anything changes. The [NIST AI RMF Playbook](https://airc.nist.gov/docs/AI_RMF_Playbook.pdf) recommends formally weighing an AI system’s risks against its benefits and making an explicit go/no-go decision.

### 5. Is one human owner named?

“The team will check it” is not ownership. Name the role that reviews the output, approves or rejects it, handles exceptions, and decides when the process may resume after a problem.

The owner does not need to build the workflow. The owner does need the authority, time, information, and training to stop it.

### 6. Are the stop rule and manual fallback written?

List visible events that mean the AI-assisted path must stop: a missing source, restricted input, conflicting instruction, unavailable reviewer, failed connection, uncertain outside action, or result outside an agreed limit.

Then write the shortest safe manual path. The operator should know where the source lives, which ordinary tool to use, how to avoid a duplicate action, what to record, and who authorizes a return to normal operation. NIST’s contingency-planning guidance recognizes alternate manual processing as one way to support short-term operational continuity. See [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final).

### 7. Can you measure benefit against the current method?

Record the baseline before the pilot: time per completed item, volume, error or rework rate, cost, and any quality measure that matters. Then include human review, correction, training, maintenance, and tool cost in the AI-assisted measurement.

“The draft appeared faster” is not enough. The full process may be slower if the reviewer spends extra time finding invented facts or repairing formatting.

## How to interpret the score

- **6–7 yes answers:** Consider a small, reversible pilot with sample or approved information.
- **4–5 yes answers:** Redesign the task before adding AI. The missing pieces are part of the work.
- **0–3 yes answers:** Keep the task manual or choose a narrower use case.

Four conditions override the score. Do not pilot when input permission is unknown, no qualified human can verify the output, no one owns the process, or there is no safe way to stop and finish the essential work.

This is a triage tool, not a validated risk-scoring instrument. A high score does not replace an organization’s legal, privacy, security, clinical, procurement, or governance review.

## A synthetic example

Imagine a three-person consulting firm wants AI to draft a weekly project-status email from approved, nonconfidential task notes.

- The finished email and audience are defined.
- Only approved task notes are allowed.
- The project owner can compare every claim, owner, and date with the source.
- The draft cannot send itself.
- One person is responsible for approval.
- A missing note or uncertain status stops the process, and the ordinary email template remains available.
- The team already knows the average time and correction rate for the manual method.

That task is reasonable for a controlled pilot. If the same workflow were allowed to pull unrestricted customer files and send messages automatically, several answers would change.

## A one-page readiness record

Before building, capture:

1. task and intended result;
2. trigger and frequency;
3. allowed and prohibited inputs;
4. source of truth;
5. required human check;
6. named operator and approver;
7. stop conditions;
8. manual fallback;
9. baseline and pilot measures; and
10. pilot end date and go/no-go owner.

The record does not need to be complicated. Its job is to keep the important decisions from living only in the builder’s head.

## Limitations

Readiness changes when the tool, model, data, workflow, audience, or consequence changes. Reassess after material changes and monitor the process after launch; NIST states that AI systems should be tested before deployment and regularly while operating in its [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/).

This article is practical education, not legal, medical, cybersecurity, or compliance advice. Apply your organization’s policies and involve the appropriate responsible professionals.

## Primary sources

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [NIST AI RMF Playbook](https://airc.nist.gov/docs/AI_RMF_Playbook.pdf)
- [NIST Artificial Intelligence Risk Management Framework: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [NIST SP 800-34 Rev. 1: Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)

*Written by [Keith Staggers](https://www.keithstaggers.com/about/), AI trainer, workflow builder, nurse leader, and author. Last reviewed August 20, 2026.*

