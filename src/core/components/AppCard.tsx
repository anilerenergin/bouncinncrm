import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";
import * as React from "react";

interface AppCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    footer?: React.ReactNode;
    action?: React.ReactNode;
    noPadding?: boolean;
}

/**
 * AppCard - Standardized card component matching Flutter design.
 * Wraps Shadcn Card with consistent typography and spacing.
 */
export function AppCard({
    className,
    title,
    subtitle,
    children,
    footer,
    action,
    noPadding = false,
    ...props
}: AppCardProps) {
    return (
        <Card className={cn("overflow-hidden bg-card", className)} {...props}>
            {(title || subtitle || action) && (
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex flex-col space-y-1.5">
                        {title && (
                            <CardTitle className={AppTextStyles.h4()}>{title}</CardTitle>
                        )}
                        {subtitle && (
                            <CardDescription className={AppTextStyles.body("text-muted-foreground")}>
                                {subtitle}
                            </CardDescription>
                        )}
                    </div>
                    {action && <div>{action}</div>}
                </CardHeader>
            )}
            <CardContent className={cn(noPadding && "p-0")}>
                {children}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}
