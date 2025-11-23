import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

// كلمة السر الثابتة لجميع المحطات ولصفحة المقارنة (يمكن تغييرها هنا)
const RESOURCE_PASSWORD = "1234";

interface OTPGateProps {
    children: ReactNode;
    resourceName: string; // اسم المورد الذي يحاول المستخدم الوصول إليه
}

export const OTPGate = ({ children, resourceName }: OTPGateProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    
    // ملاحظة: بما أننا لا نستطيع استخدام useLanguage هنا لتجنب التعقيد
    // سنستخدم النصوص المباشرة مؤقتاً
    const lang = 'ar'; 

    const handleAuthenticate = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === RESOURCE_PASSWORD) {
            setIsAuthenticated(true);
            toast.success(lang === 'ar' ? 'تم الدخول بنجاح!' : 'Access Granted!');
        } else {
            toast.error(lang === 'ar' ? 'كلمة السر غير صحيحة.' : 'Incorrect Password.');
            setPassword("");
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
            <Card className="w-full max-w-md backdrop-blur-sm bg-card/95 border-border shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">{lang === 'ar' ? `بوابة أمان المحتوى` : `Content Security Gate`}</CardTitle>
                    <CardDescription>
                        {lang === 'ar' ? `للوصول إلى ${resourceName}، يرجى إدخال كلمة المرور.` : `Please enter the password to access ${resourceName}.`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAuthenticate} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="password-gate" className="text-foreground flex items-center gap-2">
                                <Lock className="w-4 h-4 text-primary" />
                                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                            </label>
                            <Input
                                id="password-gate"
                                type="password"
                                placeholder={lang === 'ar' ? 'أدخل كلمة المرور (1234)' : 'Enter Password (1234)'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                            {lang === 'ar' ? 'دخول' : 'Access'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};