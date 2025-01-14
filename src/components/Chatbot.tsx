import { useState } from "react";

export default function Chatbot() {
  const [response, setResponse] = useState<string>("Hi! How can I assist you?");
  const [value, setValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return (
    <div>
      <div className="container">
        <div>
          <input type="text" value={value} onChange={onChange}></input>
        </div>
        <div>
          <button>Send</button>
        </div>
        <div>
          <p>Chatbot:{response}</p>
        </div>
      </div>
    </div>
  );
}
