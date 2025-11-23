import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { 
  Droplets, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  MapPin,
  LogOut,
  BarChart3
} from "lucide-react";

interface Station {
  id: string;
  name: string;
  location: string;
  status: "operational" | "warning" | "critical";
  waterLevel: number;
  pressure: number;
  temperature: number;
  flowRate: number;
}

// ====================================================================
// تم التعديل: تغيير أسماء المحطات لتكون القاهرة (المرحلة 1: التسمية)
// ====================================================================
const mockStations: Station[] = [
  {
    id: "ST-001",
    name: "محطة مياه القاهرة - المركزية",
    location: "القاهرة - المركزية",
    status: "operational",
    waterLevel: 85,
    pressure: 4.2,
    temperature: 22,
    flowRate: 1200
  },
  {
    id: "ST-002",
    name: "محطة مياه القاهرة - الغربية",
    location: "القاهرة - الغربية",
    status: "warning",
    waterLevel: 65,
    pressure: 3.8,
    temperature: 24,
    flowRate: 980
  },
  {
    id: "ST-003",
    name: "محطة مياه القاهرة - الشرقية",
    location: "القاهرة - الشرقية",
    status: "operational",
    waterLevel: 92,
    pressure: 4.5,
    temperature: 21,
    flowRate: 1350
  },
  {
    id: "ST-004",
    name: "محطة مياه القاهرة - الجنوبية",
    location: "القاهرة - الجنوبية",
    status: "critical",
    waterLevel: 45,
    pressure: 3.2,
    temperature: 26,
    flowRate: 750
  }
];
// ====================================================================

const Dashboard = () => {
  // سنستخدم navigate لتوجيه المستخدم إلى صفحة التفاصيل المحمية
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getStatusColor = (status: Station["status"]) => {
    switch (status) {
      case "operational":
        return "default"; // or use specific classes if configured
      case "warning":
        return "secondary";
      case "critical":
        return "destructive";
      default:
        return "default";
    }
  };

  const getStatusText = (status: Station["status"]) => {
    switch (status) {
      case "operational":
        return "تعمل بكفاءة";
      case "warning":
        return "تحذير";
      case "critical":
        return "حرجة";
      default:
        return "";
    }
  };

  const operationalCount = mockStations.filter(s => s.status === "operational").length;
  const warningCount = mockStations.filter(s => s.status === "warning").length;
  const criticalCount = mockStations.filter(s => s.status === "critical").length;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t("dashboard.title")}</h1>
              <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button 
              // تم التعديل: التوجيه لصفحة المقارنة المحمية (سنقوم بتعديل صفحة المقارنة لاحقاً)
              onClick={() => navigate("/compare")} 
              className="gap-2 bg-primary hover:bg-primary/90 text-white"
            >
              <BarChart3 className="w-4 h-4" />
              {t("dashboard.compare")}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              {t("dashboard.logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {t("dashboard.totalStations")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{mockStations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{t("dashboard.stationsCount")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                {t("dashboard.operational")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{operationalCount}</div>
              <p className="text-xs text-muted-foreground mt-1">{t("dashboard.operationalCount")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                {t("dashboard.warnings")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{warningCount}</div>
              <p className="text-xs text-muted-foreground mt-1">{t("dashboard.warningsCount")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                {t("dashboard.critical")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{criticalCount}</div>
              <p className="text-xs text-muted-foreground mt-1">{t("dashboard.criticalCount")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Stations List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">{t("dashboard.selectStation")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockStations.map((station) => (
              <Card 
                key={station.id} 
                className="hover:shadow-md transition-all duration-300 cursor-pointer group"
                // تم التعديل: التوجيه لصفحة التفاصيل المحمية بالـ ID
                onClick={() => navigate(`/station/${station.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Droplets className="w-7 h-7 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-foreground">{station.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {station.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getStatusColor(station.status) as any}>
                        {getStatusText(station.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{t("dashboard.clickToEnter")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;