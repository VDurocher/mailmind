/**
 * 10 emails clients représentatifs pour la démo.
 * Port TypeScript de src/dataset.py du projet Python source.
 */

import type { EmailInput } from '@/lib/types/email.types'

export const SAMPLE_EMAILS: readonly (EmailInput & { readonly id: string })[] = [
  // ── PLAINTES ────────────────────────────────────────────────────────────

  {
    id: 'EMAIL-001',
    sender_name: 'Margaret Thompson',
    sender_email: 'm.thompson@outlook.com',
    subject: 'Damaged product received — Order ORD-78234',
    body: `Hello,

I am extremely disappointed with my recent order. I purchased the ProCore X1 (order ORD-78234, account ACC-10482) and it arrived with a cracked display and a missing power adapter. The packaging looked like it had been dropped multiple times.

This is unacceptable for a $349 product. I need a full replacement shipped within 48 hours, or I will be disputing the charge with my bank and leaving reviews on every platform I can find.

Margaret Thompson`,
  },
  {
    id: 'EMAIL-002',
    sender_name: 'Carlos Mendes',
    sender_email: 'carlos.mendes@gmail.com',
    subject: 'Refund request — CloudSync Pro subscription',
    body: `Hi Support,

I signed up for CloudSync Pro three weeks ago (order ORD-88901) expecting seamless cross-device sync as advertised. The feature doesn't work at all on my Android devices — I've tried everything in your documentation.

Since the core feature I paid for is broken, I'd like a full refund of the $79 annual subscription. Please confirm the refund process and how long it takes.

Thanks,
Carlos`,
  },
  {
    id: 'EMAIL-003',
    sender_name: 'Linda Park',
    sender_email: 'lindapark92@yahoo.com',
    subject: 'Horrible customer service experience',
    body: `To whom it may concern,

I have contacted your support team FOUR times about the same billing issue on my account (ACC-29301). Each time I explain the problem from scratch because no one reads the previous tickets. I've been charged twice for DataVault Starter in January and no one has bothered to fix it.

I am considering cancelling my subscription entirely. This is a simple double-charge issue — please escalate this immediately.

Linda Park`,
  },

  // ── LEADS COMMERCIAUX ───────────────────────────────────────────────────

  {
    id: 'EMAIL-004',
    sender_name: 'James Whitfield',
    sender_email: 'j.whitfield@nexacorp.com',
    subject: 'Pricing inquiry — ProCore Suite for our team of 45',
    body: `Hi,

I'm the IT Director at NexaCorp. We're evaluating project management tools and ProCore Suite caught our attention. We have about 45 users and need SSO (Okta), advanced reporting, and API access.

Could you share enterprise pricing for this team size? We also want to know if volume discounts apply and whether annual billing gives an additional reduction.

Happy to jump on a call this week if that helps.

James Whitfield, IT Director — NexaCorp`,
  },
  {
    id: 'EMAIL-005',
    sender_name: 'Sophia Reinholt',
    sender_email: 'sophia.r@brightwave.io',
    subject: 'Demo request — AI Analytics Platform',
    body: `Hello,

Our growth team at BrightWave is looking for an AI-powered analytics solution. We heard great things about your AI Analytics Platform from a colleague at Vertex Labs.

We'd love a 30-minute demo focused on predictive dashboards and Slack integration. Our team has 12 data analysts. We're aiming to make a decision by end of Q2.

Best,
Sophia Reinholt
Head of Data — BrightWave`,
  },
  {
    id: 'EMAIL-006',
    sender_name: 'Derek Okafor',
    sender_email: 'd.okafor@finsolve.co',
    subject: 'Comparing ProCore Suite vs. competitor before renewal',
    body: `Hi there,

Our current ProCore Suite subscription (account ACC-55120) renews in 6 weeks. Before renewing, we're seriously evaluating a competitor offer.

Can you clarify: does the Business tier include real-time collaboration and automated workflow triggers? Our 20-person team relies heavily on these. Also, what's your uptime SLA?

If the answer is yes, I'm ready to upgrade to the Business plan right away.

Derek`,
  },
  {
    id: 'EMAIL-007',
    sender_name: 'Isabelle Fontaine',
    sender_email: 'ifontaine@growthlab.fr',
    subject: 'Partnership opportunity — integration with our SaaS',
    body: `Hello,

I'm co-founder of GrowthLab, a SaaS for marketing attribution (5,000+ customers). We believe a native integration between GrowthLab and ProCore Suite would benefit both our user bases.

We'd like to explore a technical partnership and potential co-marketing arrangement. Who would be the right person to speak with about partnerships?

Isabelle Fontaine
Co-founder & CTO — GrowthLab`,
  },

  // ── QUESTIONS TECHNIQUES ────────────────────────────────────────────────

  {
    id: 'EMAIL-008',
    sender_name: 'Nathan Cruz',
    sender_email: 'n.cruz@devstudio.com',
    subject: 'API integration issue — authentication failing',
    body: `Hello Dev Support,

I'm integrating your REST API (SDK v2.3) into our Node.js backend. Authentication keeps failing with a 401 even though I'm using the API key from my dashboard (account ACC-70034).

I've double-checked the key, it's active and not expired. I'm setting it in the \`Authorization: Bearer\` header. I also tried the \`X-API-Key\` header but same result.

Here's the relevant code snippet:
  const response = await fetch(API_BASE_URL + '/v2/projects', {
    headers: { 'Authorization': \`Bearer \${API_KEY}\` }
  });

What am I missing? Is there a specific header format for SDK v2.3?

Nathan`,
  },
  {
    id: 'EMAIL-009',
    sender_name: 'Yuki Tanaka',
    sender_email: 'yuki.t@designhub.jp',
    subject: 'Bug report: ProCore X1 firmware 3.1.2 — crash on export',
    body: `Hi,

Since updating my ProCore X1 to firmware 3.1.2 (order ORD-91045), the device crashes every time I try to export projects larger than 500MB. The error shown is:

  [EXPORT_ERR] Memory allocation failed — code 0x8004F

Steps to reproduce:
1. Open any project > 500MB
2. Go to File > Export > Full Resolution
3. Device freezes for ~10 seconds then reboots

This happens 100% of the time. Firmware 3.1.1 worked fine. Is there a rollback available, or a patch incoming?

Yuki Tanaka`,
  },
  {
    id: 'EMAIL-010',
    sender_name: 'Amara Diallo',
    sender_email: 'amara.diallo@nonprofit.org',
    subject: 'Help setting up CloudSync Pro for our team',
    body: `Hello,

We just signed up for CloudSync Pro (order ORD-92810) for our 8-person nonprofit team. None of us are very technical, so we're struggling with the initial setup.

Specifically:
- How do we add team members without them needing to create individual accounts?
- Can we set different permission levels (read-only vs. full access)?
- Is there a video walkthrough or a step-by-step guide we can follow?

We'd really appreciate any help. Thank you for your patience!

Amara Diallo
Operations Lead — Sunshine Foundation`,
  },
  // ── RISQUE DE CHURN ─────────────────────────────────────────────────────

  {
    id: 'EMAIL-011',
    sender_name: 'Victor Hartmann',
    sender_email: 'v.hartmann@stratapro.de',
    subject: 'Cancelling our subscription — switching to a competitor',
    body: `Hello,

After 18 months with ProCore Suite (account ACC-88234), we've decided to cancel and move to a competitor. The main reasons:

1. The mobile app is consistently slower than competitors
2. We've been waiting 8 months for a Jira integration that was "coming soon"
3. Our last 3 support tickets took over 72h to get a first response

I wanted to send this email before cancelling in case there's something you can offer to change our decision. But honestly, our team is already testing the alternative.

Victor Hartmann
Head of Engineering — StrataPro`,
  },

  // ── DEMANDE DE FEATURE ──────────────────────────────────────────────────

  {
    id: 'EMAIL-012',
    sender_name: 'Priya Nair',
    sender_email: 'priya.nair@contentco.io',
    subject: 'Feature request: bulk export + custom report templates',
    body: `Hi team,

Long-time user of CloudSync Pro (account ACC-34521) — love the product overall!

Two features that would make a huge difference for our team:

1. **Bulk export**: Right now we can only export one project at a time. We have 200+ projects and need to archive them quarterly. A "select all + export as ZIP" would save hours.
2. **Custom report templates**: The default reports don't match our client reporting format. Being able to save a custom template (choose columns, logo, color scheme) would be a game changer.

Is either of these on the roadmap? Happy to join a beta if you're testing them.

Priya Nair
Content Ops Lead — ContentCo`,
  },
] as const
