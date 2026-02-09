import { Loader2 } from "lucide-react";
import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";

interface AppLoadingStateProps {
    message?: string;
    className?: string;
    fullScreen?: boolean;
}

/**
 * AppLoadingState - Standardized loading indicator matching Flutter design.
 */
export function AppLoadingState({ message, className, fullScreen = false }: AppLoadingStateProps) {
    const content = (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {message && (
                <p className={AppTextStyles.body("text-muted-foreground")}>
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}
