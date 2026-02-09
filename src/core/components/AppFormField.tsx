import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";

interface AppFormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
}

/**
 * AppFormField - Standardized form field component matching Flutter design.
 * Wraps Shadcn FormField and Input, enforcing typography and styling.
 */
export function AppFormField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    disabled,
    className,
    icon,
    suffix,
}: AppFormFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel className={AppTextStyles.labelBold()}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                placeholder={placeholder}
                                type={type}
                                disabled={disabled}
                                className={cn(
                                    AppTextStyles.body(),
                                    "h-11 bg-card", // Match AppColors.cardBackground
                                    icon && "pl-10",
                                    suffix && "pr-10"
                                )}
                                {...field}
                            />
                            {icon && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {icon}
                                </div>
                            )}
                            {suffix && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {suffix}
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage className={AppTextStyles.caption("text-destructive")} />
                </FormItem>
            )}
        />
    );
}
