import React from "react"
import { cn } from "../../utils/cn"

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Label.displayName = "Label"

export { Label }
