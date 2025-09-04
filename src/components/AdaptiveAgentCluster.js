import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Settings, Database, Code, TestTube, Zap, GitBranch, Download, Plus, AlertTriangle, CheckCircle, Clock, Cpu, Network, GitMerge } from 'lucide-react';

const AdaptiveAgentCluster = () => {
  const [projectRequirement, setProjectRequirement] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState([]);
  const [mcpServers, setMcpServers] = useState([]);
  const [dynamicTools, setDynamicTools] = useState([]);
  const [buildLog, setBuildLog] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('idle');
  const [systemStats, setSystemStats] = useState({
    linesProcessed: 0,
    errorsFound: 0,
    errorsCorrected: 0,
    toolsGenerated: 0,
    validationCycles: 0
  });
  const [generatedFiles, setGeneratedFiles] = useState({});
  const [isGeneratingApp, setIsGeneratingApp] = useState(false);
  const logRef = useRef(null);

  // GodCodeRX Paradigm State
  const [godCodeRxPrompt, setGodCodeRxPrompt] = useState('');
  const [godCodeRxOutput, setGodCodeRxOutput] = useState('');
  const [godCodeRxTools] = useState([
    { name: 'create_file', signature: 'create_file(path: str, content: str)', description: 'Creates a new file with specified content.' },
    { name: 'read_file', signature: 'read_file(path: str)', description: 'Reads the content of an existing file.' },
    { name: 'update_file', signature: 'update_file(path: str, new_content: str)', description: 'Overwrites a file with new content.' },
    { name: 'lint_code', signature: 'lint_code(path: str)', description: 'Runs a linter on a specific file to check for errors.' },
    { name: 'run_tests', signature: 'run_tests(suite: str)', description: 'Executes a specified test suite (e.g., "unit", "integration").' },
    { name: 'refactor_code', signature: 'refactor_code(path: str, instructions: str)', description: 'Applies refactoring changes based on instructions.' },
  ]);

  // Initialize default agents and MCP servers
  useEffect(() => {
    setAgents([
      { id: 'orchestrator', name: 'Orchestrator Agent', status: 'idle', specialty: 'Coordination', active: false },
      { id: 'godcoderx', name: 'GodCodeRX Agent', status: 'idle', specialty: 'Tool-Based Execution', active: false },
      { id: 'architecture', name: 'Architecture Agent', status: 'idle', specialty: 'System Design', active: false },
      { id: 'frontend', name: 'Frontend Agent', status: 'idle', specialty: 'UI/UX', active: false },
      { id: 'backend', name: 'Backend Agent', status: 'idle', specialty: 'API/Logic', active: false },
      { id: 'database', name: 'Database Agent', status: 'idle', specialty: 'Data Layer', active: false },
      { id: 'validation', name: 'Real-Time Validation Agent', status: 'idle', specialty: 'Code Testing', active: false },
      { id: 'error-correction', name: 'Error Correction Agent', status: 'idle', specialty: 'Bug Fixing', active: false },
      { id: 'mcp-manager', name: 'MCP Server Manager', status: 'idle', specialty: 'Tool Management', active: false },
      { id: 'tool-fusion', name: 'Tool Fusion Agent', status: 'idle', specialty: 'Dynamic Tools', active: false }
    ]);

    setMcpServers([
      { id: 'core-dev', name: 'Core Development Tools', status: 'active', tools: ['compiler', 'linter', 'formatter'] },
      { id: 'web-framework', name: 'Web Framework Server', status: 'active', tools: ['react-tools', 'express-tools', 'webpack'] },
      { id: 'database-tools', name: 'Database Tools Server', status: 'active', tools: ['postgres-client', 'migration-tools', 'query-optimizer'] }
    ]);
  }, []);

  // Auto-scroll build log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [buildLog]);

  const addLog = (message, type = 'info', agentId = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setBuildLog(prev => [...prev, {
      id: Date.now() + Math.random(),
      timestamp,
      message,
      type,
      agentId
    }]);
  };

  const updateAgentStatus = (agentId, status, active = true) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId ? { ...agent, status, active } : agent
    ));
  };

  const updateStats = (updates) => {
    setSystemStats(prev => ({ ...prev, ...updates }));
  };

  const handleGodCodeRxSubmit = () => {
    if (!godCodeRxPrompt.trim()) return;

    addLog(`Received prompt: "${godCodeRxPrompt}"`, 'info', 'godcoderx');
    updateAgentStatus('godcoderx', 'processing prompt');

    const prompt = godCodeRxPrompt.toLowerCase();
    let toolCalls = [];

    if (prompt.includes('create') && prompt.includes('file')) {
        toolCalls.push('create_file(path="new_file.js", content="// Your code here")');
    }
    if (prompt.includes('lint')) {
        toolCalls.push('lint_code(path="src/index.js")');
    }
    if (prompt.includes('test')) {
        toolCalls.push('run_tests(suite="all")');
    }
    if (prompt.includes('refactor')) {
        toolCalls.push('refactor_code(path="src/App.js", instructions="Improve performance")');
    }

    let output;
    if (toolCalls.length > 0) {
        output = `<|tool_call_start|>${toolCalls.join(', ')}<|tool_call_end|>`;
    } else {
        output = "I am a GodCodeRX agent. I can perform tasks by calling tools. Please provide a clear instruction related to file operations, linting, testing, or refactoring.";
    }
    
    setTimeout(() => {
      setGodCodeRxOutput(output);
      addLog(`Generated output for prompt`, 'success', 'godcoderx');
      updateAgentStatus('godcoderx', 'idle', false);
    }, 750);
  };


  const generateDynamicTool = async (toolName, purpose, agentId) => {
    const newTool = {
      id: `tool-${Date.now()}`,
      name: toolName,
      purpose,
      createdBy: agentId,
      status: 'generating',
      capabilities: [],
      mcpEndpoint: `mcp://dynamic-${toolName.toLowerCase().replace(/\s+/g, '-')}`
    };

    setDynamicTools(prev => [...prev, newTool]);
    addLog(`🔧 Generating dynamic tool: ${toolName}`, 'tool', agentId);

    // Simulate tool generation process
    setTimeout(() => {
      setDynamicTools(prev => prev.map(tool =>
        tool.id === newTool.id
          ? { ...tool, status: 'active', capabilities: ['parse', 'validate', 'transform'] }
          : tool
      ));
      addLog(`✅ Dynamic tool ready: ${toolName}`, 'success', agentId);
      updateStats({ toolsGenerated: systemStats.toolsGenerated + 1 });
    }, 2000);

    return newTool;
  };

  const simulateCollaborativeFragmentation = async (requirement) => {
    addLog('🔄 Initiating collaborative re-fragmentation...', 'system');
    setCurrentPhase('fragmentation');

    // Create micro-specialists
    const microSpecialists = [
      'Parser Specialist',
      'Integration Specialist',
      'Validation Specialist',
      'Security Specialist'
    ];

    for (const specialist of microSpecialists) {
      addLog(`🧬 Fragmenting into ${specialist}`, 'fragment', 'tool-fusion');
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate collaborative tool
    await generateDynamicTool(`Custom ${requirement} Handler`, `Handle ${requirement} requirements`, 'tool-fusion');

    addLog('🔗 Re-assembling specialized knowledge...', 'system');
    setCurrentPhase('assimilation');

    setTimeout(() => {
      addLog('✅ Collaborative tool assimilation complete', 'success', 'tool-fusion');
      setCurrentPhase('building');
    }, 1500);
  };

  const simulateBuildProcess = async () => {
    setIsRunning(true);
    setCurrentPhase('initializing');
    setBuildLog([]);

    addLog('🚀 Starting adaptive agent cluster build process...', 'system');

    // Phase 1: Orchestration
    updateAgentStatus('orchestrator', 'analyzing requirements');
    addLog('📋 Parsing project requirements and creating specifications', 'info', 'orchestrator');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 2: Architecture Planning
    updateAgentStatus('architecture', 'designing system');
    addLog('🏗️ Designing system architecture and technology stack', 'info', 'architecture');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 3: MCP Server Discovery
    updateAgentStatus('mcp-manager', 'scanning servers');
    addLog('🔍 Scanning available MCP servers for required tools', 'info', 'mcp-manager');
    await new Promise(resolve => setTimeout(resolve, 800));

    // Phase 4: Tool Gap Analysis
    addLog('🔧 Identifying tool gaps for specialized requirements...', 'warning', 'mcp-manager');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate finding a gap that requires dynamic tool generation
    if (projectRequirement.toLowerCase().includes('custom') || projectRequirement.toLowerCase().includes('specialized')) {
      addLog('⚠️ Tool gap identified: No existing MCP server for this requirement', 'warning', 'mcp-manager');
      await simulateCollaborativeFragmentation(projectRequirement);
    }

    setCurrentPhase('building');

    // Phase 5: Parallel Development with Real-time Validation
    const developmentAgents = ['frontend', 'backend', 'database'];

    for (let i = 0; i < developmentAgents.length; i++) {
      const agent = developmentAgents[i];
      updateAgentStatus(agent, 'generating code');
      addLog(`💾 ${agent.charAt(0).toUpperCase() + agent.slice(1)} agent starting development`, 'info', agent);
    }

    // Simulate real-time validation cycles
    updateAgentStatus('validation', 'validating code');
    updateAgentStatus('error-correction', 'monitoring');

    for (let line = 1; line <= 50; line++) {
      await new Promise(resolve => setTimeout(resolve, 200));

      updateStats({
        linesProcessed: line,
        validationCycles: Math.floor(line / 3)
      });

      // Simulate occasional errors and corrections
      if (line % 7 === 0) {
        addLog(`❌ Syntax error detected on line ${line}`, 'error', 'validation');
        await new Promise(resolve => setTimeout(resolve, 300));
        addLog(`🔧 Error corrected automatically`, 'success', 'error-correction');
        updateStats({
          errorsFound: systemStats.errorsFound + 1,
          errorsCorrected: systemStats.errorsCorrected + 1
        });
      } else if (line % 5 === 0) {
        addLog(`✅ Code validation passed for lines ${line-4}-${line}`, 'success', 'validation');
      }

      // Simulate integration testing
      if (line % 10 === 0) {
        addLog(`🔗 Integration test cycle ${Math.floor(line/10)} completed`, 'info', 'validation');
      }
    }

    setCurrentPhase('finalizing');
    addLog('🎯 Build process completed successfully!', 'success');
    addLog('📦 Generating downloadable application package...', 'info');

    setTimeout(() => {
      addLog('✅ Application package ready for download', 'success');
      setCurrentPhase('complete');
      setIsRunning(false);

      // Reset agent statuses
      setAgents(prev => prev.map(agent => ({ ...agent, status: 'complete', active: false })));
    }, 2000);
  };

  const stopBuild = () => {
    setIsRunning(false);
    setCurrentPhase('stopped');
    addLog('🛑 Build process stopped by user', 'warning');
    setAgents(prev => prev.map(agent => ({ ...agent, status: 'idle', active: false })));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'idle': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Cpu className="w-4 h-4 text-blue-500 animate-pulse" />;
    }
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'error': return '❌';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'tool': return '🔧';
      case 'fragment': return '🧬';
      case 'system': return '🔄';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-400" />
            Adaptive Agent Cluster
          </h1>
          <p className="text-gray-300">Dynamic MCP Serving & Liquid Tool Generation</p>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Project Requirements</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={projectRequirement}
              onChange={(e) => setProjectRequirement(e.target.value)}
              placeholder="Describe your application (e.g., 'E-commerce platform with custom payment gateway')"
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-400"
              disabled={isRunning}
            />
            <button
              onClick={isRunning ? stopBuild : simulateBuildProcess}
              disabled={!projectRequirement.trim() && !isRunning}
              className={`px-6 py-2 rounded font-medium flex items-center gap-2 ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Stop Build' : 'Start Build'}
            </button>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div className="bg-gray-700 rounded p-3">
              <div className="text-2xl font-bold text-blue-400">{systemStats.linesProcessed}</div>
              <div className="text-sm text-gray-300">Lines Processed</div>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <div className="text-2xl font-bold text-red-400">{systemStats.errorsFound}</div>
              <div className="text-sm text-gray-300">Errors Found</div>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <div className="text-2xl font-bold text-green-400">{systemStats.errorsCorrected}</div>
              <div className="text-sm text-gray-300">Auto-Corrected</div>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <div className="text-2xl font-bold text-purple-400">{systemStats.toolsGenerated}</div>
              <div className="text-sm text-gray-300">Tools Generated</div>
            </div>
            <div className="bg-gray-700 rounded p-3">
              <div className="text-2xl font-bold text-yellow-400">{systemStats.validationCycles}</div>
              <div className="text-sm text-gray-300">Validation Cycles</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agent Status Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Agent Cluster Status
            </h3>
            <div className="space-y-3 h-[450px] overflow-y-auto pr-2">
              {agents.map(agent => (
                <div key={agent.id} className={`p-3 rounded-lg border ${
                  agent.active ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 bg-gray-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(agent.status)}
                      <span className="font-medium">{agent.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{agent.specialty}</span>
                  </div>
                  <div className="text-sm text-gray-300 mt-1">{agent.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GodCodeRX Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GitMerge className="w-5 h-5" />
              GodCodeRX Interaction
            </h3>
            <div className="mb-4">
              <h4 className="font-medium text-gray-300 mb-2 text-sm">Available Tools:</h4>
              <div className="text-xs text-gray-400 space-y-1">
                {godCodeRxTools.map(tool => (
                  <p key={tool.name} className="font-mono">{tool.signature}</p>
                ))}
              </div>
            </div>
            <div className="space-y-3">
               <input
                type="text"
                value={godCodeRxPrompt}
                onChange={(e) => setGodCodeRxPrompt(e.target.value)}
                placeholder="Instruct the GodCodeRX agent (e.g., 'lint and test the codebase')"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <button
                onClick={handleGodCodeRxSubmit}
                disabled={!godCodeRxPrompt.trim()}
                className="w-full px-4 py-2 rounded font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Execute Instruction
              </button>
               <div className="bg-gray-900 rounded p-4 h-48 overflow-y-auto font-mono text-sm">
                 {godCodeRxOutput ? (
                   <code className="whitespace-pre-wrap text-green-400">{godCodeRxOutput}</code>
                 ) : (
                   <div className="text-gray-500">Agent output will appear here...</div>
                 )}
               </div>
            </div>
          </div>


          {/* MCP Servers & Dynamic Tools */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              MCP Servers & Tools
            </h3>

            <div className="mb-4">
              <h4 className="font-medium text-blue-400 mb-2">Active MCP Servers</h4>
              {mcpServers.map(server => (
                <div key={server.id} className="p-2 bg-gray-700 rounded mb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{server.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      server.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {server.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Tools: {server.tools.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-medium text-purple-400 mb-2">Dynamic Tools</h4>
              {dynamicTools.length === 0 ? (
                <div className="text-gray-500 text-sm">No dynamic tools generated yet</div>
              ) : (
                dynamicTools.map(tool => (
                  <div key={tool.id} className="p-2 bg-gray-700 rounded mb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{tool.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        tool.status === 'active' ? 'bg-purple-600 text-white' : 'bg-yellow-600 text-white'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Created by: {tool.createdBy}
                    </div>
                    <div className="text-xs text-gray-400">
                      Purpose: {tool.purpose}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Build Log */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Real-time Build Log
            </h3>
            <div
              ref={logRef}
              className="bg-gray-900 rounded p-4 h-96 overflow-y-auto font-mono text-sm"
            >
              {buildLog.length === 0 ? (
                <div className="text-gray-500">Build log will appear here...</div>
              ) : (
                buildLog.map(log => (
                  <div key={log.id} className={`mb-1 ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    log.type === 'tool' ? 'text-purple-400' :
                    log.type === 'fragment' ? 'text-cyan-400' :
                    'text-gray-300'
                  }`}>
                    <span className="text-gray-500 text-xs">[{log.timestamp}]</span> {getLogIcon(log.type)} {log.message}
                    {log.agentId && <span className="text-xs text-gray-500 ml-2">({log.agentId})</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        {currentPhase !== 'idle' && (
          <div className="mt-6 bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  currentPhase === 'complete' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
                }`}></div>
                <span className="font-medium">Current Phase: {currentPhase}</span>
              </div>
              {currentPhase === 'complete' && (
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download App Package
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdaptiveAgentCluster;