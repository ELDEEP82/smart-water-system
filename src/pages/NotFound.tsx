import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // تسجيل محاولة الدخول الخاطئة في الـ Console
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-extrabold text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">الصفحة المطلوبة غير موجودة.</p>
        <a href="/" className="text-primary underline hover:text-primary/80 transition-colors font-medium">
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;