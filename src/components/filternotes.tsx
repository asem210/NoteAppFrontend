import React from "react";

interface FilterNotesProps {
  filter: "all" | "active" | "archived";
  onFilterChange: (filterType: "all" | "active" | "archived") => void;
}

const FilterNotes: React.FC<FilterNotesProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded ${filter === "all" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
        onClick={() => onFilterChange("all")}
      >
        All Notes
      </button>
      <button
        className={`px-4 py-2 rounded ${filter === "active" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
        onClick={() => onFilterChange("active")}
      >
        Active Notes
      </button>
      <button
        className={`px-4 py-2 rounded ${filter === "archived" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
        onClick={() => onFilterChange("archived")}
      >
        Archived Notes
      </button>
    </div>
  );
};

export default FilterNotes;
