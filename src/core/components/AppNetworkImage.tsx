"use client";

import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";
import { ImageOff } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { AppLoadingState } from "./AppLoadingState";

interface AppNetworkImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
    fallbackUrl?: string;
    containerClassName?: string;
}

/**
 * AppNetworkImage - Standardized image component with loading and error states.
 * Wraps next/image.
 */
export function AppNetworkImage({
    src,
    alt,
    className,
    containerClassName,
    fallbackUrl,
    ...props
}: AppNetworkImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [imgSrc, setImgSrc] = useState(src);

    if (!src && !fallbackUrl) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center bg-muted text-muted-foreground",
                    containerClassName || className
                )}
            >
                <ImageOff className="h-8 w-8" />
            </div>
        );
    }

    const handleError = () => {
        if (fallbackUrl && imgSrc !== fallbackUrl) {
            setImgSrc(fallbackUrl);
            setIsLoading(true); // Reset loading state for the new attempt
            setHasError(false); // Clear error for the new attempt
        } else {
            setHasError(true);
        }
        setIsLoading(false);
    }

    if (hasError) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center bg-muted text-muted-foreground",
                    containerClassName || className
                )}
            >
                <ImageOff className="h-8 w-8" />
            </div>
        );
    }

    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
                    <AppLoadingState />
                </div>
            )}
            <Image
                src={imgSrc || ""}
                alt={alt}
                className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
                onLoad={() => setIsLoading(false)}
                onError={handleError}
                {...props}
            />
        </div>
    );
}
