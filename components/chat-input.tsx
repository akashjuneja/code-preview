"use client";

import { useState } from "react";
import TextAreaAutosize from "react-textarea-autosize"
export const ChatInputComponent=({
    error,
    retry,
    isLoading,
    stop,
    input,
    handleInputChange,
    handleSubmit,
    files,
    handleFileChange,
    children,
    isMultiModel
}:{
    error:undefined|unknown,
    retry:()=>void,
    isLoading:boolean,
    stop:()=>void,
    input:string,
    handleInputChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void,
    handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void
    files:File[]
    handleFileChange:(files:File[])=>void
    children:React.ReactNode
    isMultiModel:boolean
})=>{
    const [value, setValue]=useState<string>(input);
   
    return (
        <form onSubmit={handleSubmit}>
            {
                error !==undefined && (
                    <div>
                        An unexpected error has occured
                        </div>
                )
            }
            <div>
              <div>  {children}</div>
              <TextAreaAutosize 
              autoFocus={true} 
              minRows={1} 
              maxRows={5} 
              className="text-normal px-3 resize-none ring-0 bg-inherit w-full outline-none"
              required={true}
              placeholder="describe your app imagination"
              onChange={handleInputChange}
              ></TextAreaAutosize>
                </div>
        </form>
    )
}

