# VAELTHAR — MASTER BLUEPRINT v3.0
> Complete project reference. Ready to build from.

---

## CONCEPT

A platform that bridges real life with an RPG layer.
Complete real-world activities → earn EXP / Level / Badge / Role
Social layer includes Guilds and Parties, plus a marketplace for in-game and real-world goods.
Multiple ranking systems powered by live weather data and GPS.

---

## 15 PLAYABLE ROLES (Random or Choose)

| Role | Quest Focus |
|------|-------------|
| Scholar | Reading, studying, summarizing |
| Warlord | Physical training, exercise |
| Warden | Environmental care, sustainability |
| Culinart | Cooking from scratch |
| Artisan | Drawing, painting, creating |
| Merchant | Earning income, saving money |
| Envoy | Helping and supporting others |
| Ascetic | Mindfulness, meditation |
| Pathfinder | Exploring new places |
| Chronicler | Photography, journaling |
| Forgemaster | Repairing or building things |
| Bard | Practicing or composing music |
| Sage | Teaching others |
| Herald | Walking/running + GPS tracking |
| Paladin | Community service quests |

### Role System — Choose vs Random (set at start of each Season)
- **Random Mode** — Role is reassigned every midnight. Unknown in advance. Grants +25% EXP bonus.
- **Choose Mode** — Player selects one Role per week. Quests are fixed for 7 days. No bonus, but fully plannable.

---

## FILE STRUCTURE

```
/
├── index.html              — Landing Page
├── login.html              — Sign in
├── register.html           — Create account
├── onboarding.html         — First-time tutorial
├── dashboard.html          — Main hub after login
├── profile.html            — Player profile (Role, EXP, Badge, Quest history)
├── quest.html              — Daily / Weekly / Special quests
├── habit.html              — Daily Habit Tracker
├── role.html               — Choose or randomize Role (start of Season)
├── shop.html               — Cosmetic + Premium store
├── topup.html              — Crystal top-up (attach payment slip)
├── guild.html              — Guild and Territory (GPS Map)
├── party.html              — Party and co-op quests
├── ranking.html            — All leaderboard types
├── chat.html               — Chat system (Guild / Party / Global)
├── market.html             — Player marketplace (in-game + real-world)
├── kyc.html                — Identity verification (for Verified Sellers)
├── blacklist.html          — Public list of flagged users
├── achievement.html        — Achievements and permanent badges
├── mood.html               — Daily mood log
├── checkin.html            — Real-world GPS check-in (+ EXP)
├── friend.html             — Friends system
├── gift.html               — Send in-game gifts to friends
├── notification.html       — Notification center
├── season.html             — Current Season info + rewards
├── tournament.html         — Tournaments and entry (in-game currency)
├── support.html            — Report an issue
├── terms.html              — Terms of Service + Market Rules
└── privacy.html            — Privacy Policy (standalone page)

/admin/
├── index.html              — Overview dashboard + analytics graphs
├── users.html              — Manage all users
├── quests.html             — Add / edit / remove quests
├── topup.html              — Approve top-up requests
├── reports.html            — Review player reports
├── roles.html              — Manage roles and balance
├── market.html             — Review market listings
├── kyc-review.html         — Approve or reject KYC submissions
├── blacklist.html          — Manage blacklist entries
├── analytics.html          — Graphs: active users, quest completion, revenue
├── season.html             — Create / close Season + distribute rewards
└── events.html             — Create World Boss events and special events
```

---

## JS FILE STRUCTURE

```
/js/
  core/
    api.js              — Supabase client + config
    auth.js             — login / register / session
    storage.js          — local state management
    router.js           — SPA-style page routing

  ui/
    sidebar.js          — Shared sidebar across all pages
    icons.js            — All SVG icons (no emoji used anywhere)
    toast.js            — Popup notifications
    modal.js            — Modal dialogs
    theme.js            — Weather-based UI theme switching

  game/
    quest.js            — Quest system + daily reset
    habit.js            — Habit tracker + streak
    role.js             — Role system (random/choose + Season lock)
    exp.js              — EXP and level-up logic
    weather.js          — Live weather fetch (OpenWeather API)
    ranking.js          — All leaderboard types
    title.js            — Title/epithet system
    achievement.js      — Badge and achievement unlocks
    season.js           — Season timer + reset + rewards
    anti-cheat.js       — Verification Rate check (below 70% = excluded from Ranking)

  social/
    guild.js            — Guild system (Personal + Organization)
    party.js            — Party system
    chat.js             — Supabase Realtime chat
    profile.js          — Player profile and online status
    friend.js           — Friends system
    mood.js             — Mood log + graph

  economy/
    shop.js             — Cosmetic + Functional store
    currency.js         — EXP Coin + Crystal + Premium currency management
    topup.js            — Top-up flow
    market.js           — Player marketplace
    kyc.js              — KYC submission
    gift.js             — Gift sending
    subscription.js     — Vaelthar Pass monthly subscription
    tournament.js       — Tournament entry + rewards

  trust/
    blacklist.js        — Fetch and display blacklist
    report.js           — Player report system

  admin/
    dashboard.js
    users.js
    quests.js
    topup-admin.js
    reports.js
    kyc-review.js
    blacklist-admin.js
    analytics.js
    season-admin.js
```

