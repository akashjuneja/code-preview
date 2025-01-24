// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import { Message, MessageContext } from "@/context/MessageContext";
import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ChatView = () => {
	const { id } = useParams();
	const workspace = useMutation(api.workspace.GetMessage);
	const { message, setMessage } = useContext(MessageContext);
	const [loading, setLoading] = useState(false);
	const { userDetails } = useContext(UserContext);
	const [userInput, setUserInput] = useState<string | undefined>();
	const updateMessagesInDb = useMutation(
		api.workspace.UpdateMessageOfWorkspace
	);
	// useEffect(()=>{
	//     id && getMessages()
	// },[id])
	// console.log(message)
	// const getMessages=async ()=>{
	//     const messagesFromWorkspace=await workspace({
	//         id
	//     })
	//     setMessage(messagesFromWorkspace.message)
	// }

	const onGenerate = async (input: string) => {
		const aiResponse = {
			role: "user",
			content: input,
		};
		setMessage([...message, aiResponse]);
		await updateMessagesInDb({
			workspace: id,
			messages: [...message, aiResponse],
		});
	};

	useEffect(() => {
		if (message?.length > 0) {
			const role = message[message.length - 1].role;
			if (role === "user") {
				GetAIResponse();
			}
		}
	}, [message]);
	console.log(message);
	const GetAIResponse = async () => {
		setLoading(true);

		try {
			const PROMPT =
				JSON.stringify(message[message.length - 1].content) + 
				Prompt.CHAT_PROMPT;
			const result = await axios.post("/api/ai-chat", {
				prompt: PROMPT,
			});
			const generatedResponse = result.data.result;
			const aiResp = {
				role: "ai",
				content: generatedResponse,
			};
			setMessage([...message, aiResp]);

			await updateMessagesInDb({
				workspace: id,
				messages: [...message, aiResp],
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
		//to do
		//remove scrollbar
		//add markdown for better visisblity
	};
	return (
		<div className="flex flex-col gap-2 h-[82vh]">
			{" "}
			{/* Main container using flexbox */}
			<div className="flex flex-col flex-1 gap-2 overflow-y-auto">
				{" "}
				{/* Messages container, scrollable */}
				{message.map((msg: Message, idx) => (
					<div
						className="flex gap-4 p-4 rounded-md leading-7"
						style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
						key={idx}
					>
						<div>
							{msg.role === "user" && (
								<Image
									src={userDetails?.photo}
									alt="user-photo"
									height={35}
									width={35}
									className="rounded-full"
								/>
							)}
						</div>
						<div>{msg.content}</div>
					</div>
				))}
				{loading && (
					<div
						className="flex gap-4 p-4 rounded-md"
						style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
					>
						<Loader2Icon className="animate-spin" />
						<div>Generating content</div>
					</div>
				)}
			</div>
			{/* Text input at the bottom */}
			<div
				className="p-5 rounded-xl border max-w-xl w-full mb-4"
				style={{ background: Colors.BACKGROUND }}
			>
				<div className="flex gap-2  border-1">
					<textarea
						placeholder={Lookup.INPUT_PLACEHOLDER}
						className="h-18 w-full border-none bg-transparent"
						onChange={(e: any) => {
							setUserInput(e.target.value);
						}}
					/>
					{userInput && (
						<ArrowRight
							className="bg-primary rounded-xl"
							onClick={() => onGenerate(userInput)}
						/>
					)}
				</div>
				<div>
					<Link className="h-5 w-5" />
				</div>
			</div>
		</div>
	);
};

export default ChatView;
