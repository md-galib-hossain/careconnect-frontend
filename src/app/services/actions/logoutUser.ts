import { authKey } from "@/constants/authKey";
import deleteCookies from "./deleteCookies";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const logoutUser = (router : AppRouterInstance) => {
  localStorage.removeItem(authKey);
  deleteCookies([authKey, "refreshToken"]);
  router.push("/");
  // removeUser();
  router.refresh();
};

export default logoutUser
