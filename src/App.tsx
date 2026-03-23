import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Gamepad2, Home, Leaf, Recycle, Trash2, AlertTriangle, CheckCircle2, XCircle, ArrowRight, RotateCcw, History, Calendar, User } from 'lucide-react';
import { wasteKnowledgeData, quizQuestions } from './data';
import { BinColor } from './types';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'quiz' | 'history'>('home');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-green-600 p-2 rounded-lg text-white">
              <Recycle size={24} />
            </div>
            <h1 className="text-xl font-bold text-green-800">EcoSort</h1>
          </div>
          <nav className="flex gap-1 sm:gap-4">
            <NavButton 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')} 
              icon={<Home size={18} />} 
              label="หน้าแรก" 
            />
            <NavButton 
              active={activeTab === 'learn'} 
              onClick={() => setActiveTab('learn')} 
              icon={<BookOpen size={18} />} 
              label="เรียนรู้" 
            />
            <NavButton 
              active={activeTab === 'quiz'} 
              onClick={() => setActiveTab('quiz')} 
              icon={<Gamepad2 size={18} />} 
              label="แบบฝึกหัด" 
            />
            <NavButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')} 
              icon={<History size={18} />} 
              label="ประวัติ" 
            />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeSection key="home" onNavigate={setActiveTab} />}
          {activeTab === 'learn' && <LearnSection key="learn" onNavigate={setActiveTab} />}
          {activeTab === 'quiz' && <QuizSection key="quiz" onNavigate={setActiveTab} />}
          {activeTab === 'history' && <HistorySection key="history" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'bg-green-100 text-green-800' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function HomeSection({ onNavigate }: { onNavigate: (tab: 'learn' | 'quiz') => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center text-center py-12 sm:py-20"
    >
      <div className="bg-green-100 p-6 rounded-full mb-8 text-green-600">
        <Recycle size={80} />
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold text-green-900 mb-6">
        มาเรียนรู้การคัดแยกขยะกันเถอะ!
      </h2>
      <p className="text-lg sm:text-xl text-green-700 max-w-2xl mb-12">
        การแยกขยะอย่างถูกต้องช่วยลดปริมาณขยะที่ต้องนำไปกำจัด 
        ลดมลพิษ และรักษาสิ่งแวดล้อมให้น่าอยู่สำหรับทุกคน
      </p>
      
      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={() => onNavigate('learn')}
          className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-green-100 transition-all group"
        >
          <div className="bg-blue-50 p-4 rounded-full text-blue-500 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">1. อ่านความรู้เบื้องต้น</h3>
          <p className="text-gray-600 text-sm">รู้จักถังขยะ 4 สี และประเภทของขยะต่างๆ</p>
        </button>

        <button
          onClick={() => onNavigate('quiz')}
          className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-green-100 transition-all group"
        >
          <div className="bg-orange-50 p-4 rounded-full text-orange-500 mb-4 group-hover:scale-110 transition-transform">
            <Gamepad2 size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">2. ทำแบบฝึกหัด</h3>
          <p className="text-gray-600 text-sm">ทดสอบความเข้าใจด้วยเกมแยกขยะแสนสนุก</p>
        </button>
      </div>
    </motion.div>
  );
}

function LearnSection({ onNavigate }: { onNavigate: (tab: 'quiz') => void }) {
  const getIcon = (type: string) => {
    switch(type) {
      case 'leaf': return <Leaf size={32} />;
      case 'recycle': return <Recycle size={32} />;
      case 'trash': return <Trash2 size={32} />;
      case 'alert': return <AlertTriangle size={32} />;
      default: return <Trash2 size={32} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="py-6"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-900 mb-4">ความรู้การคัดแยกขยะเบื้องต้น</h2>
        <p className="text-green-700 max-w-2xl mx-auto">
          ถังขยะในประเทศไทยแบ่งออกเป็น 4 สีหลัก เพื่อให้ง่ายต่อการคัดแยกและนำไปจัดการต่อ
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {wasteKnowledgeData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
          >
            <div className={`${item.bgColor} p-6 flex items-center gap-4 text-white`}>
              <div className="bg-white/20 p-3 rounded-full">
                {getIcon(item.iconType)}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
            </div>
            <div className={`w-full h-48 ${item.imageBgColor} border-b border-gray-100 overflow-hidden flex justify-center items-center`}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-32 h-32 object-contain drop-shadow-md hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-700 mb-6 text-lg">{item.description}</p>
              <div className="mt-auto">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  ตัวอย่างขยะ:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => onNavigate('quiz')}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Gamepad2 size={24} />
          ไปทำแบบฝึกหัดกันเลย
        </button>
      </div>
    </motion.div>
  );
}

function QuizSection({ onNavigate }: { onNavigate: (tab: 'history') => void }) {
  const [playerName, setPlayerName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedBin, setSelectedBin] = useState<BinColor | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const question = quizQuestions[currentQIndex];

  useEffect(() => {
    if (isFinished) {
      const saveScore = async () => {
        setIsSaving(true);
        try {
          const { error } = await supabase
            .from('quiz_scores')
            .insert([{ player_name: playerName || 'ไม่ระบุชื่อ', score, total: quizQuestions.length }]);
          
          if (error) {
            console.error('Error saving score to Supabase:', error);
            setSaveError(error.message);
          }
        } catch (err: any) {
          console.error('Failed to save score:', err);
          setSaveError(err.message || 'Unknown error occurred');
        } finally {
          setIsSaving(false);
        }
      };
      
      saveScore();
    }
  }, [isFinished, score]);

  const handleAnswer = (binColor: BinColor) => {
    if (showFeedback) return;
    
    setSelectedBin(binColor);
    const correct = binColor === question.correctBin;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedBin(null);
    
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQIndex(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedBin(null);
    setIsFinished(false);
    setHasStarted(false);
    setSaveError('');
  };

  if (!hasStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-green-100 text-center mt-10"
      >
        <div className="inline-block bg-green-100 p-4 rounded-full text-green-600 mb-6">
          <User size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ยินดีต้อนรับสู่แบบฝึกหัด</h2>
        <p className="text-gray-600 mb-6">กรุณากรอกชื่อของคุณเพื่อบันทึกคะแนน</p>
        
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="ชื่อของคุณ..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all mb-6 text-center text-lg"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && playerName.trim()) {
              setHasStarted(true);
            }
          }}
        />
        
        <button
          onClick={() => setHasStarted(true)}
          disabled={!playerName.trim()}
          className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
        >
          เริ่มทำแบบฝึกหัด <ArrowRight size={20} />
        </button>
      </motion.div>
    );
  }

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-green-100 text-center mt-10"
      >
        <div className="inline-block bg-green-100 p-6 rounded-full text-green-600 mb-6">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ทำแบบฝึกหัดเสร็จสิ้น!</h2>
        <p className="text-xl text-gray-600 mb-8">
          คุณตอบถูก <span className="text-green-600 font-bold text-3xl mx-2">{score}</span> จาก {quizQuestions.length} ข้อ
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <p className="text-gray-700">
            {score === quizQuestions.length 
              ? 'ยอดเยี่ยมมาก! คุณมีความรู้เรื่องการแยกขยะเป็นอย่างดี' 
              : score >= quizQuestions.length / 2 
                ? 'เก่งมาก! คุณมีความเข้าใจพื้นฐานที่ดี ลองทบทวนอีกนิดนะ' 
                : 'พยายามได้ดี! ลองกลับไปอ่านความรู้เบื้องต้นแล้วมาลองใหม่นะ'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
          >
            <RotateCcw size={20} />
            เล่นอีกครั้ง
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="inline-flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-8 py-4 rounded-full font-bold text-lg transition-colors"
          >
            <History size={20} />
            ดูประวัติคะแนน
          </button>
        </div>
        
        {isSaving && <p className="text-sm text-gray-500 mt-4">กำลังบันทึกคะแนน...</p>}
        {saveError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-left">
            <p className="font-bold flex items-center gap-2"><AlertTriangle size={16} /> บันทึกคะแนนไม่สำเร็จ:</p>
            <p className="mt-1">{saveError}</p>
            <p className="mt-3 text-xs text-red-600 font-semibold">คำแนะนำ: โปรดตรวจสอบว่าได้รันคำสั่ง SQL เพิ่มคอลัมน์ player_name และปิด RLS ใน Supabase แล้ว (ดูคำสั่งในหน้าประวัติ)</p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto py-6"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-green-900">แบบฝึกหัดแยกขยะ</h2>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-green-100 font-medium text-green-700">
          ข้อที่ {currentQIndex + 1} / {quizQuestions.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-8 text-center">
        <h3 className="text-gray-500 font-medium mb-4 uppercase tracking-wider text-sm">ขยะชิ้นนี้คือ...</h3>
        <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10 py-8 bg-gray-50 rounded-2xl border border-gray-100">
          {question.itemName}
        </div>
        
        <h3 className="text-gray-600 font-medium mb-6">ควรทิ้งในถังสีอะไร?</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <BinButton color="green" label="ขยะอินทรีย์" onClick={() => handleAnswer('green')} disabled={showFeedback} selected={selectedBin === 'green'} />
          <BinButton color="yellow" label="ขยะรีไซเคิล" onClick={() => handleAnswer('yellow')} disabled={showFeedback} selected={selectedBin === 'yellow'} />
          <BinButton color="blue" label="ขยะทั่วไป" onClick={() => handleAnswer('blue')} disabled={showFeedback} selected={selectedBin === 'blue'} />
          <BinButton color="red" label="ขยะอันตราย" onClick={() => handleAnswer('red')} disabled={showFeedback} selected={selectedBin === 'red'} />
        </div>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                {isCorrect ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <div className="flex-1">
                <h4 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'ถูกต้อง!' : 'ผิดครับ/ค่ะ'}
                </h4>
                <p className="text-gray-700 mb-6 text-lg">{question.explanation}</p>
                <button
                  onClick={nextQuestion}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${
                    isCorrect 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  ข้อต่อไป <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BinButton({ 
  color, 
  label, 
  onClick, 
  disabled,
  selected
}: { 
  color: BinColor, 
  label: string, 
  onClick: () => void, 
  disabled: boolean,
  selected: boolean
}) {
  const getColors = () => {
    switch(color) {
      case 'green': return 'bg-green-500 hover:bg-green-600 border-green-600';
      case 'yellow': return 'bg-yellow-400 hover:bg-yellow-500 border-yellow-500';
      case 'blue': return 'bg-blue-500 hover:bg-blue-600 border-blue-600';
      case 'red': return 'bg-red-500 hover:bg-red-600 border-red-600';
    }
  };

  const getIcon = () => {
    switch(color) {
      case 'green': return <Leaf size={28} />;
      case 'yellow': return <Recycle size={28} />;
      case 'blue': return <Trash2 size={28} />;
      case 'red': return <AlertTriangle size={28} />;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-b-4 transition-all
        ${getColors()} text-white
        ${disabled && !selected ? 'opacity-50 grayscale cursor-not-allowed' : ''}
        ${selected ? 'scale-105 shadow-lg ring-4 ring-offset-2 ring-gray-300' : 'hover:-translate-y-1 hover:shadow-md'}
      `}
    >
      <div className="bg-white/20 p-3 rounded-full mb-3">
        {getIcon()}
      </div>
      <span className="font-bold text-sm sm:text-base">{label}</span>
    </button>
  );
}

function HistorySection() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quiz_scores')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      setHistory(data || []);
    } catch (err: any) {
      console.error('Error fetching history:', err);
      setError('ไม่สามารถดึงข้อมูลประวัติได้ กรุณาตรวจสอบว่าได้สร้างตาราง "quiz_scores" ใน Supabase แล้ว');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto py-6"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <History size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">ประวัติการทำแบบฝึกหัด</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล</h3>
              <p className="mb-4">{error}</p>
              <div className="bg-white p-4 rounded-xl text-sm font-mono text-gray-800 border border-red-100">
                <p className="font-bold mb-2 text-gray-900">คำแนะนำสำหรับนักพัฒนา:</p>
                <p>โปรดตรวจสอบตารางใน Supabase SQL Editor ด้วยคำสั่งนี้:</p>
                <pre className="mt-2 text-xs overflow-x-auto bg-gray-50 p-3 rounded border border-gray-200">
{`-- 1. สร้างตาราง (หากยังไม่มี)
create table if not exists quiz_scores (
  id uuid default gen_random_uuid() primary key,
  player_name text not null default 'ไม่ระบุชื่อ',
  score integer not null,
  total integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. เพิ่มคอลัมน์ชื่อ (หากเคยสร้างตารางไปแล้วก่อนหน้า)
alter table quiz_scores add column if not exists player_name text not null default 'ไม่ระบุชื่อ';

-- 3. ปิด RLS เพื่อให้แอปบันทึกข้อมูลได้ (สำหรับโหมดทดสอบ)
alter table quiz_scores disable row level security;`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : !error && history.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="inline-block bg-gray-100 p-4 rounded-full text-gray-400 mb-4">
            <Gamepad2 size={48} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">ยังไม่มีประวัติการทำแบบฝึกหัด</h3>
          <p className="text-gray-500">ไปลองทำแบบฝึกหัดเพื่อทดสอบความรู้กันเลย!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const percentage = Math.round((item.score / item.total) * 100);
            const isGood = percentage >= 80;
            const isOk = percentage >= 50 && percentage < 80;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 ${
                    isGood ? 'bg-green-50 text-green-600 border-green-100' : 
                    isOk ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 
                    'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {item.score}/{item.total}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User size={16} className="text-gray-400" />
                      <span className="font-semibold text-gray-700">{item.player_name || 'ไม่ระบุชื่อ'}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {isGood ? 'ยอดเยี่ยม!' : isOk ? 'เก่งมาก!' : 'พยายามได้ดี!'}
                    </h4>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                      <Calendar size={14} />
                      <span>{new Date(item.created_at).toLocaleString('th-TH', { 
                        year: 'numeric', month: 'long', day: 'numeric', 
                        hour: '2-digit', minute: '2-digit' 
                      })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full sm:w-48 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      isGood ? 'bg-green-500' : isOk ? 'bg-yellow-400' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
