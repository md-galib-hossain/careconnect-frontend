import { jwtDecode } from "jwt-decode";
interface User {
    email: string;
    role: 'PATIENT' | 'DOCTOR' | 'ADMIN' | 'SUPER_ADMIN'; 
    status: 'ACTIVE' | 'INACTIVE'; 
    id: string;
    isDeleted: boolean;
    iat: number; 
    exp: number; 
  }
  
export const decodedToken = (token: string) : User => {

return jwtDecode(token);
};
