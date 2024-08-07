export const dropDownLinks = [
  {
    id: 1,
    path: "/dashboard/profile",
    title: "Profile",
    access: "all",
  },
  {
    id: 2,
    path: "/dashboard/create",
    title: "Create Video",
    access: "user",
  },
  {
    id: 3,
    path: "/dashboard/posts",
    title: "My Videos",
    access: "user",
  },
  {
    id: 6,
    path: "/dashboard/create-category",
    title: "Create Category", // create / update categories
    access: "admin",
  },
  {
    id: 7,
    path: "/dashboard/categories",
    title: "Manage Categories", // manage categories, update, delete categories
    access: "admin",
  },
  {
    id: 9,
    path: "/dashboard/manage-posts",
    title: "Manage Videos", // manage posts by categories
    access: "admin",
  },
  {
    id: 12,
    path: "/dashboard/manage-accounts",
    title: "Manage Accounts",
    access: "admin",
  },
  {
    id: 4,
    path: "/dashboard/bookmarks",
    title: "Bookmarks",
    access: "all",
  },
  {
    id: 5,
    path: "/dashboard/settings",
    title: "Settings",
    access: "all",
  },
];
