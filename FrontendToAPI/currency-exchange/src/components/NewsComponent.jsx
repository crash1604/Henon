import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaList } from "react-icons/fa";
import { BiGridAlt } from "react-icons/bi";

const NewsComponent = () => {
    const [articles, setArticles] = useState([]);
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=')
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error('Error fetching the news:', error));
  }, []);

  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'cards' ? 'list' : 'cards');
  };

  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Top Headlines</h1>
        <label className="inline-flex items-center cursor-pointer">
        <div className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 px-3">
            {viewMode==='list'?<FaList />:<BiGridAlt />}
        </div>
          <input 
            type="checkbox" 
            value="" 
            className="sr-only peer" 
            onChange={toggleViewMode} 
            checked={viewMode === 'list'}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-700"></div>
        </label>
      </div>
      
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-3xl">
          {articles.map((article, index) => (
            <div key={index} className="bg-white shadow-2xl rounded-3xl p-4">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-2" />}
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-2">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index} className="mb-4 shadow-md rounded-3xl">
              <div className="flex items-start">
                <img 
                  src={article.urlToImage || placeholderImage} 
                  alt={article.title} 
                  className="w-24 h-24 object-cover rounded-lg mr-4" 
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-700 mb-2">{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsComponent;