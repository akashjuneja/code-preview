import {
    GoogleGenerativeAI,
  } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const codeGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  export const codeGeneration = model.startChat({
    generationConfig:codeGenerationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "create a to do app  'You are a AI Assistant and experience in React Development.\n  GUIDELINES:\n  - Tell user what your are building\n  - response less than 15 lines. \n  - Skip code examples and commentary'\n`,\n\nCODE_GEN_PROMPT:dedent`\nGenerate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   `,\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"projectTitle\": \"To Do App\",\n  \"explanation\": \"This project implements a simple to-do application using React, Tailwind CSS for styling, and Lucide icons. It allows users to add, view, and manage their tasks. It features a clean, user-friendly interface with visually appealing components.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React from 'react';\\nimport TodoList from './components/TodoList';\\nimport './index.css'\\n\\nfunction App() {\\n  return (\\n    <div className=\\\"container mx-auto p-4\\\">\\n      <h1 className=\\\"text-3xl font-bold text-center mb-6\\\">📝 My To-Do List</h1>\\n      <TodoList />\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n\"\n    },\n    \"/components/TodoList.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus, Trash, Edit, Check } from 'lucide-react';\\n\\nfunction TodoList() {\\n  const [todos, setTodos] = useState([]);\\n  const [newTask, setNewTask] = useState('');\\n  const [editTaskIndex, setEditTaskIndex] = useState(null);\\n  const [editTaskValue, setEditTaskValue] = useState('');\\n\\n  const handleAddTask = () => {\\n    if (newTask.trim() !== '') {\\n      setTodos([...todos, { text: newTask, completed: false }]);\\n      setNewTask('');\\n    }\\n  };\\n\\n  const handleRemoveTask = (index) => {\\n    const newTodos = todos.filter((_, i) => i !== index);\\n    setTodos(newTodos);\\n  };\\n\\n  const handleToggleComplete = (index) => {\\n    const newTodos = [...todos];\\n    newTodos[index].completed = !newTodos[index].completed;\\n    setTodos(newTodos);\\n  };\\n\\n  const handleEditTask = (index) => {\\n    setEditTaskIndex(index);\\n    setEditTaskValue(todos[index].text);\\n  };\\n\\n  const handleSaveEdit = (index) => {\\n    const newTodos = [...todos];\\n    newTodos[index].text = editTaskValue;\\n    setTodos(newTodos);\\n    setEditTaskIndex(null);\\n    setEditTaskValue('');\\n  };\\n\\n  return (\\n    <div className=\\\"bg-white shadow-md rounded-lg p-4\\\">\\n      <div className=\\\"flex items-center mb-4\\\">\\n        <input\\n          type=\\\"text\\\"\\n          placeholder=\\\"Add a new task...\\\"\\n          value={newTask}\\n          onChange={(e) => setNewTask(e.target.value)}\\n          className=\\\"border rounded p-2 w-full mr-2 focus:outline-none focus:ring focus:border-blue-300\\\"\\n        />\\n        <button onClick={handleAddTask} className=\\\"bg-blue-500 hover:bg-blue-600 text-white p-2 rounded focus:outline-none\\\">\\n          <Plus className=\\\"h-5 w-5\\\"/>\\n        </button>\\n      </div>\\n      <ul>\\n        {todos.map((todo, index) => (\\n          <li key={index} className=\\\"flex justify-between items-center py-2 border-b last:border-b-0\\\">\\n            <div className=\\\"flex items-center\\\">\\n              <input\\n                type=\\\"checkbox\\\"\\n                checked={todo.completed}\\n                onChange={() => handleToggleComplete(index)}\\n                className=\\\"mr-2 cursor-pointer\\\"\\n              />\\n              {editTaskIndex === index ? (\\n                <input\\n                  type=\\\"text\\\"\\n                  value={editTaskValue}\\n                  onChange={(e) => setEditTaskValue(e.target.value)}\\n                  className=\\\"border rounded p-1 w-full mr-2 focus:outline-none focus:ring focus:border-blue-300\\\"\\n                  onBlur={() => handleSaveEdit(index)}\\n                />\\n              ) : (\\n                <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'} w-full`}>{todo.text}</span>\\n              )}\\n            </div>\\n            <div>\\n              {editTaskIndex !== index && (\\n                <button onClick={() => handleEditTask(index)} className=\\\"text-blue-500 hover:text-blue-600 focus:outline-none mr-2\\\">\\n                  <Edit className=\\\"h-4 w-4\\\"/>\\n                </button>\\n              )}\\n             {editTaskIndex === index && (\\n              <button onClick={() => handleSaveEdit(index)} className=\\\"text-green-500 hover:text-green-600 focus:outline-none mr-2\\\">\\n                <Check className=\\\"h-4 w-4\\\"/>\\n              </button>\\n             )}\\n              <button onClick={() => handleRemoveTask(index)} className=\\\"text-red-500 hover:text-red-600 focus:outline-none\\\">\\n                <Trash className=\\\"h-4 w-4\\\"/>\\n              </button>\\n            </div>\\n          </li>\\n        ))}\\n      </ul>\\n    </div>\\n  );\\n}\\n\\nexport default TodoList;\\n\"\n    },\n        \"/index.css\": {\n      \"code\": \"@tailwind base;\\n@tailwind components;\\n@tailwind utilities;\\n\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/TodoList.js\",\n     \"/index.css\"\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
 