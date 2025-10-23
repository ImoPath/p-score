"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Users, AlertTriangle } from "lucide-react"

// Kenya branch locations with risk data
const branches = [
  { 
    name: "Nairobi Central", 
    region: "Central", 
    customers: 856, 
    highRisk: 89, 
    x: 52, 
    y: 58 
  },
  { 
    name: "Mombasa", 
    region: "Coast", 
    customers: 423, 
    highRisk: 45, 
    x: 78, 
    y: 75 
  },
  { 
    name: "Kisumu", 
    region: "Nyanza", 
    customers: 312, 
    highRisk: 32, 
    x: 28, 
    y: 52 
  },
  { 
    name: "Nakuru", 
    region: "Rift Valley", 
    customers: 267, 
    highRisk: 28, 
    x: 42, 
    y: 50 
  },
  { 
    name: "Eldoret", 
    region: "Rift Valley", 
    customers: 198, 
    highRisk: 18, 
    x: 35, 
    y: 38 
  },
  { 
    name: "Thika", 
    region: "Central", 
    customers: 156, 
    highRisk: 15, 
    x: 58, 
    y: 55 
  },
  { 
    name: "Malindi", 
    region: "Coast", 
    customers: 123, 
    highRisk: 7, 
    x: 75, 
    y: 68 
  },
]

export default function KenyaBranchMapSimple() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4">
      {/* Map Visualization */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border-2 border-[#1b87c9]/20 p-6">
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-[#1b87c9]/20 z-10">
          <h3 className="text-sm font-semibold text-[#1b87c9]">Kenya Branch Network</h3>
        </div>

        {/* Enhanced SVG Map Container */}
        <svg viewBox="0 0 100 100" className="w-full h-full min-h-[300px]">
          {/* Kenya outline (more detailed) */}
          <path
            d="M 45 20 L 55 18 L 65 22 L 72 28 L 78 35 L 82 45 L 85 55 L 82 65 L 78 72 L 70 78 L 60 82 L 50 83 L 40 82 L 32 78 L 25 70 L 20 60 L 18 50 L 20 40 L 25 32 L 32 25 L 40 22 Z"
            fill="#e0f2fe"
            stroke="#1b87c9"
            strokeWidth="0.8"
            opacity="0.4"
            className="drop-shadow-sm"
          />

          {/* Grid lines for better reference */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1b87c9" strokeWidth="0.2" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Branch markers with enhanced styling */}
          {branches.map((branch, index) => {
            const riskPercentage = (branch.highRisk / branch.customers) * 100
            const isHighRisk = riskPercentage > 15
            const markerColor = isHighRisk ? "#ec8425" : "#1b87c9"
            const markerSize = 3 + branch.customers / 200

            return (
              <g key={index}>
                {/* Outer glow for high risk branches */}
                {isHighRisk && (
                  <circle
                    cx={branch.x}
                    cy={branch.y}
                    r={markerSize + 2}
                    fill="none"
                    stroke={markerColor}
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                )}
                
                {/* Main marker circle */}
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={markerSize}
                  fill={markerColor}
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.9"
                  className="cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-200 drop-shadow-md"
                >
                  <title>
                    {branch.name}: {branch.customers} customers, {branch.highRisk} high risk (
                    {riskPercentage.toFixed(1)}%)
                  </title>
                </circle>

                {/* Inner dot for better visibility */}
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={markerSize * 0.4}
                  fill="white"
                  opacity="0.8"
                />

                {/* Pulse animation for high risk branches */}
                {isHighRisk && (
                  <circle
                    cx={branch.x}
                    cy={branch.y}
                    r={markerSize}
                    fill="none"
                    stroke={markerColor}
                    strokeWidth="0.8"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      from={markerSize}
                      to={markerSize + 4}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Branch name labels */}
                <text
                  x={branch.x}
                  y={branch.y - markerSize - 2}
                  textAnchor="middle"
                  className="text-xs font-medium fill-slate-700 pointer-events-none"
                  style={{ fontSize: "2px" }}
                >
                  {branch.name.split(" ")[0]}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Enhanced Legend */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-[#1b87c9]/20 z-10">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1b87c9] shadow-sm" />
              <span className="text-slate-700 font-medium">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ec8425] shadow-sm" />
              <span className="text-slate-700 font-medium">High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Branch List */}
      <div className="lg:w-80 space-y-3 max-h-[400px] overflow-y-auto">
        {branches.map((branch, index) => {
          const riskPercentage = ((branch.highRisk / branch.customers) * 100).toFixed(1)
          const isHighRisk = Number.parseFloat(riskPercentage) > 15

          return (
            <Card
              key={index}
              className={`p-4 border-l-4 ${
                isHighRisk ? "border-l-[#ec8425] bg-orange-50/50 hover:bg-orange-50/70" : "border-l-[#1b87c9] bg-blue-50/50 hover:bg-blue-50/70"
              } hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className={`h-4 w-4 ${isHighRisk ? "text-[#ec8425]" : "text-[#1b87c9]"}`} />
                    <h4 className="font-semibold text-sm text-slate-900">{branch.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{branch.region}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="h-3 w-3 text-slate-400" />
                      <span className="text-slate-600">{branch.customers} customers</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertTriangle className={`h-3 w-3 ${isHighRisk ? "text-[#ec8425]" : "text-slate-400"}`} />
                      <span className={isHighRisk ? "text-[#ec8425] font-medium" : "text-slate-600"}>
                        {branch.highRisk} high risk ({riskPercentage}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Risk indicator dot */}
                <div className={`w-3 h-3 rounded-full ${isHighRisk ? "bg-[#ec8425]" : "bg-[#1b87c9]"} shadow-sm`} />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
