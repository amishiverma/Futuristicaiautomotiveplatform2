import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIAvatar } from './AIAvatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Mic, MicOff, Send, Volume2, VolumeX, FileText, CheckCircle, AlertTriangle, ShieldAlert, TrendingUp, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface Message {
  id: string;
  role: 'agent' | 'user';
  content: string;
  timestamp: string;
  type?: 'alert' | 'confirmation' | 'info' | 'urgent' | 'ueba' | 'rca';
}

interface Scenario {
  id: string;
  name: string;
  icon: any;
  messages: Message[];
  behaviorLog: any[];
}

// Scenario 1: Urgent Critical Failure with Detailed Appointment
const urgentFailureScenario: Scenario = {
  id: 'urgent',
  name: 'Critical Failure',
  icon: AlertTriangle,
  messages: [
    {
      id: '1',
      role: 'agent',
      content: '🚨 CRITICAL ALERT: Brake system failure detected on VH-2024-007 (2024 Hero Nexon EV). ABS sensor malfunction + low brake fluid pressure (0.8 bar, threshold: 1.2 bar). Vehicle is unsafe to drive. Immediate service required.',
      timestamp: '09:15 AM',
      type: 'urgent',
    },
    {
      id: '2',
      role: 'agent',
      content: '⚠️ This is a recurring defect: 23 similar brake sensor failures detected across Nexon EV fleet (VIN prefix: MH12) in the past 60 days. RCA/CAPA analysis #BR-2024-089 has been initiated and sent to Manufacturing Quality Team.',
      timestamp: '09:15 AM',
      type: 'rca',
    },
    {
      id: '3',
      role: 'user',
      content: 'This is serious! Book the nearest service center immediately.',
      timestamp: '09:16 AM',
    },
    {
      id: '4',
      role: 'agent',
      content: '🔍 Searching for emergency service availability within 10 km radius... Found 2 certified brake service centers with immediate availability.',
      timestamp: '09:16 AM',
      type: 'info',
    },
    {
      id: '5',
      role: 'agent',
      content: '📍 **APPOINTMENT DETAILS**\n\n**Service Center:** Hero MotorCorp Service Hub - Whitefield\n**Address:** Plot 47, EPIP Zone, Whitefield, Bangalore - 560066\n**Date & Time:** TODAY - Nov 9, 2025 at 10:30 AM (75 min from now)\n**Service Advisor:** Rajesh Kumar (Senior Technician, 12+ yrs exp)\n**Bay Assignment:** Emergency Bay 3\n\n**Service Scope:**\n• Complete brake system diagnosis (30 min)\n• ABS sensor replacement (Part #: ABS-NK-2024-X7)\n• Brake fluid flush & refill (DOT 4 spec)\n• Full brake pad inspection\n• Road test & safety validation\n\n**Parts Ready:** ✅ ABS Sensor Module in stock\n**Estimated Duration:** 2.5 hours\n**Estimated Cost:** ₹8,500 - ₹11,200 (covered under warranty)\n**Loaner Vehicle:** Available - Hero ZX Compact\n\nConfirm this emergency appointment?',
      timestamp: '09:17 AM',
      type: 'confirmation',
    },
    {
      id: '6',
      role: 'user',
      content: 'Yes, confirm it. Send me the address.',
      timestamp: '09:18 AM',
    },
    {
      id: '7',
      role: 'agent',
      content: '✅ **EMERGENCY APPOINTMENT CONFIRMED**\n\n**Confirmation #:** EA-2024-0947\n**Service Center:** Hero Whitefield Hub\n📱 Contact: +91-80-4567-8900\n📍 Google Maps link sent to your mobile\n🚗 Tow truck dispatched to your location (ETA: 25 min)\n📧 Detailed confirmation emailed to: customer@example.com\n📲 SMS sent to: +91-98765-43210\n\n**Important:** Do NOT drive the vehicle. Tow service is complimentary under emergency protocol.\n\n**What happens next:**\n1. Tow truck arrives (9:45 AM)\n2. Vehicle transported to service center\n3. Diagnostic begins immediately (10:30 AM)\n4. Live updates sent via SMS\n5. You receive loaner vehicle keys\n\nCustomer safety is our priority. Thank you for your patience.',
      timestamp: '09:18 AM',
      type: 'confirmation',
    },
    {
      id: '8',
      role: 'agent',
      content: '🔐 **UEBA Security Alert:** Unusual access pattern detected - Multiple diagnostic requests from same IP in short duration. User identity verified via 2FA. Access granted. This conversation is encrypted end-to-end.',
      timestamp: '09:19 AM',
      type: 'ueba',
    },
  ],
  behaviorLog: [
    { action: 'Critical brake failure detected', status: 'detected', timestamp: '09:15:12 AM', risk: 'critical' },
    { action: 'UEBA: Rapid access pattern detected', status: 'monitoring', timestamp: '09:15:18 AM', risk: 'medium' },
    { action: 'RCA pattern match: recurring defect', status: 'matched', timestamp: '09:15:22 AM', risk: 'high' },
    { action: 'Manufacturing alert dispatched', status: 'sent', timestamp: '09:15:25 AM', risk: 'low' },
    { action: 'Emergency service center search', status: 'completed', timestamp: '09:16:45 AM', risk: 'low' },
    { action: 'Parts inventory verification', status: 'confirmed', timestamp: '09:17:02 AM', risk: 'low' },
    { action: 'UEBA: User 2FA verification', status: 'passed', timestamp: '09:17:15 AM', risk: 'low' },
    { action: 'Emergency appointment booked', status: 'confirmed', timestamp: '09:18:33 AM', risk: 'low' },
    { action: 'Tow service dispatched', status: 'active', timestamp: '09:18:40 AM', risk: 'low' },
    { action: 'Encrypted notification sent', status: 'delivered', timestamp: '09:18:45 AM', risk: 'low' },
  ],
};

