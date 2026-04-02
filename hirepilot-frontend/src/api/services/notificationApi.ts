import { delay } from "../mockUtils";
import { notificationsData, type Notification } from "../../data/notificationsData";

export const NOTIFICATION_SERVICE = {
    fetchNotifications: async (): Promise<Notification[]> => {
        await delay(1000);
        return [...notificationsData];
    },
    markAsRead: async (id: string): Promise<boolean> => {
        await delay(500);
        console.log(`Mock API: Marking notification ${id} as read`);
        return true;
    },
    markAllAsRead: async (): Promise<boolean> => {
        await delay(800);
        console.log('Mock API: Marking all notifications as read');
        return true;
    },
    deleteNotification: async (id: string): Promise<boolean> => {
        await delay(600);
        console.log(`Mock API: Deleting notification ${id}`);
        return true;
    },
    clearAll: async (): Promise<boolean> => {
        await delay(1000);
        console.log('Mock API: Clearing all notifications');
        return true;
    }
};
