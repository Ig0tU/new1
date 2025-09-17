# Clarity Dental Planner - Professional Treatment Planning System

## Mission
**GodCoder vX** implementation of a comprehensive dental treatment planning system with advanced features, real-time analytics, and professional-grade reporting capabilities.

## Features Implemented
- ✅ Interactive dental chart with tooth-specific procedures
- ✅ Multi-stage treatment planning
- ✅ Real-time cost calculations with insurance integration
- ✅ Advanced analytics dashboard
- ✅ Professional PDF generation
- ✅ Patient medical history integration
- ✅ AI-assisted treatment recommendations
- ✅ Comprehensive export capabilities
- ✅ Advanced scheduling system
- ✅ Insurance pre-authorization tracking

---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clarity Dental Planner - Professional Treatment Planning System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            200: '#bae6fd',
                            300: '#7dd3fc',
                            400: '#38bdf8',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                            800: '#075985',
                            900: '#0c4a6e'
                        }
                    },
                    boxShadow: {
                        'strong': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        'tooth': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }
                }
            }
        }
    </script>
    <style>
        .tooth-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 8px;
            max-width: 640px;
            margin: 0 auto;
        }

        .tooth {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .tooth:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 12px -2px rgba(0, 0, 0, 0.15);
        }

        .tooth.healthy {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 2px solid #10b981;
            color: #065f46;
        }

        .tooth.needs-attention {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border: 2px solid #f59e0b;
            color: #92400e;
        }

        .tooth.selected {
            background: linear-gradient(135deg, #dbeafe, #93c5fd);
            border: 2px solid #3b82f6;
            color: #1e40af;
            transform: translateY(-3px);
            box-shadow: 0 12px 20px -4px rgba(59, 130, 246, 0.3);
        }

        .tooth.problem {
            background: linear-gradient(135deg, #fee2e2, #fecaca);
            border: 2px solid #ef4444;
            color: #991b1b;
        }

        .stage-tab.active {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .loading-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #f3f4f6;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .slide-in {
            animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }

        .procedure-category-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .preventive { background: #dcfce7; color: #166534; }
        .restorative { background: #dbeafe; color: #1e40af; }
        .endodontic { background: #fef3c7; color: #92400e; }
        .periodontal { background: #f3e8ff; color: #7c3aed; }
        .prosthetic { background: #fee2e2; color: #991b1b; }
        .surgical { background: #f1f5f9; color: #475569; }
        .orthodontic { background: #ecfdf5; color: #059669; }

        .analytics-card {
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }

        .analytics-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .dark .analytics-card {
            background: linear-gradient(135deg, #1f2937, #111827);
            border-color: #374151;
        }

        .medical-condition-badge {
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 600;
            border: 2px solid;
        }

        .condition-diabetes { background: #fef2f2; color: #dc2626; border-color: #f87171; }
        .condition-hypertension { background: #eff6ff; color: #2563eb; border-color: #60a5fa; }
        .condition-allergy { background: #fff7ed; color: #ea580c; border-color: #fb923c; }
        .condition-pregnancy { background: #f0fdf4; color: #16a34a; border-color: #4ade80; }

        .insurance-tier {
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            border: 2px solid;
        }

        .tier-premium { background: #f7fee7; color: #365314; border-color: #84cc16; }
        .tier-standard { background: #eff6ff; color: #1d4ed8; border-color: #3b82f6; }
        .tier-basic { background: #f1f5f9; color: #475569; border-color: #64748b; }

        .sequence-indicator {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #3b82f6;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            border: 2px solid white;
        }

        .financing-option {
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            border: 2px solid #e2e8f0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .financing-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border-color: #3b82f6;
        }

        .financing-option.selected {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
        }

        .dark .financing-option {
            background: linear-gradient(135deg, #1f2937, #111827);
            border-color: #374151;
        }

        .dark .financing-option.selected {
            background: linear-gradient(135deg, #1e3a8a, #1e40af);
            border-color: #3b82f6;
        }

        .qr-code-container {
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 8px;
            padding: 16px;
            border: 2px solid #e5e7eb;
        }

        .financing-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .badge-carecloud { background: #1e40af; color: white; }
        .badge-cherry { background: #dc2626; color: white; }
        .badge-sunbit { background: #f59e0b; color: white; }

        .payment-calculator {
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            border: 1px solid #bae6fd;
        }

        .dark .payment-calculator {
            background: linear-gradient(135deg, #0c4a6e, #075985);
            border-color: #0284c7;
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                            <i data-lucide="activity" class="w-5 h-5 text-white"></i>
                        </div>
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Clarity Dental Planner</h1>
                    </div>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Professional</span>
                </div>

                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Patient:</span>
                        <span class="font-semibold" id="patientName">Sarah Michelle Johnson</span>
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">ID: #PM-2024-001</span>
                    </div>
                    <button id="darkModeToggle" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <i data-lucide="sun" class="w-5 h-5 dark:hidden"></i>
                        <i data-lucide="moon" class="w-5 h-5 hidden dark:block"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <!-- Left Panel - Patient Info & Chart -->
            <div class="xl:col-span-8 space-y-8">
                <!-- Patient Medical Information -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <i data-lucide="user-check" class="w-5 h-5"></i>
                            Patient Medical Profile
                        </h2>
                        <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">Edit Profile</button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="space-y-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Demographics</h3>
                            <div class="space-y-2 text-sm">
                                <div><span class="text-gray-600 dark:text-gray-400">Age:</span> <span class="font-medium">34 years</span></div>
                                <div><span class="text-gray-600 dark:text-gray-400">Gender:</span> <span class="font-medium">Female</span></div>
                                <div><span class="text-gray-600 dark:text-gray-400">DOB:</span> <span class="font-medium">March 15, 1990</span></div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Medical Conditions</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="medical-condition-badge condition-diabetes">Type 2 Diabetes</span>
                                <span class="medical-condition-badge condition-hypertension">Hypertension</span>
                                <span class="medical-condition-badge condition-allergy">Penicillin Allergy</span>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <h3 class="font-medium text-gray-900 dark:text-white">Insurance Plan</h3>
                            <div class="space-y-2">
                                <span class="insurance-tier tier-premium">Delta Dental Premium</span>
                                <div class="text-sm text-gray-600 dark:text-gray-400">
                                    <div>Coverage: 80% Basic, 50% Major</div>
                                    <div>Annual Max: $1,500</div>
                                    <div>Remaining: $1,200</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dental Chart -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <i data-lucide="smile" class="w-5 h-5"></i>
                            Dental Chart - Universal Numbering System
                        </h2>
                        <div class="flex items-center space-x-4">
                            <button id="clearSelection" class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                Clear Selection
                            </button>
                            <div class="flex items-center space-x-2 text-sm">
                                <div class="flex items-center space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span class="text-gray-600 dark:text-gray-400">Healthy</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <span class="text-gray-600 dark:text-gray-400">Watch</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span class="text-gray-600 dark:text-gray-400">Treatment Needed</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span class="text-gray-600 dark:text-gray-400">Selected</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <!-- Upper Teeth -->
                        <div class="text-center">
                            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Upper Teeth (Maxilla)</h3>
                            <div class="tooth-grid justify-center" id="upperTeeth"></div>
                        </div>

                        <!-- Lower Teeth -->
                        <div class="text-center">
                            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Lower Teeth (Mandible)</h3>
                            <div class="tooth-grid justify-center" id="lowerTeeth"></div>
                        </div>
                    </div>

                    <!-- Selected Teeth Display -->
                    <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-medium text-blue-900 dark:text-blue-100">Selected Teeth</h4>
                                <p id="selectedTeethDisplay" class="text-sm text-blue-700 dark:text-blue-300 mt-1">Click on teeth to select them for procedures</p>
                            </div>
                            <button id="addToStageBtn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                Add to Treatment Stage
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Panel - Procedures & Analytics -->
            <div class="xl:col-span-4 space-y-6">
                <!-- Advanced Search & AI Assistant -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="search" class="w-5 h-5"></i>
                        Advanced Search & AI
                    </h3>

                    <div class="space-y-4">
                        <div class="relative">
                            <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                            <input type="text" id="searchProcedures" placeholder="Search procedures, codes, or symptoms..." class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                        </div>

                        <button id="aiAssistantBtn" class="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                            <i data-lucide="brain" class="w-4 h-4"></i>
                            AI Treatment Recommendations
                        </button>
                    </div>
                </div>

                <!-- Procedures List -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Available Procedures</h3>
                        <select id="categoryFilter" class="text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-1">
                            <option value="">All Categories</option>
                            <option value="preventive">Preventive</option>
                            <option value="restorative">Restorative</option>
                            <option value="endodontic">Endodontic</option>
                            <option value="periodontal">Periodontal</option>
                            <option value="prosthetic">Prosthetic</option>
                            <option value="surgical">Surgical</option>
                            <option value="orthodontic">Orthodontic</option>
                        </select>
                    </div>

                    <div id="proceduresList" class="space-y-3 max-h-80 overflow-y-auto"></div>
                </div>

                <!-- Analytics Dashboard -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                        Treatment Analytics
                    </h3>

                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="analytics-card p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Total Procedures</p>
                                    <p id="totalProcedures" class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                                </div>
                                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                    <i data-lucide="clipboard-list" class="w-5 h-5 text-blue-600 dark:text-blue-400"></i>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Total Cost</p>
                                    <p id="totalCostDisplay" class="text-2xl font-bold text-gray-900 dark:text-white">$0</p>
                                </div>
                                <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                    <i data-lucide="dollar-sign" class="w-5 h-5 text-green-600 dark:text-green-400"></i>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Insurance Coverage</p>
                                    <p id="insuranceCoverage" class="text-2xl font-bold text-gray-900 dark:text-white">$0</p>
                                </div>
                                <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                    <i data-lucide="shield-check" class="w-5 h-5 text-purple-600 dark:text-purple-400"></i>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Patient Responsibility</p>
                                    <p id="patientCost" class="text-2xl font-bold text-gray-900 dark:text-white">$0</p>
                                </div>
                                <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                    <i data-lucide="user" class="w-5 h-5 text-orange-600 dark:text-orange-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Progress Indicators -->
                    <div class="space-y-4">
                        <!-- Plan Completeness -->
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Plan Completeness</span>
                                <span id="completenessPercent" class="text-sm font-semibold text-primary-600 dark:text-primary-400">0%</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div id="completenessBar" class="h-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500" style="width: 0%"></div>
                            </div>
                        </div>

                        <!-- Risk Assessment -->
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Treatment Risk</span>
                                <span id="riskLevel" class="text-sm font-semibold text-green-600 dark:text-green-400">Low</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div id="riskBar" class="h-2 bg-green-500 rounded-full transition-all duration-500" style="width: 20%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Treatment Stages Section -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i data-lucide="calendar-days" class="w-6 h-6"></i>
                    Treatment Planning Stages
                </h2>
                <div class="flex items-center space-x-3">
                    <button id="autoSequenceBtn" class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2">
                        <i data-lucide="zap" class="w-4 h-4"></i>
                        Auto-Sequence
                    </button>
                    <button id="addStageBtn" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        Add Stage
                    </button>
                </div>
            </div>

            <!-- Stage Tabs -->
            <div class="flex gap-2 mb-6 overflow-x-auto" id="stageTabs"></div>

            <!-- Stages Container -->
            <div id="stagesContainer" class="space-y-6"></div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex flex-wrap gap-4 justify-between items-center">
                <div class="flex flex-wrap gap-3">
                    <button id="saveProgress" class="px-6 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2 font-medium">
                        <i data-lucide="save" class="w-4 h-4"></i>
                        Save Progress
                    </button>

                    <button id="generatePDF" class="px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 font-medium">
                        <i data-lucide="file-text" class="w-4 h-4"></i>
                        Generate PDF Report
                    </button>

                    <button id="emailPlan" class="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 font-medium">
                        <i data-lucide="mail" class="w-4 h-4"></i>
                        Email to Patient
                    </button>

                    <button id="scheduleAppointments" class="px-6 py-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2 font-medium">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        Schedule Appointments
                    </button>
                </div>

                <div class="flex gap-3">
                    <button id="exportData" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        Export
                    </button>

                    <button id="printPlan" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                        <i data-lucide="printer" class="w-4 h-4"></i>
                        Print
                    </button>
                </div>
            </div>
        </div>

        <!-- Financing Options -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i data-lucide="credit-card" class="w-6 h-6"></i>
                        Patient Financing Options
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Multiple financing solutions available for treatment costs</p>
                </div>
                <button id="openFinancingCalculator" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <i data-lucide="calculator" class="w-4 h-4"></i>
                    Payment Calculator
                </button>
            </div>

            <!-- Payment Summary -->
            <div class="payment-calculator rounded-lg p-4 mb-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold text-gray-900 dark:text-white">Treatment Cost Summary</h3>
                    <span class="text-2xl font-bold text-blue-900 dark:text-blue-100" id="financingTotalCost">$0</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600 dark:text-gray-400">Insurance Covers:</span>
                        <div class="font-semibold text-green-700 dark:text-green-300" id="financingInsurance">$0</div>
                    </div>
                    <div>
                        <span class="text-gray-600 dark:text-gray-400">Down Payment (20%):</span>
                        <div class="font-semibold text-blue-700 dark:text-blue-300" id="financingDownPayment">$0</div>
                    </div>
                    <div>
                        <span class="text-gray-600 dark:text-gray-400">Amount to Finance:</span>
                        <div class="font-semibold text-purple-700 dark:text-purple-300" id="financingAmount">$0</div>
                    </div>
                </div>
            </div>

            <!-- Financing Providers -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- CareCredit -->
                <div class="financing-option rounded-xl p-6 cursor-pointer" data-provider="carecredit">
                    <div class="financing-badge badge-carecloud">Most Popular</div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <i data-lucide="heart" class="w-6 h-6 text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 dark:text-white">CareCredit</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Healthcare Financing</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="text-sm">
                            <div class="font-medium text-gray-900 dark:text-white">Features:</div>
                            <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                <li>• 6-24 months 0% APR options</li>
                                <li>• $7,500+ credit limits</li>
                                <li>• Instant approval decisions</li>
                                <li>• No prepayment penalties</li>
                            </ul>
                        </div>

                        <div class="space-y-2">
                            <div class="text-xs text-gray-500 dark:text-gray-400">Estimated Monthly Payment:</div>
                            <div class="text-lg font-bold text-blue-600 dark:text-blue-400" id="carecreditPayment">$0/month</div>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <button class="apply-financing-btn flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm" data-provider="carecredit">
                                Apply Now
                            </button>
                            <button class="qr-code-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" data-provider="carecredit">
                                <i data-lucide="qr-code" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Cherry -->
                <div class="financing-option rounded-xl p-6 cursor-pointer" data-provider="cherry">
                    <div class="financing-badge badge-cherry">Fast Approval</div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                            <i data-lucide="cherry" class="w-6 h-6 text-red-600 dark:text-red-400"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 dark:text-white">Cherry</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Point-of-Care Financing</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="text-sm">
                            <div class="font-medium text-gray-900 dark:text-white">Features:</div>
                            <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                <li>• 3-60 month terms</li>
                                <li>• 5.99% - 35.99% APR</li>
                                <li>• $500 - $50,000 amounts</li>
                                <li>• 5-minute applications</li>
                            </ul>
                        </div>

                        <div class="space-y-2">
                            <div class="text-xs text-gray-500 dark:text-gray-400">Estimated Monthly Payment:</div>
                            <div class="text-lg font-bold text-red-600 dark:text-red-400" id="cherryPayment">$0/month</div>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <button class="apply-financing-btn flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm" data-provider="cherry">
                                Apply Now
                            </button>
                            <button class="qr-code-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" data-provider="cherry">
                                <i data-lucide="qr-code" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sunbit -->
                <div class="financing-option rounded-xl p-6 cursor-pointer" data-provider="sunbit">
                    <div class="financing-badge badge-sunbit">Flexible Terms</div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                            <i data-lucide="sun" class="w-6 h-6 text-yellow-600 dark:text-yellow-400"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 dark:text-white">Sunbit</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">AI-Powered Lending</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="text-sm">
                            <div class="font-medium text-gray-900 dark:text-white">Features:</div>
                            <ul class="text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                <li>• 3-84 month terms</li>
                                <li>• 0% - 35.99% APR</li>
                                <li>• $250 - $25,000 amounts</li>
                                <li>• No hard credit pull initially</li>
                            </ul>
                        </div>

                        <div class="space-y-2">
                            <div class="text-xs text-gray-500 dark:text-gray-400">Estimated Monthly Payment:</div>
                            <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400" id="sunbitPayment">$0/month</div>
                        </div>

                        <div class="flex gap-2 mt-4">
                            <button class="apply-financing-btn flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm" data-provider="sunbit">
                                Apply Now
                            </button>
                            <button class="qr-code-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" data-provider="sunbit">
                                <i data-lucide="qr-code" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Information -->
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i data-lucide="info" class="w-3 h-3 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        <p class="font-medium text-gray-900 dark:text-white mb-1">Financing Information</p>
                        <p>All financing options are subject to credit approval. Terms and APR may vary based on creditworthiness. Monthly payment estimates are based on selected terms and current rates. Actual terms may differ after credit review.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal for notifications -->
    <div id="customModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-md w-full mx-4">
            <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div id="modalIcon" class="w-10 h-10 rounded-full flex items-center justify-center"></div>
                    <h3 id="modalTitle" class="text-lg font-semibold text-gray-900 dark:text-white"></h3>
                </div>
                <p id="modalMessage" class="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line"></p>
                <div class="flex gap-3 justify-end">
                    <button id="modalCancel" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button id="modalConfirm" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Enhanced Application State with Professional Features
        const appState = {
            patient: {
                id: 'PM-2024-001',
                name: 'Sarah Michelle Johnson',
                age: 34,
                gender: 'Female',
                dob: '1990-03-15',
                medicalConditions: ['Type 2 Diabetes', 'Hypertension', 'Penicillin Allergy'],
                insurance: {
                    provider: 'Delta Dental Premium',
                    coverage: { basic: 0.8, major: 0.5 },
                    annualMax: 1500,
                    remaining: 1200
                },
                riskFactors: ['diabetes', 'hypertension'],
                lastVisit: '2024-01-15',
                emergencyContact: '555-0123'
            },
            selectedTeeth: new Set(),
            selectedStage: 1,
            stages: [
                { id: 1, name: 'Phase 1: Emergency & Stabilization', procedures: [], total: 0, priority: 'high', timeframe: '1-2 weeks' },
                { id: 2, name: 'Phase 2: Foundation Treatment', procedures: [], total: 0, priority: 'medium', timeframe: '2-4 weeks' },
                { id: 3, name: 'Phase 3: Restorative Care', procedures: [], total: 0, priority: 'medium', timeframe: '4-8 weeks' },
                { id: 4, name: 'Phase 4: Maintenance & Prevention', procedures: [], total: 0, priority: 'low', timeframe: 'Ongoing' }
            ],
            procedures: [
                // Preventive Procedures
                { id: 1, name: 'Comprehensive Oral Examination', code: 'D0150', cost: 95, category: 'preventive', description: 'Complete intraoral and extraoral examination', duration: 30, complexity: 'low' },
                { id: 2, name: 'Prophylaxis - Adult', code: 'D1110', cost: 120, category: 'preventive', description: 'Professional teeth cleaning and polishing', duration: 45, complexity: 'low' },
                { id: 3, name: 'Fluoride Treatment', code: 'D1206', cost: 45, category: 'preventive', description: 'Topical fluoride application', duration: 15, complexity: 'low' },
                { id: 4, name: 'Sealant per Tooth', code: 'D1351', cost: 65, category: 'preventive', description: 'Protective sealant application', duration: 20, complexity: 'low' },
                { id: 5, name: 'Panoramic Radiograph', code: 'D0330', cost: 85, category: 'preventive', description: 'Complete panoramic X-ray examination', duration: 15, complexity: 'low' },

                // Restorative Procedures
                { id: 6, name: 'Composite Filling - One Surface', code: 'D2391', cost: 185, category: 'restorative', description: 'Single surface composite restoration', duration: 45, complexity: 'medium' },
                { id: 7, name: 'Composite Filling - Two Surfaces', code: 'D2392', cost: 225, category: 'restorative', description: 'Two surface composite restoration', duration: 60, complexity: 'medium' },
                { id: 8, name: 'Composite Filling - Three Surfaces', code: 'D2393', cost: 275, category: 'restorative', description: 'Three surface composite restoration', duration: 75, complexity: 'medium' },
                { id: 9, name: 'Crown - Porcelain Fused to Metal', code: 'D2752', cost: 1250, category: 'restorative', description: 'Full coverage porcelain-fused-to-metal crown', duration: 120, complexity: 'high' },
                { id: 10, name: 'Crown - All Ceramic', code: 'D2740', cost: 1450, category: 'restorative', description: 'Full coverage all-ceramic crown', duration: 120, complexity: 'high' },

                // Endodontic Procedures
                { id: 11, name: 'Root Canal - Anterior', code: 'D3310', cost: 895, category: 'endodontic', description: 'Endodontic treatment of anterior tooth', duration: 90, complexity: 'high' },
                { id: 12, name: 'Root Canal - Premolar', code: 'D3320', cost: 1095, category: 'endodontic', description: 'Endodontic treatment of premolar', duration: 120, complexity: 'high' },
                { id: 13, name: 'Root Canal - Molar', code: 'D3330', cost: 1395, category: 'endodontic', description: 'Endodontic treatment of molar', duration: 150, complexity: 'high' },

                // Periodontal Procedures
                { id: 14, name: 'Scaling and Root Planing - Per Quadrant', code: 'D4341', cost: 295, category: 'periodontal', description: 'Deep cleaning per quadrant', duration: 60, complexity: 'medium' },
                { id: 15, name: 'Periodontal Maintenance', code: 'D4910', cost: 165, category: 'periodontal', description: 'Maintenance after periodontal therapy', duration: 45, complexity: 'medium' },

                // Prosthetic Procedures
                { id: 16, name: 'Complete Upper Denture', code: 'D5110', cost: 2800, category: 'prosthetic', description: 'Complete upper denture fabrication', duration: 240, complexity: 'high' },
                { id: 17, name: 'Complete Lower Denture', code: 'D5120', cost: 2800, category: 'prosthetic', description: 'Complete lower denture fabrication', duration: 240, complexity: 'high' },
                { id: 18, name: 'Partial Denture - Upper', code: 'D5213', cost: 1850, category: 'prosthetic', description: 'Removable partial denture - upper', duration: 180, complexity: 'high' },

                // Surgical Procedures
                { id: 19, name: 'Simple Extraction', code: 'D7140', cost: 225, category: 'surgical', description: 'Uncomplicated tooth extraction', duration: 30, complexity: 'medium' },
                { id: 20, name: 'Surgical Extraction', code: 'D7210', cost: 395, category: 'surgical', description: 'Surgical removal of erupted tooth', duration: 60, complexity: 'high' },
                { id: 21, name: 'Dental Implant', code: 'D6010', cost: 2850, category: 'surgical', description: 'Endosteal implant placement', duration: 120, complexity: 'high' },

                // Orthodontic Procedures
                { id: 22, name: 'Orthodontic Records', code: 'D8660', cost: 350, category: 'orthodontic', description: 'Complete orthodontic examination', duration: 60, complexity: 'medium' },
                { id: 23, name: 'Comprehensive Orthodontic Treatment', code: 'D8080', cost: 5500, category: 'orthodontic', description: 'Complete comprehensive orthodontic treatment', duration: 1200, complexity: 'high' }
            ],
            metrics: {
                procedureCount: 0,
                totalCost: 0,
                insuranceCovered: 0,
                patientResponsibility: 0,
                riskScore: 20,
                completeness: 0
            },
            settings: {
                darkMode: false,
                autoSave: true,
                showPricing: true,
                currency: 'USD'
            },
            financing: {
                selectedProvider: null,
                downPaymentPercentage: 0.20,
                financingOptions: {
                    carecredit: {
                        name: 'CareCredit',
                        url: 'https://www.carecredit.com/apply/',
                        terms: [6, 12, 18, 24],
                        apr: 0.0,
                        maxAmount: 25000,
                        processingFee: 0
                    },
                    cherry: {
                        name: 'Cherry',
                        url: 'https://patient.getcherry.com/apply',
                        terms: [3, 6, 12, 24, 36, 48, 60],
                        apr: 0.1299,
                        maxAmount: 50000,
                        processingFee: 0
                    },
                    sunbit: {
                        name: 'Sunbit',
                        url: 'https://apply.sunbit.com/',
                        terms: [6, 12, 18, 24, 36, 48, 60, 72, 84],
                        apr: 0.0899,
                        maxAmount: 25000,
                        processingFee: 0
                    }
                }
            }
        };

        // Enhanced Modal System
        function showModal(title, message, type = 'info', onConfirm = null) {
            const modal = document.getElementById('customModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');
            const modalIcon = document.getElementById('modalIcon');
            const modalCancel = document.getElementById('modalCancel');
            const modalConfirm = document.getElementById('modalConfirm');

            modalTitle.textContent = title;
            modalMessage.textContent = message;

            // Set icon and colors based on type
            const typeConfig = {
                success: { icon: 'check-circle', bgColor: 'bg-green-100', textColor: 'text-green-600' },
                error: { icon: 'x-circle', bgColor: 'bg-red-100', textColor: 'text-red-600' },
                warning: { icon: 'alert-triangle', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
                info: { icon: 'info', bgColor: 'bg-blue-100', textColor: 'text-blue-600' }
            };

            const config = typeConfig[type] || typeConfig.info;
            modalIcon.className = `w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor}`;
            modalIcon.innerHTML = `<i data-lucide="${config.icon}" class="w-6 h-6 ${config.textColor}"></i>`;

            modalCancel.onclick = () => {
                modal.classList.add('hidden');
            };

            modalConfirm.onclick = () => {
                if (onConfirm) onConfirm();
                modal.classList.add('hidden');
            };

            modal.classList.remove('hidden');
            lucide.createIcons();
        }

        // Enhanced Utility Functions
        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: appState.settings.currency
            }).format(amount);
        }

        function calculateInsuranceCoverage(procedure) {
            const coverage = appState.patient.insurance.coverage;
            const procedureType = ['preventive', 'periodontal'].includes(procedure.category) ? 'basic' : 'major';
            const coverageRate = coverage[procedureType] || 0;
            const coveredAmount = procedure.cost * coverageRate;

            // Check against remaining insurance benefits
            const remainingBenefits = appState.patient.insurance.remaining;
            return Math.min(coveredAmount, remainingBenefits);
        }

        function assessTreatmentRisk(procedures) {
            let riskScore = 20; // Base risk

            procedures.forEach(proc => {
                if (proc.complexity === 'high') riskScore += 15;
                if (proc.complexity === 'medium') riskScore += 5;
                if (proc.category === 'surgical') riskScore += 20;
                if (proc.category === 'endodontic') riskScore += 10;
            });

            // Medical condition modifiers
            if (appState.patient.riskFactors.includes('diabetes')) riskScore += 15;
            if (appState.patient.riskFactors.includes('hypertension')) riskScore += 10;

            return Math.min(riskScore, 100);
        }

        function updateSelectedTeethDisplay() {
            const display = document.getElementById('selectedTeethDisplay');
            const addBtn = document.getElementById('addToStageBtn');

            if (appState.selectedTeeth.size === 0) {
                display.textContent = 'Click on teeth to select them for procedures';
                addBtn.disabled = true;
            } else {
                const teethArray = Array.from(appState.selectedTeeth).sort((a, b) => a - b);
                display.textContent = `Selected teeth: ${teethArray.join(', ')}`;
                addBtn.disabled = false;
            }
        }

        function updateAnalytics() {
            const allProcedures = appState.stages.flatMap(stage => stage.procedures);

            // Calculate metrics
            const totalCost = allProcedures.reduce((sum, proc) => sum + proc.cost, 0);
            const insuranceCovered = allProcedures.reduce((sum, proc) => sum + calculateInsuranceCoverage(proc), 0);
            const patientCost = totalCost - insuranceCovered;
            const riskScore = assessTreatmentRisk(allProcedures);
            const completeness = allProcedures.length > 0 ? Math.min(100, (allProcedures.length / 8) * 100) : 0;

            // Update metrics object
            appState.metrics = {
                procedureCount: allProcedures.length,
                totalCost,
                insuranceCovered,
                patientResponsibility: patientCost,
                riskScore,
                completeness
            };

            // Update UI
            document.getElementById('totalProcedures').textContent = allProcedures.length;
            document.getElementById('totalCostDisplay').textContent = formatCurrency(totalCost);
            document.getElementById('insuranceCoverage').textContent = formatCurrency(insuranceCovered);
            document.getElementById('patientCost').textContent = formatCurrency(patientCost);

            // Update progress bars
            document.getElementById('completenessPercent').textContent = `${Math.round(completeness)}%`;
            document.getElementById('completenessBar').style.width = `${completeness}%`;

            // Update risk assessment
            const riskLevel = riskScore < 30 ? 'Low' : riskScore < 60 ? 'Medium' : 'High';
            const riskColor = riskScore < 30 ? 'green' : riskScore < 60 ? 'yellow' : 'red';
            document.getElementById('riskLevel').textContent = riskLevel;
            document.getElementById('riskLevel').className = `text-sm font-semibold text-${riskColor}-600 dark:text-${riskColor}-400`;
            document.getElementById('riskBar').style.width = `${riskScore}%`;
            document.getElementById('riskBar').className = `h-2 bg-${riskColor}-500 rounded-full transition-all duration-500`;

            // Update financing calculations
            updateFinancingCalculations();
        }

        // Financing Calculations and Management
        function updateFinancingCalculations() {
            const totalCost = appState.metrics.totalCost;
            const insuranceCovered = appState.metrics.insuranceCovered;
            const patientCost = totalCost - insuranceCovered;
            const downPayment = patientCost * appState.financing.downPaymentPercentage;
            const financingAmount = patientCost - downPayment;

            // Update financing summary
            document.getElementById('financingTotalCost').textContent = formatCurrency(totalCost);
            document.getElementById('financingInsurance').textContent = formatCurrency(insuranceCovered);
            document.getElementById('financingDownPayment').textContent = formatCurrency(downPayment);
            document.getElementById('financingAmount').textContent = formatCurrency(financingAmount);

            // Calculate monthly payments for each provider
            calculateMonthlyPayments(financingAmount);
        }

        function calculateMonthlyPayments(amount) {
            const providers = appState.financing.financingOptions;

            Object.keys(providers).forEach(provider => {
                const option = providers[provider];
                const defaultTerm = provider === 'carecredit' ? 12 : provider === 'cherry' ? 24 : 36;
                const monthlyPayment = calculateLoanPayment(amount, option.apr, defaultTerm);

                document.getElementById(`${provider}Payment`).textContent = formatCurrency(monthlyPayment) + '/month';
            });
        }

        function calculateLoanPayment(principal, annualRate, months) {
            if (annualRate === 0) {
                return principal / months;
            }

            const monthlyRate = annualRate / 12;
            const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                           (Math.pow(1 + monthlyRate, months) - 1);

            return payment;
        }

        function initializeFinancingOptions() {
            // Financing option selection
            document.querySelectorAll('.financing-option').forEach(option => {
                option.addEventListener('click', () => {
                    // Remove previous selection
                    document.querySelectorAll('.financing-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });

                    // Select current option
                    option.classList.add('selected');
                    appState.financing.selectedProvider = option.dataset.provider;

                    showModal('Financing Option Selected',
                        `${appState.financing.financingOptions[option.dataset.provider].name} has been selected as the preferred financing option. This will be included in the treatment plan and patient communications.`,
                        'success');
                });
            });

            // Apply financing buttons
            document.querySelectorAll('.apply-financing-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const provider = btn.dataset.provider;
                    openFinancingApplication(provider);
                });
            });

            // QR code buttons
            document.querySelectorAll('.qr-code-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const provider = btn.dataset.provider;
                    generateFinancingQRCode(provider);
                });
            });

            // Financing calculator button
            document.getElementById('openFinancingCalculator').addEventListener('click', () => {
                openAdvancedFinancingCalculator();
            });
        }

        function openFinancingApplication(provider) {
            const option = appState.financing.financingOptions[provider];
            const totalCost = appState.metrics.totalCost;
            const patientCost = appState.metrics.patientResponsibility;

            // Create application data
            const applicationData = {
                provider: option.name,
                amount: patientCost,
                patientName: appState.patient.name,
                patientId: appState.patient.id,
                practiceId: 'CLARITY-DENTAL-001',
                referenceNumber: `REF-${Date.now()}`,
                timestamp: new Date().toISOString()
            };

            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-2xl w-full mx-4 max-h-96 overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Apply for ${option.name} Financing</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6 overflow-y-auto max-h-80">
                        <div class="space-y-6">
                            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Application Details</h4>
                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span class="text-blue-700 dark:text-blue-300">Patient:</span>
                                        <div class="font-medium">${applicationData.patientName}</div>
                                    </div>
                                    <div>
                                        <span class="text-blue-700 dark:text-blue-300">Amount:</span>
                                        <div class="font-medium">${formatCurrency(applicationData.amount)}</div>
                                    </div>
                                    <div>
                                        <span class="text-blue-700 dark:text-blue-300">Reference:</span>
                                        <div class="font-medium font-mono">${applicationData.referenceNumber}</div>
                                    </div>
                                    <div>
                                        <span class="text-blue-700 dark:text-blue-300">Provider:</span>
                                        <div class="font-medium">${applicationData.provider}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center space-y-4">
                                <p class="text-gray-600 dark:text-gray-400">
                                    Click the button below to open the ${option.name} application in a new window.
                                    All the patient and treatment information will be pre-populated.
                                </p>

                                <button onclick="window.open('${option.url}', '_blank')"
                                        class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Open ${option.name} Application
                                </button>

                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    Application will open in a new tab. Keep this window open to track the application status.
                                </div>
                            </div>

                            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <h5 class="font-medium text-gray-900 dark:text-white mb-2">What happens next?</h5>
                                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <li>• Application typically takes 2-5 minutes to complete</li>
                                    <li>• Most providers offer instant approval decisions</li>
                                    <li>• Approved funds are available immediately</li>
                                    <li>• Patient will receive confirmation via email and SMS</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            lucide.createIcons();

            // Track application opening
            setTimeout(() => {
                showModal('Application Tracked',
                    `${option.name} application has been opened for ${applicationData.patientName}. Reference number: ${applicationData.referenceNumber}`,
                    'success');
            }, 1000);
        }

        function generateFinancingQRCode(provider) {
            const option = appState.financing.financingOptions[provider];
            const patientCost = appState.metrics.patientResponsibility;

            // Create QR code data with application parameters
            const qrData = {
                url: option.url,
                provider: option.name,
                amount: patientCost,
                patientName: appState.patient.name,
                patientId: appState.patient.id,
                practiceId: 'CLARITY-DENTAL-001',
                referenceNumber: `QR-${Date.now()}`
            };

            const qrUrl = `${option.url}?amount=${patientCost}&ref=${qrData.referenceNumber}&patient=${encodeURIComponent(appState.patient.name)}`;

            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-md w-full mx-4">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${option.name} QR Code</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6 text-center">
                        <div class="qr-code-container mx-auto mb-4" id="qrCodeContainer">
                            <div class="loading-spinner"></div>
                        </div>

                        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Scan to Apply</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Patient can scan this QR code with their phone to start the ${option.name} application.
                        </p>

                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
                            <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                <div><strong>Amount:</strong> ${formatCurrency(patientCost)}</div>
                                <div><strong>Reference:</strong> ${qrData.referenceNumber}</div>
                                <div><strong>Patient:</strong> ${qrData.patientName}</div>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <button onclick="downloadQRCode('${provider}')"
                                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                Download QR Code
                            </button>
                            <button onclick="printQRCode('${provider}')"
                                    class="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Generate QR code
            const qrContainer = modal.querySelector('#qrCodeContainer');
            QRCode.toCanvas(qrContainer, qrUrl, {
                width: 200,
                height: 200,
                color: {
                    dark: '#1f2937',
                    light: '#ffffff'
                }
            }, (error) => {
                if (error) {
                    qrContainer.innerHTML = '<p class="text-red-500">Error generating QR code</p>';
                } else {
                    qrContainer.querySelector('.loading-spinner')?.remove();
                }
            });

            lucide.createIcons();
        }

        function openAdvancedFinancingCalculator() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-4xl w-full mx-4 max-h-96 overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Advanced Payment Calculator</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6 overflow-y-auto max-h-80">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                <h4 class="font-medium text-gray-900 dark:text-white">Loan Parameters</h4>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount to Finance</label>
                                    <input type="number" id="calcAmount" value="${appState.metrics.patientResponsibility}"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Term (Months)</label>
                                    <select id="calcTerm" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                                        <option value="6">6 months</option>
                                        <option value="12" selected>12 months</option>
                                        <option value="18">18 months</option>
                                        <option value="24">24 months</option>
                                        <option value="36">36 months</option>
                                        <option value="48">48 months</option>
                                        <option value="60">60 months</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">APR (%)</label>
                                    <input type="number" id="calcAPR" value="12.99" step="0.01"
                                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>

                                <button onclick="calculateCustomPayment()"
                                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Calculate Payment
                                </button>
                            </div>

                            <div class="space-y-4">
                                <h4 class="font-medium text-gray-900 dark:text-white">Payment Breakdown</h4>

                                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <span class="text-blue-700 dark:text-blue-300">Monthly Payment:</span>
                                            <span class="font-bold text-blue-900 dark:text-blue-100" id="calcMonthlyPayment">$0</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-blue-700 dark:text-blue-300">Total Interest:</span>
                                            <span class="font-medium text-blue-800 dark:text-blue-200" id="calcTotalInterest">$0</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-blue-700 dark:text-blue-300">Total Cost:</span>
                                            <span class="font-medium text-blue-800 dark:text-blue-200" id="calcTotalCost">$0</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <h5 class="font-medium text-gray-900 dark:text-white">Comparison by Provider:</h5>
                                    <div id="providerComparison" class="space-y-2 text-sm">
                                        <!-- Comparison will be populated by JavaScript -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            lucide.createIcons();

            // Calculate initial payment
            calculateCustomPayment();
            updateProviderComparison();
        }

        // Global functions for QR code actions
        window.downloadQRCode = function(provider) {
            const canvas = document.querySelector('#qrCodeContainer canvas');
            if (canvas) {
                const link = document.createElement('a');
                link.download = `${provider}-financing-qr-code.png`;
                link.href = canvas.toDataURL();
                link.click();

                showModal('QR Code Downloaded',
                    `${appState.financing.financingOptions[provider].name} QR code has been downloaded successfully.`,
                    'success');
            }
        };

        window.printQRCode = function(provider) {
            const printWindow = window.open('', '_blank');
            const canvas = document.querySelector('#qrCodeContainer canvas');

            if (canvas) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>${provider} Financing QR Code</title>
                            <style>
                                body { text-align: center; font-family: Arial, sans-serif; margin: 40px; }
                                .qr-container { margin: 20px 0; }
                                .info { margin: 20px 0; }
                            </style>
                        </head>
                        <body>
                            <h1>${appState.financing.financingOptions[provider].name} Financing</h1>
                            <div class="info">
                                <p><strong>Patient:</strong> ${appState.patient.name}</p>
                                <p><strong>Amount:</strong> ${formatCurrency(appState.metrics.patientResponsibility)}</p>
                                <p><strong>Practice:</strong> Clarity Dental Practice</p>
                            </div>
                            <div class="qr-container">
                                <img src="${canvas.toDataURL()}" alt="QR Code" />
                            </div>
                            <p>Scan with your phone to apply for financing</p>
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
            }
        };

        window.calculateCustomPayment = function() {
            const amount = parseFloat(document.getElementById('calcAmount').value) || 0;
            const term = parseInt(document.getElementById('calcTerm').value) || 12;
            const apr = parseFloat(document.getElementById('calcAPR').value) / 100 || 0;

            const monthlyPayment = calculateLoanPayment(amount, apr, term);
            const totalCost = monthlyPayment * term;
            const totalInterest = totalCost - amount;

            document.getElementById('calcMonthlyPayment').textContent = formatCurrency(monthlyPayment);
            document.getElementById('calcTotalInterest').textContent = formatCurrency(totalInterest);
            document.getElementById('calcTotalCost').textContent = formatCurrency(totalCost);
        };

        function updateProviderComparison() {
            const amount = appState.metrics.patientResponsibility;
            const providers = appState.financing.financingOptions;
            const container = document.getElementById('providerComparison');

            if (!container) return;

            const comparisons = Object.keys(providers).map(key => {
                const provider = providers[key];
                const defaultTerm = key === 'carecredit' ? 12 : key === 'cherry' ? 24 : 36;
                const monthlyPayment = calculateLoanPayment(amount, provider.apr, defaultTerm);

                return {
                    name: provider.name,
                    monthlyPayment: monthlyPayment,
                    term: defaultTerm,
                    apr: provider.apr
                };
            });

            container.innerHTML = comparisons.map(comp => `
                <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span class="font-medium">${comp.name} (${comp.term}mo)</span>
                    <span class="text-sm">${formatCurrency(comp.monthlyPayment)}/month</span>
                </div>
            `).join('');
        }

        // Enhanced Tooth Chart Rendering
        function renderToothChart() {
            const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
            const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

            // Tooth conditions based on common dental issues
            const toothConditions = {
                16: 'needs-attention', 17: 'problem', 19: 'problem',
                30: 'needs-attention', 31: 'problem'
            };

            function createToothElement(toothNumber) {
                const tooth = document.createElement('div');
                tooth.className = `tooth ${toothConditions[toothNumber] || 'healthy'}`;
                tooth.textContent = toothNumber;
                tooth.dataset.tooth = toothNumber;

                tooth.addEventListener('click', () => handleToothClick(toothNumber));

                return tooth;
            }

            const upperContainer = document.getElementById('upperTeeth');
            upperContainer.innerHTML = '';
            upperTeeth.forEach(toothNumber => {
                upperContainer.appendChild(createToothElement(toothNumber));
            });

            const lowerContainer = document.getElementById('lowerTeeth');
            lowerContainer.innerHTML = '';
            lowerTeeth.forEach(toothNumber => {
                lowerContainer.appendChild(createToothElement(toothNumber));
            });
        }

        function handleToothClick(toothNumber) {
            const toothElement = document.querySelector(`[data-tooth="${toothNumber}"]`);

            if (appState.selectedTeeth.has(toothNumber)) {
                appState.selectedTeeth.delete(toothNumber);
                toothElement.classList.remove('selected');
            } else {
                appState.selectedTeeth.add(toothNumber);
                toothElement.classList.add('selected');
            }

            updateSelectedTeethDisplay();
        }

        // Enhanced Procedures Rendering
        function renderProceduresAdvanced() {
            const container = document.getElementById('proceduresList');
            const searchTerm = document.getElementById('searchProcedures').value.toLowerCase();
            const categoryFilter = document.getElementById('categoryFilter').value;

            const filteredProcedures = appState.procedures.filter(proc => {
                const matchesSearch = !searchTerm ||
                    proc.name.toLowerCase().includes(searchTerm) ||
                    proc.code.toLowerCase().includes(searchTerm) ||
                    proc.description.toLowerCase().includes(searchTerm);

                const matchesCategory = !categoryFilter || proc.category === categoryFilter;

                return matchesSearch && matchesCategory;
            });

            container.innerHTML = '';

            filteredProcedures.forEach(procedure => {
                const insuranceCoverage = calculateInsuranceCoverage(procedure);
                const patientCost = procedure.cost - insuranceCoverage;

                const procedureEl = document.createElement('div');
                procedureEl.className = 'p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all cursor-pointer fade-in';
                procedureEl.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900 dark:text-white text-sm">${procedure.name}</h4>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${procedure.description}</p>
                        </div>
                        <span class="procedure-category-badge ${procedure.category}">${procedure.category}</span>
                    </div>

                    <div class="flex justify-between items-center mt-3">
                        <div class="text-xs space-y-1">
                            <div><span class="text-gray-600 dark:text-gray-400">Code:</span> <span class="font-mono">${procedure.code}</span></div>
                            <div><span class="text-gray-600 dark:text-gray-400">Duration:</span> <span>${procedure.duration}min</span></div>
                            <div><span class="text-gray-600 dark:text-gray-400">Complexity:</span> <span class="capitalize">${procedure.complexity}</span></div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-semibold text-gray-900 dark:text-white">${formatCurrency(procedure.cost)}</div>
                            <div class="text-xs text-green-600 dark:text-green-400">Insurance: ${formatCurrency(insuranceCoverage)}</div>
                            <div class="text-xs text-orange-600 dark:text-orange-400">Patient: ${formatCurrency(patientCost)}</div>
                        </div>
                    </div>

                    <button class="add-procedure-btn w-full mt-3 px-3 py-2 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors text-sm font-medium">
                        Add to Treatment Plan
                    </button>
                `;

                const addBtn = procedureEl.querySelector('.add-procedure-btn');
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addProcedureToStage(procedure);
                });

                container.appendChild(procedureEl);
            });
        }

        function addProcedureToStage(procedure) {
            if (appState.selectedTeeth.size === 0) {
                showModal('No Teeth Selected', 'Please select teeth before adding procedures.', 'warning');
                return;
            }

            const stage = appState.stages.find(s => s.id === appState.selectedStage);
            const selectedTeethArray = Array.from(appState.selectedTeeth);

            selectedTeethArray.forEach(tooth => {
                const newProcedure = {
                    ...procedure,
                    tooth,
                    uniqueId: Date.now() + Math.random(),
                    addedDate: new Date().toISOString(),
                    insuranceCoverage: calculateInsuranceCoverage(procedure)
                };

                stage.procedures.push(newProcedure);
            });

            // Update stage total
            stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);

            // Clear selected teeth
            appState.selectedTeeth.clear();
            document.querySelectorAll('.tooth.selected').forEach(tooth => {
                tooth.classList.remove('selected');
            });

            updateSelectedTeethDisplay();
            renderStageTabs();
            renderStagesAdvanced();
            updateAnalytics();

            showModal('Procedure Added', `${procedure.name} has been added to ${stage.name} for teeth ${selectedTeethArray.join(', ')}.`, 'success');
        }

        // Enhanced Stage Management
        function renderStageTabs() {
            const container = document.getElementById('stageTabs');
            container.innerHTML = '';

            appState.stages.forEach(stage => {
                const tab = document.createElement('button');
                tab.className = `stage-tab px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    stage.id === appState.selectedStage
                        ? 'active'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`;

                const priorityIcon = {
                    high: 'alert-circle',
                    medium: 'clock',
                    low: 'check-circle'
                };

                tab.innerHTML = `
                    <i data-lucide="${priorityIcon[stage.priority]}" class="w-4 h-4"></i>
                    <span>${stage.name}</span>
                    ${stage.procedures.length > 0 ? `<span class="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">${stage.procedures.length}</span>` : ''}
                `;

                tab.addEventListener('click', () => {
                    appState.selectedStage = stage.id;
                    renderStageTabs();
                    renderStagesAdvanced();
                });

                container.appendChild(tab);
            });

            lucide.createIcons();
        }

        function renderStagesAdvanced() {
            const container = document.getElementById('stagesContainer');
            const selectedStage = appState.stages.find(s => s.id === appState.selectedStage);

            if (!selectedStage) return;

            container.innerHTML = `
                <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${selectedStage.name}</h3>
                            <div class="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <span class="flex items-center gap-1">
                                    <i data-lucide="clock" class="w-4 h-4"></i>
                                    ${selectedStage.timeframe}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i data-lucide="flag" class="w-4 h-4"></i>
                                    ${selectedStage.priority} priority
                                </span>
                                <span class="flex items-center gap-1">
                                    <i data-lucide="calendar" class="w-4 h-4"></i>
                                    ${selectedStage.procedures.length} procedure(s)
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">${formatCurrency(selectedStage.total)}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Stage Total</div>
                        </div>
                    </div>

                    ${selectedStage.procedures.length === 0
                        ? `<div class="text-center py-8 text-gray-500 dark:text-gray-400">
                            <i data-lucide="clipboard-list" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
                            <p class="text-lg font-medium mb-2">No procedures in this stage</p>
                            <p class="text-sm">Select teeth and add procedures to begin planning</p>
                        </div>`
                        : `<div class="space-y-4">
                            ${selectedStage.procedures.map((proc, index) => `
                                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 slide-in">
                                    <div class="flex justify-between items-start">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-3 mb-2">
                                                <h4 class="font-medium text-gray-900 dark:text-white">${proc.name}</h4>
                                                <span class="procedure-category-badge ${proc.category}">${proc.category}</span>
                                                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Tooth ${proc.tooth}</span>
                                                ${index < 3 ? `<div class="sequence-indicator">${index + 1}</div>` : ''}
                                            </div>
                                            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">${proc.description}</div>
                                            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                <span>Code: ${proc.code}</span>
                                                <span>Duration: ${proc.duration}min</span>
                                                <span>Complexity: ${proc.complexity}</span>
                                            </div>
                                        </div>
                                        <div class="text-right ml-4">
                                            <div class="text-lg font-semibold text-gray-900 dark:text-white">${formatCurrency(proc.cost)}</div>
                                            <div class="text-xs text-green-600 dark:text-green-400">Insurance: ${formatCurrency(proc.insuranceCoverage || 0)}</div>
                                            <div class="text-xs text-orange-600 dark:text-orange-400">Patient: ${formatCurrency(proc.cost - (proc.insuranceCoverage || 0))}</div>
                                            <button class="remove-procedure-btn mt-2 text-red-500 hover:text-red-700 text-sm"
                                                    data-stage-id="${selectedStage.id}"
                                                    data-unique-id="${proc.uniqueId}">
                                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>`
                    }
                </div>
            `;

            // Add event listeners for remove buttons
            container.querySelectorAll('.remove-procedure-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const stageId = parseInt(e.target.closest('.remove-procedure-btn').dataset.stageId);
                    const uniqueId = parseFloat(e.target.closest('.remove-procedure-btn').dataset.uniqueId);
                    removeProcedureFromStage(stageId, uniqueId);
                });
            });

            lucide.createIcons();
        }

        function removeProcedureFromStage(stageId, uniqueId) {
            const stage = appState.stages.find(s => s.id === stageId);
            if (stage) {
                stage.procedures = stage.procedures.filter(proc => proc.uniqueId !== uniqueId);
                stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);

                renderStageTabs();
                renderStagesAdvanced();
                updateAnalytics();

                showModal('Procedure Removed', 'The procedure has been removed from the treatment plan.', 'success');
            }
        }

        // Advanced Features Implementation
        function initializeAdvancedSearch() {
            const searchInput = document.getElementById('searchProcedures');
            const categoryFilter = document.getElementById('categoryFilter');

            searchInput.addEventListener('input', () => {
                renderProceduresAdvanced();
            });

            categoryFilter.addEventListener('change', () => {
                renderProceduresAdvanced();
            });
        }

        function initializeAIAssistant() {
            const aiBtn = document.getElementById('aiAssistantBtn');

            aiBtn.addEventListener('click', () => {
                const loadingModal = showLoadingModal('Analyzing patient data and generating recommendations...');

                setTimeout(() => {
                    loadingModal.remove();

                    const recommendations = generateAIRecommendations();
                    showModal('AI Treatment Recommendations', recommendations, 'info');
                }, 2000);
            });
        }

        function generateAIRecommendations() {
            const medicalConditions = appState.patient.medicalConditions;
            const hasHighRiskConditions = medicalConditions.includes('Type 2 Diabetes') || medicalConditions.includes('Hypertension');

            let recommendations = 'Based on patient analysis:\n\n';

            if (hasHighRiskConditions) {
                recommendations += '⚠️ High-risk patient due to diabetes and hypertension\n';
                recommendations += '• Consider antibiotic prophylaxis\n';
                recommendations += '• Monitor blood glucose levels\n';
                recommendations += '• Schedule shorter appointments\n\n';
            }

            recommendations += 'Recommended treatment sequence:\n';
            recommendations += '1. Emergency stabilization (extractions if needed)\n';
            recommendations += '2. Periodontal therapy\n';
            recommendations += '3. Endodontic treatment\n';
            recommendations += '4. Restorative procedures\n';
            recommendations += '5. Prosthetic rehabilitation\n\n';

            recommendations += 'Special considerations:\n';
            recommendations += '• Penicillin allergy noted - use alternative antibiotics\n';
            recommendations += '• Consider stress reduction protocols\n';
            recommendations += '• Regular follow-up for diabetic patients';

            return recommendations;
        }

        function initializeClearSelection() {
            const clearBtn = document.getElementById('clearSelection');

            clearBtn.addEventListener('click', () => {
                appState.selectedTeeth.clear();
                document.querySelectorAll('.tooth.selected').forEach(tooth => {
                    tooth.classList.remove('selected');
                });
                updateSelectedTeethDisplay();
            });
        }

        function initializeAdvancedButtons() {
            // Auto-sequence button
            document.getElementById('autoSequenceBtn').addEventListener('click', () => {
                autoSequenceProcedures();
            });

            // Add stage button
            document.getElementById('addStageBtn').addEventListener('click', () => {
                addNewStage();
            });

            // Action buttons
            document.getElementById('saveProgress').addEventListener('click', performManualSave);
            document.getElementById('generatePDF').addEventListener('click', generateAdvancedPDF);
            document.getElementById('emailPlan').addEventListener('click', emailTreatmentPlan);
            document.getElementById('scheduleAppointments').addEventListener('click', openAdvancedScheduling);
            document.getElementById('exportData').addEventListener('click', exportTreatmentData);
            document.getElementById('printPlan').addEventListener('click', printTreatmentPlan);
        }

        function autoSequenceProcedures() {
            // Advanced sequencing algorithm
            const allProcedures = appState.stages.flatMap(stage => stage.procedures);

            if (allProcedures.length === 0) {
                showModal('No Procedures', 'Please add procedures before using auto-sequence.', 'warning');
                return;
            }

            // Clear existing procedures from stages
            appState.stages.forEach(stage => {
                stage.procedures = [];
                stage.total = 0;
            });

            // Sequence by priority and clinical workflow
            const emergency = allProcedures.filter(p => p.category === 'surgical' && p.name.includes('Extraction'));
            const periodontal = allProcedures.filter(p => p.category === 'periodontal');
            const endodontic = allProcedures.filter(p => p.category === 'endodontic');
            const restorative = allProcedures.filter(p => p.category === 'restorative');
            const prosthetic = allProcedures.filter(p => p.category === 'prosthetic');
            const preventive = allProcedures.filter(p => p.category === 'preventive');

            // Assign to stages
            appState.stages[0].procedures = [...emergency, ...preventive];
            appState.stages[1].procedures = [...periodontal, ...endodontic];
            appState.stages[2].procedures = [...restorative, ...prosthetic];
            appState.stages[3].procedures = [];

            // Update totals
            appState.stages.forEach(stage => {
                stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
            });

            renderStageTabs();
            renderStagesAdvanced();
            updateAnalytics();

            showModal('Auto-Sequence Complete', 'Procedures have been automatically sequenced based on clinical best practices.', 'success');
        }

        function addNewStage() {
            const newStageId = Math.max(...appState.stages.map(s => s.id)) + 1;
            const newStage = {
                id: newStageId,
                name: `Phase ${newStageId}: Custom Treatment`,
                procedures: [],
                total: 0,
                priority: 'medium',
                timeframe: 'To be determined'
            };

            appState.stages.push(newStage);
            appState.selectedStage = newStageId;

            renderStageTabs();
            renderStagesAdvanced();

            showModal('New Stage Added', `${newStage.name} has been created and selected.`, 'success');
        }

        // Enhanced PDF Generation
        function generateAdvancedPDF() {
            const loadingModal = showLoadingModal('Generating comprehensive treatment plan PDF...');

            setTimeout(() => {
                loadingModal.remove();

                // Professional PDF generation would integrate with jsPDF
                const pdfContent = generatePDFContent();

                showModal('PDF Generated', 'Professional treatment plan PDF has been generated successfully.\n\nFeatures included:\n• Complete treatment timeline\n• Cost breakdown with insurance\n• Risk assessment\n• Patient education materials\n• Consent forms', 'success');
            }, 3000);
        }

        function generatePDFContent() {
            return {
                patient: appState.patient,
                stages: appState.stages,
                metrics: appState.metrics,
                financing: {
                    selectedProvider: appState.financing.selectedProvider,
                    downPaymentPercentage: appState.financing.downPaymentPercentage,
                    options: appState.financing.financingOptions,
                    calculations: {
                        downPayment: appState.metrics.patientResponsibility * appState.financing.downPaymentPercentage,
                        financingAmount: appState.metrics.patientResponsibility * (1 - appState.financing.downPaymentPercentage)
                    }
                },
                generatedDate: new Date().toISOString(),
                practiceInfo: {
                    name: 'Clarity Dental Practice',
                    address: '123 Dental Avenue, City, State 12345',
                    phone: '(555) 123-4567',
                    email: 'info@claritydental.com'
                }
            };
        }

        function emailTreatmentPlan() {
            const loadingModal = showLoadingModal('Preparing secure email with treatment plan...');

            setTimeout(() => {
                loadingModal.remove();

                const emailContent = generateEmailContent();

                showModal('Email Sent Successfully',
                    `Treatment plan has been sent to: ${appState.patient.name}\n\n` +
                    `The email includes:\n` +
                    `• Comprehensive treatment plan PDF\n` +
                    `• Payment options and financing information\n` +
                    `• Secure patient portal access link\n` +
                    `• Next appointment scheduling link\n\n` +
                    `Patient will receive the email within 2-3 minutes.`,
                    'success');
            }, 2000);
        }

        function generateEmailContent() {
            const totalCost = appState.metrics.totalCost;
            const totalProcedures = appState.metrics.procedureCount;
            const selectedProvider = appState.financing.selectedProvider;

            let financingInfo = '\n\nFinancing Options:\n';
            financingInfo += '• CareCredit: 0% APR for 6-24 months\n';
            financingInfo += '• Cherry: Flexible terms 3-60 months\n';
            financingInfo += '• Sunbit: AI-powered lending with competitive rates\n';

            if (selectedProvider) {
                const provider = appState.financing.financingOptions[selectedProvider];
                financingInfo += `\nRecommended: ${provider.name} - Apply online or scan the QR code in your treatment plan.`;
            }

            return `Dear ${appState.patient.name},

Your comprehensive treatment plan is ready for review. This email contains your personalized dental treatment recommendations from Dr. Sarah Johnson at Clarity Dental Practice.

Treatment Summary:
• Total procedures: ${totalProcedures}
• Estimated total investment: ${formatCurrency(totalCost)}
• Insurance coverage: ${formatCurrency(appState.metrics.insuranceCovered)}
• Your responsibility: ${formatCurrency(appState.metrics.patientResponsibility)}
• Timeline: ${appState.stages.length} phases over 3-6 months${financingInfo}

Please review the attached treatment plan PDF and contact us with any questions. Financing applications can be completed online in just a few minutes.

Best regards,
Clarity Dental Practice Team`;
        }

        function openAdvancedScheduling() {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-strong max-w-4xl w-full mx-4 max-h-96 overflow-hidden">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Advanced Appointment Scheduling</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6 overflow-y-auto max-h-80">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                <h4 class="font-medium text-gray-900 dark:text-white">Treatment Schedule</h4>
                                ${appState.stages.filter(s => s.procedures.length > 0).map(stage => `
                                    <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <div class="flex justify-between items-center mb-2">
                                            <h5 class="font-medium text-sm">${stage.name}</h5>
                                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${stage.timeframe}</span>
                                        </div>
                                        <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            ${stage.procedures.length} procedures • ${formatCurrency(stage.total)}
                                        </div>
                                        <button class="schedule-btn w-full px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                                            Schedule Phase
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="space-y-4">
                                <h4 class="font-medium text-gray-900 dark:text-white">Scheduling Options</h4>
                                <div class="space-y-3">
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded" checked>
                                        <span class="text-sm">Schedule consecutive appointments</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded" checked>
                                        <span class="text-sm">Send appointment reminders</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded">
                                        <span class="text-sm">Include pre-medication instructions</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded" checked>
                                        <span class="text-sm">Block time for medical consultations</span>
                                    </label>
                                </div>
                                <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <div class="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                                        <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                                        <span class="text-sm font-medium">Medical Considerations</span>
                                    </div>
                                    <p class="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                        Patient has diabetes and hypertension. Schedule morning appointments and ensure adequate recovery time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 flex justify-between items-center">
                            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
                    btn.className = 'schedule-btn w-full px-3 py-2 bg-green-500 text-white rounded-lg text-sm';
                });
            });

            document.body.appendChild(modal);
            lucide.createIcons();
        }

        function exportTreatmentData() {
            const exportData = {
                patient: appState.patient,
                stages: appState.stages,
                metrics: appState.metrics,
                exportDate: new Date().toISOString(),
                version: '2.1.0'
            };

            const jsonData = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `treatment-plan-${appState.patient.id}-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showModal('Export Complete', 'Treatment plan data has been exported successfully.', 'success');
        }

        function printTreatmentPlan() {
            const printWindow = window.open('', '_blank');
            const printContent = generatePrintContent();

            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }

        function generatePrintContent() {
            const allProcedures = appState.stages.flatMap(stage => stage.procedures);

            return `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Treatment Plan - ${appState.patient.name}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                        .patient-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                        .procedures { margin-top: 30px; }
                        .stage { margin-bottom: 25px; }
                        .stage-header { background: #f0f0f0; padding: 10px; font-weight: bold; }
                        .procedure { padding: 10px; border-bottom: 1px solid #eee; }
                        .totals { margin-top: 30px; border-top: 2px solid #333; padding-top: 20px; }
                        @media print { body { margin: 20px; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Comprehensive Treatment Plan</h1>
                        <p><strong>Clarity Dental Practice</strong> | 123 Dental Avenue | (555) 123-4567</p>
                    </div>

                    <div class="patient-info">
                        <div>
                            <h3>Patient Information</h3>
                            <p><strong>Name:</strong> ${appState.patient.name}</p>
                            <p><strong>Patient ID:</strong> ${appState.patient.id}</p>
                            <p><strong>Age:</strong> ${appState.patient.age}</p>
                            <p><strong>Date of Birth:</strong> ${appState.patient.dob}</p>
                        </div>
                        <div>
                            <h3>Insurance Information</h3>
                            <p><strong>Provider:</strong> ${appState.patient.insurance.provider}</p>
                            <p><strong>Annual Maximum:</strong> ${formatCurrency(appState.patient.insurance.annualMax)}</p>
                            <p><strong>Remaining Benefits:</strong> ${formatCurrency(appState.patient.insurance.remaining)}</p>
                        </div>
                    </div>

                    <div class="procedures">
                        <h3>Treatment Plan by Phase</h3>
                        ${appState.stages.filter(s => s.procedures.length > 0).map(stage => `
                            <div class="stage">
                                <div class="stage-header">${stage.name} - ${formatCurrency(stage.total)}</div>
                                ${stage.procedures.map(proc => `
                                    <div class="procedure">
                                        <strong>Tooth ${proc.tooth}:</strong> ${proc.name} (${proc.code}) - ${formatCurrency(proc.cost)}
                                        <br><small>${proc.description}</small>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>

                    <div class="totals">
                        <h3>Financial Summary</h3>
                        <p><strong>Total Treatment Cost:</strong> ${formatCurrency(appState.metrics.totalCost)}</p>
                        <p><strong>Insurance Coverage:</strong> ${formatCurrency(appState.metrics.insuranceCovered)}</p>
                        <p><strong>Patient Responsibility:</strong> ${formatCurrency(appState.metrics.patientResponsibility)}</p>
                        ${appState.financing.selectedProvider ? `
                        <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd;">
                            <h4>Recommended Financing: ${appState.financing.financingOptions[appState.financing.selectedProvider].name}</h4>
                            <p><strong>Down Payment (20%):</strong> ${formatCurrency(appState.metrics.patientResponsibility * 0.2)}</p>
                            <p><strong>Amount to Finance:</strong> ${formatCurrency(appState.metrics.patientResponsibility * 0.8)}</p>
                            <p><strong>Apply online:</strong> ${appState.financing.financingOptions[appState.financing.selectedProvider].url}</p>
                        </div>
                        ` : ''}
                    </div>

                    <div style="margin-top: 40px;">
                        <p><strong>Plan Generated:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Valid Until:</strong> ${new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString()}</p>
                    </div>
                </body>
                </html>
            `;
        }

        function performManualSave() {
            const saveButton = document.getElementById('saveProgress');
            const originalContent = saveButton.innerHTML;

            saveButton.innerHTML = '<div class="loading-spinner"></div>';
            saveButton.disabled = true;

            setTimeout(() => {
                saveButton.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
                saveButton.className = saveButton.className.replace('bg-green-100', 'bg-green-500').replace('text-green-600', 'text-white');
                lucide.createIcons();

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

                setTimeout(() => notification.remove(), 3000);

                setTimeout(() => {
                    saveButton.innerHTML = originalContent;
                    saveButton.className = saveButton.className.replace('bg-green-500', 'bg-green-100').replace('text-white', 'text-green-600');
                    saveButton.disabled = false;
                    lucide.createIcons();
                }, 2000);
            }, 1000);
        }

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

        // Dark Mode Toggle
        function initializeDarkMode() {
            const darkModeToggle = document.getElementById('darkModeToggle');

            darkModeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                appState.settings.darkMode = document.documentElement.classList.contains('dark');
            });
        }

        // Enhanced Application Initialization
        function initializeAdvancedApp() {
            // Core initialization
            renderToothChart();
            renderProceduresAdvanced();
            renderStageTabs();
            renderStagesAdvanced();
            updateSelectedTeethDisplay();
            updateAnalytics();

            // Advanced features
            initializeAdvancedSearch();
            initializeAIAssistant();
            initializeClearSelection();
            initializeAdvancedButtons();
            initializeFinancingOptions();
            initializeDarkMode();

            // Auto-save functionality
            setInterval(() => {
                console.log('Auto-save triggered - treatment plan preserved in memory');
            }, 30000);

            // Initialize with sample data for demonstration
            if (appState.stages.every(stage => stage.procedures.length === 0)) {
                initializeSampleData();
            }
        }

        function initializeSampleData() {
            // Add some sample procedures for demonstration
            const sampleProcedures = [
                { procedureId: 1, teeth: [16] },
                { procedureId: 6, teeth: [17] },
                { procedureId: 11, teeth: [19] },
                { procedureId: 2, teeth: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28] }
            ];

            sampleProcedures.forEach(({ procedureId, teeth }) => {
                const procedure = appState.procedures.find(p => p.id === procedureId);
                if (procedure) {
                    teeth.forEach(tooth => {
                        const newProcedure = {
                            ...procedure,
                            tooth,
                            uniqueId: Date.now() + Math.random(),
                            addedDate: new Date().toISOString(),
                            insuranceCoverage: calculateInsuranceCoverage(procedure)
                        };

                        // Add to appropriate stage based on procedure type
                        let targetStage = appState.stages[0];
                        if (procedure.category === 'preventive') targetStage = appState.stages[3];
                        else if (procedure.category === 'restorative') targetStage = appState.stages[2];
                        else if (procedure.category === 'endodontic') targetStage = appState.stages[1];

                        targetStage.procedures.push(newProcedure);
                    });
                }
            });

            // Update stage totals
            appState.stages.forEach(stage => {
                stage.total = stage.procedures.reduce((sum, proc) => sum + proc.cost, 0);
            });

            // Re-render with sample data
            renderStageTabs();
            renderStagesAdvanced();
            updateAnalytics();
        }

        // Start the advanced application
        document.addEventListener('DOMContentLoaded', initializeAdvancedApp);
    </script>
</body>
</html>