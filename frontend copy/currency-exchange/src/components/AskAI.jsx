import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AskAI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([{role:'assistant',content:'Hello! How can I assist you today?'}, {role:'user',content:'This section is disabled but can be used if you pull the code locally and add your own api key'},{role:'assistant',content:'Reason for doing this is to manage cost associated with api subscription'}]);
  const [loading, setLoading] = useState(false);

  // Load conversation from localStorage when the component mounts
  useEffect(() => {
    const storedConversation = localStorage.getItem('conversation');
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  // Save conversation to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('conversation', JSON.stringify(conversation));
  }, [conversation]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newMessage = { role: 'user', content: input };
    const updatedConversation = [...conversation, newMessage];

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: updatedConversation,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `, // Note: Hide this key in production by using environment variables
          },
        }
      );
      const aiMessage = { role: 'assistant', content: result.data.choices[0].message.content };
      setConversation([...updatedConversation, aiMessage]);
      setResponse(aiMessage.content);
      setInput(''); // Clear the input after sending
      localStorage.setItem('conversation', JSON.stringify([...updatedConversation, aiMessage]));
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      setResponse('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center">
      <div className="bg-white p-4 mt-2 rounded-2xl shadow md:w-[750px] sm:w-[250px]">
        <h2 className="text-2xl font-bold mb-4">Ask AI Currency Assistant</h2>
        <div className="space-y-2  overflow-y-auto h-96">
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <p
                className={`${
                  msg.role === 'user' ? 'text-right text-white bg-blue-900' : 'text-left text-black bg-gray-300'
                } p-4 rounded-3xl`}
              >
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed w-5/6 mx-auto bottom-0 right-0 bg-gray-100 text-black p-4 rounded-3xl">
        <form onSubmit={handleSubmit} className="mb-4 flex w-full">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about currency exchange..."
            className="p-2 mb-2 mr-2 border w-5/6 rounded-3xl"
            disabled={loading} // Disable input during loading
          />
          <button type="submit" className="bg-blue-900 text-white py-2 px-4 rounded-3xl" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskAI;
