
import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, getToken } from "../services/AuthService";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Opcional: decodificar token para obter dados do usuário
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser({ token: data.token });
    return data;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated,
        getToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
