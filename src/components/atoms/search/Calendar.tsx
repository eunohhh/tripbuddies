// 'use client';

// import { useState } from 'react';
// import { RangeCalendar } from '@nextui-org/calendar';
// import { today, getLocalTimeZone } from '@internationalized/date';

<<<<<<< HEAD
// const Calendar = () => {
//     let [value, setValue] = useState({
//         start: today(getLocalTimeZone()),
//         end: today(getLocalTimeZone()).add({ weeks: 1 }),
//     });
//     console.log(value);
=======
const Calendar = () => {
    let [value, setValue] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
    });
    // console.log(value);
>>>>>>> 15f4d206d294e2e6f9e435eb75279aeee03961d7

//     return (
//         <div className="w-full flex justify-center mb-16 mt-12">
//             <RangeCalendar
//                 aria-label="Date (Controlled Focused Value)"
//                 value={value}
//                 onChange={setValue}
//             />
//         </div>
//     );
// };

// export default Calendar;