// Scenario 2: Declined Appointment & Rescheduling
const declinedAppointmentScenario: Scenario = {
  id: 'declined',
  name: 'Declined & Reschedule',
  icon: CheckCircle,
  messages: [
    {
      id: '1',
      role: 'agent',
      content: '⚠️ Routine service reminder: VH-2024-012 (Hero Terrain SUV) is due for 20,000 km maintenance. Oil change, filter replacement, and tire rotation recommended. Shall I schedule an appointment?',
      timestamp: '02:30 PM',
      type: 'info',
    },
    {
      id: '2',
      role: 'user',
      content: 'Not right now, I\'m traveling this week.',
      timestamp: '02:32 PM',
    },
    {
      id: '3',
      role: 'agent',
      content: '✅ Understood. I\'ll postpone this reminder. When would be a good time to reschedule? I can suggest slots next week based on your location and service center availability.',
      timestamp: '02:32 PM',
      type: 'info',
    },
    {
      id: '4',
      role: 'user',
      content: 'Next Monday afternoon works better.',
      timestamp: '02:35 PM',
    },
    {
      id: '5',
      role: 'agent',
      content: '🔍 Checking availability for Monday, Nov 17, 2025 (afternoon slots)...\n\nFound 4 available appointments:\n\n**Option 1:** 2:00 PM - Hero City Center, MG Road (3.2 km away)\n**Option 2:** 2:30 PM - Hero Express Service, Koramangala (5.1 km away)  \n**Option 3:** 3:00 PM - Hero Premium Hub, Indiranagar (4.7 km away)\n**Option 4:** 4:00 PM - Hero City Center, MG Road (3.2 km away)\n\nWhich works best for you?',
      timestamp: '02:35 PM',
      type: 'info',
    },
    {
      id: '6',
      role: 'user',
      content: 'Option 3 at 3 PM looks good.',
      timestamp: '02:37 PM',
    },
    {
      id: '7',
      role: 'agent',
      content: '✅ **APPOINTMENT CONFIRMED**\n\n**Confirmation #:** SA-2024-1834\n**Vehicle:** VH-2024-012 (Hero Terrain SUV)\n**Service Type:** 20,000 km Scheduled Maintenance\n\n**Location:** Hero Premium Hub - Indiranagar\n**Address:** 100 Feet Road, HAL 2nd Stage, Indiranagar, Bangalore - 560038\n📱 Contact: +91-80-2345-6789\n\n**Date & Time:** Monday, Nov 17, 2025 at 3:00 PM\n**Service Advisor:** Priya Sharma (Master Technician)\n**Bay:** Standard Service Bay 7\n\n**Services Included:**\n• Engine oil change (5W-30 synthetic)\n• Oil filter replacement\n• Air filter inspection & replacement\n• Tire rotation & balancing\n• Brake pad thickness check\n• 48-point vehicle inspection\n• Software update check\n\n**Parts Confirmed:** ✅ All parts in stock\n**Estimated Duration:** 90 minutes\n**Estimated Cost:** ₹6,800 (Service package rate)\n**Waiting Lounge:** Coffee, WiFi, and workspace available\n\n📧 Confirmation sent to: customer@example.com\n📲 SMS reminder will be sent 24 hours before\n📅 Added to your calendar\n\n**Reminder:** We\'ll send you a 1-hour heads-up on the day of service. See you Monday!',
      timestamp: '02:37 PM',
      type: 'confirmation',
    },
    {
      id: '8',
      role: 'agent',
      content: '💡 **Pro Tip:** Since you declined the earlier slot, I\'ve noted your preference for afternoon appointments. Future service reminders will prioritize afternoon slots for your convenience.',
      timestamp: '02:38 PM',
      type: 'info',
    },
  ],
  behaviorLog: [
    { action: 'Scheduled maintenance reminder triggered', status: 'sent', timestamp: '02:30:12 PM', risk: 'low' },
    { action: 'User declined immediate appointment', status: 'logged', timestamp: '02:32:05 PM', risk: 'low' },
    { action: 'Preference learning: afternoon slots', status: 'recorded', timestamp: '02:32:08 PM', risk: 'low' },
    { action: 'Calendar availability check', status: 'completed', timestamp: '02:35:22 PM', risk: 'low' },
    { action: 'Service center capacity query', status: 'completed', timestamp: '02:35:28 PM', risk: 'low' },
    { action: 'User preference applied to results', status: 'applied', timestamp: '02:35:30 PM', risk: 'low' },
    { action: 'Parts inventory verified', status: 'confirmed', timestamp: '02:37:15 PM', risk: 'low' },
    { action: 'Appointment confirmed & scheduled', status: 'completed', timestamp: '02:37:40 PM', risk: 'low' },
    { action: 'Multi-channel notification sent', status: 'delivered', timestamp: '02:37:45 PM', risk: 'low' },
    { action: 'Calendar integration updated', status: 'synced', timestamp: '02:37:50 PM', risk: 'low' },
  ],
};

