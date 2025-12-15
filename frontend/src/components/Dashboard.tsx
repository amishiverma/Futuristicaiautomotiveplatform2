import { useState } from 'react';
import { motion } from 'motion/react';
import { VehicleCard } from './VehicleCard';
import { MetricCard } from './MetricCard';
import { AgentNode } from './AgentNode';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Zap, Gauge, AlertTriangle, Car, Grid3x3, Eye } from 'lucide-react';

const engineData = [
  { time: '00:00', temp: 85, rpm: 1200, voltage: 12.6 },
  { time: '04:00', temp: 88, rpm: 1500, voltage: 12.5 },
  { time: '08:00', temp: 92, rpm: 2200, voltage: 12.4 },
  { time: '12:00', temp: 95, rpm: 2800, voltage: 12.3 },
  { time: '16:00', temp: 98, rpm: 3200, voltage: 12.2 },
  { time: '20:00', temp: 102, rpm: 2900, voltage: 12.1 },
  { time: '24:00', temp: 105, rpm: 2400, voltage: 12.0 },
];

const vehicles = [
  { id: 'VH-2024-001', model: 'Tesla Model S', location: 'Mumbai, India', healthScore: 92, alerts: 0, nextService: 'Nov 15' },
  { id: 'VH-2024-002', model: 'Tata Nexon EV', location: 'Pune, India', healthScore: 78, alerts: 2, nextService: 'Oct 20' },
  { id: 'VH-2024-003', model: 'Mahindra XUV700', location: 'Bangalore, India', healthScore: 65, alerts: 3, nextService: 'Oct 18' },
  { id: 'VH-2024-004', model: 'Hyundai Ioniq 5', location: 'Delhi, India', healthScore: 95, alerts: 0, nextService: 'Nov 25' },
  { id: 'VH-2024-005', model: 'MG ZS EV', location: 'Chennai, India', healthScore: 88, alerts: 1, nextService: 'Nov 5' },
  { id: 'VH-2024-006', model: 'BYD Atto 3', location: 'Hyderabad, India', healthScore: 72, alerts: 2, nextService: 'Oct 22' },
];

const upcomingServices = [
  { vehicle: 'VH-2024-003', service: 'Brake Pad Replacement', date: 'Oct 18, 10:00 AM', location: 'Hero Motors, Bangalore' },
  { vehicle: 'VH-2024-002', service: 'Battery Check & Diagnostics', date: 'Oct 20, 2:00 PM', location: 'EV Care Center, Pune' },
  { vehicle: 'VH-2024-006', service: 'Tire Rotation & Alignment', date: 'Oct 22, 11:00 AM', location: 'AutoTech Hub, Hyderabad' },
];

const securityAlerts = [
  { time: '2 min ago', message: 'Unusual data access pattern detected', severity: 'medium' },
  { time: '15 min ago', message: 'Agent behavior verified - all normal', severity: 'low' },
  { time: '1 hour ago', message: 'UEBA scan completed successfully', severity: 'low' },
];

