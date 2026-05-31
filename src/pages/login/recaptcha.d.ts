declare global {
    interface Window {
        grecaptcha: {
            enterprise: {
                ready: (callback: () => void) => void;
                render: (container: HTMLElement, options: object) => number;
                getResponse: (widgetId?: number) => string;
                reset: (widgetId?: number) => void;
            };
        };
    }
}
export {};