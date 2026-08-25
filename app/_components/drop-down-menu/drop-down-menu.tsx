/** @format */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FontSizeController from "../font-size-slider/font-size-slider";
import { Eye } from "lucide-react";

export function DropdownMenuEye() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Eye size={30} className='hover:cursor-pointer text-blue-500' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-auto' align='start'>
        <FontSizeController />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
