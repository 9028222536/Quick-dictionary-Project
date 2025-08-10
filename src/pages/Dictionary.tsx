import React, { useState } from 'react';
import { Volume2, Info, BookOpen, History } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dictionary() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const searchWord = async () => {
    if (!word.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      setResult(data[0]);
      setSearchHistory(prev => [word, ...prev].slice(0, 10));
      setShowInstructions(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch word definition');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleHistoryClick = (historyWord: string) => {
    setWord(historyWord);
    searchWord();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dictionary</h1>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Info className="w-5 h-5 mr-1" />
            How to Use
          </button>
        </div>

        {showInstructions && (
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">How to Use the Dictionary</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Type any English word in the search box</li>
              <li>Click the search button or press Enter to get the definition</li>
              <li>Use the speaker icon to hear the pronunciation</li>
              <li>View multiple meanings and examples</li>
              <li>Access your recent searches from the history</li>
            </ul>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Word definitions and meanings</li>
                <li>Parts of speech classification</li>
                <li>Example sentences</li>
                <li>Audio pronunciation</li>
                <li>Search history tracking</li>
                <li>Phonetic spelling</li>
              </ul>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchWord()}
                  placeholder="Enter a word..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={searchWord}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {result && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold">{result.word}</h2>
                    {result.phonetic && (
                      <p className="text-gray-600">{result.phonetic}</p>
                    )}
                  </div>
                  <button
                    onClick={() => speakWord(result.word)}
                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {result.meanings.map((meaning: any, index: number) => (
                    <div key={index} className="border-t pt-4">
                      <h3 className="text-xl font-semibold text-blue-600 mb-3">
                        {meaning.partOfSpeech}
                      </h3>
                      <div className="space-y-4">
                        {meaning.definitions.map((def: any, defIndex: number) => (
                          <div key={defIndex} className="pl-4 border-l-2 border-gray-200">
                            <p className="text-gray-800 mb-2">{def.definition}</p>
                            {def.example && (
                              <p className="text-gray-600 italic">
                                Example: "{def.example}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      {meaning.synonyms.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700">
                            Synonyms: {meaning.synonyms.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            {searchHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center mb-3">
                  <History className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((historyWord, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(historyWord)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {historyWord}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}