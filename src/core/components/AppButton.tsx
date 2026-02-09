import * as React from "react";
import { Button, ButtonProps } from "@/src/components/ui/button";
import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";
import { Loader2 } from "lucide-react";

interface AppButtonProps extends ButtonProps {
    isLoading?: boolean;
    text?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

/**
 * AppButton - Standardized button component matching Flutter design.
 * Wraps Shadcn Button but enforces typography and consistent loading state.
 */
export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
    ({ className, variant, size, isLoading, text, children, leftIcon, rightIcon, disabled, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                disabled={disabled || isLoading}
                className={cn(AppTextStyles.button(), className)}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {text || children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </Button>
        );
    }
);
AppButton.displayName = "AppButton";
