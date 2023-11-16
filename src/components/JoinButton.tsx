'use client'
import React from 'react';
import { useState } from 'react';
import { api } from '@src/trpc/react';
import { Session } from 'next-auth';

type JoinButtonProps = {
  session: Session | null;
  isHeader?: boolean;
  isJoined?: boolean;
  clubID: string
};

  const Joinbutton = ({
  isHeader,
  session,
  isJoined,
  clubID
  
  }: JoinButtonProps) => {
    const mutation = api.club.joinLeave.useMutation();
    const clubid = clubID; 
    const [isDisabled, setDisabled] = useState(isJoined??false);
    const handleJoin = () => { 
      mutation.mutate({clubid});
      setDisabled(!isDisabled);
    }
    if(!session){
        return (
          <button 
            className={isHeader ? "rounded-full px-8 py-4 text-xs font-extrabold text-white disabled:bg-slate-700":
            "mr-2 rounded-2xl px-4 py-2 text-xs font-extrabold text-white border-solid disabled:bg-slate-700"
            }
            disabled={true}
          >
            Join
          </button> 
        );
      }
    return (
      <button 
        onClick={handleJoin}
        className={isHeader ? "bg-blue-primary disabled:bg-blue-700 rounded-full  px-8 py-4 text-xs font-extrabold text-white transition-colors hover:bg-blue-700":
        "bg-blue-primary disabled:bg-blue-700 mr-2 rounded-2xl px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-700 "}
        
      >
        {isDisabled ? "Joined" : "Join"}
      </button> 
    );
};


export default Joinbutton;