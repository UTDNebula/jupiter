"use client"
import { type FC, useEffect, useState } from "react";


const calculateTimeRemaining = (eventStartTime: number) => {
    const timeUntilStart = eventStartTime - Date.now();  


    const timeUntilStartInSeconds = Math.floor( (timeUntilStart % (1000 * 60)) / 1000 );
    const timeUntilStartInMinutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60) );
    const timeUntilStartInHours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) );
    const timeUntilStartInDays = Math.floor( (timeUntilStart / (1000 * 60 * 60 * 24)) );

    return ({
        days: timeUntilStartInDays.toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false}),
        hours: timeUntilStartInHours.toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false}),
        minutes: timeUntilStartInMinutes.toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false}),
        seconds: timeUntilStartInSeconds.toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false}),
    })

}


const CountdownTimer: FC<{eventStartTime: number}> = (eventStartTime) => {
    const startTime = eventStartTime.eventStartTime;

    const [isLoading, setisLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(startTime));

    useEffect( () => {
        if (isLoading) { setisLoading(false); }

        const interval = setInterval( () => {
            setTimeRemaining(calculateTimeRemaining(startTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading, startTime])


    if (isLoading) return 

    return (
        
        <div className="flex font-medium text-gray-600 text-3xl">
            <p className="mr-6">
                {timeRemaining.days}
            </p>
            <p className="mr-9">
                {timeRemaining.hours}
            </p>
            <p className="mr-11">
                {timeRemaining.minutes}
            </p>
            <p>
                {timeRemaining.seconds}
            </p>
        </div>
    )


}

export default CountdownTimer;