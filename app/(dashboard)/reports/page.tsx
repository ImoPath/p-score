"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Eye, TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react"
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock batch reports data
const batchReports = [
  {
    id: "BATCH-2024-W03",
    date: "2024-01-15",
    totalCustomers: 1479,
    highRisk: 234,
    lowRisk: 1245,
    avgScore: 682,
    avgProbability: 0.28,
    status: "completed",
  },
  {
    id: "BATCH-2024-W02",
    date: "2024-01-08",
    totalCustomers: 1464,
    highRisk: 267,
    lowRisk: 1197,
    avgScore: 678,
    avgProbability: 0.31,
    status: "completed",
  },
  {
    id: "BATCH-2024-W01",
    date: "2024-01-01",
    totalCustomers: 1475,
    highRisk: 289,
    lowRisk: 1186,
    avgScore: 675,
    avgProbability: 0.33,
    status: "completed",
  },
  {
    id: "BATCH-2023-W52",
    date: "2023-12-25",
    totalCustomers: 1447,
    highRisk: 301,
    lowRisk: 1146,
    avgScore: 671,
    avgProbability: 0.35,
    status: "completed",
  },
  {
    id: "BATCH-2023-W51",
    date: "2023-12-18",
    totalCustomers: 1422,
    highRisk: 312,
    lowRisk: 1110,
    avgScore: 668,
    avgProbability: 0.37,
    status: "completed",
  },
]

export default function ReportsPage() {
  const [selectedBatch, setSelectedBatch] = useState(batchReports[0])

  const latestBatch = batchReports[0]
  const previousBatch = batchReports[1]

  const customerChange = latestBatch.totalCustomers - previousBatch.totalCustomers
  const highRiskChange = latestBatch.highRisk - previousBatch.highRisk
  const avgScoreChange = latestBatch.avgScore - previousBatch.avgScore

  const riskDistributionData = [
    { name: "Low Risk", value: latestBatch.lowRisk, fill: "hsl(var(--chart-4))" },
    { name: "High Risk", value: latestBatch.highRisk, fill: "hsl(var(--chart-2))" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Batch-level scoring summaries and analytics</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Batch</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestBatch.id}</div>
            <p className="text-xs text-muted-foreground">{new Date(latestBatch.date).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestBatch.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {customerChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-chart-4">+{customerChange}</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-secondary" />
                  <span className="text-secondary">{customerChange}</span>
                </>
              )}{" "}
              from last batch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Customers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestBatch.highRisk}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {highRiskChange < 0 ? (
                <>
                  <TrendingDown className="h-3 w-3 text-chart-4" />
                  <span className="text-chart-4">{highRiskChange}</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 text-secondary" />
                  <span className="text-secondary">+{highRiskChange}</span>
                </>
              )}{" "}
              from last batch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            {avgScoreChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-chart-4" />
            ) : (
              <TrendingDown className="h-4 w-4 text-secondary" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestBatch.avgScore}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {avgScoreChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-chart-4" />
                  <span className="text-chart-4">+{avgScoreChange}</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-secondary" />
                  <span className="text-secondary">{avgScoreChange}</span>
                </>
              )}{" "}
              from last batch
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Latest batch risk category breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                lowRisk: {
                  label: "Low Risk",
                  color: "hsl(var(--chart-4))",
                },
                highRisk: {
                  label: "High Risk",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Statistics</CardTitle>
            <CardDescription>Key metrics from the latest scoring run</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Customers Scored</span>
                <span className="text-lg font-bold">{latestBatch.totalCustomers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Average Credit Score</span>
                <span className="text-lg font-bold">{latestBatch.avgScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Average Default Probability</span>
                <span className="text-lg font-bold">{(latestBatch.avgProbability * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Low Risk</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-4" />
                  <span className="font-bold">{latestBatch.lowRisk}</span>
                  <span className="text-sm text-muted-foreground">
                    ({((latestBatch.lowRisk / latestBatch.totalCustomers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High Risk</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                  <span className="font-bold">{latestBatch.highRisk}</span>
                  <span className="text-sm text-muted-foreground">
                    ({((latestBatch.highRisk / latestBatch.totalCustomers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Batch Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Batch History</CardTitle>
          <CardDescription>All completed scoring runs with summary statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total Customers</TableHead>
                <TableHead className="text-right">High Risk</TableHead>
                <TableHead className="text-right">Low Risk</TableHead>
                <TableHead className="text-right">Avg Score</TableHead>
                <TableHead className="text-right">Avg Probability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchReports.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-mono text-sm font-medium">{batch.id}</TableCell>
                  <TableCell>{new Date(batch.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium">{batch.totalCustomers.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-secondary font-medium">{batch.highRisk}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-chart-4 font-medium">{batch.lowRisk}</span>
                  </TableCell>
                  <TableCell className="text-right font-bold">{batch.avgScore}</TableCell>
                  <TableCell className="text-right">{(batch.avgProbability * 100).toFixed(1)}%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedBatch(batch)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Batch Report: {selectedBatch.id}</DialogTitle>
                          <DialogDescription>
                            Detailed summary for scoring run on {new Date(selectedBatch.date).toLocaleDateString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                              <p className="text-2xl font-bold">{selectedBatch.totalCustomers.toLocaleString()}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                              <p className="text-2xl font-bold">{selectedBatch.avgScore}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-chart-4">Low Risk</p>
                              <p className="text-xl font-bold">{selectedBatch.lowRisk}</p>
                              <p className="text-xs text-muted-foreground">
                                {((selectedBatch.lowRisk / selectedBatch.totalCustomers) * 100).toFixed(1)}%
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-secondary">High Risk</p>
                              <p className="text-xl font-bold">{selectedBatch.highRisk}</p>
                              <p className="text-xs text-muted-foreground">
                                {((selectedBatch.highRisk / selectedBatch.totalCustomers) * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button className="flex-1">
                              <Download className="mr-2 h-4 w-4" />
                              Download CSV
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <FileText className="mr-2 h-4 w-4" />
                              Export PDF
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
