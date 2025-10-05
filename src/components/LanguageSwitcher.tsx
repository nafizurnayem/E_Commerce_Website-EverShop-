'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <GlobeAltIcon className="h-5 w-5 text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'bn')}
        className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  )
}