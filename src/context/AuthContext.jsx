/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { localDb, obfuscatePassword, createId } from "../lib/localDb";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localDb.getSession());
  const loading = false;

  // This persists per browser only: clearing site data or changing devices loses the account.
  // It keeps the portfolio demo interactive without pretending to be production auth.
  const register = (name, email, password) => {
    const users = localDb.getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((item) => item.email === normalizedEmail))
      throw new Error("An account with this email already exists.");
    const newUser = {
      id: createId("user"),
      name: name.trim(),
      email: normalizedEmail,
      password: obfuscatePassword(password),
      phone: "",
      address: {},
      createdAt: new Date().toISOString(),
    };
    localDb.saveUsers([...users, newUser]);
    localDb.saveSession(newUser);
    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = localDb
      .getUsers()
      .find((item) => item.email === normalizedEmail);
    if (!found) throw new Error("No account found with this email.");
    if (found.password !== obfuscatePassword(password))
      throw new Error("Wrong password.");
    localDb.saveSession(found);
    setUser(found);
    return found;
  };

  const updateProfile = (updates) => {
    if (!user) return null;
    const updated = { ...user, ...updates };
    localDb.saveUsers(
      localDb.getUsers().map((item) => (item.id === user.id ? updated : item)),
    );
    localDb.saveSession(updated);
    setUser(updated);
    return updated;
  };

  const changePassword = (password) =>
    updateProfile({ password: obfuscatePassword(password) });
  const logout = () => {
    localDb.clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
