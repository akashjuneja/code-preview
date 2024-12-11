"use client";

import { AuthDialog } from "@/components/auth-dialog";
import Chat from "@/components/chat";
import { Navbar } from "@/components/navbar";
import { AuthViewType, useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ChatInputComponent } from "@/components/chat-input";
import { ChatPicker } from "@/components/chat-picker";
import modelsList from "@/lib/models.json";
import templates from "@/lib/templates";
 

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in");
  const { session } = useAuth(setOpen, setAuthView);
  const [chatInput, setChatInput] = useLocalStorage("chat", "");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<"auto">("auto");
  const [languageModel, setLanguageModel] = useLocalStorage("languageModel", {
    model: "gpt-4o-mini",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const logout = () => {
    supabase ? supabase.auth.signOut() : null;
  };

  return (
    <main className="flex flex-col max-h-screen justify-between">
      {supabase && (
        <AuthDialog
          open={open}
          onClose={handleOpen}
          supabase={supabase}
          view={authView}
        />
      )}
      <Navbar
        session={session}
        showLogin={() => setOpen(true)}
        signOut={logout}
        onClear={() => {}}
      />
      <div className="grid w-full md:grid-cols-2 h-screen">
        <div className="flex flex-col justify-between content-between	h-screen">
          <Chat />
          <ChatInputComponent
            isLoading={false}
            input={chatInput}
            handleInputChange={() => {}}
            handleSubmit={() => {}}
            handleFileChange={() => {}}
            files={files}
            error={undefined}
            retry={() => {}}
            isMultiModel={false}
            stop={() => {}}
          >
            <ChatPicker models={modelsList.models} templates={templates as any}/>
          </ChatInputComponent>
        </div>
        <div>jk</div>
      </div>
    </main>
  );
}
