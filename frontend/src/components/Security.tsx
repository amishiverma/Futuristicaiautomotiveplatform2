import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AgentNode } from './AgentNode';
import { Shield, Activity, AlertTriangle, CheckCircle, Eye, Lock, Clock } from 'lucide-react';

const agentActivity = [
  { time: '14:32:15', agent: 'Master Agent', action: 'System health check initiated', risk: 'low' },
  { time: '14:31:45', agent: 'Diagnosis Agent', action: 'Vehicle scan completed - VH-2024-003', risk: 'low' },
  { time: '14:30:22', agent: 'Customer Agent', action: 'Appointment booking request', risk: 'medium' },
  { time: '14:29:18', agent: 'Scheduling Agent', action: 'Service center availability check', risk: 'low' },
  { time: '14:28:55', agent: 'UEBA Monitor', action: 'Behavioral pattern analysis complete', risk: 'low' },
  { time: '14:27:33', agent: 'Customer Agent', action: 'Unusual API call pattern detected', risk: 'high' },
  { time: '14:26:10', agent: 'Master Agent', action: 'Security audit triggered', risk: 'medium' },
  { time: '14:25:42', agent: 'UEBA Monitor', action: 'Anomaly investigation completed', risk: 'low' },
];

const alertHistory = [
  {
    time: 'Just now',
    title: 'Rapid Access Pattern Detected',
    description: 'Multiple diagnostic requests from same user session in 2-minute window. Pattern: 5 brake system queries + 3 emergency appointment requests from IP 103.45.67.89',
    action: 'User identity verified via 2FA. Access granted after behavioral analysis. Session encrypted end-to-end. Legitimate emergency service request confirmed.',
    riskScore: 62,
    status: 'verified',
  },
  {
    time: '45 minutes ago',
    title: 'Fleet Administrator Bulk Action',
    description: 'Corporate account (LogiTrans Pvt Ltd) initiated 3 simultaneous service bookings across different vehicles',
    action: 'Fleet manager credentials verified. Multi-vehicle authorization approved. Corporate discount applied. Fleet management system synchronized.',
    riskScore: 35,
    status: 'cleared',
  },
  {
    time: '2 hours ago',
    title: 'Unauthorized Access Attempt',
    description: 'Customer Agent attempted to access manufacturing RCA/CAPA data without proper clearance level',
    action: 'Access blocked immediately, agent temporarily suspended, security admin notified, audit trail logged',
    riskScore: 85,
    status: 'resolved',
  },
  {
    time: '5 hours ago',
    title: 'Unusual Data Export Pattern',
    description: 'Feedback Agent exported 3x normal volume of diagnostic data for RCA analysis on recurring brake defects',
    action: 'Export validated against RCA/CAPA requirements, manufacturing team authorization confirmed, action approved',
    riskScore: 45,
    status: 'cleared',
  },
  {
    time: '1 day ago',
    title: 'Multiple Failed Authentication',
    description: '5 consecutive failed login attempts from unknown IP address 192.168.45.22 targeting admin panel',
    action: 'IP address blocked permanently, multi-factor authentication enforced, security team alerted, incident logged',
    riskScore: 72,
    status: 'resolved',
  },
];

const preventiveActions = [
  { action: 'Real-time behavior monitoring enabled for all agents', status: 'active' },
  { action: 'Automated permission verification on every API call', status: 'active' },
  { action: 'Anomaly detection using ML-based pattern recognition', status: 'active' },
  { action: 'Encrypted communication channels (TLS 1.3)', status: 'active' },
  { action: 'Role-based access control (RBAC) enforced', status: 'active' },
  { action: 'Activity logging and audit trail maintained', status: 'active' },
];

const securityMetrics = [
  { label: 'Security Score', value: '98/100', color: '#8FFF6F' },
  { label: 'Threats Blocked', value: '127', color: '#00FFFF' },
  { label: 'Anomalies Detected', value: '12', color: '#FFB347' },
  { label: 'Response Time', value: '<50ms', color: '#9D4EDD' },
];

