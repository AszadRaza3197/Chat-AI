import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Effect } from "./effect.js";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [conversations, setConversations] = useState([]);

  const handleAskMe = async () => {
    if (!input) {
      return;
    }

    const newConversation = {
      question: input,
      answer: data,
      loading: true,
    };
    setConversations([...conversations, newConversation]);
    setInput("");

    // const url = `${process.env.REACT_APP_GEMINI_URL}?key=${process.env.REACT_APP_API_KEY}`;
    const url = ` https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=
 AIzaSyCv9RjQLGYDH8E4mmi8WlWlqjW8fmFLdoU`;
    // console.log(url);

    const answer = await axios({
      url,
      method: "POST",

      data: {
        contents: [{ parts: [{ text: input }] }],
      },
    });
    const response =
      answer["data"]["candidates"][0]["content"]["parts"][0]["text"];
    setData(response);

    setConversations((prevConversations) => {
      const updatedConversations = [...prevConversations]; //store multiple chats

      const lastConversation =
        updatedConversations[updatedConversations.length - 1]; //store last chats and this keys , answer, question,loading

      lastConversation.answer = response;
      lastConversation.loading = false;

      return updatedConversations;
    });
  };

  const buttonRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <div className=" text-lg text-slate-50 h-screen flex flex-col  opacity-80 bg-cyan-950">
      <div className=" m-auto w-full  px-4 md:w-10/12 h-3/4 overflow-y-scroll hide-scrollbar mb-40 mt-2  border-2 rounded-md">
        {!data && (
          <h1 className="text-sm md:text-2xl font-bold">
            Hi, I'm Your AI,<br></br>
            <span className=" text-xl md:text-5xl font-bold">
              How can I help you ☻
            </span>
          </h1>
        )}

        {conversations.map((conversation, index) => (
          <div key={index} className="mb-4">
            <p className=" text-lg font-bold text-green-400 ">
              You: {conversation.question}
            </p>
            {conversation.loading ? (
              <Effect />
            ) : (
              <ReactMarkdown>{conversation.answer}</ReactMarkdown>
            )}
          </div>
        ))}

        <div className="h-14 flex fixed bottom-10 left-0 right-0 w-full md:left-20 md:right-20 md:w-auto p-2 bg-cyan-900 rounded-md">
          <input
            type="text"
            className="w-full p-2 pl-10 text-sm text-slate-50  bg-cyan-900"
            placeholder="Type your question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className=" bg-cyan-900 border-2 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={handleAskMe}
            ref={buttonRef}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
