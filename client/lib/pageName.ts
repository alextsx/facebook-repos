type PageNames = {
  [key: string]: string;
};

const pageNames: PageNames = {
  "/user-list": "User List",
  "/repositories": "Repositories",
  "/repository": "Repository",
};

const returnPageName = (key: string | null) => {
  if (!key) return "Invalid page";
  const [_, page, ...rest] = key.split("/");
  const pageName = pageNames[`/${page}`] ?? "Invalid page";
  return rest && rest.length !== 0
    ? `${pageName} - ${rest.join("/")}`
    : pageName;
};

export default returnPageName;
