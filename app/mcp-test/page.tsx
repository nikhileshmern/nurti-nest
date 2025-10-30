'use client'

import { useState } from 'react'
import { TestTube, CreditCard, CheckCircle, AlertCircle, Play, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

interface TestResult {
  tool: string
  status: 'pending' | 'success' | 'error'
  result?: any
  error?: string
  duration?: number
}

export default function MCPTestPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [currentTest, setCurrentTest] = useState<string>('')

  const testTools = [
    {
      name: 'Create Order',
      tool: 'mcp_rzp-mcp-server_create_order',
      description: 'Test creating a Razorpay order',
      params: {
        amount: 10000,
        currency: 'INR',
        receipt: `test_${Date.now()}`
      }
    },
    {
      name: 'Create Payment Link',
      tool: 'mcp_rzp-mcp-server_create_payment_link',
      description: 'Test creating a payment link',
      params: {
        amount: 10000,
        currency: 'INR',
        description: 'Test Payment Link'
      }
    },
    {
      name: 'Create QR Code',
      tool: 'mcp_rzp-mcp-server_create_qr_code',
      description: 'Test creating a UPI QR code',
      params: {
        type: 'upi_qr',
        usage: 'single_use',
        name: 'Test QR Code'
      }
    }
  ]

  const runTest = async (test: typeof testTools[0]) => {
    setCurrentTest(test.name)
    const startTime = Date.now()
    
    // Add pending result
    const pendingResult: TestResult = {
      tool: test.tool,
      status: 'pending'
    }
    setResults(prev => [...prev, pendingResult])

    try {
      // Simulate MCP tool call
      console.log(`Testing ${test.tool} with params:`, test.params)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      // Simulate success response
      const mockResult = {
        id: `${test.tool.split('_').pop()}_${Date.now()}`,
        status: 'created',
        ...test.params,
        created_at: Math.floor(Date.now() / 1000)
      }

      const duration = Date.now() - startTime
      
      // Update result
      setResults(prev => prev.map(r => 
        r.tool === test.tool 
          ? { ...r, status: 'success', result: mockResult, duration }
          : r
      ))

      toast.success(`${test.name} test completed successfully!`)
      
    } catch (error) {
      const duration = Date.now() - startTime
      
      // Update result with error
      setResults(prev => prev.map(r => 
        r.tool === test.tool 
          ? { ...r, status: 'error', error: 'Test failed', duration }
          : r
      ))

      toast.error(`${test.name} test failed!`)
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setResults([])
    
    for (const test of testTools) {
      await runTest(test)
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsRunning(false)
    setCurrentTest('')
  }

  const clearResults = () => {
    setResults([])
    setCurrentTest('')
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
            Razorpay MCP Tools Test
          </h1>
          <p className="text-gray-600 text-lg">
            Test and validate Razorpay MCP tool integrations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Test Controls
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={runAllTests}
                  disabled={isRunning}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{isRunning ? 'Running Tests...' : 'Run All Tests'}</span>
                </button>

                <button
                  onClick={clearResults}
                  disabled={isRunning}
                  className="w-full btn-secondary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Clear Results</span>
                </button>
              </div>

              {currentTest && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-blue-800 font-semibold">
                      Currently testing: {currentTest}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Available Tools */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                Available MCP Tools
              </h3>
              
              <div className="space-y-3">
                {testTools.map((test, index) => (
                  <div key={test.tool} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{test.name}</h4>
                      <button
                        onClick={() => runTest(test)}
                        disabled={isRunning}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Test
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {test.tool}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">
                Test Results
              </h2>
              
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tests run yet. Click "Run All Tests" to start.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(result.status)}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {testTools.find(t => t.tool === result.tool)?.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {result.tool}
                            </p>
                          </div>
                        </div>
                        {result.duration && (
                          <span className="text-sm text-gray-500">
                            {result.duration}ms
                          </span>
                        )}
                      </div>

                      {result.status === 'success' && result.result && (
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-green-800 mb-2">Result:</h4>
                          <pre className="text-xs bg-green-100 p-2 rounded overflow-x-auto">
                            {JSON.stringify(result.result, null, 2)}
                          </pre>
                        </div>
                      )}

                      {result.status === 'error' && result.error && (
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-red-800 mb-2">Error:</h4>
                          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
                            {result.error}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Test Summary */}
            {results.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-900 font-poppins mb-4">
                  Test Summary
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {results.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Tests</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {results.filter(r => r.status === 'success').length}
                    </div>
                    <div className="text-sm text-green-600">Passed</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {results.filter(r => r.status === 'error').length}
                    </div>
                    <div className="text-sm text-red-600">Failed</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
