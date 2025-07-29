"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NotificationType = "success" | "error" | "info";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  notifications: Notification[];
  showNotification: (message: string, type: NotificationType) => void;
  dismissNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, dismissNotification }}
    >
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded shadow-md ${
              notification.type === "success"
                ? "bg-green-500"
                : notification.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            } text-white flex justify-between items-center`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
