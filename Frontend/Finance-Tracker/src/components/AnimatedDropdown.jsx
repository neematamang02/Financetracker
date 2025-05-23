import { ChevronDown, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AnimatedDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  error,
  // New props for category management
  showAddNew = false,
  onAddNew = null,
  addNewPlaceholder = "Add new item",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const dropdownContentRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Adjust dropdown position if it goes off-screen
  useEffect(() => {
    if (isOpen && dropdownContentRef.current) {
      const rect = dropdownContentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;

      if (spaceBelow < 0) {
        // Not enough space below, position above if there's more space
        if (rect.top > Math.abs(spaceBelow)) {
          dropdownContentRef.current.style.bottom = "100%";
          dropdownContentRef.current.style.top = "auto";
          dropdownContentRef.current.style.maxHeight = `${Math.min(
            rect.top - 10,
            300
          )}px`;
        } else {
          // Still show below but limit height
          dropdownContentRef.current.style.maxHeight = `${spaceBelow - 10}px`;
        }
      }
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleAddNew = async () => {
    if (newItem.trim() && onAddNew) {
      try {
        await onAddNew(newItem.trim());
        setNewItem("");
        toast.success(`"${newItem.trim()}" added successfully!`);
        // Optionally select the newly added item
        onChange(newItem.trim());
        setIsOpen(false);
        setSearchTerm("");
      } catch (error) {
        toast.error("Failed to add new item");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newItem.trim()) {
      e.preventDefault();
      handleAddNew();
    }
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-2 px-3 text-left border rounded-md flex justify-between items-center bg-white transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-200"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={`${value ? "text-gray-900" : "text-gray-500"} truncate`}
        >
          {value || placeholder}
        </span>
        <div
          className={`transition-transform duration-300 ease-in-out flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownContentRef}
          className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-hidden"
          style={{ minWidth: "240px", maxWidth: "100%" }}
        >
          {/* Search Input */}
          <div className="sticky top-0 p-2 border-b border-gray-100 bg-white z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                    option === value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-900"
                  }`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={option === value}
                >
                  <div className="truncate">{option}</div>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                {searchTerm
                  ? `No results found for "${searchTerm}"`
                  : "No options available"}
              </div>
            )}
          </div>

          {/* Add New Section */}
          {showAddNew && (
            <div className="sticky bottom-0 p-2 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={addNewPlaceholder}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddNew}
                  disabled={!newItem.trim()}
                  className="px-3 h-9 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
              {newItem.trim() && (
                <p className="text-xs text-gray-500 mt-1 truncate">
                  Press Enter or click + to add "{newItem}"
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedDropdown;
