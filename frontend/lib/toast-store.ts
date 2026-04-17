export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

type Listener = (toasts: Toast[]) => void;

class ToastManager {
    private toasts: Toast[] = [];
    private listeners: Listener[] = [];

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notify() {
        this.listeners.forEach((listener) => listener([...this.toasts]));
    }

    addToast(type: ToastType, message: string, duration = 5000) {
        const id = Math.random().toString(36).substring(2, 9);
        this.toasts.push({ id, type, message, duration });
        this.notify();

        if (duration !== Infinity) {
            setTimeout(() => {
                this.removeToast(id);
            }, duration);
        }
    }

    removeToast(id: string) {
        this.toasts = this.toasts.filter((t) => t.id !== id);
        this.notify();
    }

    getToasts() {
        return this.toasts;
    }
}

export const toastManager = new ToastManager();

export const toast = {
    success: (message: string, duration?: number) =>
        toastManager.addToast("success", message, duration),
    error: (message: string, duration?: number) =>
        toastManager.addToast("error", message, duration),
    info: (message: string, duration?: number) =>
        toastManager.addToast("info", message, duration),
    warning: (message: string, duration?: number) =>
        toastManager.addToast("warning", message, duration),
    custom: (type: ToastType, message: string, duration?: number) =>
        toastManager.addToast(type, message, duration),
};
