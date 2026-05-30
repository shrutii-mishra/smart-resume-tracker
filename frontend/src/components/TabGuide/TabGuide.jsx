import React, { useState } from 'react';

const TabGuide = ({ title, purpose, steps, result }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6 bg-white border border-blue-200 rounded-lg shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-blue-50/50 transition-colors"
        aria-expanded={open}
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold"
          title="How this tab works"
          aria-hidden
        >
          i
        </span>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-gray-900 block">{title}</span>
          <span className="text-sm text-gray-600 mt-0.5 block">{purpose}</span>
        </div>
        <span className="text-gray-500 text-lg leading-none pt-0.5" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-blue-100 bg-blue-50/30">
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 mt-3 ml-11">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="text-sm mt-4 ml-11">
            <span className="font-semibold text-gray-900">What you get: </span>
            <span className="text-gray-700">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TabGuide;
