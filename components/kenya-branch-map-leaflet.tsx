"use client"

import React, { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { MapPin, Users, AlertTriangle } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const useMap = dynamic(() => import("react-leaflet").then((mod) => mod.useMap), { ssr: false })

// Import Leaflet CSS
if (typeof window !== "undefined") {
  import("leaflet/dist/leaflet.css")
}

// Kenya branch locations with risk data
const branches = [
  { 
    name: "Nairobi Central", 
    region: "Central", 
    customers: 856, 
    highRisk: 89, 
    lat: -1.2921, 
    lng: 36.8219 
  },
  { 
    name: "Mombasa", 
    region: "Coast", 
    customers: 423, 
    highRisk: 45, 
    lat: -4.0435, 
    lng: 39.6682 
  },
  { 
    name: "Kisumu", 
    region: "Nyanza", 
    customers: 312, 
    highRisk: 32, 
    lat: -0.0917, 
    lng: 34.7680 
  },
  { 
    name: "Nakuru", 
    region: "Rift Valley", 
    customers: 267, 
    highRisk: 28, 
    lat: -0.3031, 
    lng: 36.0800 
  },
  { 
    name: "Eldoret", 
    region: "Rift Valley", 
    customers: 198, 
    highRisk: 18, 
    lat: 0.5143, 
    lng: 35.2698 
  },
  { 
    name: "Thika", 
    region: "Central", 
    customers: 156, 
    highRisk: 15, 
    lat: -1.0333, 
    lng: 37.0833 
  },
  { 
    name: "Malindi", 
    region: "Coast", 
    customers: 123, 
    highRisk: 7, 
    lat: -3.2175, 
    lng: 40.1191 
  },
]

// Custom marker icons
const createCustomIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
      <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
    </svg>
  `)}`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
})

const lowRiskIcon = createCustomIcon("#1b87c9")
const highRiskIcon = createCustomIcon("#ec8425")

// Component to fit map bounds to Kenya
function FitBounds() {
  const map = useMap()
  
  React.useEffect(() => {
    // Kenya bounds: [south, west, north, east]
    const kenyaBounds = [
      [-4.7, 33.9], // Southwest
      [5.5, 41.9]   // Northeast
    ] as [[number, number], [number, number]]
    
    map.fitBounds(kenyaBounds, { padding: [20, 20] })
  }, [map])
  
  return null
}

export default function KenyaBranchMapLeaflet() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4">
      {/* Map Visualization */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border-2 border-[#1b87c9]/20 overflow-hidden">
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-[#1b87c9]/20 z-[1000]">
          <h3 className="text-sm font-semibold text-[#1b87c9]">Kenya Branch Network</h3>
        </div>

        <MapContainer
          center={[-0.0236, 37.9062]} // Center of Kenya
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <FitBounds />
          
          {branches.map((branch, index) => {
            const riskPercentage = (branch.highRisk / branch.customers) * 100
            const isHighRisk = riskPercentage > 15
            const markerIcon = isHighRisk ? highRiskIcon : lowRiskIcon

            return (
              <Marker
                key={index}
                position={[branch.lat, branch.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className={`h-4 w-4 ${isHighRisk ? "text-[#ec8425]" : "text-[#1b87c9]"}`} />
                      <h4 className="font-semibold text-sm text-slate-900">{branch.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{branch.region}</p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Users className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-600">{branch.customers} customers</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <AlertTriangle className={`h-3 w-3 ${isHighRisk ? "text-[#ec8425]" : "text-slate-400"}`} />
                        <span className={isHighRisk ? "text-[#ec8425] font-medium" : "text-slate-600"}>
                          {branch.highRisk} high risk ({riskPercentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-[#1b87c9]/20 z-[1000]">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#1b87c9]" />
              <span className="text-slate-600">Low Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ec8425]" />
              <span className="text-slate-600">High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branch List */}
      <div className="lg:w-80 space-y-2 max-h-[400px] overflow-y-auto">
        {branches.map((branch, index) => {
          const riskPercentage = ((branch.highRisk / branch.customers) * 100).toFixed(1)
          const isHighRisk = Number.parseFloat(riskPercentage) > 15

          return (
            <Card
              key={index}
              className={`p-3 border-l-4 ${
                isHighRisk ? "border-l-[#ec8425] bg-orange-50/50" : "border-l-[#1b87c9] bg-blue-50/50"
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className={`h-4 w-4 ${isHighRisk ? "text-[#ec8425]" : "text-[#1b87c9]"}`} />
                    <h4 className="font-semibold text-sm text-slate-900">{branch.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{branch.region}</p>

                  <div className="space-y-1">
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
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
