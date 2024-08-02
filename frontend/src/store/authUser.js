import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLogginIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v2/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || "Signup failed");
    }
  },
  login: async (credentials) => {
    set({ isLogginIn: true });
    try {
      const response = await axios.post("/api/v2/auth/login", credentials);
      set({ user: response.data.user, isLogginIn: false });
      toast.success("User logged in successfully");
    } catch (error) {
      set({ user: null, isLogginIn: false });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v2/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("User logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v2/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      //not using toast.error because this runs repeatedly
    }
  },
}));
