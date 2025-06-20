"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

const Select = ({ children, onValueChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue || "")

  const handleSelect = (value) => {
    setSelectedValue(value)
    onValueChange && onValueChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} value={selectedValue} />
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) => {
            if (child.type === SelectItem) {
              return React.cloneElement(child, {
                onSelect: () => handleSelect(child.props.value),
              })
            }
            return child
          })}
        </SelectContent>
      )}
    </div>
  )
}

const SelectTrigger = ({ onClick, value, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>{value ? children : children || "Select an option"}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

const SelectContent = ({ children }) => {
  return (
    <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 w-full mt-1">
      <div className="p-1">{children}</div>
    </div>
  )
}

const SelectItem = ({ children, value, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      {children}
    </div>
  )
}

const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
