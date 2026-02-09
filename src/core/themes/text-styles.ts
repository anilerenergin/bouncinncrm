import { cn } from "@/src/core/utils/cn";

/**
 * AppTextStyles - Typography constants matching Flutter mobile app
 * Replicates the Flutter AppTextStyles usage pattern for React/Tailwind.
 */
export const AppTextStyles = {
  // ========== Headings ==========

  /** H1: Large page titles (32sp, weight 900) */
  h1: (className?: string) => cn("text-[32px] font-black leading-[1.2]", className),

  /** H2: Section headers (24sp, weight 700) */
  h2: (className?: string) => cn("text-2xl font-bold leading-[1.3]", className),

  /** H3: Subsection headers (20sp, weight 700) */
  h3: (className?: string) => cn("text-xl font-bold leading-[1.3]", className),

  /** H4: Small headers (18sp, weight 700) */
  h4: (className?: string) => cn("text-lg font-bold leading-[1.4]", className),

  /** H5: Tiny headers (16sp, weight 700) */
  h5: (className?: string) => cn("text-base font-bold leading-[1.4]", className),

  // ========== Body Text ==========

  /** Body: Regular body text (14sp, weight 400) */
  body: (className?: string) => cn("text-sm font-normal leading-[1.5]", className),

  /** Body Bold: Emphasized body text (14sp, weight 700) */
  bodyBold: (className?: string) => cn("text-sm font-bold leading-[1.5]", className),

  /** Body Large: Larger body text (16sp, weight 400) */
  bodyLarge: (className?: string) => cn("text-base font-normal leading-[1.5]", className),

  /** Body Small: Smaller body text (12sp, weight 400) */
  bodySmall: (className?: string) => cn("text-xs font-normal leading-[1.4]", className),

  // ========== Labels & Captions ==========

  /** Label: Standard label text (12sp, weight 500) */
  label: (className?: string) => cn("text-xs font-medium leading-[1.3] text-gray-600", className), // AppColors.grey600

  /** Label Bold: Emphasized label (12sp, weight 700) */
  labelBold: (className?: string) => cn("text-xs font-bold leading-[1.3]", className),

  /** Caption: Small supplementary text (10sp, weight 400) */
  caption: (className?: string) => cn("text-[10px] font-normal leading-[1.2] text-gray-600", className), // AppColors.grey600

  /** Caption Bold: Emphasized caption (10sp, weight 600) */
  captionBold: (className?: string) => cn("text-[10px] font-semibold leading-[1.2]", className),

  // ========== Buttons ==========

  /** Button: Primary button text (16sp, weight 700, letter spacing) */
  button: (className?: string) => cn("text-base font-bold tracking-[0.5px] leading-[1.2]", className),

  /** Button Small: Smaller button text (14sp, weight 700) */
  buttonSmall: (className?: string) => cn("text-sm font-bold tracking-[0.3px] leading-[1.2]", className),

  // ========== Special ==========

  /** Display: Extra large display text (40sp, weight 900) */
  display: (className?: string) => cn("text-[40px] font-black leading-[1.1]", className),

  /** Subtitle: Subtitle text (14sp, weight 600) */
  subtitle: (className?: string) => cn("text-sm font-semibold leading-[1.4] text-gray-600", className), // AppColors.grey600

  /** Overline: Small uppercase labels (10sp, weight 600, uppercase, letter spacing) */
  overline: (className?: string) => cn("text-[10px] font-semibold uppercase tracking-[1.5px] leading-[1.2] text-gray-600", className), // AppColors.grey600
};