export function Dashboard() {
  const [view, setView] = useState<'fleet' | 'single'>('fleet');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl mb-2 text-primary">Live Dashboard</h1>
            <p className="text-muted-foreground">Real-time vehicle health monitoring and agent activity</p>
          </div>
          
          <Tabs value={view} onValueChange={(v) => setView(v as 'fleet' | 'single')}>
            <TabsList>
              <TabsTrigger value="fleet" className="gap-2">
                <Grid3x3 className="w-4 h-4" />
                Fleet View
              </TabsTrigger>
              <TabsTrigger value="single" className="gap-2">
                <Eye className="w-4 h-4" />
                Single Vehicle
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Vehicles"
            value={vehicles.length.toString()}
            icon={Car}
            trend="+2 this week"
            color="#00FFFF"
            delay={0}
          />
          <MetricCard
            title="Active Alerts"
            value={vehicles.reduce((acc, v) => acc + v.alerts, 0).toString()}
            icon={AlertTriangle}
            trend="3 resolved today"
            color="#FFB347"
            delay={0.1}
          />
          <MetricCard
            title="Avg Health Score"
            value={`${Math.round(vehicles.reduce((acc, v) => acc + v.healthScore, 0) / vehicles.length)}%`}
            icon={Activity}
            trend="+5% improvement"
            color="#8FFF6F"
            delay={0.2}
          />
          <MetricCard
            title="AI Agents Active"
            value="6/6"
            icon={Zap}
            trend="All systems operational"
            color="#9D4EDD"
            delay={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {view === 'fleet' ? (
              <>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="mb-4 text-primary">Fleet Overview</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {vehicles.map((vehicle, i) => (
                      <VehicleCard key={vehicle.id} {...vehicle} delay={i * 0.05} />
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-primary">{selectedVehicle.model}</h3>
                      <p className="text-sm text-muted-foreground">{selectedVehicle.id}</p>
                    </div>
                    <Badge variant={selectedVehicle.healthScore >= 80 ? 'default' : 'destructive'}>
                      Health: {selectedVehicle.healthScore}%
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3 text-sm text-muted-foreground">Engine Temperature (°C)</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={engineData}>
                          <defs>
                            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FFB347" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#FFB347" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="time" stroke="#8B92A0" />
                          <YAxis stroke="#8B92A0" />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1C1F26', border: '1px solid rgba(0,255,255,0.2)' }}
                          />
                          <Area type="monotone" dataKey="temp" stroke="#FFB347" fill="url(#tempGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h4 className="mb-3 text-sm text-muted-foreground">Battery Voltage (V)</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={engineData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="time" stroke="#8B92A0" />
                          <YAxis stroke="#8B92A0" domain={[11.5, 13]} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#1C1F26', border: '1px solid rgba(0,255,255,0.2)' }}
                          />
                          <Line type="monotone" dataKey="voltage" stroke="#8FFF6F" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Master Agent Console */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="mb-4 text-primary">Master Agent Console</h3>
              <div className="relative w-full h-80">
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent rounded-lg" />
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {[
                    { x1: '50%', y1: '50%', x2: '30%', y2: '20%' },
                    { x1: '50%', y1: '50%', x2: '70%', y2: '20%' },
                    { x1: '50%', y1: '50%', x2: '80%', y2: '50%' },
                    { x1: '50%', y1: '50%', x2: '70%', y2: '80%' },
                    { x1: '50%', y1: '50%', x2: '30%', y2: '80%' },
                    { x1: '50%', y1: '50%', x2: '20%', y2: '50%' },
                  ].map((line, i) => (
                    <line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#00FFFF"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  ))}
                </svg>

                <AgentNode name="Master" type="master" status="active" position={{ x: 45, y: 45 }} />
                <AgentNode name="Diagnosis" type="diagnosis" status="active" position={{ x: 25, y: 12 }} />
                <AgentNode name="Customer" type="customer" status="active" position={{ x: 65, y: 12 }} />
                <AgentNode name="Scheduling" type="scheduling" status="pending" position={{ x: 75, y: 45 }} />
                <AgentNode name="Feedback" type="feedback" status="active" position={{ x: 65, y: 75 }} />
                <AgentNode name="Manufacturing" type="manufacturing" status="active" position={{ x: 25, y: 75 }} />
                <AgentNode name="Security" type="diagnosis" status="active" position={{ x: 15, y: 45 }} />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Services */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="mb-4 text-primary">Upcoming Services</h3>
              <div className="space-y-4">
                {upcomingServices.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-foreground">{service.vehicle}</p>
                      <Badge variant="outline" className="text-xs">
                        {service.date.split(',')[0]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{service.service}</p>
                    <p className="text-xs text-secondary">{service.location}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* UEBA Security Alerts */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary">Security Monitor</h3>
                <motion.div
                  className="w-3 h-3 rounded-full bg-secondary"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="space-y-3">
                {securityAlerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-muted/20 border border-border/30"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1 ${
                        alert.severity === 'high' ? 'bg-destructive' :
                        alert.severity === 'medium' ? 'bg-accent' :
                        'bg-secondary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-xs text-foreground mb-1">{alert.message}</p>
                        <p className="text-[10px] text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
