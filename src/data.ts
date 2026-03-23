import { WasteKnowledge, QuizQuestion } from './types';

export const wasteKnowledgeData: WasteKnowledge[] = [
  {
    id: 'organic',
    color: 'green',
    title: 'ขยะอินทรีย์ (ขยะเปียก)',
    description: 'ขยะที่เน่าเสียและย่อยสลายได้เร็ว สามารถนำไปทำปุ๋ยหมักได้',
    examples: ['เศษอาหาร', 'เปลือกผลไม้', 'พืชผัก', 'ใบไม้', 'เศษเนื้อสัตว์'],
    iconType: 'leaf',
    bgColor: 'bg-green-500',
    textColor: 'text-green-900',
    borderColor: 'border-green-600',
    imageBgColor: 'bg-green-100',
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=organicBin'
  },
  {
    id: 'recycle',
    color: 'yellow',
    title: 'ขยะรีไซเคิล',
    description: 'ขยะที่สามารถนำไปแปรรูปเพื่อนำกลับมาใช้ใหม่ได้',
    examples: ['ขวดพลาสติก', 'แก้ว', 'กระดาษ', 'กระป๋องอลูมิเนียม', 'กล่องกระดาษ'],
    iconType: 'recycle',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    borderColor: 'border-yellow-500',
    imageBgColor: 'bg-yellow-100',
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=recycleBin'
  },
  {
    id: 'general',
    color: 'blue',
    title: 'ขยะทั่วไป',
    description: 'ขยะที่ย่อยสลายยากและไม่คุ้มค่าต่อการนำไปรีไซเคิล',
    examples: ['ซองขนม', 'ถุงพลาสติกเปื้อนอาหาร', 'กล่องโฟม', 'หลอดพลาสติก', 'ทิชชู่ใช้แล้ว'],
    iconType: 'trash',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-600',
    imageBgColor: 'bg-blue-100',
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=generalBin'
  },
  {
    id: 'hazardous',
    color: 'red',
    title: 'ขยะอันตราย',
    description: 'ขยะที่มีสารเคมีปนเปื้อน วัตถุไวไฟ หรือมีพิษ ต้องกำจัดอย่างถูกวิธี',
    examples: ['ถ่านไฟฉาย', 'หลอดไฟ', 'กระป๋องสเปรย์', 'แบตเตอรี่', 'ขวดยาฆ่าแมลง'],
    iconType: 'alert',
    bgColor: 'bg-red-500',
    textColor: 'text-red-900',
    borderColor: 'border-red-600',
    imageBgColor: 'bg-red-100',
    imageUrl: 'https://api.dicebear.com/9.x/bottts/svg?seed=hazardBin'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    itemName: 'เปลือกกล้วย',
    correctBin: 'green',
    explanation: 'เปลือกกล้วยเป็นขยะอินทรีย์ที่ย่อยสลายได้ตามธรรมชาติ สามารถนำไปทำปุ๋ยได้'
  },
  {
    id: 2,
    itemName: 'ขวดน้ำพลาสติก (PET)',
    correctBin: 'yellow',
    explanation: 'ขวดพลาสติกสามารถนำไปหลอมและรีไซเคิลเป็นผลิตภัณฑ์ใหม่ได้'
  },
  {
    id: 3,
    itemName: 'ซองขนมขบเคี้ยว',
    correctBin: 'blue',
    explanation: 'ซองขนมมักทำจากพลาสติกผสมฟอยล์ ซึ่งรีไซเคิลได้ยากและไม่คุ้มค่า จัดเป็นขยะทั่วไป'
  },
  {
    id: 4,
    itemName: 'ถ่านไฟฉายเก่า',
    correctBin: 'red',
    explanation: 'ถ่านไฟฉายมีสารเคมีและโลหะหนักที่เป็นพิษต่อสิ่งแวดล้อม ต้องทิ้งในถังขยะอันตราย'
  },
  {
    id: 5,
    itemName: 'กล่องกระดาษลูกฟูก',
    correctBin: 'yellow',
    explanation: 'กล่องกระดาษสามารถนำไปรีไซเคิลทำเป็นกระดาษใหม่ได้'
  },
  {
    id: 6,
    itemName: 'กล่องโฟมใส่อาหาร',
    correctBin: 'blue',
    explanation: 'กล่องโฟมเปื้อนอาหารเป็นขยะทั่วไปที่ย่อยสลายยากและรีไซเคิลไม่ได้'
  },
  {
    id: 7,
    itemName: 'กระป๋องสเปรย์ฉีดผม',
    correctBin: 'red',
    explanation: 'กระป๋องสเปรย์มีแรงดันและอาจมีสารเคมีตกค้าง จัดเป็นขยะอันตราย'
  },
  {
    id: 8,
    itemName: 'ก้างปลา',
    correctBin: 'green',
    explanation: 'ก้างปลาเป็นเศษอาหารที่ย่อยสลายได้ จัดเป็นขยะอินทรีย์'
  }
];