export function Security() {
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
            <h1 className="text-4xl mb-2 text-primary">Security & UEBA</h1>
            <p className="text-muted-foreground">User and Entity Behavior Analytics - Real-time threat detection</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-4 h-4 rounded-full bg-secondary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-secondary">All Systems Secure</span>
          </div>
        </motion.div>

        {/* Live UEBA Anomaly Detection */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 bg-accent/10 backdrop-blur-sm border-accent/40 border-2">
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255, 179, 71, 0.3)',
                    '0 0 40px rgba(255, 179, 71, 0.6)',
                    '0 0 20px rgba(255, 179, 71, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-6 h-6 text-accent" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-accent">UEBA Live Alert: Anomaly Detected</h3>
                  <Badge variant="outline" className="bg-accent/20 text-accent border-accent/50">
                    Active Monitoring
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">09:19 AM</span>
                </div>
                <p className="text-sm text-foreground mb-3">
                  <strong>Behavioral Pattern:</strong> Rapid diagnostic access detected - Multiple emergency brake system queries from user session (Customer ID: C-2024-7845) within 2-minute window.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="text-xs space-y-1">
                    <p className="text-muted-foreground">⚡ <strong>Trigger:</strong> 5 brake diagnostics + 3 urgent appointment requests</p>
                    <p className="text-muted-foreground">🌐 <strong>Source IP:</strong> 103.45.67.89 (Bangalore, India)</p>
                    <p className="text-muted-foreground">⏱️ <strong>Time Window:</strong> 09:15 AM - 09:19 AM (4 min)</p>
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="text-secondary">✅ <strong>2FA Verification:</strong> Passed</p>
                    <p className="text-secondary">✅ <strong>User Intent:</strong> Legitimate emergency (VH-2024-007 brake failure)</p>
                    <p className="text-secondary">✅ <strong>Action:</strong> Access granted, session encrypted, alert logged</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-accent/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">🔐 Risk Assessment: Medium → Low (Verified)</span>
                    <Badge variant="default" className="gap-1 bg-secondary/20 text-secondary border-secondary/50">
                      <CheckCircle className="w-3 h-3" />
                      Verified & Cleared
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {securityMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Shield className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <p className="text-2xl mb-1" style={{ color: metric.color }}>{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agent Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-primary">Agent Behavior Network</h2>
                <Badge variant="outline" className="ml-auto">Live Monitoring</Badge>
              </div>
              
              <div className="relative w-full h-[500px]">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />

                {/* Center glow */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* UEBA Monitor connections */}
                  {[
                    { x1: '50%', y1: '20%', x2: '50%', y2: '50%' },
                    { x1: '50%', y1: '20%', x2: '25%', y2: '35%' },
                    { x1: '50%', y1: '20%', x2: '75%', y2: '35%' },
                    { x1: '50%', y1: '20%', x2: '20%', y2: '65%' },
                    { x1: '50%', y1: '20%', x2: '80%', y2: '65%' },
                    { x1: '50%', y1: '20%', x2: '40%', y2: '80%' },
                    { x1: '50%', y1: '20%', x2: '60%', y2: '80%' },
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#00FFFF"
                      strokeWidth="1.5"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  ))}
                  
                  {/* Data flow animation */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.circle
                      key={i}
                      r="3"
                      fill="#8FFF6F"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        cx: ['50%', i === 0 ? '50%' : i === 1 ? '25%' : i === 2 ? '75%' : i === 3 ? '20%' : i === 4 ? '80%' : i === 5 ? '40%' : '60%'],
                        cy: ['20%', i === 0 ? '50%' : i === 1 ? '35%' : i === 2 ? '35%' : i === 3 ? '65%' : i === 4 ? '65%' : i === 5 ? '80%' : '80%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </svg>

                {/* UEBA Monitor - Top Center */}
                <AgentNode name="UEBA Monitor" type="master" status="active" position={{ x: 45, y: 12 }} />
                
                {/* Master Agent - Center */}
                <AgentNode name="Master Agent" type="master" status="active" position={{ x: 45, y: 45 }} />
                
                {/* Worker Agents in circle */}
                <AgentNode name="Diagnosis" type="diagnosis" status="active" position={{ x: 20, y: 30 }} />
                <AgentNode name="Customer" type="customer" status="active" position={{ x: 70, y: 30 }} />
                <AgentNode name="Scheduling" type="scheduling" status="active" position={{ x: 15, y: 60 }} />
                <AgentNode name="Feedback" type="feedback" status="active" position={{ x: 75, y: 60 }} />
                <AgentNode name="Manufacturing" type="manufacturing" status="active" position={{ x: 35, y: 75 }} />
                <AgentNode name="Security" type="diagnosis" status="active" position={{ x: 55, y: 75 }} />
              </div>

              <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <p className="text-sm text-secondary">All agents operating within expected behavioral parameters</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Agent Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-primary" />
                <h2 className="text-primary">Activity Timeline</h2>
              </div>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {agentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="relative pl-6 pb-3 border-l-2 border-border/30 last:border-l-0"
                  >
                    <div 
                      className={`absolute left-[-5px] top-0 w-3 h-3 rounded-full ${
                        activity.risk === 'high' ? 'bg-destructive' :
                        activity.risk === 'medium' ? 'bg-accent' :
                        'bg-secondary'
                      }`}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <Badge variant="outline" className="text-[10px] h-5">
                          {activity.agent}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          activity.risk === 'high' ? 'bg-destructive' :
                          activity.risk === 'medium' ? 'bg-accent' :
                          'bg-secondary'
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">{activity.risk} risk</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Alert History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-accent" />
              <h2 className="text-primary">Alert History</h2>
            </div>
            <div className="space-y-4">
              {alertHistory.map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="p-5 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-foreground mb-1">{alert.title}</h4>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          alert.status === 'resolved' ? 'default' : 
                          alert.status === 'verified' ? 'default' : 
                          alert.status === 'cleared' ? 'secondary' : 
                          'secondary'
                        }
                        className="gap-1"
                      >
                        {alert.status === 'resolved' || alert.status === 'verified' || alert.status === 'cleared' ? <CheckCircle className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {alert.status}
                      </Badge>
                      <Badge 
                        variant={alert.riskScore >= 70 ? 'destructive' : alert.riskScore >= 50 ? 'outline' : 'outline'}
                      >
                        Risk: {alert.riskScore}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Description: </span>
                      <span className="text-foreground">{alert.description}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Action Taken: </span>
                      <span className="text-secondary">{alert.action}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Preventive Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-secondary" />
              <h2 className="text-primary">Preventive Actions Taken</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {preventiveActions.map((action, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/30"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-secondary"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <p className="text-sm text-foreground flex-1">{action.action}</p>
                  <Badge variant="outline" className="text-xs">
                    {action.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
