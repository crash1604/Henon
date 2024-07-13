import React from 'react'
import NewsComponent from './NewsComponent'

export default function News() {
  return (
    <div className="bg-white p-4 mt-2 h-full rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">NEWS</h2>
      <NewsComponent />
    </div>
  )
}