// Scenario 3: Fleet Management & Multi-Vehicle Scheduling
const fleetManagementScenario: Scenario = {
  id: 'fleet',
  name: 'Fleet Scheduling',
  icon: Users,
  messages: [
    {
      id: '1',
      role: 'agent',
      content: '📊 **Fleet Alert:** Your commercial fleet (LogiTrans Pvt Ltd) has 3 vehicles requiring service:\n\n• VH-FLEET-089 (Nexon EV) - Battery health 78%, needs inspection\n• VH-FLEET-112 (Terrain SUV) - 30,000 km service due\n• VH-FLEET-134 (City Compact) - AC compressor noise detected\n\nWould you like me to coordinate appointments for all three vehicles?',
      timestamp: '11:00 AM',
      type: 'info',
    },
    {
      id: '2',
      role: 'user',
      content: 'Yes, but I need them serviced on the same day to minimize fleet downtime.',
      timestamp: '11:02 AM',
    },
    {
      id: '3',
      role: 'agent',
      content: '🔍 Understood. Searching for same-day multi-vehicle service capacity at fleet-certified centers...\n\n✅ **OPTIMAL SOLUTION FOUND**\n\n**Service Center:** Hero Fleet Hub - Peenya Industrial Area\n**Date:** Thursday, Nov 13, 2025\n**Multi-bay facility with fleet priority lane**\n\n**Proposed Schedule:**\n\n🚗 **VH-FLEET-089** (Nexon EV)\n   • Time: 9:00 AM - 11:30 AM\n   • Service: Battery diagnostics + HV system check\n   • Bay: EV Service Bay 2\n   • Tech: Arun Menon (EV Specialist)\n\n🚗 **VH-FLEET-112** (Terrain SUV)  \n   • Time: 9:30 AM - 12:00 PM\n   • Service: 30K km complete service\n   • Bay: Heavy Service Bay 4\n   • Tech: Deepak Singh (Fleet Expert)\n\n🚗 **VH-FLEET-134** (City Compact)\n   • Time: 10:00 AM - 11:30 AM\n   • Service: AC repair + inspection\n   • Bay: Quick Service Bay 1\n   • Tech: Kavitha Reddy (AC Specialist)\n\n**Fleet Benefits:**\n✅ 15% discount applied (fleet contract rate)\n✅ All vehicles ready by 12:30 PM\n✅ Courtesy shuttle for drivers\n✅ Consolidated invoice for easy accounting\n✅ Fleet management dashboard updated in real-time\n\nShall I proceed with this coordinated booking?',
      timestamp: '11:03 AM',
      type: 'info',
    },
    {
      id: '4',
      role: 'user',
      content: 'Perfect. Confirm all three.',
      timestamp: '11:05 AM',
    },
    {
      id: '5',
      role: 'agent',
      content: '✅ **FLEET APPOINTMENTS CONFIRMED**\n\n**Master Booking #:** FLEET-2024-456\n**Company:** LogiTrans Pvt Ltd (Fleet ID: FL-8792)\n**Service Center:** Hero Fleet Hub - Peenya\n📍 Address: Plot 67, 3rd Phase, Peenya Industrial Area, Bangalore - 560058\n📱 Fleet Coordinator: Suresh Patel - +91-80-5678-9012\n\n**Date:** Thursday, November 13, 2025\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n**Vehicle 1:** VH-FLEET-089 (Nexon EV)\n🕘 Check-in: 9:00 AM | Ready: 11:30 AM\n💰 Est. Cost: ₹4,500\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n**Vehicle 2:** VH-FLEET-112 (Terrain SUV)  \n🕘 Check-in: 9:30 AM | Ready: 12:00 PM\n💰 Est. Cost: ₹9,200\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n**Vehicle 3:** VH-FLEET-134 (City Compact)\n🕘 Check-in: 10:00 AM | Ready: 11:30 AM\n💰 Est. Cost: ₹6,800\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Total Estimated Cost:** ₹20,500\n**Fleet Discount (15%):** -₹3,075\n**Final Amount:** ₹17,425 + GST\n\n📧 Confirmations sent to: fleet@logitrans.com\n📲 SMS sent to all 3 drivers\n🚐 Courtesy shuttle arranged for driver transport\n📊 Fleet dashboard updated with service schedule\n📄 Work orders generated and attached\n\n**Pro Fleet Manager Integration:**\n✅ Service records auto-updated in your fleet management system\n✅ Vehicle downtime logged (3 vehicles × 2.5 hrs avg)\n✅ Predictive maintenance schedule recalculated\n\nYour fleet operations team has been notified. Thank you for choosing Hero Fleet Services!',
      timestamp: '11:05 AM',
      type: 'confirmation',
    },
    {
      id: '6',
      role: 'agent',
      content: '🔐 **UEBA Security Notice:** Fleet-level transaction detected. Corporate credentials verified. Multi-vehicle authorization approved under fleet manager account: SM-Pradeep-Kumar. Access level: Fleet Administrator.',
      timestamp: '11:06 AM',
      type: 'ueba',
    },
  ],
  behaviorLog: [
    { action: 'Fleet health monitoring scan', status: 'completed', timestamp: '10:58:30 AM', risk: 'low' },
    { action: 'Multi-vehicle service needs detected', status: 'identified', timestamp: '11:00:05 AM', risk: 'low' },
    { action: 'Fleet coordination request received', status: 'processing', timestamp: '11:02:15 AM', risk: 'low' },
    { action: 'Same-day multi-bay availability search', status: 'searching', timestamp: '11:02:20 AM', risk: 'low' },
    { action: 'Fleet discount calculation', status: 'applied', timestamp: '11:03:10 AM', risk: 'low' },
    { action: 'UEBA: Corporate account access', status: 'verified', timestamp: '11:03:15 AM', risk: 'low' },
    { action: 'Technician specialization matching', status: 'optimized', timestamp: '11:03:25 AM', risk: 'low' },
    { action: '3 parallel appointments scheduled', status: 'confirmed', timestamp: '11:05:40 AM', risk: 'low' },
    { action: 'Fleet management system sync', status: 'synchronized', timestamp: '11:05:55 AM', risk: 'low' },
    { action: 'Consolidated invoice generated', status: 'created', timestamp: '11:06:05 AM', risk: 'low' },
  ],
};

