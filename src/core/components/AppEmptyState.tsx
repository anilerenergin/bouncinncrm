import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";
import { LucideIcon } from "lucide-react";

interface AppEmptyStateProps {
    icon?: LucideIcon;
    title?: string;
    message: string;
    action?: React.ReactNode;
    className?: string;
}

/**
 * AppEmptyState - Standardized empty state component matching Flutter design.
 */
export function AppEmptyState({
    icon: Icon,
    title,
    message,
    action,
    className,
}: AppEmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
            {Icon && (
                <div className="mb-4 rounded-full bg-muted p-4">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
            )}
            {title && (
                <h3 className={AppTextStyles.h3("mb-2")}>
                    {title}
                </h3>
            )}
            <p className={AppTextStyles.body("max-w-sm text-muted-foreground mb-6")}>
                {message}
            </p>
            {action}
        </div>
    );
}
