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
  {
    id: 6,
    path: "/dashboard/create-category",
    title: "Create Category", // create / update categories
    access: "moderator",
  },
  {
    id: 7,
    path: "/dashboard/categories",
    title: "Manage Categories", // manage categories, update, delete categories
    access: "moderator",
  },
  {
    id: 8,
    path: "/dashboard/manage-deletion",
    title: "Manage Accounts", // manage all accounts to be deleted
    access: "moderator",
  },
  {
    id: 9,
    path: "/dashboard/manage-posts",
    title: "Manage Posts", // manage posts by categories
    access: "moderator",
  },
  {
    id: 10,
    path: "/dashboard/Appoint-Moderator",
    title: "Appoint Moderator", // create a moderator account token
    access: "admin",
  },
  {
    id: 12,
    path: "/dashboard/manage-mods",
    title: "Manage Moderators", // manage moderators
    access: "admin",
  },
];
