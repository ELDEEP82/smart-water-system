import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Login Page
    "login.title": "نظام إدارة محطات المياه",
    "login.subtitle": "تسجيل الدخول إلى لوحة التحكم",
    "login.otpSubtitle": "أدخل رمز التحقق المرسل إلى هاتفك",
    "login.stationId": "رقم المحطة",
    "login.stationIdPlaceholder": "أدخل رقم المحطة",
    "login.password": "كلمة السر",
    "login.passwordPlaceholder": "أدخل كلمة السر",
    "login.sendOtp": "إرسال رمز التحقق",
    "login.otp": "رمز التحقق (OTP)",
    "login.otpSent": "تم إرسال الرمز إلى هاتفك المسجل",
    "login.submit": "تسجيل الدخول",
    "login.back": "رجوع",
    "login.otpSuccess": "تم إرسال رمز التحقق إلى هاتفك المسجل",
    "login.loginSuccess": "تم تسجيل الدخول بنجاح",
    "login.fillFields": "الرجاء إدخال رقم المحطة وكلمة السر",
    "login.invalidOtp": "الرجاء إدخال رمز التحقق المكون من 6 أرقام",

    // Dashboard
    "dashboard.title": "نظام إدارة محطات المياه",
    "dashboard.subtitle": "لوحة التحكم الرئيسية",
    "dashboard.logout": "تسجيل الخروج",
    "dashboard.compare": "مقارنة المحطات",
    "dashboard.totalStations": "إجمالي المحطات",
    "dashboard.operational": "تعمل بكفاءة",
    "dashboard.warnings": "تحذيرات",
    "dashboard.critical": "حالات حرجة",
    "dashboard.stationsCount": "محطة ضخ مياه",
    "dashboard.operationalCount": "محطة بحالة جيدة",
    "dashboard.warningsCount": "محطة تحتاج متابعة",
    "dashboard.criticalCount": "محطة تحتاج تدخل فوري",
    "dashboard.selectStation": "اختر المحطة",
    "dashboard.clickToEnter": "اضغط للدخول",
    "dashboard.statusOperational": "تعمل بكفاءة",
    "dashboard.statusWarning": "تحذير",
    "dashboard.statusCritical": "حرجة",

    // Station Details
    "station.backToDashboard": "العودة للوحة التحكم",
    "station.lastUpdate": "آخر تحديث",
    "station.waterLevel": "مستوى المياه",
    "station.pressure": "الضغط",
    "station.temperature": "الحرارة",
    "station.flowRate": "معدل التدفق",
    "station.powerConsumption": "استهلاك الطاقة",
    "station.waterLevel24h": "مستوى المياه - آخر 24 ساعة",
    "station.pressure24h": "الضغط - آخر 24 ساعة",
    "station.flowTemp24h": "معدل التدفق والحرارة - آخر 24 ساعة",
    "station.sensorsStatus": "حالة المستشعرات",
    "station.recommendations": "التوصيات والتحليلات",
    "station.aiPredictions": "توقعات الذكاء الاصطناعي",
    "station.sensorActive": "نشط",
    "station.sensorWarning": "تحذير",
    "station.aiPredictionText": "بناءً على تحليل البيانات التاريخية، من المتوقع أن يزداد معدل الاستهلاك بنسبة 8% خلال الساعات القادمة. يُنصح بمراقبة مستوى المياه عن كثب.",

    // Compare Page
    "compare.title": "مقارنة أداء المحطات",
    "compare.subtitle": "اختر محطتين على الأقل للمقارنة",
    "compare.selected": "محطة محددة",
    "compare.selectStations": "اختر المحطات للمقارنة",
    "compare.selectAtLeast": "اختر محطتين على الأقل",
    "compare.selectMessage": "قم باختيار محطتين أو أكثر من القائمة أعلاه لبدء المقارنة ورؤية التحليلات المفصلة",
    "compare.mainMetrics": "مقارنة المقاييس الرئيسية",
    "compare.overallPerformance": "تحليل الأداء الشامل",
    "compare.detailedPerformance": "مقارنة الأداء التفصيلية",
    "compare.detailedTable": "جدول المقارنة التفصيلي",
    "compare.metric": "المقياس",
    "compare.efficiency": "الكفاءة",

    // Common
    "common.bar": "بار",
    "common.celsius": "°C",
    "common.lps": "L/s",
    "common.kw": "kW",
    "common.percent": "%",
  },
  en: {
    // Login Page
    "login.title": "Water Stations Management System",
    "login.subtitle": "Login to Control Panel",
    "login.otpSubtitle": "Enter verification code sent to your phone",
    "login.stationId": "Station ID",
    "login.stationIdPlaceholder": "Enter station ID",
    "login.password": "Password",
    "login.passwordPlaceholder": "Enter password",
    "login.sendOtp": "Send Verification Code",
    "login.otp": "Verification Code (OTP)",
    "login.otpSent": "Code sent to your registered phone",
    "login.submit": "Login",
    "login.back": "Back",
    "login.otpSuccess": "Verification code sent to your registered phone",
    "login.loginSuccess": "Successfully logged in",
    "login.fillFields": "Please enter station ID and password",
    "login.invalidOtp": "Please enter the 6-digit verification code",

    // Dashboard
    "dashboard.title": "Water Stations Management System",
    "dashboard.subtitle": "Main Control Panel",
    "dashboard.logout": "Logout",
    "dashboard.compare": "Compare Stations",
    "dashboard.totalStations": "Total Stations",
    "dashboard.operational": "Operational",
    "dashboard.warnings": "Warnings",
    "dashboard.critical": "Critical",
    "dashboard.stationsCount": "water pumping station",
    "dashboard.operationalCount": "station in good condition",
    "dashboard.warningsCount": "station needs monitoring",
    "dashboard.criticalCount": "station needs immediate intervention",
    "dashboard.selectStation": "Select Station",
    "dashboard.clickToEnter": "Click to enter",
    "dashboard.statusOperational": "Operational",
    "dashboard.statusWarning": "Warning",
    "dashboard.statusCritical": "Critical",

    // Station Details
    "station.backToDashboard": "Back to Dashboard",
    "station.lastUpdate": "Last update",
    "station.waterLevel": "Water Level",
    "station.pressure": "Pressure",
    "station.temperature": "Temperature",
    "station.flowRate": "Flow Rate",
    "station.powerConsumption": "Power Consumption",
    "station.waterLevel24h": "Water Level - Last 24 Hours",
    "station.pressure24h": "Pressure - Last 24 Hours",
    "station.flowTemp24h": "Flow Rate and Temperature - Last 24 Hours",
    "station.sensorsStatus": "Sensors Status",
    "station.recommendations": "Recommendations & Analysis",
    "station.aiPredictions": "AI Predictions",
    "station.sensorActive": "Active",
    "station.sensorWarning": "Warning",
    "station.aiPredictionText": "Based on historical data analysis, consumption is expected to increase by 8% in the coming hours. It is recommended to closely monitor water levels.",

    // Compare Page
    "compare.title": "Compare Station Performance",
    "compare.subtitle": "Select at least two stations to compare",
    "compare.selected": "station selected",
    "compare.selectStations": "Select Stations to Compare",
    "compare.selectAtLeast": "Select at least two stations",
    "compare.selectMessage": "Select two or more stations from the list above to start comparison and view detailed analytics",
    "compare.mainMetrics": "Main Metrics Comparison",
    "compare.overallPerformance": "Overall Performance Analysis",
    "compare.detailedPerformance": "Detailed Performance Comparison",
    "compare.detailedTable": "Detailed Comparison Table",
    "compare.metric": "Metric",
    "compare.efficiency": "Efficiency",

    // Common
    "common.bar": "bar",
    "common.celsius": "°C",
    "common.lps": "L/s",
    "common.kw": "kW",
    "common.percent": "%",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ar";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
