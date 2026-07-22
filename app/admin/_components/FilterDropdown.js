"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "w-44",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2.5 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition hover:border-[#00aeef] focus:border-[#00aeef] cursor-pointer"
      >
        <span className="flex items-center gap-2.5 truncate">
          {selectedOption?.icon && (
            <span className="flex-shrink-0 text-slate-500">{selectedOption.icon}</span>
          )}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-[220px] rounded-3xl bg-white p-2.5 shadow-xl border border-slate-100 ring-1 ring-slate-200/50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
            {options.map((opt, idx) => {
              const isOptionSelected = opt.value === value;
              return (
                <div key={opt.value}>
                  {opt.hasSeparator && idx > 0 && (
                    <div className="my-1.5 h-px bg-slate-100" />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold rounded-2xl transition cursor-pointer text-left ${
                      isOptionSelected
                        ? "bg-slate-50 text-[#00aeef]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      {opt.icon && (
                        <span className={`flex-shrink-0 ${isOptionSelected ? "text-[#00aeef]" : "text-slate-400"}`}>
                          {opt.icon}
                        </span>
                      )}
                      <span className="truncate">{opt.label}</span>
                    </span>
                    {opt.badge !== undefined && opt.badge !== null && (
                      <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${opt.badgeColor || "bg-slate-100 text-slate-600"}`}>
                        {opt.badge}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
