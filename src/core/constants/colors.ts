/**
 * AppColors - Color constants matching Flutter mobile app
 *
 * This file mirrors the Flutter AppColors class to ensure
 * visual consistency across web and mobile platforms.
 */

export const AppColors = {
  primary: "#FF3332",
  secondary: "#666666",
  background: "#EBEBEB",
  text: "#000000",
  cardBackground: "#FFFFFF",
  borderColor: "#DEDEDE",

  // Dark Theme variations
  backgroundDark: "#121212",
  textDark: "#FFFFFF",
  surfaceDark: "#1E1E1E",

  // Additional shades from existing theme
  success: "#28A745",
  danger: "#DC3545",
  warning: "#FFC107",
  liveRed: "#FF4848",
  brandGreen: "#1E514E",
  verifiedBlue: "#007BFF",
  onlineGreen: "#00FF00",
  error: "#DC3545",

  greyLight: "#F2F2F2",
  grey50: "#FAFAFA",
  grey100: "#F5F5F5",
  grey200: "#EEEEEE",
  grey300: "#E0E0E0",
  grey600: "#757575",
  grey700: "#616161",
  grey400: "#BDBDBD",
  grey500: "#9E9E9E",
  grey800: "#424242",
  grey900: "#212121",
  sectionHeader: "#8B8B4B",
  searchBarBackground: "#F4F4F1",
  notificationRed: "#F44336", // Colors.red
  actionYellow: "#C4C400",

  // Base colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Social/Swipe feature colors
  goldStar: "#FFB800",
  superLikeCyan: "#00D4FF",
  matchGold: "#FFFFD700", // Corrected hex from provided 0FFFFD700? No, wait 0xFFFFD700

  // Status colors for guest lists
  statusGreen: "#00C853",
  statusRed: "#FF1744",
  statusGrey: "#9E9E9E",

  // Dark theme specific
  dividerDark: "#2C2C2C",
  cardDark: "#1A1A1A",
  skeletonBase: "#D6D6D6",

  // Details page specific
  toggleGreen: "#22C55E",
  toggleRed: "#FF5252",
  warmYellowBg: "#FFFDE7",
  warmBrown: "#8D6E63",
} as const;

export type AppColorKey = keyof typeof AppColors;
export type AppColorValue = typeof AppColors[AppColorKey];
