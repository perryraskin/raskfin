import {
  BriefcaseIcon,
  ComputerDesktopIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  BoltIcon,
  HomeIcon,
  TruckIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  LightBulbIcon,
  TvIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/solid"
import { Color } from "@tremor/react"

interface CategoryIconDict {
  [key: string]: {
    icon: React.ForwardRefExoticComponent<
      React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
    >
    color: Color
  }
}

export const categoryIconDict: CategoryIconDict = {
  uncategorized: {
    icon: QuestionMarkCircleIcon,
    color: "gray",
  },
  shopping: {
    icon: ShoppingBagIcon,
    color: "sky",
  },
  utilities: {
    icon: LightBulbIcon,
    color: "yellow",
  },
  travel: {
    icon: BriefcaseIcon,
    color: "pink",
  },
  office: {
    icon: BriefcaseIcon,
    color: "blue",
  },
  groceries: {
    icon: ShoppingCartIcon,
    color: "indigo",
  },
  transportation: {
    icon: TruckIcon,
    color: "orange",
  },
  transport: {
    icon: TruckIcon,
    color: "orange",
  },
  service: {
    icon: BoltIcon,
    color: "rose",
  },
  dining: {
    icon: HomeIcon,
    color: "amber",
  },
  entertainment: {
    icon: TvIcon,
    color: "emerald",
  },
  health: {
    icon: ShieldExclamationIcon,
    color: "red",
  },
  software: {
    icon: ComputerDesktopIcon,
    color: "purple",
  },
  general: {
    icon: CubeTransparentIcon,
    color: "gray",
  },
}
