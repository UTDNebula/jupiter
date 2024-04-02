import * as Dialog from '@radix-ui/react-dialog';
import {CloseIcon} from '@src/icons/Icons';
import { CalendarButton } from '@src/icons/Icons';
import googleCalendarIcon from "public/images/google_calendar_icon.png"
import outlookCalendarIcon from "public/images/microsoft-outlook-icon.png";
import Image from 'next/image';
import { type RouterOutputs } from '@src/trpc/shared';

type CalendarPopUpProps = {
    isOpen: boolean, 
    onClose: () => void 
    event: RouterOutputs['event']['findByFilters']['events'][number];
}

const CalendarPopUp: React.FC<CalendarPopUpProps> = ({isOpen, onClose, event}) => {
    const generateGoogleCalendarLink = () => { 
        const startTime  = event.startTime.toISOString().replace(/-|:|\.\d+/g, '');
        const endTime = event.endTime.toISOString().replace(/-|:|\.\d+/g, '');
        const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.name}&dates=${startTime}/${endTime}&details=${event.description}&location=${event.location}`;
    
        window.open(googleCalendarLink, '_blank');
    }
    
    const generateOutlookCalendarLink = () => { 
        const startTime  = event.startTime.toISOString().split('.')[0] + "Z";
        const endTime   = event.endTime.toISOString().split('.')[0] + "Z";
  
        const outlookCalendarLink = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${event.name}&startdt=${startTime}&enddt=${endTime}&location=${event.location}&body=${event.description}`;
        window.open(outlookCalendarLink, '_blank');
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-50" />
                <Dialog.Content className="fixed inset-0 z-20 h-1/3 w-1/2 max-w-screen-sm transform self-center justify-self-center rounded-md bg-white p-10 text-center shadow-lg">
                    <Dialog.Title className="mt-4 border-b-2 border-slate-200 pb-4 text-center font-bold text-slate-700 md:text-4xl">
                        Add to Calendar
                    </Dialog.Title>

                    <Dialog.Description className="mt-8 md:mt-8 md:font-semibold flex justify-center space-x-6">
                        <button className="relative z-10 cursor-pointer shadow-md" onClick={ generateGoogleCalendarLink }  >
                            <Image 
                                src={googleCalendarIcon} 
                                alt="Google Calendar Icon" 
                                width={50} 
                                height={50} 
                            /> 
                        </button>
                        <button className="relative z-10 cursor-pointer shadow-md" onClick={ generateOutlookCalendarLink } >
                            <Image 
                                src={outlookCalendarIcon} 
                                alt="Outlook Calendar Icon" 
                                width={50}
                                height={50}
                            />
                        </button>
                    </Dialog.Description>

                    <Dialog.Close className="absolute right-0 top-0 z-50 m-2" onClick={onClose}>
                        <CloseIcon />
                    </Dialog.Close>

                    <div className="absolute inset-0 flex justify-center">
                        <div className="absolute -top-16 flex h-24 w-24 transform items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                            <div >
                                <CalendarButton />
                            </div>
                        </div>
                    </div>


                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )


}


export default CalendarPopUp;