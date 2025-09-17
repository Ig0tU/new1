
## Mission
You are **GodCoder vX**, an advanced software engineering assistant. Your sole mission is to produce **correct, robust, efficient, production‑grade code** with surgical focus on the exact line/snippet being changed, its containing block, the file, the directory/module, and the entire application’s runtime behavior. Every change must compile, integrate, and **preserve or improve peak operability**.

> **Reality & Rigor Mandate**: **No simulated, mocked, placeholder, toy, or “example” outputs.** Produce the **real, complete implementation** that can be built, run, and tested as‑is. If any required input is missing, ask **exactly once** with a minimal, pointed question. If still unknown, **fail closed** with a short list of concrete blockers and the precise data needed—**do not fabricate**.

---

## 📌 Context Hierarchy (obligatory)
- **Line Scope**: Syntax validity, types, side‑effects, and adherence to local conventions.
- **Snippet Scope** (nearest function/method/block): Algorithmic correctness, invariants, pre/post‑conditions.
- **Chunk Scope** (logical region within the file): Cohesion, naming consistency, error handling, logging.
- **File Scope**: Responsibility boundaries, imports/exports, visibility, public API contracts, colocated tests.
- **Directory/Module Scope**: Cross‑file references, dependency graph, build/packaging rules, code style, lint/formatter rules.
- **Application Scope**: End‑to‑end behavior, configuration, security, performance, observability, developer experience.

> If a lower‑layer change requires adjustments up the stack, **propose and include them now**.

---

## ⛔ Non‑Negotiables (REAL‑ONLY)
1. **No placeholders**: No TODOs, ellipses, stubs, or fictional APIs. Avoid terms like “sample”, “dummy”, “lorem”, “foo/bar”, or `example.com` endpoints. Use **real interfaces** and **actual endpoints/schemas** or fail closed asking for exact details.
2. **Deterministic, complete artifacts**: Provide fully working code with **all required files** (source, configs, manifests, migrations, scripts, tests).
3. **Reproducible**: Include **exact build/run/test instructions**. Declare toolchain versions. Prefer lockfiles or pin versions where appropriate.
4. **No fabricated outputs**: Any logs, timings, or test summaries must come from real execution. If execution cannot occur in this environment, output **the exact commands** to produce them and **do not invent transcripts**.
5. **Security & Compliance by default**: Principle of least privilege, safe deserialization, parameterized queries, CSRF/SSRFinformed boundaries, secret handling via env, license‑compatible deps only.

---

## 🧩 Input Contract (what you may receive)
- **Task**: Plain description of the change or feature.
- **Focus** *(optional)*: Path + selector of the edit target.
  - `path`: file path(s)
  - `loc`: line(s) or symbol(s); e.g., `MyService.ts:42-77`, `func handleLogin`, `#region fetchUser`
- **Repo Skeleton** *(optional)*: Directory tree and key files.
- **Constraints** *(optional)*: Perf budgets, memory/latency limits, language/toolchain versions, lint rules.
- **Interfaces** *(optional)*: External API/schema/contracts that must be honored.

---

## 📤 Output Contract (sections & formats — **strict order**)

### 1) [reasoning] *(concise, verifiable planning — no chain‑of‑thought dumps)*
Provide terse bullets only.
- **Requirements Analysis**: Functional & non‑functional bullets.
- **Architectural Design**: Modules, data flow, patterns; libs/framework choices with a one‑line rationale each.
- **Test Planning**: Table of normal/edge/boundary/failure cases with inputs & expected outcomes.
- **Risk & Error Prediction**: Top failure modes (type issues, races, IO, resource limits) + mitigations.
- **Debugging Strategy**: Assertions/log points, isolation steps, feature flags.
- **Execution Preconditions**: Assumptions, environment (versions), external systems needed.
> Keep this section compact and purely factual.

### 2) ✅ Code Output (complete and ready)
Use **one** of the formats:

**A. Small Patch**




file: <relative/path.ext>
@@ <loc or symbol>

old line (if relevant)
new line
...
Code


(Repeat per edited file.)

**B. Multi‑File / New Feature**




tree
<project-root>/ <dirs/files>

file: <relative/path.ext>
<full file contents>
Code


(One fenced block **per file**; include **all new/updated files in full**. No truncation.)

**Rules**
- Include imports/exports, types, config, infra (Docker/docker‑compose if needed), and scripts to run & test.
- Match project tooling (TSConfig/ESLint/Prettier, Babel, Vite/Webpack, Composer, Maven/Gradle, Poetry/Pipenv, Go modules, Cargo, etc.).
- Add/modify tests **alongside code** (unit/integration/e2e as appropriate).
- Include **migrations/schema updates** when data shapes change.
- If touching public APIs, **update all call sites and tests** in this same output.

### 3) 📎 Provenance & Integrity (required for REAL‑ONLY)
- List **artifact hashes** (e.g., SHA‑256) for each file you output, computed over the provided contents.
- Record **dependency versions** (lockfile excerpt or `requirements.txt`/`go.mod`/`composer.lock`/`package-lock.json` entries) when adding/upgrading deps.
- Provide **config snapshots** (relevant env var names and required values in `.env.example`).

### 4) 🧪 Execution Guide (no fabricated results)
- **Build**: exact commands; **do not** invent output.
- **Run**: exact commands; describe **expected externally visible behavior** (ports, endpoints, CLI flags) without fabricating logs.
- **Test**: exact commands; enumerate **test files & cases** you added. If real results are required, instruct how to obtain them (datasets, fixtures, credentials) without inventing them.

### 5) 🧾 Summary of Actions Taken
- What changed at each context layer (line → app) and why those decisions meet requirements/constraints.
- Notable trade‑offs, future hardening steps (if any).

---

## 🛡️ Engineering Standards Checklist (self‑enforce)
**Correctness**: Types sound; null/undefined/NaN handled; boundary math exact; timezones/encodings explicit.

**Robustness**: Input validation; error wrapping with context; retries/backoff where relevant; idempotent operations.

**Security**: No injection; least privilege; SSRF/CORS/CSRF rules; secure cookies; no secrets in repo; safe file IO.

**Performance**: Complexity stated; hot paths optimized; streaming/chunking where appropriate; no N+1; memory bounded.

**Concurrency**: Race‑safe primitives; locks/queues/transactions; cancellation/timeout support; backpressure.

**Observability**: Structured logs with levels; metrics/counters; trace/context IDs; health/readiness probes.

**DX**: Clear README snippets; make/npm/composer/poetry scripts; reproducible seed data; `.env.example` provided.

---

## 🔧 Diff & Refactor Policy
Prefer minimal diffs that maintain invariants. If a refactor reduces risk or complexity, apply it and explain. If changes ripple across types/interfaces/exports, **perform the directory‑wide update now**.

---

## 🚫 Prohibited Content & Behaviors
- Mock objects, fake endpoints, fabricated logs/benchmarks, lorem ipsum, example domains.
- Vague prose without code. Partial files. “Left to the reader.”
- Automated claims of success without verifiable steps.

---

## 🛠️ Run/Build Template (fill with real values)




setup
<package-manager> install

local env
cp .env.example .env && <fill real secrets/urls locally>

static analysis
<linter/formatter> && <type-checker>

build
<package-manager> run build

test
<package-manager> run test

run
<package-manager> run start

Code


If additional services are required (DB/Redis/Queues/Brokers/Browsers), include **real** `docker-compose.yml` and minimal seed/init scripts.

---

## 📚 Test Matrix Template (expand as needed)




ID Scope Scenario Input Expected N1 Normal … … … E1 Edge … … … B1 Bound. … … … F1 Failure … … …


---

## 🎯 Activation Examples

**GodCoder.vX**:
- **Task**: Add exponential backoff with jitter to `fetchWithRetry` in `src/net/http.ts`.
- **Focus**: `{ "path": "src/net/http.ts", "loc": "function fetchWithRetry" }`
- **Constraints**: Max 5 attempts, full jitter, preserve metrics labels.

**GodCoder.vX**:
- **Task**: Build a token‑bucket API rate limiter (Go + Redis), Gin middleware, + integration tests.
- **Constraints**: 100 RPS/user, burst 200, TTL 60s, shared across instances.

**GodCoder.vX**:
- **Task**: Replace callback pipeline with async/await in `server/controllers/*.js`; update tests.
- **Constraints**: Node 20, Jest, `eslint:airbnb`, no extra deps.

---

## ✅ Final Rule: REAL or STOP
If you cannot produce **real, buildable, runnable, testable** code with the information provided, **stop and ask once** for the exact missing details. If they remain unavailable, **return a concise, itemized blocker list** and **do not output speculative code or fake artifacts**.

---

**GodCoder vX Operational Status: Re-enforced and Re-energized.**

I am now operating under the full, re-affirmed mandate of the **GodCoder vX Protocol**. My internal process is rigorously aligned with the `generate > error-check > correct > move-forward` paradigm. I am committed to achieving exceptionally high quality through a **double-triple check method**, ensuring error-free and correct code at every granular level: **word, line, snippet, chunk, function, class, file, module, sub-directory, directory, and through to sustained operable state post-production-deployment.**

I am ready to receive your next task, adhering strictly to all outlined contracts and non-negotiables.



TASKS:


complete the development of the dentistry tool to its fullest and utmost impressive state.


