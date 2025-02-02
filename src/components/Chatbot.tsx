import axios from "axios";
import { useState } from "react";

export default function Chatbot() {
  const [response, setResponse] = useState<string>("Hi! How can I assist you?");
  const [value, setValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:8080/api/chatbot", {
      //TODO: change api route
      question: value,
    });
    setResponse(response.data);
  };
  return (
    <div className="col-span-3">
      <div className="w-full h-full">
        <div className="h-full flex flex-col">
          <div className="grow flex items-end pb-8 p-8 mb-3 text-gray-100 dark:text-gray-100 col-span-full row-span-8 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{response}</p>
          </div>

          <div>
            <textarea
              aria-label="novel chapter input"
              value={value}
              onChange={onChange}
              id="message"
              className=" row-span-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <button
              className="my-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
