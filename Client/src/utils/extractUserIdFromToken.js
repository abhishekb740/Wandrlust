
import { jwtDecode } from "jwt-decode";

export const extractUserIdFromToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken =jwtDecode(token);

    if (decodedToken && decodedToken.userId) {
      return decodedToken.userId;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
};