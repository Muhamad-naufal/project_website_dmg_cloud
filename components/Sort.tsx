"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { sortTypes } from "@/constant";

const Sort = () => {
  const path = usePathname();
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState(sortTypes[0].value); // Track selected value

  const handleSort = (value: string) => {
    setSelectedSort(value); // Update selected value
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className="sort-select">
        <SelectValue placeholder={selectedSort} /> {/* Show selected value */}
      </SelectTrigger>
      <SelectContent>
        {sortTypes.map((sort) => (
          <SelectItem key={sort.value} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
