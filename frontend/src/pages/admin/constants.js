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

export const LANDLORD_BROKER_DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "my-houses",
    label: "My Houses",
    path: "my-houses",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "pending",
    label: "Pending Requests",
    path: "pending",
    icon: <HiOutlineOfficeBuilding />,
  },
  {
    key: "forms",
    label: "Forms",
    path: "house/forms",
    icon: <HiOutlineDocumentText />,
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
