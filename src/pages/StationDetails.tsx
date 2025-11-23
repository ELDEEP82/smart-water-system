import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { OTPGate } from "@/components/OTPGate"; 
import {
  ArrowLeft,
  Droplets,
  Gauge,
  Thermometer,
  Activity,
  Zap,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Clock
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for charts
const waterLevelData = [
  { time: "00:00", level: 78 },
  { time: "04:00", level: 82 },
  { time: "08:00", level: 85 },
  { time: "12:00", level: 83 },
  { time: "16:00", level: 88 },
  { time: "20:00", level: 85 },
  { time: "23:59", level: 85 },
];

const pressureData = [
  { time: "00:00", pressure: 3.8 },
  { time: "04:00", pressure: 4.0 },
  { time: "08:00", pressure: 4.2 },
  { time: "12:00", pressure: 4.1 },
  { time: "16:00", pressure: 4.3 },
  { time: "20:00", pressure: 4.2 },
  { time: "23:59", pressure: 4.2 },
];

const flowData = [
  { time: "00:00", flow: 1050, temp: 20 },
  { time: "04:00", flow: 1100, temp: 21 },
  { time: "08:00", flow: 1200, temp: 22 },
  { time: "12:00", flow: 1180, temp: 23 },
  { time: "16:00", flow: 1250, temp: 22 },
  { time: "20:00", flow: 1200, temp: 21 },
  { time: "23:59", flow: 1200, temp: 22 },
];

// تم التصحيح: المكون الأساسي
const StationDetailsContent = () => { 

  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mock station data
  const station = {
    id: id || "ST-001",
    name: "محطة الضخ الرئيسية - القاهرة",
    location: "القاهرة، مصر",
    coordinates: "30.0444° N, 31.2357° E",
    status: "operational" as const,
    waterLevel: 85,
    pressure: 4.2,
    temperature: 22,
    flowRate: 1200,
    powerConsumption: 145,
    lastUpdated: new Date().toLocaleString("ar-EG"),
  };

  const sensors = [
    { name: "مستشعر المياه الرئيسي", status: "active", lastReading: "منذ دقيقتين" },
    { name: "مستشعر الضغط A", status: "active", lastReading: "منذ دقيقتين" },
    { name: "مستشعر الضغط B", status: "active", lastReading: "منذ 3 دقائق" },
    { name: "مستشعر الحرارة", status: "active", lastReading: "منذ دقيقة" },
    { name: "مستشعر التدفق", status: "active", lastReading: "منذ دقيقتين" },
    { name: "مستشعر الطاقة", status: "warning", lastReading: "منذ 5 دقائق" },
  ];

  const recommendations = [
    { type: "info", message: "معدل الاستهلاك ضمن المعدل الطبيعي" },
    { type: "success", message: "كفاءة التشغيل عالية - 94%" },
    { type: "info", message: "الصيانة الدورية القادمة بعد 15 يوم" },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{station.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {station.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {t("station.lastUpdate")}: {station.lastUpdated}
                </div>
              </div>
            </div>
            <LanguageToggle />
            <Badge className="bg-green-600 hover:bg-green-700 text-white border-none">{t("dashboard.statusOperational")}</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-600" />
                مستوى المياه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{station.waterLevel}%</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50/50 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Gauge className="w-4 h-4 text-purple-600" />
                الضغط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{station.pressure} بار</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50/50 border-yellow-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-yellow-600" />
                الحرارة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{station.temperature}°C</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50/50 border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-600" />
                معدل التدفق
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{station.flowRate} L/s</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                استهلاك الطاقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{station.powerConsumption} kW</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                مستوى المياه - آخر 24 ساعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={waterLevelData}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200 95% 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(200 95% 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="level" 
                    stroke="hsl(200 95% 45%)" 
                    strokeWidth={2}
                    fill="url(#colorLevel)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-600" />
                الضغط - آخر 24 ساعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pressure" 
                    stroke="hsl(270 95% 35%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(270 95% 35%)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                معدل التدفق والحرارة - آخر 24 ساعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={flowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="flow" 
                    stroke="hsl(142 76% 36%)" 
                    strokeWidth={2}
                    name="معدل التدفق (L/s)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="hsl(38 92% 50%)" 
                    strokeWidth={2}
                    name="درجة الحرارة (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sensors and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">حالة المستشعرات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sensors.map((sensor, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        sensor.status === "active" ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                      }`} />
                      <div>
                        <div className="font-medium text-foreground">{sensor.name}</div>
                        <div className="text-xs text-muted-foreground">{sensor.lastReading}</div>
                      </div>
                    </div>
                    <Badge variant={sensor.status === "active" ? "default" : "outline"} 
                           className={sensor.status === "active" ? "bg-green-600 hover:bg-green-700 border-none" : "text-yellow-600 border-yellow-200"}>
                      {sensor.status === "active" ? "نشط" : "تحذير"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                التوصيات والتحليلات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-3 p-4 rounded-lg border ${
                      rec.type === "success" 
                        ? "bg-green-500/10 border-green-500/20" 
                        : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      rec.type === "success" ? "text-green-600" : "text-blue-600"
                    }`} />
                    <p className="text-sm text-foreground">{rec.message}</p>
                  </div>
                ))}
                
                <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    توقعات الذكاء الاصطناعي
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    بناءً على تحليل البيانات التاريخية، من المتوقع أن يزداد معدل الاستهلاك بنسبة 8% خلال الساعات القادمة. يُنصح بمراقبة مستوى المياه عن كثب.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// يتم تغيير الـ Export لتطبيق الحماية
const StationDetailsWrapper = () => {
    const { id } = useParams();
    const stationName = "صفحة " + (id || "المحطة الرئيسية");

    return (
        <OTPGate resourceName={stationName}>
            <StationDetailsContent />
        </OTPGate>
    );
};

export default StationDetailsWrapper;