import { getSession } from "next-auth/react";

export const createGoogleCalenderEvent = () => {
    const session = getSession();

    if(!session  ) {
        console.log(session); 
        return 
    }
}