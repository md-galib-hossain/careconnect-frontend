import { Box, Divider, List, ListItem, Toolbar,ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Image from "next/image";
import assets from "@/assets"
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { TUserRole } from "@/types";
const SideBar = () => {
  const drawer = (
    <div>
 
      <List>
        {drawerItems("super_admin" as TUserRole).map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
     
    </div>
  );
  return (
<Box>
  <Stack sx={{
    py : 1,
    mt : 1
  }} gap={1} direction="row" alignItems="center" justifyContent="center"
  component={Link}
  href="/"
  >
    <Image src = {assets.svgs.logo} width={40} height={40} alt="logo"/>
    <Typography sx={{
      cursor : "pointer"
    }} variant="h6" component="h1">Care Connect</Typography>
  </Stack>
{drawer}
</Box>

  )
}

export default SideBar