import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi"

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "overveiw",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "houses",
    label: "Houses",
    path: "houses",
    icon: <HiOutlineOfficeBuilding />,
  },
  {
    key: "users",
    label: "Users",
    path: "users",
    icon: <HiOutlineUsers />,
  },
  {
    key: "forms",
    label: "Forms",
    path: "forms",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "report",
    label: "Reports",
    path: "reports",
    icon: <HiOutlineAnnotation />,
  },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
]