---

## DESIGN SYSTEM

### Fonts (self-hosted, no external CDN dependency)
| Font | Used For | Source |
|------|----------|--------|
| Cinzel | Primary headings — epic feel | fontsource |
| Rajdhani | Numbers, EXP, stats | fontsource |
| Inter | Body text and UI copy | fontsource |

### Icons
- All icons live in `icons.js` as a centralized SVG registry
- No emoji used anywhere in the UI
- No external icon libraries — everything bundled

---

## DATABASE (Supabase Tables)

```
users               — Core user accounts
profiles            — Avatar, display name, bio, online status
roles               — All 15 roles
user_roles          — Current role + mode (random/choose) + Season
quests              — All quests (type: daily / weekly / special)
user_quests         — Quests accepted/completed by user + verification_rate
habits              — User-defined habits
habit_logs          — Daily habit completion log + streak
exp_logs            — EXP gain/loss history
seasons             — Season data (start, end, theme)
guilds              — Guild data (Personal / Organization)
guild_members       — Guild membership
guild_territories   — GPS territory data per guild
parties             — Party data
party_members       — Party membership
chat_messages       — Chat messages (guild / party / global)
friends             — Friend pairs
friend_requests     — Pending friend requests
mood_logs           — Daily mood entries
shop_items          — Store items (cosmetic + functional)
user_inventory      — Items owned by each user
market_listings     — Active marketplace listings
market_transactions — Marketplace transaction history
topup_requests      — Crystal top-up requests
kyc_submissions     — KYC data submitted (encrypted)
blacklist           — Banned users + reason
reports             — Player-submitted reports
achievements        — All achievements
user_achievements   — Achievements unlocked per user
checkins            — GPS check-in log
notifications       — Notification records
gifts               — Gift transaction history
subscriptions       — Vaelthar Pass subscription log
tournaments         — Tournament records
tournament_entries  — Tournament participants
ranking_snapshots   — Weekly and Season ranking snapshots
```

---

## IN-GAME CURRENCY

| Currency | Earned By | Spent On |
|----------|-----------|----------|
| EXP Coin (free) | Quests, habits, login, check-ins | Select shop items, tournament entry |
| Crystal (paid) | Real-money top-up via Admin (10 THB = 100 Crystal) | Premium cosmetics, marketplace, premium features |

---

## SHOP — WHAT TO SELL

### Cosmetic (available from launch)
- Avatar frames by element (Fire, Water, Wind, Earth)
- Titles (e.g. "Storm Conqueror", "Warlord of Dawn")
- Quest complete effects (light burst, falling stars)
- Chat bubble styles
- Profile backgrounds
- Custom UI themes (Dark, Gold, Forest)

### Functional / Premium
- Extra daily quest slots
- Additional role rerolls
- 24-hour EXP boost

---

## REVENUE STREAMS

| Stream | Details | When to Activate |
|--------|---------|-----------------|
| In-App Purchase | Cosmetic shop + Crystal | From day one |
| Subscription | Vaelthar Pass — 59–99 THB/month | Once user base is established |
| B2B Organization Guild | Schools / companies — 500–2,000 THB/month | Once product is stable |
| Rewarded Ads | Optional ad watch → bonus EXP | Handle UX carefully |
| Tournament Entry | In-game currency entry, item rewards | Future phase |

> Do not activate monetization at launch. Reach 1,000–5,000 active users first.

---

## RANKING SYSTEM

| Type | Measured By |
|------|-------------|
| Global Ranking | Total EXP accumulated |
| Regional Ranking | EXP within same province/city (GPS) |
| Role Ranking | Top players per Role (e.g. Top Warlord) |
| Guild Ranking | Combined EXP of all guild members |
| Weekly Ranking | Resets every Monday |
| Season Ranking | 3-month cycle — ends with special title rewards |

