import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const Preview: React.FC = () => {
  const { config } = useStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    // Debounce updates to prevent flickering/reloading
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument;

        if (doc) {
          // We need to load the widget script. 
          // In dev mode, we point to the public file using the current origin.
          const widgetScriptSrc = window.location.origin + '/chat-widget.js';

          const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body { margin: 0; background: transparent; }
            </style>
          </head>
          <body>
            <script>
              window.ChatWidgetConfig = ${JSON.stringify(config)};
            </script>
            <script src="${widgetScriptSrc}"></script>
          </body>
        </html>
      `;
          doc.open();
          doc.write(html);
          doc.close();
        }
      }
    }, 800); // 800ms debounce

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [config]);

  return (
    <div className="w-full h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-sm border border-gray-100 text-xs font-medium text-gray-500 z-10">
        Live Preview
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-full border-none"
        title="Widget Preview"
      />
    </div>
  );
};
