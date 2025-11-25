import { format } from "date-fns";
import { useState } from "react";

type CalendarComponentProps = {
    mode: 'single' | 'range';
    selected: Date | null;
    onSelect: (date: Date | null) => void;
    fromYear?: number;
    toYear?: number;
    captionLayout?: 'dropdown' | 'inline';
    onClose?: () => void;
};


export const CalendarComponent = (props: CalendarComponentProps) => {
    const [date, setDate] = useState(props.selected || new Date());

    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate ?? new Date());
        props.onSelect(newDate);
        if (props.onClose) props.onClose(); // Close popover on selection
    };

    // Very simple inline calendar UI (not fully functional shadcn calendar, but provides date picking functionality)
    return (
        <div className="p-3">
            <h4 className="font-semibold mb-2 dark:text-white">Selecciona una fecha</h4>
            <input
                type="date"
                value={date ? format(date, 'yyyy-MM-dd') : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
                className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
            />
        </div>
    );
};