### Ranking Rewards
| Rank | Reward |
|------|--------|
| Top 1 | Title "Grand Champion of the Season" + exclusive frame |
| Top 3 | Role-specific title + rare cosmetic |
| Top 10 | Permanent badge on profile |
| Top 100 | EXP bonus carry into next Season |

### Anti-Cheat
- **Verification Rate system** — if a quest's vote approval falls below 70%, EXP from that quest is excluded from all rankings.

---

## GUILD SYSTEM

### Personal Guild (open to all players)
- Requires Level 10 to create
- Maximum 20 members
- Holds territory on the GPS map
- Cooperative guild quests
- PVP against rival guilds

### Organization Guild (schools / companies — paid plan)
- Unlimited members
- Separate admin dashboard
- Member progress tracking
- Custom quest creation
- No ads

---

## CHAT SYSTEM (Supabase Realtime)

| Type | Scope |
|------|-------|
| Guild Chat | Guild members only |
| Party Chat | Active party members only |
| Global Chat | All players in the same city / server |

> No DMs in the initial release — reduces moderation risk.

---

## PROFILE SYSTEM

- Profile picture (uploadable)
- Display name
- Current Role + mode (random / choose)
- Level + EXP bar
- Earned badges and titles
- Quest and habit completion stats
- Achievement wall
- Guild affiliation
- Mood graph (last 30 days)
- Green dot = Online / Grey = Offline
- Last seen (visible to Party and Guild members only)

---

## ACHIEVEMENT SYSTEM

| Achievement | Condition |
|-------------|-----------|
| Consistent Hero | Log in 7 days in a row |
| Quest Master | Complete 100 quests |
| Trusted Trader | KYC verified |
| Explorer | Check in at 10 different locations |
| Loyal Member | Stay in a guild for 30 days |
| Season Champion | Rank #1 in a Season |
| Habit Streak | Maintain a habit for 30 consecutive days |

---

## KYC + TRUST MARKET

**Flow:**
1. User uploads ID on `kyc.html`
2. Admin reviews on `admin/kyc-review.html`
3. If approved → user receives **Verified Seller Badge** on profile
4. Only Verified Sellers can list real-world items on the marketplace
5. If fraud occurs → Admin adds user to Blacklist + notifies affected players

**Blacklist Page (`blacklist.html`):**
- Public page, visible to all
- Displays username + reason only (no personal information shown)

---

## MISSING PIECES (to build)
- Notification System — daily quest reminders, Guild War alerts, Tournament notifications
- Onboarding — first-time user walkthrough
- Privacy Policy + Terms of Service — required before launch

---

## BUILD ORDER

```
Phase 1 — Foundation
  design-tokens.css
  icons.js          ← build first, every page depends on it
  api.js → auth.js → storage.js → router.js
  sidebar.js → toast.js → modal.js

Phase 2 — User System
  register → onboarding → login → dashboard → profile → role

Phase 3 — Game Loop
  quest → habit → exp → achievement → season → ranking

Phase 4 — Social
  guild → party → chat → friend → mood

Phase 5 — Economy
  shop → topup → market → kyc → blacklist → gift → subscription

Phase 6 — Admin
  admin/index → users → quests → topup → kyc-review
  → blacklist → analytics → season-admin

Phase 7 — Advanced Features
  weather theme → GPS check-in → tournament
  → Regional ranking → Organization Guild → World Boss
```

---

## LEGAL NOTES

- Platform acts as intermediary only — does not hold money on behalf of users
- Real payments happen off-platform (direct transfer) — avoids e-payment licensing requirements
- `terms.html` and `privacy.html` must exist before public launch
- KYC data must be encrypted and secured (Supabase Storage + RLS)
- Blacklist may only display username and reason — no personal data
- Tournament prizes must be in-game items only — no cash rewards

---

## TEAM STRUCTURE (solo at launch — one person covers all roles)

| Role | Responsibility |
|------|---------------|
| Dev | Build and maintain all systems |
| Admin | Approve top-ups, manage quests |
| Moderator | Review reports and marketplace listings |
| Support | Respond to player issues |
| Content | Create quests and events |
| Marketing | Grow the user base (TikTok, etc.) |

---

*VAELTHAR Blueprint v3.0 — Updated and ready to build.*
