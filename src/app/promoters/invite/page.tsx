"use client";

import { useState } from "react";
import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { InviteProgress } from "@/src/features/promoters/components/invite/InviteProgress";
import { EmailStep } from "@/src/features/promoters/components/invite/EmailStep";
import { RoleStep } from "@/src/features/promoters/components/invite/RoleStep";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function AddPromoterPage() {
  const t = useTranslations("PromoterInvite");
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // In a real app, this would submit to API
    console.log("Inviting:", { email, role });
    router.push("/promoters");
  };

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Header */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">{t("inviting")}</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1400px] mx-auto w-full px-8 pt-10 pb-16">
            <div className="w-full max-w-[800px]">
              {/* Header (Breadcrumb style) */}
              <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground mb-8 uppercase tracking-[0.2em]">
                <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => router.push("/promoters")}>{t("titlePlural")}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground">{t("inviting")}</span>
              </div>

              <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tight text-foreground mb-3">
                  {t("inviting")}
                </h1>
                <p className="text-muted-foreground font-medium">{t("subtitleInvite")}</p>
              </div>

              <div className="max-w-[600px] mb-12">
                <InviteProgress currentStep={step} totalSteps={2} />
              </div>

              <div className="mt-8">
                {step === 1 && (
                  <EmailStep
                    email={email}
                    onEmailChange={setEmail}
                    onNext={handleNext}
                  />
                )}

                {step === 2 && (
                  <RoleStep
                    email={email}
                    role={role}
                    onRoleChange={setRole}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
