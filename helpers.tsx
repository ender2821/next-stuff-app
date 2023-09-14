
import VehicleIcon from "./assets/vehicle-icon.svg";
import ToolsIcon from "./assets/specs-icon.svg";
import GearIcon from "./assets/gear-icon.svg";
import LifeIcon from "./assets/life-icon.svg";

import GithubProvider from "next-auth/providers/github"

export const iconRender = (category: string) => {
    const icon = category;
    switch (icon) {
      case "vehicles":
        return <VehicleIcon />;
      case "tools":
        return <ToolsIcon />;
      case "gear":
        return <GearIcon />;
      case "life":
        return <LifeIcon />;
      default:
        return;
    }
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    // ...add more providers here
  ],
}
