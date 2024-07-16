import React, { useState } from 'react';
import axios from 'axios';

const AskAI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { role: "user", content: input };
    const updatedConversation = [...conversation, newMessage];

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: updatedConversation
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' 
          }
        }
        
      );
      const aiMessage = { role: "assistant", content: result.data.choices[0].message.content };
      setConversation([...updatedConversation, aiMessage]);
      setResponse(aiMessage.content);
      setInput('');  // Clear the input after sending
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      setResponse('Sorry, something went wrong. Please try again.');
    }
  };

  return (
    <>
    <div className="bg-white p-4 mt-2 md:h-screen rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Ask AI Currency Assistant</h2>

      <div className="space-y-4">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <p className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              {msg.content}
            </p>
          </div>
        ))}
      </div>
    </div>
    <div className="fixed w-5/6 bottom-0 right-0 bg-white text-black p-4 rounded-3xl">
    <form onSubmit={handleSubmit} className="mb-4 flex w-full">
            <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about currency exchange..."
            className=" p-2 mb-2 mr-2 border w-5/6 rounded-3xl"
            />
            <button type="submit" className="bg-blue-900 text-white py-2 px-4 rounded-3xl">
            Send
            </button>
        </form>
    </div>
    </>
  );
};

export default AskAI;
