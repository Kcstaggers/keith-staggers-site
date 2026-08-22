---
status: draft
slug: ai-workflow-handoff-run-stop-recover
category: Using AI at work
title: "How Do You Hand Off an AI Workflow Safely?"
seoTitle: "How to Hand Off an AI Workflow Safely"
description: "Use Run, Stop, Recover, and Own to hand an AI-assisted process to another person without leaving critical knowledge in the builder's head."
author: Keith Staggers
authorUrl: https://www.keithstaggers.com/about/
datePublished: 2026-07-25
dateModified: 2026-08-20
lastReviewed: 2026-08-20
readingTime: 9 min read
tags:
  - AI workflow handoff
  - workflow documentation
  - operational resilience
hub:
  topic: operate
  question: "How do you hand off an AI workflow safely?"
existingUrl: /notes/ai-workflow-handoff-run-stop-recover/
---

# How Do You Hand Off an AI Workflow Safely?

**Hand off an AI workflow only after the new owner can run it, recognize when to stop, recover without creating duplicate actions, and explain who remains accountable. Give that person a one-page operating record, then watch them complete a normal case and a failure drill without help from the builder.**

A working demonstration is not a handoff. The builder already knows the assumptions, shortcuts, file locations, and strange failure signals that may not appear in the written instructions.

I use four plain words to test whether a process is transferable: **Run. Stop. Recover. Own.** They align with the [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), which calls for clear roles, testing, monitoring, override, incident response, recovery, and change management across an AI system’s life.

## Run: can the operator complete a normal case?

The handoff record should answer:

- What starts the process?
- Which tool, account, source, and template are approved?
- What information is allowed and prohibited?
- What does AI do, and what must a person do?
- What does a good output look like?
- What evidence must the reviewer check?
- Where does the approved result go?

Write actions, not project shorthand. “Open the approved weekly notes in Folder A” is more useful than “run the Monday flow.” Link to the controlled source, the current instructions, and the place where completion is recorded.

The operator should be able to complete one ordinary case while the builder stays silent. Questions during training are welcome; invisible rescue during the final demonstration is evidence that the handoff is not finished.

## Stop: can the operator recognize a boundary?

“Use judgment” and “be careful” do not define a stop condition. A stop condition is visible and connected to a next action.

Examples include:

- the source is missing, stale, or conflicts with another approved source;
- the input contains information the workflow is not permitted to process;
- the required human reviewer is unavailable;
- the output contains an unsupported name, number, date, citation, or instruction;
- a connection fails before the operator can confirm whether an outside action occurred;
- the requested use is different from the approved purpose; or
- the output falls outside an agreed quality or safety threshold.

For every stop condition, say what the person should do: hold the draft, move to the manual path, ask the named owner, or record an incident. A stop rule without a next action merely relocates the guess.

## Recover: can the operator finish safely after failure?

Recovery begins by checking what already happened. Retrying before checking may send a duplicate message, create a second record, publish twice, or overwrite the usable result.

The recovery record should identify:

1. the evidence that proves whether an outside action happened;
2. the last confirmed safe step;
3. the manual path for completing essential work;
4. the place to record the exception without copying restricted information; and
5. the person who decides whether normal operation may resume.

NIST describes contingency planning as a coordinated set of plans, procedures, and technical measures that support recovery after disruption. Its guidance includes alternate manual processing for some short-term disruptions. See [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final).

A fallback that depends on an inaccessible password, unavailable employee, missing template, or untested permission is not a fallback yet.

## Own: is accountability visible?

Name roles rather than writing “the team.” A small workflow may need one person in several roles, but the responsibilities should still be explicit:

- **Operator:** runs the approved steps and stops on a defined condition.
- **Reviewer:** checks the evidence and accepts, corrects, or rejects the output.
- **Process owner:** approves material changes and decides when a failed workflow may resume.
- **Support or escalation owner:** handles access, security, privacy, or technical incidents.

The tool is not the owner. The builder is not automatically the owner after handoff. Accountability belongs to people who have the authority and time to act.

## The one-page AI workflow handoff record

Keep this beside the process:

| Field | What to write |
|---|---|
| Purpose | The one job this workflow is approved to do |
| Trigger | The event that starts a run |
| Inputs | Allowed sources and explicitly prohibited information |
| AI step | What the tool produces or changes |
| Human gate | Who reviews what evidence before the next action |
| Output | Format, destination, and definition of complete |
| Stop conditions | Specific visible reasons not to continue |
| External actions | Messages, updates, charges, publications, or other consequences |
| Fallback | The ordinary path that completes essential work |
| Duplicate check | Evidence to examine before any retry |
| Owners | Operator, reviewer, process owner, and escalation contact |
| Evidence | Where approvals, exceptions, and completion are recorded |
| Version | Date, approved configuration, and next review date |

Do not paste secrets or private source material into the handoff record. Point to the controlled location and describe the access needed.

## A synthetic handoff drill

Imagine a small team uses AI to draft a project follow-up email from approved, nonconfidential meeting notes. The email cannot send itself.

Ask the new owner to demonstrate four cases:

1. **Run:** create and verify a normal draft.
2. **Stop:** identify an invented deadline and reject the draft.
3. **Recover:** respond to a timeout by checking the sent folder and workflow record before deciding whether to retry.
4. **Own:** explain who approves changes, who handles a failure, and who authorizes the next normal run.

Use sample names, a practice mailbox, and outside actions turned off. The drill tests the operating method, not a real person or live business record.

## Handoff acceptance criteria

The workflow is ready for transfer when the new owner can, without builder assistance:

- find the approved source and instructions;
- complete a normal case;
- perform the required human check;
- state the prohibited inputs;
- recognize at least one stop condition;
- confirm whether an outside action already occurred;
- use or explain the manual fallback;
- record an exception; and
- name the person who decides whether the process resumes.

Capture gaps during the demonstration, correct the record, and repeat the missed case. A signed acknowledgement is not a substitute for demonstrated use.

## Limitations

A handoff test proves that one person can operate the documented version under the tested conditions. It does not prove that the model will remain stable, that every edge case has been found, or that the workflow meets every legal, privacy, security, clinical, accessibility, or organizational requirement.

Retest after changes to the model, prompt, tool, data source, integration, destination, reviewer, or consequence. The [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) emphasizes pre-deployment testing, incident disclosure, and continuing risk management for generative AI systems.

## Primary sources

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [NIST Artificial Intelligence Risk Management Framework: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [NIST SP 800-34 Rev. 1: Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)

*Written by [Keith Staggers](https://www.keithstaggers.com/about/), AI trainer, workflow builder, nurse leader, and author. Last reviewed August 20, 2026.*

