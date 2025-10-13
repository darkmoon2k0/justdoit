import {DateOptions} from '@/lib/type/task';
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from 'react';
import { Button } from './ui/button';
export const DateTimeFilter = ({dateQuery, setDateQuery
}: {
  dateQuery: string;
  setDateQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} size={"lg"} className="">
          {dateQuery ? DateOptions.find((option) => option.value === dateQuery)?.label : DateOptions[0].label}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {DateOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    setDateQuery(currentValue);
                  }}
                >
                  <CheckIcon className={cn("mr-2 h-4 w-4", dateQuery === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};



