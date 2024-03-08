import * as Dialog from "@radix-ui/react-dialog"; 
import React from "react";
import { ExpandLess } from "@src/icons/Icons";

type formPopUpProps = {
    onClose: () => void, 
    isOpen: boolean
}

const FormPopUp: React.FC<formPopUpProps> = ({onClose, isOpen}) => {

    return  ( 
        <Dialog.Root open={isOpen} onOpenChange={onClose} >
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay 
                    className=" bg-black bg-opacity-50 z-20 fixed inset-0 "    
                />
                <Dialog.Content
                    className="bg-white rounded-md z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 shadow-lg w-[90vw] "
                >
                    <Dialog.Title>Form Submitted Successfully</Dialog.Title>

                    <Dialog.Description>
                        Thank you for your feedback!
                    </Dialog.Description>

                <Dialog.Close>
                    <ExpandLess />
                </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>


        </Dialog.Root>

    )
}


export default FormPopUp; 