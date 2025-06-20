"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "../../utils/cn"

const Popover = ({ children }) => {
  return <div className="relative">{children}</div>
}

const PopoverTrigger = ({ asChild, children, ...props }) => {
  const Comp = asChild ? React.Children.only(children).type : "button"
  return <Comp {...props}>{children}</Comp>
}

const PopoverContent = ({ className, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setIsOpen(true)

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
