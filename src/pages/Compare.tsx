import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { OTPGate } from "@/components/OTPGate"; 
import {
  ArrowLeft,
  Droplets,
  Gauge,
  Thermometer,
  Activity,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import * as Recharts from "recharts"; // استيراد Recharts كـ Namespace

interface Station {
  id: string;
  name: string;
  location: string;
  waterLevel: number;
  pressure: number;
  temperature: number;
  flowRate: number;
  efficiency: number;
}

// أسماء محطات القاهرة (تبقى بالخارج كبيانات ثابتة)
const mockStations: Station[] = [
  {
    id: "ST-001",
    name: "محطة مياه القاهرة - المركزية",
    location: "المركزية",
    waterLevel: 85,
    pressure: 4.2,
    temperature: 22,
    flowRate: 1200,
    efficiency: 94,
  },
  {
    id: "ST-002",
    name: "محطة مياه القاهرة - الغربية",
    location: "الغربية",
    waterLevel: 65,
    pressure: 3.8,
    temperature: 24,
    flowRate: 980,
    efficiency: 87,
  },
  {
    id: "ST-003",
    name: "محطة مياه القاهرة - الشرقية",
    location: "الشرقية",
    waterLevel: 92,
    pressure: 4.5,
    temperature: 21,
    flowRate: 1350,
    efficiency: 96,
  },
  {
    id: "ST-004",
    name: "محطة مياه القاهرة - الجنوبية",
    location: "الجنوبية",
    waterLevel: 45,
    pressure: 3.2,
    temperature: 26,
    flowRate: 750,
    efficiency: 78,
  },
];

const stationColors = [
  "hsl(216 90% 50%)",
  "hsl(142 76% 36%)",
  "hsl(38 92% 50%)",
  "hsl(0 72% 51%)",
];

// ====================================================================
// تم النقل: دوال تجهيز البيانات أصبحت داخل المكون الرئيسي
// ====================================================================
const CompareContent = () => { 
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  const toggleStation = (stationId: string) => {
    setSelectedStations((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId]
    );
  };

  const selectedStationsData = mockStations.filter((s) =>
    selectedStations.includes(s.id)
  );

  // الدوال اللي كانت مسببة الخطأ تم وضعها هنا:
  const comparisonData = [
    {
      metric: "مستوى المياه",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [s.location, s.waterLevel])
      ),
    },
    {
      metric: "الضغط",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [s.location, s.pressure * 20])
      ),
    },
    {
      metric: "الحرارة",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [s.location, s.temperature * 3])
      ),
    },
    {
      metric: "معدل التدفق",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [s.location, s.flowRate / 15])
      ),
    },
    {
      metric: "الكفاءة",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [s.location, s.efficiency])
      ),
    },
  ];

  const radarData = selectedStationsData.map((station) => ({
    station: station.location,
    "مستوى المياه": station.waterLevel,
    الضغط: station.pressure * 20,
    الحرارة: 100 - station.temperature,
    "معدل التدفق": station.flowRate / 15,
    الكفاءة: station.efficiency,
  }));

  const performanceData = [
    {
      name: "مستوى المياه %",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [
          s.location,
          s.waterLevel,
        ])
      ),
    },
    {
      name: "الضغط (بار)",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [
          s.location,
          s.pressure,
        ])
      ),
    },
    {
      name: "درجة الحرارة °C",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [
          s.location,
          s.temperature,
        ])
      ),
    },
    {
      name: "معدل التدفق L/s",
      ...Object.fromEntries(
        selectedStationsData.map((s, _) => [
          s.location,
          s.flowRate,
        ])
      ),
    },
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
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                {t("compare.title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("compare.subtitle")}
              </p>
            </div>
            <LanguageToggle />
            <Badge variant="outline" className="text-base px-4 py-2">
              {selectedStations.length} {t("compare.selected")}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Station Selection */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              {t("compare.selectStations")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockStations.map((station, idx) => (
                <div
                  key={station.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedStations.includes(station.id)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary/50 hover:border-primary/50"
                  }`}
                  onClick={() => toggleStation(station.id)}
                >
                  <div className="flex items-start gap-3">
                    <Recharts.Tooltip />
                    <Checkbox
                      checked={selectedStations.includes(station.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: stationColors[idx] }}
                      >
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {station.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {station.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedStations.length < 2 ? (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <BarChart3 className="w-16 h-16 text-primary mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("compare.selectAtLeast")}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {t("compare.selectMessage")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedStationsData.map((station, idx) => (
                <Card
                  key={station.id}
                  className="bg-gradient-to-br from-card to-card/80 border-border"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: stationColors[idx] }}
                      >
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {station.location}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        مستوى المياه
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        {station.waterLevel}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">الضغط</span>
                      <span className="text-lg font-bold text-foreground">
                        {station.pressure} بار
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">الكفاءة</span>
                      <span className="text-lg font-bold text-green-600">
                        {station.efficiency}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    {t("compare.mainMetrics")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Recharts.ResponsiveContainer width="100%" height={350}>
                    <Recharts.BarChart data={comparisonData}>
                      <Recharts.CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <Recharts.XAxis
                        dataKey="metric"
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 12 }}
                      />
                      <Recharts.YAxis stroke="hsl(var(--muted-foreground))" />
                      <Recharts.Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Recharts.Legend />
                      {selectedStationsData.map((station, idx) => (
                        <Recharts.Bar
                          key={station.id}
                          dataKey={station.location}
                          fill={stationColors[idx]}
                          radius={[8, 8, 0, 0]}
                        />
                      ))}
                    </Recharts.BarChart>
                  </Recharts.ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    {t("compare.overallPerformance")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Recharts.ResponsiveContainer width="100%" height={350}>
                    <Recharts.RadarChart data={radarData}>
                      <Recharts.PolarGrid stroke="hsl(var(--border))" />
                      <Recharts.PolarAngleAxis
                        dataKey="station"
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 11 }}
                      />
                      <Recharts.PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                      <Recharts.Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Recharts.Legend />
                      {selectedStationsData.map((station, idx) => (
                        <Recharts.Radar
                          key={station.id}
                          name={station.location}
                          dataKey={station.location}
                          stroke={stationColors[idx]}
                          fill={stationColors[idx]}
                          fillOpacity={0.3}
                        />
                      ))}
                    </Recharts.RadarChart>
                  </Recharts.ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    {t("compare.detailedTable")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">
                            {t("compare.metric")}
                          </th>
                          {selectedStationsData.map((station) => (
                            <th
                              key={station.id}
                              className="text-center py-4 px-4 text-sm font-semibold text-foreground"
                            >
                              {station.location}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-secondary/30">
                          <td className="py-4 px-4 text-sm text-muted-foreground flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-primary" />
                            مستوى المياه
                          </td>
                          {selectedStationsData.map((station) => (
                            <td
                              key={station.id}
                              className="text-center py-4 px-4 text-lg font-bold text-foreground"
                            >
                              {station.waterLevel}%
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border hover:bg-secondary/30">
                          <td className="py-4 px-4 text-sm text-muted-foreground flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-accent" />
                            الضغط
                          </td>
                          {selectedStationsData.map((station) => (
                            <td
                              key={station.id}
                              className="text-center py-4 px-4 text-lg font-bold text-foreground"
                            >
                              {station.pressure} بار
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border hover:bg-secondary/30">
                          <td className="py-4 px-4 text-sm text-muted-foreground flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-warning" />
                            درجة الحرارة
                          </td>
                          {selectedStationsData.map((station) => (
                            <td
                              key={station.id}
                              className="text-center py-4 px-4 text-lg font-bold text-foreground"
                            >
                              {station.temperature}°C
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border hover:bg-secondary/30">
                          <td className="py-4 px-4 text-sm text-muted-foreground flex items-center gap-2">
                            <Activity className="w-4 h-4 text-success" />
                            معدل التدفق
                          </td>
                          {selectedStationsData.map((station) => (
                            <td
                              key={station.id}
                              className="text-center py-4 px-4 text-lg font-bold text-foreground"
                            >
                              {station.flowRate} L/s
                            </td>
                          ))}
                        </tr>
                        <tr className="hover:bg-secondary/30">
                          <td className="py-4 px-4 text-sm text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-success" />
                            {t("compare.efficiency")}
                          </td>
                          {selectedStationsData.map((station) => (
                            <td
                              key={station.id}
                              className="text-center py-4 px-4 text-lg font-bold text-green-600"
                            >
                              {station.efficiency}%
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// يتم تغيير الـ Export لتطبيق الحماية
const CompareWrapper = () => (
  <OTPGate resourceName="صفحة مقارنة المحطات">
    <CompareContent />
  </OTPGate>
);

export default CompareWrapper;