// Scenario 4: RCA/CAPA Manufacturing Feedback Loop
const rcaManufacturingScenario: Scenario = {
  id: 'rca',
  name: 'RCA to Manufacturing',
  icon: TrendingUp,
  messages: [
    {
      id: '1',
      role: 'agent',
      content: '⚠️ Recurring defect alert: VH-2024-089 (Hero Nexon EV) reporting infotainment screen freezing issue. This is the 3rd occurrence in 45 days.',
      timestamp: '03:15 PM',
      type: 'alert',
    },
    {
      id: '2',
      role: 'agent',
      content: '🔍 **RCA PATTERN DETECTED**\n\nOur AI has identified a systemic issue:\n\n**Defect Code:** INFO-FRZ-2024-Q4\n**Affected Component:** 10.4" Touchscreen Infotainment Module\n**Supplier:** TechDisplay Systems Ltd (Batch: TD-OCT-2024)\n**Affected VINs:** 47 vehicles with VIN prefix MH12DL (manufactured Oct 2024)\n**Failure Pattern:** Screen freeze during navigation + audio streaming simultaneously\n**Root Cause:** Insufficient RAM allocation in firmware v2.3.1\n\n**Current Status:** 47 customer complaints, 12 warranty claims (₹8.4L total cost)\n\n📊 RCA/CAPA Report #RC-2024-334 has been automatically generated and dispatched to:\n• Hero Manufacturing Quality Team (Pune Plant)\n• Design Engineering - Infotainment Division  \n• Supplier Quality - TechDisplay Systems\n• Warranty Analytics Team\n\nWould you like to proceed with service for your vehicle?',
      timestamp: '03:16 PM',
      type: 'rca',
    },
    {
      id: '3',
      role: 'user',
      content: 'Yes, fix it. But will this happen again?',
      timestamp: '03:18 PM',
    },
    {
      id: '4',
      role: 'agent',
      content: '✅ Great question! Here\'s the corrective action plan:\n\n**Immediate Fix for Your Vehicle:**\n• Firmware upgrade to v2.4.2 (enhanced memory management)\n• System configuration optimization\n• No hardware replacement needed\n• Service time: 45 minutes\n\n**CAPA Actions Triggered:**\n\n**Short-term (Manufacturing):**\n✅ All vehicles in production (Nov batch onwards) now receive firmware v2.4.2 by default\n✅ Pre-delivery inspection updated to include infotainment stress testing\n✅ Supplier notified - module design review initiated\n\n**Long-term (Product Improvement):**\n🔄 Design change request #DCR-2024-889 approved\n   • Infotainment module RAM increased from 2GB → 4GB\n   • Implementation: Jan 2025 production batch\n   • Retrofit program for affected vehicles planned (Q1 2025)\n\n**Preventive Measures:**\n✅ Enhanced supplier quality audits implemented\n✅ Extended testing protocol for software integration\n✅ Predictive monitoring added to detect early signs\n\n📊 **Manufacturing Impact Dashboard:**\n• Estimated defect reduction: 94%\n• Projected warranty savings: ₹2.3 Cr annually\n• Customer satisfaction improvement: +8 NPS points\n\n**Your vehicle will receive:**\n1. Immediate firmware fix (today)\n2. Free RAM upgrade retrofit (when available, Jan 2025)\n3. Extended warranty on infotainment system (+1 year)\n\nShall I schedule the firmware update service now?',
      timestamp: '03:19 PM',
      type: 'info',
    },
    {
      id: '5',
      role: 'user',
      content: 'Yes, schedule it. Good to know you\'re improving the design!',
      timestamp: '03:21 PM',
    },
    {
      id: '6',
      role: 'agent',
      content: '✅ **APPOINTMENT CONFIRMED**\n\n**Confirmation #:** SW-2024-2847\n**Service Type:** Infotainment Firmware Update (Warranty - No Charge)\n\n**Service Center:** Hero Digital Service - Koramangala\n**Address:** 80 Feet Road, 5th Block, Koramangala, Bangalore - 560095\n📱 Contact: +91-80-3456-7890\n\n**Date & Time:** Tuesday, Nov 11, 2025 at 11:00 AM\n**Service Advisor:** Nikhil Gupta (Software Specialist)\n**Bay:** Software Update Station 2\n\n**Service Scope:**\n• Backup current system settings\n• Install firmware v2.4.2 (enhanced)\n• System validation & testing\n• Navigation and streaming stress test\n• Customer walkthrough of improvements\n\n**Duration:** 45 minutes (express service)\n**Cost:** ₹0 (Covered under warranty + goodwill)\n**While You Wait:** Premium lounge, refreshments, WiFi\n\n📧 Details sent to: customer@example.com\n📲 SMS reminder 2 hours before appointment\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n**Manufacturing Feedback Loop:**\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📊 Your service data will contribute to:\n• Post-fix validation tracking\n• Real-world performance metrics\n• Continuous improvement cycle\n• Future model enhancements\n\n🏭 **Sent to Manufacturing:**\n✅ RCA Report #RC-2024-334\n✅ Customer impact analysis\n✅ Cost of Poor Quality (COPQ) metrics\n✅ Design improvement recommendations\n✅ Supplier corrective action requests\n\n🔄 **Closed Loop:** Your feedback improves every Hero vehicle that follows. Thank you for helping us build better cars!\n\nSee you Tuesday at 11 AM!',
      timestamp: '03:22 PM',
      type: 'confirmation',
    },
    {
      id: '7',
      role: 'agent',
      content: '🔐 **UEBA Compliance Check:** Warranty claim processed. System verified no fraudulent patterns. RCA report transmission to manufacturing encrypted via secure API. Data governance compliance: ✅ Passed.',
      timestamp: '03:23 PM',
      type: 'ueba',
    },
  ],
  behaviorLog: [
    { action: 'Recurring defect pattern detected', status: 'identified', timestamp: '03:15:10 PM', risk: 'medium' },
    { action: 'RCA algorithm: pattern matching', status: 'analyzing', timestamp: '03:15:15 PM', risk: 'low' },
    { action: 'Cross-vehicle correlation analysis', status: 'completed', timestamp: '03:15:45 PM', risk: 'low' },
    { action: 'RCA/CAPA report auto-generated', status: 'created', timestamp: '03:16:02 PM', risk: 'low' },
    { action: 'Manufacturing API notification', status: 'sent', timestamp: '03:16:05 PM', risk: 'low' },
    { action: 'Supplier quality alert triggered', status: 'dispatched', timestamp: '03:16:08 PM', risk: 'medium' },
    { action: 'Design change request submitted', status: 'approved', timestamp: '03:19:25 PM', risk: 'low' },
    { action: 'UEBA: Warranty claim verification', status: 'verified', timestamp: '03:19:30 PM', risk: 'low' },
    { action: 'Customer service appointment booked', status: 'confirmed', timestamp: '03:22:15 PM', risk: 'low' },
    { action: 'Closed-loop feedback to manufacturing', status: 'delivered', timestamp: '03:22:20 PM', risk: 'low' },
    { action: 'COPQ metrics updated', status: 'synced', timestamp: '03:23:05 PM', risk: 'low' },
  ],
};

