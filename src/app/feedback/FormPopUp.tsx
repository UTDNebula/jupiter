import * as Dialog from "@radix-ui/react-dialog"; 
import React from "react";
import { CloseIcon } from "@src/icons/Icons";
import { CheckIcon } from "@src/icons/Icons";

type formPopUpProps = {
    onClose: () => void, 
    isOpen: boolean
}

const FormPopUp: React.FC<formPopUpProps> = ({onClose, isOpen}) => {

    return  ( 
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal >

                <Dialog.Overlay className=" bg-black bg-opacity-50 z-20 fixed inset-0 " />
                <Dialog.Content className=" bg-white fixed inset-0 rounded-md z-20 transform  p-10 shadow-lg w-1/2 h-1/3 max-w-screen-sm justify-self-center self-center text-center" >
                    <Dialog.Title
                        className=" md:text-4xl font-bold text-center mt-4 pb-4 border-b-2 border-slate-200 text-slate-700"
                    >
                        Form Submitted
                    </Dialog.Title>

                    <Dialog.Description
                        className=" md:font-semibold mt-8 md:mt-16"
                    >
                        Thank you for your feedback!
                    </Dialog.Description>

                <Dialog.Close className="absolute top-0 right-0 m-2 z-50" onClick={onClose}>
                    <CloseIcon />
                </Dialog.Close>

                <div className="absolute inset-0 flex justify-center ">
                    <div className="w-24 h-24 bg-blue-500 rounded-full text-white flex justify-center items-center transform rotate-12 shadow-lg absolute -top-16">
                        <CheckIcon /> 
                    </div>
                </div>
                </Dialog.Content>
            </Dialog.Portal>


        </Dialog.Root>

    )
}


export default FormPopUp; 