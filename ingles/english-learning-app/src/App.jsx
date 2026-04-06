import { useState } from 'react'
import Navbar from './components/Navbar'
import StoryList from './components/stories/StoryList'
import StoryReader from './components/stories/StoryReader'
import QuoteCard from './components/quotes/QuoteCard'
import WordSetList from './components/words/WordSetList'
import WordLabeler from './components/words/WordLabeler'
import ChatInterface from './components/chatbot/ChatInterface'
import { stories } from './data/stories'
import { wordSets } from './data/words'

export default function App() {
  const [activeTab, setActiveTab] = useState('stories')
  const [selectedStory, setSelectedStory] = useState(null)
  const [selectedWordSet, setSelectedWordSet] = useState(null)

  function handleTabChange(tab) {
    setActiveTab(tab)
    setSelectedStory(null)
    setSelectedWordSet(null)
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="main-content">
        {activeTab === 'stories' && (
          selectedStory
            ? <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />
            : <StoryList stories={stories} onSelect={setSelectedStory} />
        )}
        {activeTab === 'quotes' && <QuoteCard />}
        {activeTab === 'words' && (
          selectedWordSet
            ? <WordLabeler wordSet={selectedWordSet} onBack={() => setSelectedWordSet(null)} />
            : <WordSetList wordSets={wordSets} onSelect={setSelectedWordSet} />
        )}
        {activeTab === 'chat' && <ChatInterface />}
      </main>
    </div>
  )
}