const scenarios: Scenario[] = [
  urgentFailureScenario,
  declinedAppointmentScenario,
  fleetManagementScenario,
  rcaManufacturingScenario,
];

export function VoiceAgent() {
  const [currentScenario, setCurrentScenario] = useState<Scenario>(scenarios[0]);
  const [messages, setMessages] = useState<Message[]>(scenarios[0].messages);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBehaviorLog, setShowBehaviorLog] = useState(false);

  const handleScenarioChange = (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      setCurrentScenario(scenario);
      setMessages(scenario.messages);
      setShowBehaviorLog(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: 'I understand your request. Let me check that for you...',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'info',
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  const toggleVoiceListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl mb-2 text-primary">Voice & Chat Agent</h1>
          <p className="text-muted-foreground">Natural conversation for seamless service management</p>
        </motion.div>

        {/* Scenario Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-primary" />
              <h3 className="text-sm text-primary">Demo Scenarios</h3>
              <Badge variant="outline" className="text-xs">Interactive Examples</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <Button
                    key={scenario.id}
                    variant={currentScenario.id === scenario.id ? 'default' : 'outline'}
                    className="gap-2 h-auto py-3 px-4"
                    onClick={() => handleScenarioChange(scenario.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{scenario.name}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex flex-col items-center space-y-6">
                <AIAvatar isActive={isListening || isSpeaking} />
                
                <div className="text-center">
                  <h3 className="mb-1 text-primary">AI Service Agent</h3>
                  <p className="text-sm text-muted-foreground">Always ready to assist</p>
                </div>

                <div className="flex gap-2 w-full">
                  <Button
                    variant={isVoiceMode ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setIsVoiceMode(!isVoiceMode)}
                  >
                    {isVoiceMode ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant={isSpeaking ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setIsSpeaking(!isSpeaking)}
                  >
                    {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>

                {isVoiceMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full space-y-4"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <motion.button
                        className={`w-20 h-20 rounded-full flex items-center justify-center ${
                          isListening ? 'bg-primary' : 'bg-muted'
                        }`}
                        onClick={toggleVoiceListening}
                        animate={isListening ? {
                          boxShadow: [
                            '0 0 20px rgba(0, 255, 255, 0.5)',
                            '0 0 40px rgba(0, 255, 255, 0.8)',
                            '0 0 20px rgba(0, 255, 255, 0.5)',
                          ],
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Mic className={`w-8 h-8 ${isListening ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </motion.button>
                      
                      {isListening && (
                        <div className="flex gap-1 items-end h-12">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-primary rounded-full"
                              animate={{
                                height: ['20%', '100%', '20%'],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      {isListening ? 'Listening...' : 'Tap to speak'}
                    </p>
                  </motion.div>
                )}

                <Button
                  variant="ghost"
                  className="w-full gap-2"
                  onClick={() => setShowBehaviorLog(!showBehaviorLog)}
                >
                  <FileText className="w-4 h-4" />
                  Agent Behavior Log
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-secondary"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <h3 className="text-primary">Active Conversation</h3>
                    <p className="text-xs text-muted-foreground">UEBA Verified & Secure</p>
                  </div>
                </div>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Encrypted
                </Badge>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`p-4 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary/20 border border-primary/30'
                              : message.type === 'urgent'
                              ? 'bg-accent/30 border-2 border-accent'
                              : message.type === 'alert'
                              ? 'bg-accent/20 border border-accent/30'
                              : message.type === 'confirmation'
                              ? 'bg-secondary/20 border border-secondary/30'
                              : message.type === 'ueba'
                              ? 'bg-primary/10 border border-primary/50'
                              : message.type === 'rca'
                              ? 'bg-accent/15 border border-accent/40'
                              : 'bg-muted/50 border border-border/30'
                          }`}
                        >
                          {message.type === 'urgent' && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-accent/30">
                              <AlertTriangle className="w-4 h-4 text-accent animate-pulse" />
                              <span className="text-xs text-accent">CRITICAL ALERT</span>
                            </div>
                          )}
                          {message.type === 'ueba' && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-primary/30">
                              <ShieldAlert className="w-4 h-4 text-primary" />
                              <span className="text-xs text-primary">UEBA SECURITY</span>
                            </div>
                          )}
                          {message.type === 'rca' && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-accent/30">
                              <TrendingUp className="w-4 h-4 text-accent" />
                              <span className="text-xs text-accent">RCA/CAPA ANALYSIS</span>
                            </div>
                          )}
                          <p className="text-sm text-foreground whitespace-pre-line">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-2">
                          {message.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-muted/50 border-border/50"
                />
                <Button onClick={handleSendMessage} className="gap-2">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Agent Behavior Log */}
            <AnimatePresence>
              {showBehaviorLog && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-primary" />
                        <h3 className="text-primary">Agent Behavior Log</h3>
                      </div>
                      <Badge variant="outline">UEBA Compliance</Badge>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {currentScenario.behaviorLog.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30"
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            log.status === 'completed' || log.status === 'confirmed' || log.status === 'delivered' || log.status === 'passed' || log.status === 'verified' || log.status === 'approved' ? 'bg-secondary' :
                            log.status === 'detected' || log.status === 'identified' ? 'bg-accent' :
                            log.risk === 'critical' || log.risk === 'high' ? 'bg-accent animate-pulse' :
                            log.risk === 'medium' ? 'bg-accent/60' :
                            'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-sm text-foreground truncate">{log.action}</p>
                              <Badge 
                                variant={
                                  log.risk === 'critical' ? 'destructive' :
                                  log.risk === 'high' ? 'secondary' :
                                  log.risk === 'medium' ? 'outline' : 
                                  'outline'
                                } 
                                className="text-xs flex-shrink-0"
                              >
                                {log.risk} risk
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                              <span className="text-xs text-secondary capitalize">• {log.status}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
