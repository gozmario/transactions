import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SurfingIcon from "@mui/icons-material/Surfing";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HouseIcon from "@mui/icons-material/House";
import HealingIcon from "@mui/icons-material/Healing";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import FlightIcon from "@mui/icons-material/Flight";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { TransactionCategory } from "../services";

export function mapCategoryToIcon(category: TransactionCategory) {
  switch (category) {
    case TransactionCategory.entertainment:
      return <SurfingIcon />;
    case TransactionCategory.financial:
      return <LocalAtmIcon />;
    case TransactionCategory.food:
      return <LocalPizzaIcon />;
    case TransactionCategory.healthcare:
      return <LocalHospitalIcon />;
    case TransactionCategory.housing:
      return <HouseIcon />;
    case TransactionCategory.insurance:
      return <HealingIcon />;
    case TransactionCategory.lifestyle:
      return <NightlifeIcon />;
    case TransactionCategory.miscellaneous:
      return <MiscellaneousServicesIcon />;
    case TransactionCategory.travel:
      return <FlightIcon />;
    case TransactionCategory.utilities:
    default:
      return <ApartmentIcon />;
  }
}
