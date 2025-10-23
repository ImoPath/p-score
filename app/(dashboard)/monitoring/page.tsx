"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  Database,
  RefreshCw,
  Search,
  Download,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for pipeline runs
const pipelineRuns = [
  {
    id: "run-2024-001",
    timestamp: "2024-01-15 14:30:22",
    status: "success",
    duration: "4m 32s",
    recordsProcessed: 2335,
    errors: 0,
    warnings: 2,
  },
  {
    id: "run-2024-002",
    timestamp: "2024-01-14 14:30:15",
    status: "success",
    duration: "4m 18s",
    recordsProcessed: 2298,
    errors: 0,
    warnings: 0,
  },
  {
    id: "run-2024-003",
    timestamp: "2024-01-13 14:30:08",
    status: "warning",
    duration: "5m 12s",
    recordsProcessed: 2287,
    errors: 0,
    warnings: 15,
  },
  {
    id: "run-2024-004",
    timestamp: "2024-01-12 14:30:45",
    status: "failed",
    duration: "2m 05s",
    recordsProcessed: 856,
    errors: 3,
    warnings: 8,
  },
  {
    id: "run-2024-005",
    timestamp: "2024-01-11 14:30:33",
    status: "success",
    duration: "4m 25s",
    recordsProcessed: 2245,
    errors: 0,
    warnings: 1,
  },
]

// Mock data for error/warning logs
const logs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    level: "warning",
    message: "Missing loan data for customer ID: CUS-8923",
    source: "data-validation",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:31:48",
    level: "warning",
    message: "Incomplete payout history for customer ID: CUS-7654",
    source: "data-validation",
  },
  {
    id: 3,
    timestamp: "2024-01-13 14:35:22",
    level: "warning",
    message: "Score calculation timeout for batch B-445",
    source: "scoring-engine",
  },
  {
    id: 4,
    timestamp: "2024-01-12 14:32:10",
    level: "error",
    message: "Database connection timeout",
    source: "database",
  },
  {
    id: 5,
    timestamp: "2024-01-12 14:31:55",
    level: "error",
    message: "Failed to parse CSV file: invalid_format.csv",
    source: "data-ingestion",
  },
]

// Mock data for processing activity
const activityData = [
  { week: "Week 1", jobs: 7, avgDuration: 4.2 },
  { week: "Week 2", jobs: 7, avgDuration: 4.5 },
  { week: "Week 3", jobs: 6, avgDuration: 4.8 },
  { week: "Week 4", jobs: 7, avgDuration: 4.3 },
  { week: "Week 5", jobs: 7, avgDuration: 4.1 },
  { week: "Week 6", jobs: 7, avgDuration: 4.4 },
]

export default function MonitoringPage() {
  const [filterLevel, setFilterLevel] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === "all" || log.level === filterLevel
    const matchesSearch =
      searchQuery === "" ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLevel && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
          <p className="text-muted-foreground">Track pipeline health and system performance</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      {/* System Health Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-chart-4" />
              <span className="text-2xl font-bold">Operational</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All systems running normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Run</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 hours ago</div>
            <p className="text-xs text-muted-foreground">Jan 15, 2024 14:30:22</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Scheduled Run</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">In 22 hours</div>
            <p className="text-xs text-muted-foreground">Jan 16, 2024 14:30:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Database className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-chart-4" />
              <span className="text-2xl font-bold">Connected</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Response time: 45ms</p>
          </CardContent>
        </Card>
      </div>

      {/* Processing Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Activity</CardTitle>
          <CardDescription>Jobs completed and average duration over the past 6 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              jobs: {
                label: "Jobs Completed",
                color: "hsl(var(--chart-1))",
              },
              avgDuration: {
                label: "Avg Duration (min)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="jobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="jobs" stroke="hsl(var(--chart-1))" fill="url(#jobs)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pipeline Runs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Pipeline Runs</CardTitle>
              <CardDescription>History of data pipeline executions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Records</TableHead>
                <TableHead className="text-right">Errors</TableHead>
                <TableHead className="text-right">Warnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelineRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-mono text-sm">{run.id}</TableCell>
                  <TableCell className="text-sm">{run.timestamp}</TableCell>
                  <TableCell>
                    {run.status === "success" && (
                      <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Success
                      </Badge>
                    )}
                    {run.status === "warning" && (
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Warning
                      </Badge>
                    )}
                    {run.status === "failed" && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        <XCircle className="mr-1 h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{run.duration}</TableCell>
                  <TableCell className="text-right font-medium">{run.recordsProcessed.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {run.errors > 0 ? (
                      <span className="text-destructive font-medium">{run.errors}</span>
                    ) : (
                      <span className="text-muted-foreground">{run.errors}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {run.warnings > 0 ? (
                      <span className="text-secondary font-medium">{run.warnings}</span>
                    ) : (
                      <span className="text-muted-foreground">{run.warnings}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Error and Warning Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent errors and warnings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="error">Errors Only</SelectItem>
                  <SelectItem value="warning">Warnings Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                {log.level === "error" ? (
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {log.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    <Badge variant="secondary" className="text-xs">
                      {log.source}
                    </Badge>
                  </div>
                  <p className="text-sm">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
