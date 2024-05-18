import deleteCookies from "@/app/services/actions/deleteCookies";
import logoutUser from "@/app/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/app/services/auth.services";
import { authKey } from "@/constants/authKey";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthButton = async () => {
  const userInfo = getUserInfo();
  console.log(userInfo);
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
  };
  return (
    <>
      {userInfo?.id ? (
        <Button onClick={handleLogout} color="error">
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
