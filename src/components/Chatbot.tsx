import axios from "axios";
import { useState } from "react";

export default function Chatbot() {
  const [, setResponse] = useState<string>("Hi! How can I assist you?");
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
    <>
      <textarea
        aria-label="novel chapter input"
        value={value}
        onChange={onChange}
        id="message"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button onClick={handleSubmit}>Send</button>
    </>
  );
}
