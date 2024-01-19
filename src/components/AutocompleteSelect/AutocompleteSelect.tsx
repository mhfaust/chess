"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/utils/shadcn"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useMemo } from "react"


type AutocompleteSelectProps<T> = {
  options: T[],
  getLabel: (value: T) => string,
  onSelect: (value: T) => void
}

function AutocompleteSelect<T>({ options, onSelect, getLabel }: AutocompleteSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSeletedValue] = useState('')

  const commandOptions = useMemo(() => options.map(option => ({ 
    option,
    label: getLabel(option), 
    value: getLabel(option).toLowerCase()
  })), [getLabel, options])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? commandOptions.find((option) => option.value === selectedValue)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search framework..." onValueChange={console.log}/>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {commandOptions.map(({ value, option, label }) => {
              return (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(value: string) => {
                    console.log(value)
                    setSeletedValue(value)
                    onSelect(option)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === selectedValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {label}
                </CommandItem>
            )})}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default AutocompleteSelect