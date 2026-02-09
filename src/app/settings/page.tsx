import { VenueSettings } from "@/src/components/settings/venue-settings";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex-1 space-y-10 p-8 pt-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
          <h2 className="text-4xl font-black tracking-tight text-foreground bg-clip-text">
            {t("title")}
          </h2>
          <p className="text-sm font-semibold text-muted-foreground/80 uppercase tracking-widest">
            {t("subtitle")}
          </p>
        </div>
        <VenueSettings />
      </div>
    </div>
  );
}
