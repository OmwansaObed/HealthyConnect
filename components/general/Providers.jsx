"use client";
import { store, persistor } from "../../redux/persistStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthSessionProvider from "./AuthSessionProvider";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthSessionProvider>
          <Toaster />
          {children}
        </AuthSessionProvider>
      </PersistGate>
    </Provider>
  );
}
