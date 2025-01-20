import React, { createContext, useState } from 'react';

export interface Message {
    role: string;
    content: string;
}

export interface MessageContextType {
    message: Message[];
    setMessage: (newMessage: Message[]) => void; // Change here
}

const defaultContextValue: MessageContextType = {
    message: [],
    setMessage: () => {},
};

export const MessageContext = createContext<MessageContextType>(defaultContextValue);