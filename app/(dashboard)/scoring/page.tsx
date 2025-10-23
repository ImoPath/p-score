"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, FileText, Filter, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

// Mock customer scoring data
const customerScores = [
  {
    id: "CUS-1001",
    name: "John Kamau",
    score: 725,
    probability: 0.15,
    riskLevel: "low",
    timestamp: "2024-01-15 14:30:22",
  },
  // {
  //   id: "CUS-1002",
  //   name: "Mary Wanjiku",
  //   score: 680,
  //   probability: 0.28,
  //   riskLevel: "medium",
  //   timestamp: "2024-01-15 14:30:22",
  // },
  {
    id: "CUS-1003",
    name: "Peter Omondi",
    score: 545,
    probability: 0.62,
    riskLevel: "high",
    timestamp: "2024-01-15 14:30:22",
  },
  {
    id: "CUS-1004",
    name: "Grace Akinyi",
    score: 710,
    probability: 0.18,
    riskLevel: "low",
    timestamp: "2024-01-15 14:30:22",
  },
  // {
  //   id: "CUS-1005",
  //   name: "David Mwangi",
  //   score: 625,
  //   probability: 0.35,
  //   riskLevel: "medium",
  //   timestamp: "2024-01-15 14:30:22",
  // },
  {
    id: "CUS-1006",
    name: "Sarah Njeri",
    score: 495,
    probability: 0.71,
    riskLevel: "high",
    timestamp: "2024-01-15 14:30:22",
  },
  {
    id: "CUS-1007",
    name: "James Otieno",
    score: 740,
    probability: 0.12,
    riskLevel: "low",
    timestamp: "2024-01-15 14:30:22",
  },
  // {
  //   id: "CUS-1008",
  //   name: "Lucy Wambui",
  //   score: 655,
  //   probability: 0.32,
  //   riskLevel: "medium",
  //   timestamp: "2024-01-15 14:30:22",
  // },
  {
    id: "CUS-1009",
    name: "Michael Kipchoge",
    score: 520,
    probability: 0.58,
    riskLevel: "high",
    timestamp: "2024-01-15 14:30:22",
  },
  {
    id: "CUS-1010",
    name: "Anne Chebet",
    score: 695,
    probability: 0.22,
    riskLevel: "low",
    timestamp: "2024-01-15 14:30:22",
  },
]

export default function ScoringPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [scoreBand, setScoreBand] = useState("all")
  const [riskLevel, setRiskLevel] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const filteredScores = customerScores.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesScoreBand =
      scoreBand === "all" ||
      (scoreBand === "400-600" && customer.score >= 400 && customer.score < 600) ||
      (scoreBand === "600-700" && customer.score >= 600 && customer.score < 700) ||
      (scoreBand === "700-750" && customer.score >= 700 && customer.score <= 750)

    const matchesRiskLevel = riskLevel === "all" || customer.riskLevel === riskLevel

    return matchesSearch && matchesScoreBand && matchesRiskLevel
  })

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
            Low Risk
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
            High Risk
          </Badge>
        )
      default:
        return null
    }
  }

  const getScoreBandLabel = (score: number) => {
    if (score >= 700) return "700-750"
    if (score >= 600) return "600-700"
    return "400-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Credit Scoring</h1>
          <p className="text-muted-foreground">View and filter customer credit scores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="search">Search Customer</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ID or Name..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="score-band">Score Band</Label>
              <Select value={scoreBand} onValueChange={setScoreBand}>
                <SelectTrigger id="score-band">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="400-600">400-600</SelectItem>
                  <SelectItem value="600-700">600-700</SelectItem>
                  <SelectItem value="700-750">700-750</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-level">Risk Level</Label>
              <Select value={riskLevel} onValueChange={setRiskLevel}>
                <SelectTrigger id="risk-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setScoreBand("all")
                setRiskLevel("all")
                setDateFrom(undefined)
                setDateTo(undefined)
              }}
            >
              Clear Filters
            </Button>
            <span className="text-sm text-muted-foreground">
              Showing {filteredScores.length} of {customerScores.length} customers
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Scores</CardTitle>
          <CardDescription>Latest credit scoring results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Customer ID
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Name
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Score
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Score Band</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Probability
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScores.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-accent/50">
                  <TableCell className="font-mono text-sm">{customer.id}</TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <span className="font-bold text-lg">{customer.score}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getScoreBandLabel(customer.score)}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{(customer.probability * 100).toFixed(1)}%</span>
                  </TableCell>
                  <TableCell>{getRiskBadge(customer.riskLevel)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{customer.timestamp}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/customers/${customer.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
