"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useState } from "react";
import TextAreaAutosize from "react-textarea-autosize"
import { Button } from "./ui/button";
import { ArrowUp, Paperclip, Square } from "lucide-react";
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
        <form onSubmit={handleSubmit} className="mb-2 flex flex-col mt-auto ">
            {
                error !==undefined && (
                    <div>
                        An unexpected error has occured
                        </div>
                )
            }
            <div className="shadow-md rounded-2xl border">
              <div className="flex items-center">  {children}</div>
              <TextAreaAutosize 
              autoFocus={true} 
              minRows={1} 
              maxRows={5} 
              className="text-normal px-3 resize-none ring-0 bg-inherit w-full outline-none"
              required={true}
              placeholder="describe your app imagination"
              onChange={handleInputChange}
              ></TextAreaAutosize>
                 <div className="flex p-3 gap-2 items-center">
          <input
            type="file"
            id="multimodal"
            accept="image/*"
            multiple={true}
            className="hidden"
            onChange={()=>{}}
          />
          <div className="flex items-center flex-1 gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    disabled={false}
                    type="button"
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-xl h-10 w-10"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("multimodal")?.click();
                    }}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add attachments</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
          </div>
          <div>
            {!isLoading ? (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      variant={"default"}
                      size={"icon"}
                      className="rounded-xl h-10 w-10"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      className="rounded-xl h-10 w-10"
                      onClick={(e) => {
                        e.preventDefault();
                        stop();
                      }}
                    >
                      <Square className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Stop generation</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          </div>
         
                </div>
        </form>
    )
}