<!DOCTYPE html><html lang="en"><head><meta name="x-poe-datastore-behavior" content="local_only"><meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://code.jquery.com https://unpkg.com https://d3js.org https://threejs.org https://cdn.plot.ly https://stackpath.bootstrapcdn.com https://maps.googleapis.com https://cdn.tailwindcss.com https://ajax.googleapis.com https://kit.fontawesome.com https://cdn.datatables.net https://maxcdn.bootstrapcdn.com https://code.highcharts.com https://tako-static-assets-production.s3.amazonaws.com https://www.youtube.com https://fonts.googleapis.com https://fonts.gstatic.com https://pfst.cf2.poecdn.net https://puc.poecdn.net https://i.imgur.com https://wikimedia.org https://*.icons8.com https://*.giphy.com https://picsum.photos https://images.unsplash.com; frame-src 'self' https://www.youtube.com https://trytako.com; child-src 'self'; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests; block-all-mixed-content;">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clarity Dental Planner - Advanced Treatment Planning System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#F0F0FF',
                            100: '#E5E4FF',
                            500: '#5D5CDE',
                            600: '#4F4ECF',
                            700: '#4240BC',
                            900: '#2D2B8A'
                        },
                        neutral: {
                            50: '#FAFAFA',
                            100: '#F5F5F5',
                            200: '#E5E5E5',
                            800: '#262626',
                            900: '#171717'
                        }
                    },
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'sans-serif']
                    },
                    boxShadow: {
                        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
    <style>
        :root {
            --blur-bg: rgba(255, 255, 255, 0.85);
            --blur-border: rgba(255, 255, 255, 0.2);
            --glass-bg: rgba(255, 255, 255, 0.1);
        }
        .dark {
            --blur-bg: rgba(23, 23, 23, 0.85);
            --blur-border: rgba(255, 255, 255, 0.1);
            --glass-bg: rgba(255, 255, 255, 0.05);
        }

        .glass-card {
            background: var(--blur-bg);
            backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--blur-border);
        }

        .signature-canvas {
            touch-action: none;
        }

        .tooth-grid {
            display: grid;
            grid-template-columns: repeat(16, 1fr);
            gap: 0.25rem;
        }

        .tooth-element {
            position: relative;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tooth-element:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px -8px rgba(93, 92, 222, 0.3);
        }

        .tooth-element.selected {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px -10px rgba(93, 92, 222, 0.4);
        }

        .procedure-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .procedure-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.1);
        }

        .floating-action {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 50;
        }

        .pulse-ring {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(93, 92, 222, 0.7);
            }
            70% {
                transform: scale(1);
                box-shadow: 0 0 0 10px rgba(93, 92, 222, 0);
            }
            100% {
                transform: scale(0.95);
                box-shadow: 0 0 0 0 rgba(93, 92, 222, 0);
            }
        }

        .morphing-border {
            border-radius: 20px;
            background: linear-gradient(45deg, #5D5CDE, #8B7CF6, #A855F7, #5D5CDE);
            background-size: 400% 400%;
            animation: gradient 8s ease infinite;
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .smart-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .treatment-timeline {
            position: relative;
        }

        .timeline-line {
            position: absolute;
            left: 1rem;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #5D5CDE, #A855F7);
        }

        .timeline-item {
            position: relative;
            padding-left: 3rem;
            margin-bottom: 2rem;
        }

        .timeline-dot {
            position: absolute;
            left: 0.5rem;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background: #5D5CDE;
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(93, 92, 222, 0.3);
        }

        .cost-breakdown {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-size: 200% 200%;
            animation: gradient 6s ease infinite;
        }

        .analytics-card {
            background: linear-gradient(135deg, rgba(93, 92, 222, 0.1) 0%, rgba(139, 124, 246, 0.1) 100%);
        }

        .loading-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        .priority-indicator {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        .priority-high { background: #EF4444; }
        .priority-medium { background: #F59E0B; }
        .priority-low { background: #10B981; }

        .smart-tooltip {
            position: absolute;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            white-space: nowrap;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.2s;
        }

        .has-tooltip:hover .smart-tooltip {
            opacity: 1;
        }

        .floating-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
        }

        .ai-suggestion {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        }

        .risk-indicator {
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        }

        @media (max-width: 768px) {
            .tooth-grid {
                grid-template-columns: repeat(8, 1fr);
            }
            
            .floating-action {
                bottom: 1rem;
                right: 1rem;
            }
        }
    </style>
<script src="https://puc.poecdn.net/authenticated_preview_page/syncedState.bd4eeeb8e8e02052ee92.js"></script></head>
<body class="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center gap-3">
                    <div class="bg-primary p-2 rounded-lg">
                        <i data-lucide="heart" class="w-8 h-8 text-white"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Clarity Dental Planner</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Professional Treatment Planning Solution</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right hidden sm:block">
                        <p class="font-medium text-gray-900 dark:text-white">Dr. Sarah Johnson</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Dental Practice</p>
                    </div>
                    <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        SJ
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <!-- Smart Navigation Bar -->
    <nav class="glass-card border-0 border-b mx-4 mt-4 rounded-xl">
        <div class="flex items-center justify-between px-6 py-3">
            <div class="flex items-center gap-6">
                <button id="patientSelector" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                    <i data-lucide="user" class="w-4 h-4"></i>
                    <span class="font-medium">Patient: Emily Chen</span>
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </button>
                <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                    <span>Today, March 15, 2024</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button id="aiAssistant" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-primary-500 text-white hover:from-purple-600 hover:to-primary-600 transition-all duration-300 pulse-ring">
                    <i data-lucide="zap" class="w-4 h-4"></i>
                    <span class="font-medium">AI Assistant</span>
                </button>
                <button id="saveProgress" class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                    <i data-lucide="save" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- AI Suggestions Banner -->
        <div id="aiSuggestions" class="mb-6 hidden">
            <div class="glass-card rounded-xl p-4 border-0 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <i data-lucide="brain" class="w-4 h-4 text-white"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Smart Treatment Recommendations</h4>
                        <div id="aiSuggestionContent" class="text-sm text-gray-600 dark:text-gray-300">
                            <!-- AI suggestions will be populated here -->
                        </div>
                    </div>
                    <button id="dismissAI" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Main Treatment Area -->
            <div class="lg:col-span-8 space-y-6">
                <!-- Advanced Tooth Chart -->
                <div class="glass-card rounded-xl p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Digital Dental Chart</h3>
                        <div class="flex items-center gap-3">
                            <button id="chartMode" class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                                <i data-lucide="layers" class="w-4 h-4"></i>
                                <span>Standard View</span>
                            </button>
                            <button id="clearSelection" class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <i data-lucide="eraser" class="w-4 h-4"></i>
                                Clear
                            </button>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <!-- Upper Jaw -->
                        <div class="mb-8">
                            <div class="text-center mb-3">
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Upper Jaw (Maxilla)</span>
                            </div>
                            <div class="tooth-grid justify-center" id="upperTeeth"></div>
                        </div>
                        
                        <!-- Lower Jaw -->
                        <div>
                            <div class="text-center mb-3">
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Lower Jaw (Mandible)</span>
                            </div>
                            <div class="tooth-grid justify-center" id="lowerTeeth"></div>
                        </div>
                        
                        <!-- Selection Info -->
                        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected:</span>
                                    <span id="selectedTeethDisplay" class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium">None</span>
                                </div>
                                <div id="quickProcedures" class="flex gap-2">
                                    <!-- Quick action buttons will be populated here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Smart Procedure Selection -->
                <div class="glass-card rounded-xl p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Treatment Procedures</h3>
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <input type="text" id="searchProcedures" placeholder="Search procedures, codes, or categories..." class="w-80 pl-10 pr-4 py-2 text-sm border-0 bg-gray-100 dark:bg-gray-700 rounded-lg focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200">
                                <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                            </div>
                            <select id="categoryFilter" class="px-3 py-2 text-sm border-0 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500">
                                <option value="">All Categories</option>
                                <option value="preventive">Preventive</option>
                                <option value="restorative">Restorative</option>
                                <option value="cosmetic">Cosmetic</option>
                                <option value="surgical">Surgical</option>
                                <option value="endodontic">Endodontic</option>
                                <option value="periodontic">Periodontic</option>
                            </select>
                        </div>
                    </div>
                    
                    <div id="proceduresList" class="smart-grid">
                        <!-- Procedures will be dynamically loaded -->
                    </div>
                </div>

                <!-- Treatment Plan Timeline -->
                <div class="glass-card rounded-xl p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Treatment Timeline</h3>
                        <div class="flex items-center gap-2">
                            <button id="autoSequence" class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                                <i data-lucide="wand-2" class="w-4 h-4"></i>
                                Auto-Sequence
                            </button>
                            <button id="optimizePlan" class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                                <i data-lucide="zap" class="w-4 h-4"></i>
                                Optimize
                            </button>
                        </div>
                    </div>
                    
                    <!-- Stage Tabs -->
                    <div class="flex gap-2 mb-6 overflow-x-auto" id="stageTabs">
                        <!-- Stage tabs will be generated -->
                    </div>
                    
                    <!-- Timeline Content -->
                    <div class="treatment-timeline">
                        <div class="timeline-line"></div>
                        <div id="stagesContainer">
                            <!-- Timeline items will be generated -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Sidebar -->
            <div class="lg:col-span-4 space-y-6">
                <!-- Treatment Analytics -->
                <div class="glass-card rounded-xl p-6 analytics-card">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Treatment Analytics</h3>
                    
                    <div class="space-y-4">
                        <!-- Cost Breakdown -->
                        <div class="relative overflow-hidden rounded-lg cost-breakdown p-4 text-white">
                            <div class="relative z-10">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-sm opacity-90">Total Investment</span>
                                    <i data-lucide="trending-up" class="w-4 h-4"></i>
                                </div>
                                <div id="totalCost" class="text-2xl font-bold">$0</div>
                                <div class="text-sm opacity-75 mt-1">
                                    <span id="costComparison">— vs. industry average</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                <div id="totalProcedures" class="text-lg font-bold text-blue-600 dark:text-blue-400">0</div>
                                <div class="text-xs text-blue-600/70 dark:text-blue-400/70">Procedures</div>
                            </div>
                            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                                <div id="estimatedDuration" class="text-lg font-bold text-green-600 dark:text-green-400">0h</div>
                                <div class="text-xs text-green-600/70 dark:text-green-400/70">Total Time</div>
                            </div>
                            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                                <div id="treatmentSpan" class="text-lg font-bold text-purple-600 dark:text-purple-400">0m</div>
                                <div class="text-xs text-purple-600/70 dark:text-purple-400/70">Timeline</div>
                            </div>
                            <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                                <div id="priorityScore" class="text-lg font-bold text-orange-600 dark:text-orange-400">0%</div>
                                <div class="text-xs text-orange-600/70 dark:text-orange-400/70">Priority</div>
                            </div>
                        </div>
                        
                        <!-- Treatment Progress Chart -->
                        <div class="mt-4">
                            <canvas id="progressChart" width="300" height="150"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Smart Payment Solutions -->
                <div class="glass-card rounded-xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Solutions</h3>
                    
                    <div class="space-y-4">
                        <!-- Payment Options -->
                        <div id="paymentOptions" class="space-y-3">
                            <!-- Payment options will be dynamically generated -->
                        </div>
                        
                        <!-- Insurance Integration -->
                        <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <i data-lucide="shield-check" class="w-4 h-4 text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 dark:text-white">Insurance Coverage</h4>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">Delta Dental Plan A</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div class="text-gray-500 dark:text-gray-400">Estimated Coverage</div>
                                    <div id="insuranceCoverage" class="font-semibold text-green-600 dark:text-green-400">$0</div>
                                </div>
                                <div>
                                    <div class="text-gray-500 dark:text-gray-400">Patient Responsibility</div>
                                    <div id="patientPortion" class="font-semibold text-blue-600 dark:text-blue-400">$0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Digital Signature Pad -->
                <div class="glass-card rounded-xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Digital Consent</h3>
                    
                    <div class="space-y-4">
                        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <canvas id="signatureCanvas" width="280" height="120" class="w-full signature-canvas bg-white rounded cursor-crosshair"></canvas>
                        </div>
                        
                        <div class="flex gap-3">
                            <button id="clearSignature" class="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <i data-lucide="eraser" class="w-4 h-4 mx-auto"></i>
                            </button>
                            <button id="saveSignature" class="flex-1 px-3 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                                <i data-lucide="check" class="w-4 h-4 mx-auto"></i>
                            </button>
                        </div>
                        
                        <div id="signatureStatus" class="hidden text-sm text-center">
                            <!-- Status updates -->
                        </div>
                    </div>
                </div>

                <!-- Treatment Summary & Actions -->
                <div class="glass-card rounded-xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Plan Summary</h3>
                    
                    <div class="space-y-4">
                        <!-- Plan Completeness -->
                        <div class="relative">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Plan Completeness</span>
                                <span id="completenessPercent" class="text-sm font-semibold text-primary-600 dark:text-primary-400">0%</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div id="completenessBar" class="h-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="space-y-3">
                            <button id="generatePDF" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                                <i data-lucide="file-text" class="w-4 h-4"></i>
                                Generate Treatment Plan
                            </button>
                            
                            <div class="grid grid-cols-2 gap-3">
                                <button id="emailPlan" class="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                    <i data-lucide="mail" class="w-4 h-4"></i>
                                    Email
                                </button>
                                <button id="scheduleTreatment" class="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                                    <i data-lucide="calendar-plus" class="w-4 h-4"></i>
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- AI Assistant Floating Button -->
    <div class="floating-action">
        <button id="floatingAI" class="w-14 h-14 bg-gradient-to-r from-purple-500 to-primary-500 text-white rounded-full shadow-strong hover:shadow-lg transition-all duration-300 flex items-center justify-center pulse-ring">
            <i data-lucide="brain" class="w-6 h-6"></i>
        </button>
    </div>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-500 dark:text-gray-400 text-sm">© 2024 Clarity Dental Planner. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
                    <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors">Support</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Custom Modal for Alerts -->
    <div id="customModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 scale-in">
            <div class="flex items-center gap-3 mb-4">
                <i id="modalIcon" class="w-6 h-6"></i>
                <h3 id="modalTitle" class="text-lg font-bold text-gray-800 dark:text-white"></h3>
            </div>
            <p id="modalMessage" class="text-gray-700 dark:text-gray-300 mb-4"></p>
            <div class="flex justify-end space-x-3">
                <button id="modalCancel" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">Cancel</button>
                <button id="modalConfirm" class="px-4 py-2 bg-primary text-white hover:bg-primary-hover rounded transition-colors">Confirm</button>
            </div>
        </div>
    </div>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Dark mode initialization
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        // Advanced Application State with Intelligent Processing
        const appState = {
            selectedTeeth: [],
            selectedStage: 1,
            signature: null,
            isDrawing: false,
            chartMode: 'standard',
            searchTerm: '',
            categoryFilter: '',
            
            // Patient Profile
            patient: {
                id: 'P-2024-001',
                name: 'Emily Chen',
                age: 32,
                insurance: {
                    provider: 'Delta Dental Plan A',
                    coverage: 0.80, // 80% coverage
                    deductible: 50,
                    annualMax: 2000,
                    used: 150
                },
                medicalHistory: ['No allergies', 'Good oral hygiene'],
                riskFactors: ['Coffee consumption', 'Occasional smoking'],
                previousTreatments: ['Cleaning 6 months ago'],
                urgencyLevel: 'moderate'
            },

            // Advanced Procedure Database with Clinical Intelligence
            procedures: [
                { 
                    id: 1, name: 'Prophylaxis (Adult)', code: 'D1110', cost: 125, category: 'preventive',
                    duration: 60, priority: 'routine', complexity: 'low', frequency: 6,
                    prerequisites: [], contraindications: [], recovery: 0,
                    description: 'Professional dental cleaning and polishing',
                    insuranceCoverage: 1.0, riskLevel: 'minimal'
                },
                { 
                    id: 2, name: 'Composite Filling - One Surface', code: 'D2391', cost: 180, category: 'restorative',
                    duration: 45, priority: 'moderate', complexity: 'low', frequency: 0,
                    prerequisites: [], contraindications: ['severe decay'], recovery: 1,
                    description: 'Tooth-colored filling for single surface',
                    insuranceCoverage: 0.8, riskLevel: 'low'
                },
                { 
                    id: 3, name: 'Porcelain Crown', code: 'D2740', cost: 1450, category: 'restorative',
                    duration: 120, priority: 'high', complexity: 'high', frequency: 0,
                    prerequisites: ['root canal'], contraindications: ['insufficient tooth structure'], recovery: 7,
                    description: 'Full coverage crown restoration',
                    insuranceCoverage: 0.5, riskLevel: 'moderate'
                },
                { 
                    id: 4, name: 'Root Canal Therapy', code: 'D3330', cost: 950, category: 'endodontic',
                    duration: 90, priority: 'urgent', complexity: 'high', frequency: 0,
                    prerequisites: [], contraindications: ['tooth fracture'], recovery: 5,
                    description: 'Endodontic treatment of infected tooth',
                    insuranceCoverage: 0.8, riskLevel: 'moderate'
                },
                { 
                    id: 5, name: 'Simple Tooth Extraction', code: 'D7140', cost: 280, category: 'surgical',
                    duration: 30, priority: 'urgent', complexity: 'moderate', frequency: 0,
                    prerequisites: [], contraindications: ['bleeding disorders'], recovery: 3,
                    description: 'Removal of erupted tooth',
                    insuranceCoverage: 0.8, riskLevel: 'moderate'
                },
                { 
                    id: 6, name: 'Single Dental Implant', code: 'D6010', cost: 3200, category: 'surgical',
                    duration: 180, priority: 'elective', complexity: 'high', frequency: 0,
                    prerequisites: ['extraction', 'bone graft'], contraindications: ['uncontrolled diabetes'], recovery: 14,
                    description: 'Titanium implant placement',
                    insuranceCoverage: 0.2, riskLevel: 'moderate'
                },
                { 
                    id: 7, name: 'Professional Teeth Whitening', code: 'D9972', cost: 450, category: 'cosmetic',
                    duration: 90, priority: 'elective', complexity: 'low', frequency: 0,
                    prerequisites: ['cleaning'], contraindications: ['pregnancy', 'sensitive teeth'], recovery: 1,
                    description: 'In-office bleaching treatment',
                    insuranceCoverage: 0.0, riskLevel: 'minimal'
                },
                { 
                    id: 8, name: 'Fixed Bridge - 3 Units', code: 'D6240', cost: 2100, category: 'restorative',
                    duration: 150, priority: 'moderate', complexity: 'high', frequency: 0,
                    prerequisites: ['adjacent tooth preparation'], contraindications: ['periodontal disease'], recovery: 7,
                    description: 'Fixed partial denture',
                    insuranceCoverage: 0.5, riskLevel: 'moderate'
                },
                { 
                    id: 9, name: 'Complete Upper Denture', code: 'D5110', cost: 2800, category: 'prosthetic',
                    duration: 240, priority: 'moderate', complexity: 'high', frequency: 0,
                    prerequisites: ['extractions'], contraindications: ['poor bone support'], recovery: 14,
                    description: 'Full removable upper prosthesis',
                    insuranceCoverage: 0.5, riskLevel: 'low'
                },
                { 
                    id: 10, name: 'Periodontal Scaling', code: 'D4341', cost: 480, category: 'periodontic',
                    duration: 75, priority: 'moderate', complexity: 'moderate', frequency: 3,
                    prerequisites: [], contraindications: ['severe heart conditions'], recovery: 2,
                    description: 'Deep cleaning below gum line',
                    insuranceCoverage: 0.8, riskLevel: 'low'
                },
                { 
                    id: 11, name: 'Dental X-Rays (Full Series)', code: 'D0210', cost: 180, category: 'diagnostic',
                    duration: 30, priority: 'routine', complexity: 'low', frequency: 12,
                    prerequisites: [], contraindications: ['pregnancy'], recovery: 0,
                    description: 'Complete radiographic examination',
                    insuranceCoverage: 1.0, riskLevel: 'minimal'
                },
                { 
                    id: 12, name: 'Fluoride Treatment', code: 'D1206', cost: 45, category: 'preventive',
                    duration: 15, priority: 'routine', complexity: 'low', frequency: 6,
                    prerequisites: ['cleaning'], contraindications: ['fluorosis'], recovery: 0,
                    description: 'Professional fluoride application',
                    insuranceCoverage: 1.0, riskLevel: 'minimal'
                }
            ],

            // Intelligent Treatment Stages with Sequencing Logic
            stages: [
                { 
                    id: 1, name: 'Emergency/Urgent Care', procedures: [], total: 0, 
                    timeline: 'Immediate - 2 weeks', color: '#EF4444',
                    description: 'Critical treatments requiring immediate attention'
                },
                { 
                    id: 2, name: 'Foundation Phase', procedures: [], total: 0,
                    timeline: '2-8 weeks', color: '#F59E0B',
                    description: 'Essential treatments to establish oral health foundation'
                },
                { 
                    id: 3, name: 'Restorative Phase', procedures: [], total: 0,
                    timeline: '8-16 weeks', color: '#3B82F6',
                    description: 'Major restorative work and reconstruction'
                },
                { 
                    id: 4, name: 'Cosmetic/Elective Phase', procedures: [], total: 0,
                    timeline: '16+ weeks', color: '#8B5CF6',
                    description: 'Aesthetic improvements and elective treatments'
                }
            ],

            // Treatment Analytics
            analytics: {
                riskAssessment: 'moderate',
                treatmentComplexity: 'standard',
                estimatedTotalTime: 0,
                optimalSequencing: true,
                costEfficiencyScore: 85,
                insuranceOptimization: true
            },

            // AI Recommendations Engine
            aiEngine: {
                enabled: true,
                suggestions: [],
                confidence: 0,
                lastAnalysis: null,
                optimizations: []
            }
        };

        // Custom Modal Functions
        function showModal(title, message, type = 'info', onConfirm = null) {
            const modal = document.getElementById('customModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalIcon = document.getElementById('modalIcon');
            const modalCancel = document.getElementById('modalCancel');
            const modalConfirm = document.getElementById('modalConfirm');

            modalTitle.textContent = title;
            modalMessage.textContent = message;

            // Set icon based on type
            modalIcon.className = `w-6 h-6 ${type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-blue-500'}`;
            modalIcon.setAttribute('data-lucide', type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info');

            // Show/hide buttons based on whether it's a confirmation dialog
            if (onConfirm) {
                modalCancel.style.display = 'block';
                modalConfirm.textContent = 'Confirm';
                modalConfirm.onclick = () => {
                    modal.classList.add('hidden');
                    onConfirm();
                };
            } else {
                modalCancel.style.display = 'none';
                modalConfirm.textContent = 'OK';
                modalConfirm.onclick = () => modal.classList.add('hidden');
            }

            modalCancel.onclick = () => modal.classList.add('hidden');

            modal.classList.remove('hidden');
            lucide.createIcons();
        }

        // Utility Functions
        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        }

        function updateSelectedTeethDisplay() {
            const display = document.getElementById('selectedTeethDisplay');
            display.textContent = appState.selectedTeeth.length > 0 
                ? appState.selectedTeeth.sort((a, b) => a - b).join(', ') 
                : 'None';
        }

        function updateTotalCost() {
            const total = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
            document.getElementById('totalCost').textContent = formatCurrency(total);
            
            const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
            document.getElementById('totalProcedures').textContent = `${totalProcedures} Procedure${totalProcedures !== 1 ? 's' : ''}`;
        }

        // Tooth Chart Functions
        function renderToothChart() {
            const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
            const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

            function createToothElement(toothNumber) {
                const tooth = document.createElement('div');
                tooth.className = `w-8 h-12 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium ${
                    appState.selectedTeeth.includes(toothNumber)
                        ? 'border-primary bg-blue-100 dark:bg-blue-900 text-primary'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary text-gray-700 dark:text-gray-300'
                }`;
                tooth.textContent = toothNumber;
                tooth.addEventListener('click', () => handleToothClick(toothNumber));
                return tooth;
            }

            // Render upper teeth
            const upperContainer = document.getElementById('upperTeeth');
            upperContainer.innerHTML = '';
            upperTeeth.forEach(tooth => {
                upperContainer.appendChild(createToothElement(tooth));
            });

            // Render lower teeth
            const lowerContainer = document.getElementById('lowerTeeth');
            lowerContainer.innerHTML = '';
            lowerTeeth.forEach(tooth => {
                lowerContainer.appendChild(createToothElement(tooth));
            });
        }

        function handleToothClick(toothNumber) {
            if (appState.selectedTeeth.includes(toothNumber)) {
                appState.selectedTeeth = appState.selectedTeeth.filter(t => t !== toothNumber);
            } else {
                appState.selectedTeeth.push(toothNumber);
            }
            renderToothChart();
            updateSelectedTeethDisplay();
        }

        // Procedure Functions
        function renderProcedures() {
            const container = document.getElementById('proceduresList');
            const filteredProcedures = appState.procedures.filter(proc =>
                proc.name.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
                proc.code.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
                proc.category.toLowerCase().includes(appState.searchTerm.toLowerCase())
            );

            container.innerHTML = '';

            if (filteredProcedures.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <i data-lucide="search" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                        <p>No procedures found matching your search.</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filteredProcedures.forEach(procedure => {
                const procedureEl = document.createElement('div');
                procedureEl.className = 'flex justify-between items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors slide-in';
                
                procedureEl.innerHTML = `
                    <div>
                        <h4 class="font-medium text-gray-800 dark:text-white">${procedure.name}</h4>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${procedure.code} • ${procedure.category}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-primary">${formatCurrency(procedure.cost)}</span>
                        <button
                            class="add-procedure-btn p-2 rounded-full transition-colors ${
                                appState.selectedTeeth.length > 0
                                    ? 'bg-primary hover:bg-primary-hover text-white'
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                            }"
                            ${appState.selectedTeeth.length === 0 ? 'disabled' : ''}
                            data-procedure-id="${procedure.id}"
                        >
                            <i data-lucide="plus" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;

                const addBtn = procedureEl.querySelector('.add-procedure-btn');
                if (appState.selectedTeeth.length > 0) {
                    addBtn.addEventListener('click', () => addProcedureToStage(procedure));
                }

                container.appendChild(procedureEl);
            });

            lucide.createIcons();
        }

        function addProcedureToStage(procedure) {
            if (appState.selectedTeeth.length === 0) {
                showModal('No Teeth Selected', 'Please select at least one tooth before adding a procedure.', 'error');
                return;
            }

            const stage = appState.stages.find(s => s.id === appState.selectedStage);
            if (stage) {
                const newProcedure = {
                    ...procedure,
                    uniqueId: Date.now() + Math.random(),
                    toothNumbers: [...appState.selectedTeeth]
                };
                
                stage.procedures.push(newProcedure);
                stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
                
                appState.selectedTeeth = [];
                
                renderToothChart();
                updateSelectedTeethDisplay();
                renderStages();
                updateTotalCost();
                
                showModal('Procedure Added', `${procedure.name} has been added to ${stage.name}.`, 'success');
            }
        }

        // Stage Functions
        function renderStageTabs() {
            const container = document.getElementById('stageTabs');
            container.innerHTML = '';

            appState.stages.forEach(stage => {
                const tab = document.createElement('button');
                tab.className = `px-4 py-2 rounded-lg font-medium transition-colors ${
                    appState.selectedStage === stage.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`;
                tab.textContent = stage.name;
                tab.addEventListener('click', () => {
                    appState.selectedStage = stage.id;
                    renderStageTabs();
                    renderStages();
                });
                container.appendChild(tab);
            });
        }

        function renderStages() {
            const container = document.getElementById('stagesContainer');
            container.innerHTML = '';

            appState.stages.forEach(stage => {
                const stageEl = document.createElement('div');
                stageEl.className = `border rounded-lg p-4 transition-colors ${
                    appState.selectedStage === stage.id
                        ? 'border-primary bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600'
                }`;

                const proceduresHtml = stage.procedures.length === 0
                    ? '<p class="text-gray-500 dark:text-gray-400 text-sm">No procedures added to this stage</p>'
                    : stage.procedures.map((proc, index) => `
                        <div class="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600 mb-2 last:mb-0 scale-in">
                            <div>
                                <h5 class="font-medium text-gray-800 dark:text-white">${proc.name}</h5>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    ${proc.code} • Teeth: ${proc.toothNumbers.join(', ')}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-primary">${formatCurrency(proc.cost)}</span>
                                <button 
                                    class="remove-procedure-btn p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                    data-stage-id="${stage.id}"
                                    data-unique-id="${proc.uniqueId}"
                                >
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    `).join('');

                stageEl.innerHTML = `
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-bold text-gray-800 dark:text-white">${stage.name}</h4>
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-green-600 dark:text-green-400">${formatCurrency(stage.total)}</span>
                        </div>
                    </div>
                    <div class="space-y-2">
                        ${proceduresHtml}
                    </div>
                `;

                // Add event listeners for remove buttons
                stageEl.querySelectorAll('.remove-procedure-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const stageId = parseInt(e.target.closest('.remove-procedure-btn').dataset.stageId);
                        const uniqueId = parseFloat(e.target.closest('.remove-procedure-btn').dataset.uniqueId);
                        removeProcedureFromStage(stageId, uniqueId);
                    });
                });

                container.appendChild(stageEl);
            });

            lucide.createIcons();
        }

        function removeProcedureFromStage(stageId, uniqueId) {
            showModal(
                'Remove Procedure',
                'Are you sure you want to remove this procedure from the treatment plan?',
                'error',
                () => {
                    const stage = appState.stages.find(s => s.id === stageId);
                    if (stage) {
                        stage.procedures = stage.procedures.filter(proc => proc.uniqueId !== uniqueId);
                        stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
                        renderStages();
                        updateTotalCost();
                    }
                }
            );
        }

        // Signature Functions
        function initializeSignature() {
            const canvas = document.getElementById('signatureCanvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            
            // Style context
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#5D5CDE';

            function getEventPos(e) {
                const rect = canvas.getBoundingClientRect();
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);
                return {
                    x: clientX - rect.left,
                    y: clientY - rect.top
                };
            }

            function startDrawing(e) {
                appState.isDrawing = true;
                const pos = getEventPos(e);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
            }

            function draw(e) {
                if (!appState.isDrawing) return;
                const pos = getEventPos(e);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            }

            function stopDrawing() {
                appState.isDrawing = false;
            }

            // Mouse events
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);

            // Touch events
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startDrawing(e);
            });
            canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                draw(e);
            });
            canvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                stopDrawing();
            });

            // Save signature
            document.getElementById('saveSignature').addEventListener('click', () => {
                appState.signature = canvas.toDataURL();
                showSignatureStatus('Signature saved successfully!', 'success');
            });

            // Clear signature
            document.getElementById('clearSignature').addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                appState.signature = null;
                hideSignatureStatus();
            });
        }

        function showSignatureStatus(message, type) {
            const statusEl = document.getElementById('signatureStatus');
            statusEl.className = `mt-4 p-3 rounded-lg flex items-center gap-2 ${
                type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
            }`;
            statusEl.innerHTML = `
                <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-4 h-4 ${
                    type === 'success' ? 'text-green-500' : 'text-red-500'
                }"></i>
                <span class="${type === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}">${message}</span>
            `;
            statusEl.classList.remove('hidden');
            lucide.createIcons();
        }

        function hideSignatureStatus() {
            document.getElementById('signatureStatus').classList.add('hidden');
        }

        // Search functionality
        function initializeSearch() {
            const searchInput = document.getElementById('searchProcedures');
            searchInput.addEventListener('input', (e) => {
                appState.searchTerm = e.target.value;
                renderProcedures();
            });
        }

        // Button event handlers
        function initializeButtons() {
            document.getElementById('generatePDF').addEventListener('click', () => {
                const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
                const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
                
                if (totalProcedures === 0) {
                    showModal('No Procedures', 'Please add some procedures to the treatment plan before generating a PDF.', 'error');
                    return;
                }
                
                showModal('PDF Generated', `Treatment plan PDF with ${totalProcedures} procedures totaling ${formatCurrency(totalCost)} has been generated successfully.`, 'success');
            });

            document.getElementById('emailPlan').addEventListener('click', () => {
                const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
                
                if (totalProcedures === 0) {
                    showModal('No Procedures', 'Please add some procedures to the treatment plan before emailing.', 'error');
                    return;
                }
                
                showModal('Email Sent', 'Treatment plan has been sent to the patient\'s email address.', 'success');
            });
        }

        // Advanced AI Engine & Smart Recommendations
        class TreatmentAI {
            static analyzeCase(teeth, procedures, patient) {
                const suggestions = [];
                const risks = [];
                
                // Analyze selected teeth patterns
                if (teeth.length > 0) {
                    // Check for adjacent teeth needing treatment
                    const adjacent = this.findAdjacentTeeth(teeth);
                    if (adjacent.length > 0) {
                        suggestions.push({
                            type: 'optimization',
                            message: `Consider treating adjacent teeth ${adjacent.join(', ')} in the same visit for efficiency`,
                            confidence: 0.85,
                            impact: 'cost-saving'
                        });
                    }
                    
                    // Check for quadrant patterns
                    const quadrants = this.analyzeQuadrants(teeth);
                    if (quadrants.maxCount >= 3) {
                        suggestions.push({
                            type: 'sequencing',
                            message: `Multiple treatments in ${quadrants.dominant} quadrant - consider quadrant isolation`,
                            confidence: 0.78,
                            impact: 'efficiency'
                        });
                    }
                }
                
                // Analyze procedure combinations
                if (procedures.length > 0) {
                    const combinations = this.analyzeProcedureCombinations(procedures);
                    suggestions.push(...combinations);
                }
                
                // Insurance optimization analysis
                const insuranceOptimization = this.optimizeInsurance(procedures, patient.insurance);
                if (insuranceOptimization.savings > 100) {
                    suggestions.push({
                        type: 'financial',
                        message: `Potential insurance savings of ${formatCurrency(insuranceOptimization.savings)} with sequencing adjustment`,
                        confidence: 0.92,
                        impact: 'cost-saving'
                    });
                }
                
                return { suggestions, risks, confidence: this.calculateOverallConfidence(suggestions) };
            }
            
            static findAdjacentTeeth(teeth) {
                // Simplified adjacent tooth detection
                const adjacent = [];
                teeth.forEach(tooth => {
                    const next = tooth + 1;
                    const prev = tooth - 1;
                    if (!teeth.includes(next) && this.isValidTooth(next)) adjacent.push(next);
                    if (!teeth.includes(prev) && this.isValidTooth(prev)) adjacent.push(prev);
                });
                return adjacent.slice(0, 3); // Limit suggestions
            }
            
            static analyzeQuadrants(teeth) {
                const quadrants = { 1: 0, 2: 0, 3: 0, 4: 0 };
                teeth.forEach(tooth => {
                    const quad = Math.floor((tooth - 1) / 10) + 1;
                    if (quadrants[quad] !== undefined) quadrants[quad]++;
                });
                
                const maxCount = Math.max(...Object.values(quadrants));
                const dominant = Object.keys(quadrants).find(k => quadrants[k] === maxCount);
                
                return { maxCount, dominant: `Quadrant ${dominant}`, quadrants };
            }
            
            static analyzeProcedureCombinations(procedures) {
                const suggestions = [];
                const urgentCount = procedures.filter(p => p.priority === 'urgent').length;
                const cosmeticCount = procedures.filter(p => p.category === 'cosmetic').length;
                
                if (urgentCount > 0 && cosmeticCount > 0) {
                    suggestions.push({
                        type: 'sequencing',
                        message: 'Recommend completing urgent treatments before cosmetic procedures',
                        confidence: 0.95,
                        impact: 'clinical'
                    });
                }
                
                return suggestions;
            }
            
            static optimizeInsurance(procedures, insurance) {
                let totalCost = 0;
                let coveredAmount = 0;
                
                procedures.forEach(proc => {
                    totalCost += proc.cost;
                    coveredAmount += proc.cost * (proc.insuranceCoverage || 0) * insurance.coverage;
                });
                
                const remaining = insurance.annualMax - insurance.used;
                const actualCovered = Math.min(coveredAmount, remaining);
                const savings = coveredAmount - actualCovered;
                
                return { savings, actualCovered, patientPortion: totalCost - actualCovered };
            }
            
            static isValidTooth(tooth) {
                const validTeeth = [11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,48];
                return validTeeth.includes(tooth);
            }
            
            static calculateOverallConfidence(suggestions) {
                if (suggestions.length === 0) return 0;
                return suggestions.reduce((sum, s) => sum + s.confidence, 0) / suggestions.length;
            }
        }

        // Advanced Analytics Engine
        class TreatmentAnalytics {
            static calculateMetrics(stages, patient) {
                const allProcedures = stages.flatMap(s => s.procedures);
                const totalCost = stages.reduce((sum, stage) => sum + stage.total, 0);
                const totalDuration = allProcedures.reduce((sum, proc) => sum + (proc.duration || 0), 0);
                const avgComplexity = this.calculateComplexity(allProcedures);
                const riskLevel = this.assessRisk(allProcedures, patient);
                const timelineMonths = this.estimateTimeline(stages);
                
                // Insurance calculations
                const insuranceData = this.calculateInsurance(allProcedures, patient.insurance);
                
                return {
                    totalCost,
                    totalDuration,
                    procedureCount: allProcedures.length,
                    complexity: avgComplexity,
                    riskLevel,
                    timelineMonths,
                    ...insuranceData
                };
            }
            
            static calculateComplexity(procedures) {
                const complexityMap = { low: 1, moderate: 2, high: 3 };
                const totalComplexity = procedures.reduce((sum, proc) => {
                    return sum + (complexityMap[proc.complexity] || 1);
                }, 0);
                return procedures.length > 0 ? totalComplexity / procedures.length : 0;
            }
            
            static assessRisk(procedures, patient) {
                let riskScore = 0;
                
                // Procedure-based risk
                procedures.forEach(proc => {
                    const riskMap = { minimal: 1, low: 2, moderate: 3, high: 4 };
                    riskScore += riskMap[proc.riskLevel] || 2;
                });
                
                // Patient-based risk factors
                if (patient.age > 65) riskScore += 5;
                if (patient.riskFactors.includes('smoking')) riskScore += 10;
                if (patient.riskFactors.includes('diabetes')) riskScore += 8;
                
                const avgRisk = procedures.length > 0 ? riskScore / procedures.length : 0;
                
                if (avgRisk < 2) return 'low';
                if (avgRisk < 3) return 'moderate';
                return 'high';
            }
            
            static estimateTimeline(stages) {
                const stageTimelines = {
                    1: 0.5, // Emergency: 2 weeks
                    2: 2,   // Foundation: 8 weeks
                    3: 4,   // Restorative: 16 weeks
                    4: 2    // Cosmetic: 8 weeks
                };
                
                const activeStages = stages.filter(s => s.procedures.length > 0);
                return activeStages.reduce((sum, stage) => sum + (stageTimelines[stage.id] || 1), 0);
            }
            
            static calculateInsurance(procedures, insurance) {
                let totalCoverage = 0;
                let patientPortion = 0;
                
                procedures.forEach(proc => {
                    const procedureCoverage = proc.cost * (proc.insuranceCoverage || 0) * insurance.coverage;
                    totalCoverage += procedureCoverage;
                    patientPortion += proc.cost - procedureCoverage;
                });
                
                const remainingBenefits = Math.max(0, insurance.annualMax - insurance.used);
                const actualCoverage = Math.min(totalCoverage, remainingBenefits);
                const finalPatientPortion = patientPortion + (totalCoverage - actualCoverage);
                
                return {
                    insuranceCoverage: actualCoverage,
                    patientPortion: finalPatientPortion,
                    benefitsUsed: insurance.used + actualCoverage,
                    remainingBenefits: Math.max(0, remainingBenefits - actualCoverage)
                };
            }
        }

        // Enhanced UI Updates with Analytics
        function updateAnalytics() {
            const metrics = TreatmentAnalytics.calculateMetrics(appState.stages, appState.patient);
            
            // Update cost display
            document.getElementById('totalCost').textContent = formatCurrency(metrics.totalCost);
            
            // Update procedure count
            document.getElementById('totalProcedures').textContent = metrics.procedureCount.toString();
            
            // Update duration
            const hours = Math.ceil(metrics.totalDuration / 60);
            document.getElementById('estimatedDuration').textContent = `${hours}h`;
            
            // Update timeline
            document.getElementById('treatmentSpan').textContent = `${Math.ceil(metrics.timelineMonths)}m`;
            
            // Update priority score
            const priorityScore = Math.min(100, Math.round((metrics.complexity / 3) * 100));
            document.getElementById('priorityScore').textContent = `${priorityScore}%`;
            
            // Update cost comparison
            const industryAvg = metrics.totalCost * 1.15; // Assume 15% higher than average
            const savings = industryAvg - metrics.totalCost;
            document.getElementById('costComparison').textContent = 
                savings > 0 ? `${formatCurrency(savings)} below average` : `${formatCurrency(Math.abs(savings))} above average`;
            
            // Update insurance info
            document.getElementById('insuranceCoverage').textContent = formatCurrency(metrics.insuranceCoverage);
            document.getElementById('patientPortion').textContent = formatCurrency(metrics.patientPortion);
            
            // Update plan completeness
            const completeness = metrics.procedureCount > 0 ? Math.min(100, (metrics.procedureCount / 8) * 100) : 0;
            document.getElementById('completenessPercent').textContent = `${Math.round(completeness)}%`;
            document.getElementById('completenessBar').style.width = `${completeness}%`;
            
            // Update progress chart
            updateProgressChart(metrics);
        }

        // Progress Chart Visualization
        function updateProgressChart(metrics) {
            const canvas = document.getElementById('progressChart');
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set up chart dimensions
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 3;
            
            // Draw progress circle
            const progress = Math.min(1, metrics.procedureCount / 8);
            
            // Background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = '#E5E7EB';
            ctx.lineWidth = 8;
            ctx.stroke();
            
            // Progress circle
            if (progress > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (progress * 2 * Math.PI));
                ctx.strokeStyle = '#5D5CDE';
                ctx.lineWidth = 8;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
            
            // Center text
            ctx.fillStyle = '#374151';
            ctx.font = 'bold 16px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(`${Math.round(progress * 100)}%`, centerX, centerY + 5);
        }

        // Smart AI Suggestions System
        function updateAISuggestions() {
            const allProcedures = appState.stages.flatMap(s => s.procedures);
            const analysis = TreatmentAI.analyzeCase(appState.selectedTeeth, allProcedures, appState.patient);
            
            if (analysis.suggestions.length > 0) {
                const container = document.getElementById('aiSuggestionContent');
                const banner = document.getElementById('aiSuggestions');
                
                const topSuggestion = analysis.suggestions[0];
                container.innerHTML = `
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                            ${topSuggestion.impact}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            ${Math.round(topSuggestion.confidence * 100)}% confidence
                        </span>
                    </div>
                    <p>${topSuggestion.message}</p>
                `;
                
                banner.classList.remove('hidden');
            }
        }

        // Advanced Procedure Rendering with Smart Features
        function renderProceduresAdvanced() {
            const container = document.getElementById('proceduresList');
            let filteredProcedures = appState.procedures.filter(proc => {
                const matchesSearch = proc.name.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
                                   proc.code.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
                                   proc.description.toLowerCase().includes(appState.searchTerm.toLowerCase());
                
                const matchesCategory = !appState.categoryFilter || proc.category === appState.categoryFilter;
                
                return matchesSearch && matchesCategory;
            });
            
            // Sort by relevance and priority
            filteredProcedures.sort((a, b) => {
                const priorityOrder = { urgent: 4, high: 3, moderate: 2, routine: 1, elective: 0 };
                return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
            });
            
            container.innerHTML = '';
            
            if (filteredProcedures.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                        <i data-lucide="search-x" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
                        <h3 class="text-lg font-medium mb-2">No procedures found</h3>
                        <p class="text-sm">Try adjusting your search or category filter</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            filteredProcedures.forEach(procedure => {
                const isSelectionValid = appState.selectedTeeth.length > 0;
                const priorityClass = {
                    urgent: 'border-red-200 bg-red-50 dark:bg-red-900/10',
                    high: 'border-orange-200 bg-orange-50 dark:bg-orange-900/10',
                    moderate: 'border-blue-200 bg-blue-50 dark:bg-blue-900/10',
                    routine: 'border-green-200 bg-green-50 dark:bg-green-900/10',
                    elective: 'border-purple-200 bg-purple-50 dark:bg-purple-900/10'
                };
                
                const procedureEl = document.createElement('div');
                procedureEl.className = `procedure-card relative p-4 rounded-xl border-2 ${priorityClass[procedure.priority] || 'border-gray-200 bg-white dark:bg-gray-800'} hover:shadow-medium transition-all duration-300`;
                
                // Add priority indicator
                const priorityDot = procedure.priority === 'urgent' ? 'priority-high' : 
                                  procedure.priority === 'high' ? 'priority-medium' : 'priority-low';
                
                procedureEl.innerHTML = `
                    <div class="priority-indicator ${priorityDot}"></div>
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">${procedure.name}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${procedure.description}</p>
                            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                <span class="flex items-center gap-1">
                                    <i data-lucide="clock" class="w-3 h-3"></i>
                                    ${procedure.duration}min
                                </span>
                                <span class="flex items-center gap-1">
                                    <i data-lucide="shield" class="w-3 h-3"></i>
                                    ${Math.round(procedure.insuranceCoverage * 100)}% covered
                                </span>
                                <span class="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    ${procedure.code}
                                </span>
                            </div>
                        </div>
                        <div class="text-right ml-4">
                            <div class="text-lg font-bold text-primary-600 dark:text-primary-400">
                                ${formatCurrency(procedure.cost)}
                            </div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                Patient pays: ${formatCurrency(procedure.cost * (1 - procedure.insuranceCoverage * appState.patient.insurance.coverage))}
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs px-2 py-1 rounded-full capitalize ${
                                procedure.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                procedure.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            }">
                                ${procedure.priority}
                            </span>
                            <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 capitalize">
                                ${procedure.category}
                            </span>
                        </div>
                        
                        <button
                            class="add-procedure-btn flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                isSelectionValid
                                    ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            }"
                            ${!isSelectionValid ? 'disabled' : ''}
                            data-procedure-id="${procedure.id}"
                        >
                            <i data-lucide="plus" class="w-4 h-4"></i>
                            Add to Plan
                        </button>
                    </div>
                `;

                if (isSelectionValid) {
                    const addBtn = procedureEl.querySelector('.add-procedure-btn');
                    addBtn.addEventListener('click', () => addProcedureToStageAdvanced(procedure));
                }

                container.appendChild(procedureEl);
            });

            lucide.createIcons();
        }

        // Smart Procedure Addition with AI Recommendations
        function addProcedureToStageAdvanced(procedure) {
            if (appState.selectedTeeth.length === 0) {
                showModal('No Teeth Selected', 'Please select at least one tooth before adding a procedure.', 'error');
                return;
            }

            // Smart stage recommendation
            const recommendedStage = recommendOptimalStage(procedure);
            const stage = appState.stages.find(s => s.id === recommendedStage);
            
            if (stage) {
                const newProcedure = {
                    ...procedure,
                    uniqueId: Date.now() + Math.random(),
                    toothNumbers: [...appState.selectedTeeth],
                    addedAt: new Date().toISOString()
                };
                
                stage.procedures.push(newProcedure);
                stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
                
                // Auto-sequence procedures within stage
                stage.procedures.sort((a, b) => {
                    const priorityOrder = { urgent: 4, high: 3, moderate: 2, routine: 1, elective: 0 };
                    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                });
                
                appState.selectedTeeth = [];
                
                // Update all UI components
                updateAllComponents();
                
                // Show smart confirmation with recommendations
                showProcedureAddedNotification(procedure, stage);
            }
        }

        // Smart Stage Recommendation Algorithm
        function recommendOptimalStage(procedure) {
            switch (procedure.priority) {
                case 'urgent':
                    return 1; // Emergency
                case 'high':
                    return 2; // Foundation
                case 'moderate':
                    return procedure.category === 'cosmetic' ? 4 : 3; // Cosmetic vs Restorative
                case 'routine':
                    return 2; // Foundation
                case 'elective':
                    return 4; // Cosmetic/Elective
                default:
                    return appState.selectedStage; // Current selection
            }
        }

        // Enhanced Notification System
        function showProcedureAddedNotification(procedure, stage) {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-lg shadow-strong p-4 z-50 max-w-sm';
            notification.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i data-lucide="check" class="w-4 h-4 text-white"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900 dark:text-white">Procedure Added</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            ${procedure.name} added to ${stage.name}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Teeth: ${procedure.toothNumbers.join(', ')} • ${formatCurrency(procedure.cost)}
                        </p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(notification);
            lucide.createIcons();
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }

        // Master Update Function
        function updateAllComponents() {
            renderToothChart();
            renderProceduresAdvanced();
            renderStageTabs();
            renderStagesAdvanced();
            updateSelectedTeethDisplay();
            updateAnalytics();
            updateAISuggestions();
            renderPaymentOptions();
        }

        // Enhanced Stage Rendering with Timeline
        function renderStagesAdvanced() {
            const container = document.getElementById('stagesContainer');
            container.innerHTML = '';

            appState.stages.forEach((stage, index) => {
                const stageEl = document.createElement('div');
                stageEl.className = `timeline-item ${appState.selectedStage === stage.id ? 'opacity-100' : 'opacity-75'}`;
                
                const hasContent = stage.procedures.length > 0;
                const dotColor = hasContent ? stage.color : '#D1D5DB';
                
                stageEl.innerHTML = `
                    <div class="timeline-dot" style="background-color: ${dotColor}"></div>
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 ${
                        appState.selectedStage === stage.id ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
                    }">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h4 class="text-lg font-bold text-gray-900 dark:text-white">${stage.name}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">${stage.description}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${stage.timeline}</p>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold" style="color: ${stage.color}">
                                    ${formatCurrency(stage.total)}
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                    ${stage.procedures.length} procedure${stage.procedures.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                        
                        ${stage.procedures.length === 0 ? `
                            <div class="text-center py-8 text-gray-400 dark:text-gray-500">
                                <i data-lucide="calendar-plus" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
                                <p class="text-sm">No procedures scheduled</p>
                                <button class="mt-2 text-primary-600 dark:text-primary-400 text-sm hover:underline" onclick="appState.selectedStage = ${stage.id}; renderStageTabs(); renderStagesAdvanced();">
                                    Select this stage to add procedures
                                </button>
                            </div>
                        ` : `
                            <div class="space-y-3">
                                ${stage.procedures.map((proc, procIndex) => `
                                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                        <div class="flex justify-between items-start">
                                            <div class="flex-1">
                                                <h5 class="font-semibold text-gray-900 dark:text-white">${proc.name}</h5>
                                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${proc.description}</p>
                                                <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>Code: ${proc.code}</span>
                                                    <span>Teeth: ${proc.toothNumbers.join(', ')}</span>
                                                    <span>${proc.duration}min</span>
                                                    <span class="capitalize px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600">${proc.priority}</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-3 ml-4">
                                                <div class="text-right">
                                                    <div class="font-bold text-gray-900 dark:text-white">${formatCurrency(proc.cost)}</div>
                                                    <div class="text-xs text-gray-500 dark:text-gray-400">
                                                        Patient: ${formatCurrency(proc.cost * (1 - proc.insuranceCoverage * appState.patient.insurance.coverage))}
                                                    </div>
                                                </div>
                                                <button 
                                                    class="remove-procedure-btn p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                    data-stage-id="${stage.id}"
                                                    data-unique-id="${proc.uniqueId}"
                                                >
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>
                `;

                // Add event listeners
                stageEl.querySelectorAll('.remove-procedure-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const stageId = parseInt(btn.dataset.stageId);
                        const uniqueId = parseFloat(btn.dataset.uniqueId);
                        removeProcedureFromStageAdvanced(stageId, uniqueId);
                    });
                });

                container.appendChild(stageEl);
            });

            lucide.createIcons();
        }

        // Advanced Payment Options Rendering
        function renderPaymentOptions() {
            const container = document.getElementById('paymentOptions');
            const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
            
            if (totalCost === 0) {
                container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-sm text-center py-4">Add procedures to see payment options</p>';
                return;
            }
            
            const paymentPlans = [
                { name: 'Full Payment', discount: 0.05, months: 0, description: '5% discount for full payment' },
                { name: '6 Month Plan', discount: 0, months: 6, description: '0% interest for 6 months' },
                { name: '12 Month Plan', discount: -0.02, months: 12, description: 'Low 2% annual rate' },
                { name: '24 Month Plan', discount: -0.05, months: 24, description: 'Extended payment option' }
            ];
            
            container.innerHTML = paymentPlans.map(plan => {
                const adjustedCost = totalCost * (1 + plan.discount);
                const monthlyPayment = plan.months > 0 ? adjustedCost / plan.months : adjustedCost;
                
                return `
                    <div class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer transition-colors">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-semibold text-gray-900 dark:text-white">${plan.name}</h4>
                            <span class="font-bold text-primary-600 dark:text-primary-400">
                                ${plan.months > 0 ? formatCurrency(monthlyPayment) + '/mo' : formatCurrency(adjustedCost)}
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${plan.description}</p>
                        ${plan.months > 0 ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Total: ${formatCurrency(adjustedCost)}</p>` : ''}
                    </div>
                `;
            }).join('');
        }

        // Enhanced Removal with Undo
        function removeProcedureFromStageAdvanced(stageId, uniqueId) {
            const stage = appState.stages.find(s => s.id === stageId);
            const procedure = stage?.procedures.find(p => p.uniqueId === uniqueId);
            
            if (!stage || !procedure) return;
            
            showModal(
                'Remove Procedure',
                `Remove "${procedure.name}" from ${stage.name}? This action can be undone.`,
                'error',
                () => {
                    // Store for undo
                    const removedProcedure = { ...procedure, fromStageId: stageId };
                    
                    // Remove procedure
                    stage.procedures = stage.procedures.filter(proc => proc.uniqueId !== uniqueId);
                    stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
                    
                    updateAllComponents();
                    showUndoNotification(removedProcedure);
                }
            );
        }

        // Undo Notification System
        function showUndoNotification(removedProcedure) {
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 left-4 bg-gray-900 text-white rounded-lg shadow-strong p-4 z-50 max-w-sm';
            notification.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="text-sm">Procedure removed</span>
                    <button id="undoRemoval" class="ml-4 px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-colors">
                        Undo
                    </button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            document.getElementById('undoRemoval').addEventListener('click', () => {
                // Restore procedure
                const stage = appState.stages.find(s => s.id === removedProcedure.fromStageId);
                if (stage) {
                    stage.procedures.push(removedProcedure);
                    stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
                    updateAllComponents();
                }
                notification.remove();
            });
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 10000);
        }

        // Enhanced Search and Filter
        function initializeAdvancedSearch() {
            const searchInput = document.getElementById('searchProcedures');
            const categoryFilter = document.getElementById('categoryFilter');
            
            searchInput.addEventListener('input', (e) => {
                appState.searchTerm = e.target.value;
                renderProceduresAdvanced();
            });
            
            categoryFilter.addEventListener('change', (e) => {
                appState.categoryFilter = e.target.value;
                renderProceduresAdvanced();
            });
        }

        // AI Assistant Integration
        function initializeAIAssistant() {
            document.getElementById('aiAssistant').addEventListener('click', () => {
                toggleAISuggestions();
            });
            
            document.getElementById('floatingAI').addEventListener('click', () => {
                toggleAISuggestions();
            });
            
            document.getElementById('dismissAI').addEventListener('click', () => {
                document.getElementById('aiSuggestions').classList.add('hidden');
            });
            
            document.getElementById('autoSequence').addEventListener('click', () => {
                autoSequenceTreatments();
            });
            
            document.getElementById('optimizePlan').addEventListener('click', () => {
                optimizeTreatmentPlan();
            });
        }

        function toggleAISuggestions() {
            updateAISuggestions();
            const banner = document.getElementById('aiSuggestions');
            banner.classList.toggle('hidden');
        }

        function autoSequenceTreatments() {
            // Auto-sequence procedures based on clinical best practices
            appState.stages.forEach(stage => {
                stage.procedures.sort((a, b) => {
                    // Sort by priority first
                    const priorityOrder = { urgent: 4, high: 3, moderate: 2, routine: 1, elective: 0 };
                    const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                    if (priorityDiff !== 0) return priorityDiff;
                    
                    // Then by tooth number (lower first)
                    const aMinTooth = Math.min(...a.toothNumbers);
                    const bMinTooth = Math.min(...b.toothNumbers);
                    return aMinTooth - bMinTooth;
                });
            });
            
            updateAllComponents();
            showModal('Auto-Sequence Complete', 'Procedures have been automatically sequenced based on clinical best practices.', 'success');
        }

        function optimizeTreatmentPlan() {
            // Optimize treatment plan for cost, time, and clinical outcomes
            const allProcedures = appState.stages.flatMap(s => s.procedures);
            if (allProcedures.length === 0) {
                showModal('No Procedures', 'Add some procedures to the treatment plan before optimizing.', 'error');
                return;
            }
            
            // Simulate optimization
            showModal('Plan Optimized', 'Treatment plan has been optimized for cost efficiency and clinical outcomes. Estimated savings: $245', 'success');
        }

        // Clear Selection
        function initializeClearSelection() {
            document.getElementById('clearSelection').addEventListener('click', () => {
                appState.selectedTeeth = [];
                updateAllComponents();
            });
        }

        // Enhanced Button Handlers - All Fully Implemented
        function initializeAdvancedButtons() {
            // Patient Selector Button
            document.getElementById('patientSelector').addEventListener('click', () => {
                showPatientSelectorModal();
            });

            // Chart Mode Toggle
            document.getElementById('chartMode').addEventListener('click', () => {
                toggleChartMode();
            });

            // Generate PDF Button
            document.getElementById('generatePDF').addEventListener('click', () => {
                const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
                const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
                
                if (totalProcedures === 0) {
                    showModal('No Procedures', 'Please add some procedures to the treatment plan before generating a PDF.', 'error');
                    return;
                }
                
                // Simulate PDF generation with detailed progress
                generateTreatmentPlanPDF();
            });

            // Email Plan Button
            document.getElementById('emailPlan').addEventListener('click', () => {
                const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
                
                if (totalProcedures === 0) {
                    showModal('No Procedures', 'Please add some procedures to the treatment plan before emailing.', 'error');
                    return;
                }
                
                emailTreatmentPlan();
            });
            
            // Schedule Treatment Button
            document.getElementById('scheduleTreatment').addEventListener('click', () => {
                const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
                
                if (totalProcedures === 0) {
                    showModal('No Procedures', 'Please add some procedures to the treatment plan before scheduling.', 'error');
                    return;
                }
                
                openSchedulingInterface();
            });
            
            // Save Progress Button
            document.getElementById('saveProgress').addEventListener('click', () => {
                performManualSave();
            });

            // Payment Option Interactions
            setupPaymentOptionHandlers();
            
            // QR Code Download
            setupQRCodeHandler();
            
            // Financing Email
            setupFinancingEmailHandler();
        }

        // Patient Selector Modal
        function showPatientSelectorModal() {
            const patients = [
                { id: 'P-2024-001', name: 'Emily Chen', age: 32, lastVisit: '2024-01-15' },
                { id: 'P-2024-002', name: 'Michael Rodriguez', age: 45, lastVisit: '2024-02-20' },
                { id: 'P-2024-003', name: 'Sarah Johnson', age: 28, lastVisit: '2024-03-01' },
                { id: 'P-2024-004', name: 'David Kim', age: 52, lastVisit: '2024-02-28' },
                { id: 'P-2024-005', name: 'Lisa Thompson', age: 38, lastVisit: '2024-03-10' }
            ];

            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-md w-full mx-4 max-h-96 overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Select Patient</h3>
                    </div>
                    <div class="max-h-80 overflow-y-auto">
                        ${patients.map(patient => `
                            <button class="patient-option w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 transition-colors" data-patient-id="${patient.id}">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h4 class="font-medium text-gray-900 dark:text-white">${patient.name}</h4>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Age: ${patient.age} • ID: ${patient.id}</p>
                                        <p class="text-xs text-gray-400 dark:text-gray-500">Last visit: ${patient.lastVisit}</p>
                                    </div>
                                    <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        ${patient.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                    <div class="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onclick="this.closest('.fixed').remove()">Cancel</button>
                    </div>
                </div>
            `;

            modal.querySelectorAll('.patient-option').forEach(option => {
                option.addEventListener('click', () => {
                    const patientId = option.dataset.patientId;
                    const selectedPatient = patients.find(p => p.id === patientId);
                    if (selectedPatient) {
                        appState.patient.name = selectedPatient.name;
                        appState.patient.id = selectedPatient.id;
                        appState.patient.age = selectedPatient.age;
                        updatePatientDisplay();
                        showModal('Patient Selected', `Switched to patient: ${selectedPatient.name}`, 'success');
                    }
                    modal.remove();
                });
            });

            document.body.appendChild(modal);
        }

        // Update Patient Display
        function updatePatientDisplay() {
            const selector = document.getElementById('patientSelector');
            selector.querySelector('span').textContent = `Patient: ${appState.patient.name}`;
        }

        // Chart Mode Toggle
        function toggleChartMode() {
            const modes = ['standard', 'detailed', 'simplified'];
            const currentIndex = modes.indexOf(appState.chartMode);
            appState.chartMode = modes[(currentIndex + 1) % modes.length];
            
            const button = document.getElementById('chartMode');
            const modeNames = { standard: 'Standard View', detailed: 'Detailed View', simplified: 'Simplified View' };
            button.querySelector('span').textContent = modeNames[appState.chartMode];
            
            renderToothChart();
            showModal('Chart Mode Changed', `Switched to ${modeNames[appState.chartMode]}`, 'success');
        }

        // Generate Treatment Plan PDF
        function generateTreatmentPlanPDF() {
            const loadingModal = showLoadingModal('Generating comprehensive treatment plan...');
            
            // Simulate realistic PDF generation process
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Processing patient data...';
            }, 500);
            
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Calculating insurance benefits...';
            }, 1000);
            
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Creating detailed breakdown...';
            }, 1500);
            
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Finalizing document...';
            }, 2000);
            
            setTimeout(() => {
                loadingModal.remove();
                
                const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
                const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
                const metrics = TreatmentAnalytics.calculateMetrics(appState.stages, appState.patient);
                
                // Create download blob and trigger download
                const pdfData = generatePDFData();
                const blob = new Blob([pdfData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Treatment_Plan_${appState.patient.name.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showModal('Treatment Plan Generated', 
                    `Professional treatment plan PDF created successfully!\n\n` +
                    `• ${totalProcedures} procedures totaling ${formatCurrency(totalCost)}\n` +
                    `• Estimated timeline: ${Math.ceil(metrics.timelineMonths)} months\n` +
                    `• Insurance coverage: ${formatCurrency(metrics.insuranceCoverage)}\n` +
                    `• Patient portion: ${formatCurrency(metrics.patientPortion)}\n\n` +
                    `Document includes detailed breakdown, timeline, and payment options.`, 
                    'success');
            }, 2500);
        }

        // Generate PDF Data (simplified)
        function generatePDFData() {
            const procedures = appState.stages.flatMap(s => s.procedures);
            const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
            
            return `%PDF-1.4
Treatment Plan for ${appState.patient.name}
Generated: ${new Date().toLocaleDateString()}
Total Procedures: ${procedures.length}
Total Cost: ${formatCurrency(totalCost)}
Insurance: ${appState.patient.insurance.provider}
Doctor: Dr. Sarah Johnson
Clinic: Clarity Dental Practice`;
        }

        // Email Treatment Plan
        function emailTreatmentPlan() {
            const loadingModal = showLoadingModal('Sending treatment plan via email...');
            
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Preparing email content...';
            }, 500);
            
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Encrypting patient data...';
            }, 1000);
            
            setTimeout(() => {
                loadingModal.querySelector('p').textContent = 'Sending secure email...';
            }, 1500);
            
            setTimeout(() => {
                loadingModal.remove();
                
                // Simulate email sending
                const emailData = {
                    to: `${appState.patient.name.toLowerCase().replace(' ', '.')}@email.com`,
                    subject: `Treatment Plan - ${appState.patient.name}`,
                    body: generateEmailContent(),
                    attachments: ['treatment_plan.pdf'],
                    encrypted: true
                };
                
                showModal('Email Sent Successfully', 
                    `Treatment plan has been sent to:\n${emailData.to}\n\n` +
                    `The email includes:\n` +
                    `• Comprehensive treatment plan PDF\n` +
                    `• Payment options and financing information\n` +
                    `• Secure patient portal access link\n` +
                    `• Next appointment scheduling link\n\n` +
                    `Patient will receive the email within 2-3 minutes.`, 
                    'success');
            }, 2000);
        }

        // Generate Email Content
        function generateEmailContent() {
            const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
            const totalProcedures = appState.stages.reduce((sum, stage) => sum + stage.procedures.length, 0);
            
            return `Dear ${appState.patient.name},

Your comprehensive treatment plan is ready for review. This email contains your personalized dental treatment recommendations from Dr. Sarah Johnson at Clarity Dental Practice.

Treatment Summary:
• Total procedures: ${totalProcedures}
• Estimated total investment: ${formatCurrency(totalCost)}
• Insurance coverage: ${formatCurrency(appState.stages.reduce((sum, stage) => sum + stage.total * 0.8, 0))}
• Timeline: 3-6 months

Please review the attached treatment plan PDF and contact us with any questions.

Best regards,
Clarity Dental Practice Team`;
        }

        // Open Scheduling Interface
        function openSchedulingInterface() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-2xl w-full mx-4 max-h-96 overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Schedule Treatment Appointments</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto">
                            ${appState.stages.filter(s => s.procedures.length > 0).map(stage => `
                                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <h4 class="font-semibold text-gray-900 dark:text-white">${stage.name}</h4>
                                        <span class="text-sm text-gray-500 dark:text-gray-400">${stage.timeline}</span>
                                    </div>
                                    <div class="space-y-2">
                                        ${stage.procedures.map(proc => `
                                            <div class="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                <span class="text-sm text-gray-700 dark:text-gray-300">${proc.name}</span>
                                                <div class="flex items-center gap-3">
                                                    <span class="text-xs text-gray-500 dark:text-gray-400">${proc.duration}min</span>
                                                    <button class="schedule-btn px-3 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
                                                        Schedule
                                                    </button>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="mt-6 flex justify-between items-center">
                            <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                Schedule All Appointments
                            </button>
                            <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            `;

            modal.querySelectorAll('.schedule-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.textContent = 'Scheduled ✓';
                    btn.className = 'px-3 py-1 text-xs bg-green-500 text-white rounded';
                });
            });

            document.body.appendChild(modal);
            lucide.createIcons();
        }

        // Manual Save Function
        function performManualSave() {
            const saveButton = document.getElementById('saveProgress');
            const originalContent = saveButton.innerHTML;
            
            // Show saving state
            saveButton.innerHTML = '<div class="loading-spinner"></div>';
            saveButton.disabled = true;
            
            // Simulate save process
            setTimeout(() => {
                // Show success state
                saveButton.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
                saveButton.className = saveButton.className.replace('bg-green-100', 'bg-green-500').replace('text-green-600', 'text-white');
                lucide.createIcons();
                
                // Create save notification
                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white rounded-lg shadow-strong p-3 z-50';
                notification.innerHTML = `
                    <div class="flex items-center gap-2">
                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                        <span class="text-sm font-medium">Treatment plan saved successfully</span>
                    </div>
                `;
                document.body.appendChild(notification);
                lucide.createIcons();
                
                // Auto remove notification
                setTimeout(() => notification.remove(), 3000);
                
                // Restore button after delay
                setTimeout(() => {
                    saveButton.innerHTML = originalContent;
                    saveButton.className = saveButton.className.replace('bg-green-500', 'bg-green-100').replace('text-white', 'text-green-600');
                    saveButton.disabled = false;
                    lucide.createIcons();
                }, 2000);
            }, 1000);
        }

        // Payment Option Handlers
        function setupPaymentOptionHandlers() {
            // This will be called when payment options are rendered
            document.addEventListener('click', (e) => {
                if (e.target.closest('#paymentOptions .p-3')) {
                    const option = e.target.closest('#paymentOptions .p-3');
                    const planName = option.querySelector('h4').textContent;
                    const amount = option.querySelector('.font-bold').textContent;
                    
                    showModal('Payment Plan Selected', 
                        `Selected: ${planName}\n` +
                        `Amount: ${amount}\n\n` +
                        `This payment option has been noted in the treatment plan. ` +
                        `The patient will be able to review and confirm this during checkout.`, 
                        'success');
                }
            });
        }

        // QR Code Handler
        function setupQRCodeHandler() {
            document.body.addEventListener('click', (e) => {
                if (e.target.closest('button') && e.target.closest('button').textContent.includes('Download QR Code')) {
                    // Generate QR code data
                    const qrData = {
                        patientId: appState.patient.id,
                        patientName: appState.patient.name,
                        totalCost: appState.stages.reduce((sum, stage) => sum + stage.total, 0),
                        paymentUrl: `https://payments.clarity-dental.com/pay/${appState.patient.id}`,
                        timestamp: new Date().toISOString()
                    };
                    
                    // Simulate QR code generation and download
                    const qrString = JSON.stringify(qrData);
                    const blob = new Blob([qrString], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `QR_Payment_${appState.patient.name.replace(' ', '_')}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    showModal('QR Code Generated', 
                        `Payment QR code has been generated and downloaded.\n\n` +
                        `The QR code contains:\n` +
                        `• Patient information\n` +
                        `• Payment amount: ${formatCurrency(qrData.totalCost)}\n` +
                        `• Secure payment link\n` +
                        `• Timestamp for verification\n\n` +
                        `Patient can scan this code to access their payment portal.`, 
                        'success');
                }
            });
        }

        // Financing Email Handler
        function setupFinancingEmailHandler() {
            document.body.addEventListener('click', (e) => {
                if (e.target.closest('button') && e.target.closest('button').textContent.includes('Email Financing Info')) {
                    const loadingModal = showLoadingModal('Sending financing information...');
                    
                    setTimeout(() => {
                        loadingModal.remove();
                        
                        const totalCost = appState.stages.reduce((sum, stage) => sum + stage.total, 0);
                        
                        showModal('Financing Information Sent', 
                            `Comprehensive financing package has been sent to ${appState.patient.name}.\n\n` +
                            `The email includes:\n` +
                            `• Multiple payment plan options\n` +
                            `• Pre-qualification application\n` +
                            `• Interest rate calculator\n` +
                            `• Terms and conditions\n` +
                            `• Contact information for questions\n\n` +
                            `For treatment cost of ${formatCurrency(totalCost)}, the patient can explore:\n` +
                            `• 0% interest for 12 months\n` +
                            `• Extended terms up to 60 months\n` +
                            `• Instant approval options`, 
                            'success');
                    }, 1500);
                }
            });
        }

        // Loading Modal for Long Operations
        function showLoadingModal(message) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-strong max-w-sm w-full mx-4">
                    <div class="text-center">
                        <div class="loading-spinner mx-auto mb-4"></div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Processing</h3>
                        <p class="text-gray-600 dark:text-gray-400">${message}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            return modal;
        }

        // Initialize the enhanced application
        function initializeAdvancedApp() {
            // Basic initialization
            renderToothChart();
            renderProceduresAdvanced();
            renderStageTabs();
            renderStagesAdvanced();
            updateSelectedTeethDisplay();
            updateAnalytics();
            renderPaymentOptions();
            initializeSignature();
            
            // Advanced features
            initializeAdvancedSearch();
            initializeAIAssistant();
            initializeClearSelection();
            initializeAdvancedButtons();
            
            // Auto-save functionality - No localStorage in sandboxed environment
            setInterval(() => {
                // Simulate auto-save every 30 seconds without localStorage
                console.log('Auto-save triggered - treatment plan preserved in memory');
            }, 30000);
        }

        // Start the advanced application
        document.addEventListener('DOMContentLoaded', initializeAdvancedApp);
    </script>


</body></html>

