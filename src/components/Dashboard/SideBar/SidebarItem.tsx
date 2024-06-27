import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { TDrawerItem } from "@/types";
import { usePathname } from "next/navigation";
const SidebarItem = ({ item, index }: { item: TDrawerItem; index: number }) => {
    const linkPath = `/dashboard/${item?.path}`;
    const pathName = usePathname()
    console.log(pathName)
  return (
    <Link href={linkPath}>
      <ListItem disablePadding sx={{
        ...(pathName === linkPath ? {borderRight : "3px solid #0582CA", "& svg" : {
            color: "#0582CA"
        } } : {}),
        mb:1
      }}>
        <ListItemButton>
          <ListItemIcon>
          {
            item?.icon && <item.icon/> 
          }
          </ListItemIcon>
          <ListItemText primary={item?.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
