"use client";
import { Provider } from "react-redux";
import store from "../../redux/store";
import AuthSessionProvider from "./AuthSessionProvider";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthSessionProvider>
        <Toaster />
        {children}
      </AuthSessionProvider>
    </Provider>
  );
}
