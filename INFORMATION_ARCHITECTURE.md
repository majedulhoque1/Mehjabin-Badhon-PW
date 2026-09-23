# Mehjabin Digital Ecosystem — Information Architecture

## 1. Product structure

```text
Mehjabin Badhon Digital Ecosystem
|
|-- Public digital home
|   |-- Home /
|   |-- Essays /ideas
|   |   |-- Essay detail /ideas/:slug
|   |-- Advisory /work-with-me
|   |-- Philosophy /about#philosophy
|   |-- About /about
|   `-- Begin a conversation /book
|
`-- Private Business OS (admin authentication required)
    |-- Sign in /admin
    |-- Dashboard /admin
    |-- Leads CRM /admin/crm
    |   |-- Lead detail /admin/crm/:leadId
    |   `-- Client detail /admin/clients/:clientId
    `-- Content Studio /admin/content
        `-- Content editor /admin/content/:contentId
```

## 2. Public navigation

| Navigation label | Route | Primary job |
|---|---|---|
| Essays | `/ideas` | Show Mehjabin's thinking and establish expertise. |
| Advisory | `/work-with-me` | Help a visitor identify the right engagement. |
| Philosophy | `/about#philosophy` | Explain the customer-centred point of view. |
| About | `/about` | Build personal trust without becoming a CV. |
| Begin a Conversation | `/book` | Convert interest into a qualified inquiry. |

The primary action is consistently **Begin a Conversation**. The reading journey is secondary: an idea should lead to an advisory service, then to booking.

## 3. Home-page hierarchy

1. **Hero — clarity and positioning**
   - Editorial portrait, concise positioning statement, two actions.
2. **Philosophy statement**
   - The human-centred view of business, including Bengali expression.
3. **Advisory practice**
   - Who the practice is for, then two core engagement cards.
4. **Selected writings**
   - Credibility through useful, repeatable thinking.
5. **Quiet engagement CTA**
   - High-intent booking/inquiry action and response expectations.

## 4. Public route content

### Essays

- Filter by: Strategy, Customer, Marketing, Growth, Bangladesh Business, Leadership, Future.
- Card metadata: type, category, date/read time, excerpt and action.
- Detail page: title, author, date, editorial image, article, related writing and conversation CTA.

### Advisory

The page is problem-first rather than service-menu-first.

| Need | Route outcome |
|---|---|
| Business clarity | Strategy engagement |
| Customer understanding | Customer and market insights |
| Sustainable growth | Growth advisory |
| Leadership guidance | 1:1 advisory |
| Team capability | Workshop or training |
| Public point of view | Speaking |

Each advisory module answers: **who it is for**, **what it helps with**, **what a first engagement looks like**, and **how to begin**.

### Booking

```text
Select conversation type
  -> choose a time
  -> provide contact and business context
  -> confirmation
  -> create CRM lead (demo)
```

## 5. Private Business OS navigation

| Area | Purpose | Key actions |
|---|---|---|
| Dashboard | Attention and priorities | Review sessions, inquiries, follow-ups, pipeline. |
| Leads CRM | Turn conversations into relationships | Create, open, update and progress leads. |
| Lead / client detail | Keep context in one place | Notes, timeline, next action, bookings, sessions. |
| Content Studio | Turn thinking into a publishing rhythm | Capture idea, draft, review, schedule, publish. |

### CRM lifecycle

```text
NEW -> CONTACTED -> DISCOVERY -> PROPOSAL -> WON
                                            |
                                            v
                                      ACTIVE CLIENT -> COMPLETED
```

### Content lifecycle

```text
IDEA -> DRAFT -> REVIEW -> READY -> PUBLISHED
```

## 6. Data and relationship model

```text
Booking -> Lead -> Client
                   |-- Sessions
                   |-- Tasks
                   |-- Notes
                   `-- Bookings

Content -> Published idea -> Public essay
```

| Entity | Essential fields |
|---|---|
| Lead | Contact, company, source, requirement, status, notes, next action/date. |
| Client | Contact, service, status, timeline, linked sessions and tasks. |
| Booking | Service, time, contact context, lead reference. |
| Session | Date, format, client, purpose, outcome. |
| Task | Owner, due date, next action, related lead/client. |
| Content | Title, topic, category, platform, body, media, publish date, status. |

## 7. Conversion and operating loop

```text
Essay / idea
  -> advisory relevance
  -> booking
  -> new CRM lead
  -> discovery and proposal
  -> active client
  -> session and follow-up task
  -> new insight / content
  -> essay / idea
```

This loop keeps the public brand and private operating system connected while avoiding unnecessary product surface area.

## 8. Access rules

- Public visitors can read all public routes and submit a booking only.
- Only the admin can access `/admin/*` data and operations.
- Demo data remains labelled **DEMO DATA** in the prototype.
- Public content never exposes client, lead, task or booking records.
