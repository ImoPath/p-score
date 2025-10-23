"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, FileText, TrendingUp, TrendingDown, DollarSign, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock customer data
const customerData = {
  "CUS-1001": {
    id: "CUS-1001",
    name: "John Kamau",
    email: "john.kamau@example.com",
    phone: "+254 712 345 678",
    branch: "Nairobi Central",
    joinDate: "2022-03-15",
    currentScore: 725,
    currentProbability: 0.15,
    currentRisk: "low",
    totalLoans: 5,
    activeLoans: 1,
    totalBorrowed: 450000,
    totalRepaid: 380000,
    scoreHistory: [
      { date: "Jan", score: 680 },
      { date: "Feb", score: 690 },
      { date: "Mar", score: 695 },
      { date: "Apr", score: 705 },
      { date: "May", score: 715 },
      { date: "Jun", score: 725 },
    ],
  },
  "CUS-1003": {
    id: "CUS-1003",
    name: "Peter Omondi",
    email: "peter.omondi@example.com",
    phone: "+254 723 456 789",
    branch: "Mombasa",
    joinDate: "2023-01-20",
    currentScore: 545,
    currentProbability: 0.62,
    currentRisk: "high",
    totalLoans: 3,
    activeLoans: 2,
    totalBorrowed: 180000,
    totalRepaid: 95000,
    scoreHistory: [
      { date: "Jan", score: 580 },
      { date: "Feb", score: 570 },
      { date: "Mar", score: 560 },
      { date: "Apr", score: 555 },
      { date: "May", score: 550 },
      { date: "Jun", score: 545 },
    ],
  },
}

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const customer = customerData[id as keyof typeof customerData] || customerData["CUS-1001"]

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20 text-base px-3 py-1">
            Low Risk
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 text-base px-3 py-1">
            High Risk
          </Badge>
        )
      default:
        return null
    }
  }

  const scoreChange = customer.scoreHistory[customer.scoreHistory.length - 1].score - customer.scoreHistory[0].score
  const isPositiveTrend = scoreChange > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/scoring">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground">Customer ID: {customer.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Customer Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Score</CardTitle>
            {isPositiveTrend ? (
              <TrendingUp className="h-4 w-4 text-chart-4" />
            ) : (
              <TrendingDown className="h-4 w-4 text-secondary" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customer.currentScore}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {isPositiveTrend ? (
                <>
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-chart-4">+{scoreChange} points</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-secondary" />
                  <span className="text-secondary">{scoreChange} points</span>
                </>
              )}{" "}
              from 6 months ago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Default Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{(customer.currentProbability * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Risk Level</p>
            <div className="mt-2">{getRiskBadge(customer.currentRisk)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customer.totalLoans}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {customer.activeLoans} active loan{customer.activeLoans !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repayment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {((customer.totalRepaid / customer.totalBorrowed) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              KES {customer.totalRepaid.toLocaleString()} / {customer.totalBorrowed.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Basic details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-base font-medium mt-1">{customer.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer ID</p>
                <p className="text-base font-mono mt-1">{customer.id}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base mt-1">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-base mt-1">{customer.phone}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Branch</p>
                  <p className="text-base font-medium mt-1">{customer.branch}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-base mt-1">{new Date(customer.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Summary</CardTitle>
            <CardDescription>Overview of borrowing and repayment history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Loans Taken</span>
                <span className="text-base font-bold">{customer.totalLoans}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Active Loans</span>
                <span className="text-base font-bold">{customer.activeLoans}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Completed Loans</span>
                <span className="text-base font-bold">{customer.totalLoans - customer.activeLoans}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Borrowed</span>
                <span className="text-base font-bold">KES {customer.totalBorrowed.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Repaid</span>
                <span className="text-base font-bold text-chart-4">KES {customer.totalRepaid.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Outstanding Balance</span>
                <span className="text-base font-bold text-secondary">
                  KES {(customer.totalBorrowed - customer.totalRepaid).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Score History</CardTitle>
          <CardDescription>Score trend over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              score: {
                label: "Credit Score",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customer.scoreHistory}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis domain={[400, 800]} className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
