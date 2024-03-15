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
  GiftIcon,
  UserIcon,
  HandRaisedIcon,
  ReceiptPercentIcon,
  HeartIcon,
  ScissorsIcon,
  WrenchIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid"
import { Color } from "@tremor/react"

interface CategoryIconDict {
  [key: string]: {
    icon: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string
        titleId?: string
      } & React.RefAttributes<SVGSVGElement>
    >
    color: Color
  }
}

export const categoryIconDict: CategoryIconDict = {
  uncategorized: {
    icon: QuestionMarkCircleIcon,
    color: "neutral",
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
  transit: {
    icon: TruckIcon,
    color: "orange",
  },
  service: {
    icon: WrenchIcon,
    color: "sky",
  },
  dining: {
    icon: ReceiptPercentIcon,
    color: "lime",
  },
  home: {
    icon: HomeIcon,
    color: "amber",
  },
  entertainment: {
    icon: TvIcon,
    color: "emerald",
  },
  health: {
    icon: HeartIcon,
    color: "red",
  },
  software: {
    icon: ComputerDesktopIcon,
    color: "purple",
  },
  general: {
    icon: CubeTransparentIcon,
    color: "slate",
  },
  donations: {
    icon: GiftIcon,
    color: "green",
  },
  personal: {
    icon: ScissorsIcon,
    color: "yellow",
  },
  tuition: {
    icon: AcademicCapIcon,
    color: "blue",
  },
}
