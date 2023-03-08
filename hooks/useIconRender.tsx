
import VehicleIcon from "../assets/vehicle-icon.svg";
import ToolsIcon from "../assets/specs-icon.svg";
import GearIcon from "../assets/gear-icon.svg";
import LifeIcon from "../assets/life-icon.svg";

const useIconRender = (category: 'vehicles' | 'tools' | 'gear' | 'life') => {
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

export default useIconRender;