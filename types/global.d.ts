/** @format */

declare global {
  interface Window {
    ktt10: {
      setup: (config: {
        id: string;
        accountId: string;
        color?: string;
      }) => string;
    };
  }
}

export {};
