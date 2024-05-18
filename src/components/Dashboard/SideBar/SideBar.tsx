import { Box,  List, Stack, Typography } from "@mui/material"

import Image from "next/image";
import assets from "@/assets"
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { TUserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { getUserInfo } from "@/app/services/auth.services";
import { useEffect, useState } from "react";
const SideBar = () => {
  const [userRole,setUserRole] = useState("")
  useEffect(()=>{
    const {role} = getUserInfo()
    setUserRole(role)

  },[])
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
  <List>
        {drawerItems(userRole as TUserRole)?.map((item, index) => (
         <SidebarItem key={index} index={index} item={item}/>
        ))}
      </List>
</Box>

  )
}

export default SideBar