import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Droplets, Lock, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

const Login = () => {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [stationId, setStationId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationId || !password) {
      toast.error(t("login.fillFields"));
      return;
    }
    
    toast.success(t("login.otpSuccess"));
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error(t("login.invalidOtp"));
      return;
    }
    
    toast.success(t("login.loginSuccess"));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Language Toggle - Fixed Position */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md mx-4 backdrop-blur-sm bg-card/95 border-border shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
            <Droplets className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            {t("login.title")}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            {step === "login" ? t("login.subtitle") : t("login.otpSubtitle")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="stationId" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  {t("login.stationId")}
                </Label>
                <Input
                  id="stationId"
                  type="text"
                  placeholder={t("login.stationIdPlaceholder")}
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  {t("login.password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                {t("login.sendOtp")}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-foreground flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  {t("login.otp")}
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground h-12 text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                  dir="ltr"
                />
                <p className="text-sm text-muted-foreground text-center">
                  {t("login.otpSent")}
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                >
                  {t("login.submit")}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setStep("login")} 
                  className="w-full h-12 border-border text-foreground hover:bg-secondary"
                >
                  {t("login.back")}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
