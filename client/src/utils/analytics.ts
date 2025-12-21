// Analytics utility for tracking user interactions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Add your analytics service here (Google Analytics, Mixpanel, etc.)
    console.log('Track Event:', eventName, properties);
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page: pageName });
};

export const trackToolUsage = (toolName: string) => {
  trackEvent('tool_used', { tool: toolName });
};

export const trackFileUpload = (fileType: string, fileSize: number) => {
  trackEvent('file_uploaded', { type: fileType, size: fileSize });
};

export const trackConversion = (fromType: string, toType: string, success: boolean) => {
  trackEvent('conversion', { from: fromType, to: toType, success });
};