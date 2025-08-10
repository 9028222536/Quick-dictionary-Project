import React, { useState } from 'react';
import { ArrowRightLeft, Volume2, Copy, History, Star, Info, Languages } from 'lucide-react';
import toast from 'react-hot-toast';

const LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi'
};

// Language codes for text-to-speech
const LANGUAGE_CODES = {
  en: 'en-US',
  hi: 'hi-IN',
  mr: 'mr-IN'
};

export default function Translator() {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ text: string; translation: string; from: string; to: string }>>([]);
  const [favorites, setFavorites] = useState<Array<{ text: string; translation: string; from: string; to: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      // Using MyMemory Translation API
      const encodedText = encodeURIComponent(text);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLang}|${toLang}`
      );

      const data = await response.json();
      
      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || 'Translation failed');
      }

      const translatedText = data.responseData.translatedText;
      setTranslation(translatedText);
      
      // Add to history
      setHistory(prev => [{
        text,
        translation: translatedText,
        from: fromLang,
        to: toLang
      }, ...prev].slice(0, 10));
      
      setShowInstructions(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to translate');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setText(translation);
    setTranslation(text);
  };

  const speakText = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_CODES[lang as keyof typeof LANGUAGE_CODES];
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const addToFavorites = () => {
    if (text && translation) {
      const newFavorite = {
        text,
        translation,
        from: fromLang,
        to: toLang
      };
      
      if (!favorites.some(f => f.text === text && f.translation === translation)) {
        setFavorites(prev => [newFavorite, ...prev]);
        toast.success('Added to favorites!');
      } else {
        toast.error('Already in favorites!');
      }
    }
  };

  const useFromHistory = (item: { text: string; translation: string; from: string; to: string }) => {
    setText(item.text);
    setTranslation(item.translation);
    setFromLang(item.from);
    setToLang(item.to);
    setShowHistory(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Translator</h1>
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
            <h2 className="text-xl font-semibold mb-4">How to Use the Translator</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Select your source and target languages</li>
              <li>Type or paste your text in the left box</li>
              <li>Click the translate button to get the translation</li>
              <li>Use the speaker icons to hear the pronunciation</li>
              <li>Save translations to favorites for quick access</li>
              <li>View your translation history</li>
            </ul>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Support for English, Hindi, and Marathi</li>
                <li>Text-to-speech pronunciation</li>
                <li>Copy to clipboard functionality</li>
                <li>Translation history</li>
                <li>Favorite translations</li>
                <li>Language swap</li>
                <li>Powered by MyMemory Translation API</li>
              </ul>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Languages className="w-5 h-5 mr-2 text-blue-600" />
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              >
                {Object.entries(LANGUAGES).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {text && (
                  <>
                    <button
                      onClick={() => speakText(text, fromLang)}
                      className="p-2 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow-lg"
                      title="Listen"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(text)}
                      className="p-2 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow-lg"
                      title="Copy"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              >
                {Object.entries(LANGUAGES).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
              <button
                onClick={swapLanguages}
                className="ml-2 p-2 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow-lg"
                title="Swap languages"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <textarea
                value={translation}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {translation && (
                  <>
                    <button
                      onClick={() => speakText(translation, toLang)}
                      className="p-2 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow-lg"
                      title="Listen"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translation)}
                      className="p-2 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow-lg"
                      title="Copy"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={addToFavorites}
                      className="p-2 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow-lg"
                      title="Add to favorites"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={translate}
            disabled={loading || !text.trim()}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
            <History className="w-5 h-5 mr-2" />
            History
          </button>
        </div>

        {showHistory && (history.length > 0 || favorites.length > 0) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {history.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Translations</h2>
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => useFromHistory(item)}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{LANGUAGES[item.from as keyof typeof LANGUAGES]} → {LANGUAGES[item.to as keyof typeof LANGUAGES]}</span>
                      </div>
                      <p className="text-sm font-medium">{item.text}</p>
                      <p className="text-sm text-gray-600">{item.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {favorites.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Favorites</h2>
                <div className="space-y-3">
                  {favorites.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => useFromHistory(item)}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{LANGUAGES[item.from as keyof typeof LANGUAGES]} → {LANGUAGES[item.to as keyof typeof LANGUAGES]}</span>
                      </div>
                      <p className="text-sm font-medium">{item.text}</p>
                      <p className="text-sm text-gray-600">{item.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}