import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateRangePicker({
  className,
  onChange,
  tripType = "round-trip",
  departureDate,
  returnDate,
}: {
  className?: string;
  onChange?: (dates: { startDate: Date; endDate?: Date }) => void;
  tripType?: "round-trip" | "one-way";
  departureDate: string;
  returnDate?: string;
}) {
  const today = new Date();
  const date = {
    from: departureDate ? new Date(departureDate) : undefined,
    to: returnDate ? new Date(returnDate) : undefined,
  };

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("h-14 justify-start text-left font-normal", !date.from && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to || tripType === "one-way" ? (
                <div className="flex gap-x-4 relative justify-around w-full">
                  <div>{format(date.from, "LLL dd, y")}</div>
                  {tripType === "round-trip" && (
                    <>
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-muted-foreground"></div>
                      <div>{format(date.to as Date, "LLL dd, y")}</div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex gap-x-4 relative justify-around w-full">
                  <div>{format(date.from, "LLL dd, y")}</div>
                  <div className="text-muted-foreground">Select return date</div>
                </div>
              )
            ) : (
              <span className="text-muted-foreground">
                {tripType === "round-trip" ? "Select departure & return" : "Select departure date"}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          {tripType === "round-trip" ? (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date.from}
              selected={date}
              onSelect={(newDate) => {
                if (newDate && onChange) {
                  onChange({
                    startDate: newDate.from as Date,
                    endDate: newDate.to,
                  });
                }
              }}
              numberOfMonths={2}
              disabled={{ before: today }}
            />
          ) : (
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={date.from}
              selected={date.from}
              onSelect={(selectedDate) => {
                if (selectedDate && onChange) {
                  onChange({ startDate: selectedDate });
                }
              }}
              numberOfMonths={2}
              disabled={{ before: today }}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
