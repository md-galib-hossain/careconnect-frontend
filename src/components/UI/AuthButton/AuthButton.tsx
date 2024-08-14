import deleteCookies from "@/app/services/actions/deleteCookies";
import logoutUser from "@/app/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/app/services/auth.services";
import { authKey } from "@/constants/authKey";
import { Button, MenuItem } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthButton = ({ buttonProps, menuItemProps, isMenuItem }:any) => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
  };

  if (isMenuItem) {
    return (
      <MenuItem
        onClick={handleLogout}
        component={Link}
        href={userInfo?.id ? "/" : "/login"}
        {...menuItemProps}
      >
        {userInfo?.id ? "Logout" : "Login"}
      </MenuItem>
    );
  }

  return (
    <Button
      onClick={userInfo?.id ? handleLogout : null}
      component={Link}
      href={userInfo?.id ? "/" : "/login"}
      {...buttonProps}
    >
      {userInfo?.id ? "Logout" : "Login"}
    </Button>
  );
};

export default AuthButton;
