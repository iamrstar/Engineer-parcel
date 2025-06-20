"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../utils/cn"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"

const Calendar = ({ mode = "single", selected, onSelect, disabled, initialFocus = false }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleDateSelect = (day) => {
    if (disabled && disabled(day)) return
    onSelect(day)
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium">{format(currentMonth, "MMMM yyyy")}</div>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 mt-4">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-2 gap-1">
        {days.map((day, dayIdx) => {
          const isSelectedDay = selected && isSameDay(day, selected)
          const isDisabled = disabled && disabled(day)

          return (
            <button
              key={dayIdx}
              onClick={() => handleDateSelect(day)}
              disabled={isDisabled}
              className={cn(
                "h-9 w-9 rounded-md flex items-center justify-center text-sm",
                isToday(day) && "border border-gray-300",
                isSelectedDay && "bg-orange-600 text-white",
                !isSelectedDay && !isDisabled && "hover:bg-gray-100",
                isDisabled && "text-gray-300 cursor-not-allowed",
              )}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
