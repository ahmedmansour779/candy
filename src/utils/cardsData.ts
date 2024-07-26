import imagesIcon from "../assets/icons/images-icon.svg";
import musicIcon from "../assets/icons/music-icon.svg";
import playIcon from "../assets/icons/play-icon.svg";
import docsIcon from "../assets/icons/docs-icon.svg";
import downloadsIcon from "../assets/icons/downloads-icon.svg";
import archiveIcon from "../assets/icons/archive-icon.svg";

export const Card1Icons = [
  {
    text: "images",
    path: "/files/images",
    icon: imagesIcon,
  },
  {
    text: "My Music",
    path: "/files/music",
    icon: musicIcon,
  },
  {
    text: "My Videos",
    path: "/files/videos",
    icon: playIcon,
  },
  {
    text: "Documents",
    path: "/files/documents",
    icon: docsIcon,
  },
  {
    text: "Downloads",
    path: "/downloads",
    icon: downloadsIcon,
  },
  {
    text: "My Music",
    path: "/files/archive",
    icon: archiveIcon,
  },
];

type iconType = "image" | "music" | "video" | "doc";
export function getIcon(iconType: iconType) {
  switch (iconType) {
    case "image":
      return imagesIcon;

    case "music":
      return musicIcon;

    case "video":
      return playIcon;

    case "doc":
      return docsIcon;

    default:
      return imagesIcon;
  }
}

export const monthlyPricingData = [
  {
    perPrice: 8,
    dataUsage: 50,
  },
  { perPrice: 12, dataUsage: 100, popular: true },
  { perPrice: 20, dataUsage: 300 },
];
export const annualPricingData = [
  {
    perPrice: 8,
    dataUsage: 50,
  },
  { perPrice: 12, dataUsage: 100, popular: true },
  { perPrice: 20, dataUsage: 300 },
];
