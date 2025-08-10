import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Languages, GraduationCap, Mail, CheckCircle, Star, Users, Globe, Zap, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Welcome to Quick Dictionary</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your comprehensive language companion for learning English, Hindi, and Marathi. 
          Discover meanings, translate texts, and master grammar with our interactive tools.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Book className="w-8 h-8" />}
          title="Dictionary"
          description="Look up word definitions, synonyms, and examples with text-to-speech support"
        />
        <FeatureCard
          icon={<Languages className="w-8 h-8" />}
          title="Translator"
          description="Translate between English, Hindi, and Marathi with pronunciation guide"
        />
        <FeatureCard
          icon={<GraduationCap className="w-8 h-8" />}
          title="Grammar"
          description="Interactive grammar lessons and quizzes to improve your language skills"
        />
      </section>

      <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Quick Dictionary?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard
            icon={<Globe className="w-6 h-6" />}
            title="Multi-Language Support"
            description="Support for English, Hindi, and Marathi languages with accurate translations"
          />
          <BenefitCard
            icon={<Zap className="w-6 h-6" />}
            title="Instant Results"
            description="Get quick definitions and translations with our fast response system"
          />
          <BenefitCard
            icon={<Star className="w-6 h-6" />}
            title="High Accuracy"
            description="Reliable translations and definitions from trusted sources"
          />
          <BenefitCard
            icon={<Users className="w-6 h-6" />}
            title="User-Friendly"
            description="Clean interface and easy navigation for the best learning experience"
          />
          <BenefitCard
            icon={<CheckCircle className="w-6 h-6" />}
            title="Interactive Learning"
            description="Practice exercises and quizzes to reinforce your learning"
          />
          <BenefitCard
            icon={<Clock className="w-6 h-6" />}
            title="24/7 Availability"
            description="Access our tools anytime, anywhere, on any device"
          />
        </div>
      </section>

      <section className="bg-blue-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureHighlight
            title="Text-to-Speech"
            description="Listen to correct pronunciations in multiple languages"
          />
          <FeatureHighlight
            title="Grammar Quizzes"
            description="Test your knowledge with interactive grammar exercises"
          />
          <FeatureHighlight
            title="Language Detection"
            description="Automatic detection of input language for easier translation"
          />
          <FeatureHighlight
            title="Personal Progress"
            description="Track your learning progress with our quiz system"
          />
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">Have questions or feedback? We'd love to hear from you!</p>
        <a
          href="mailto:abhishekmishra8055142931@gmail.com"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <Mail className="w-5 h-5 mr-2" />
          quickdictionary@gmail.com
        </a>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
      <div className="flex justify-center mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={`/${title.toLowerCase()}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Try Now
      </Link>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-blue-600">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function FeatureHighlight({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}