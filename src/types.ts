export type BinColor = 'green' | 'yellow' | 'blue' | 'red';

export interface WasteKnowledge {
  id: string;
  color: BinColor;
  title: string;
  description: string;
  examples: string[];
  iconType: 'leaf' | 'recycle' | 'trash' | 'alert';
  bgColor: string;
  textColor: string;
  borderColor: string;
  imageBgColor: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: number;
  itemName: string;
  correctBin: BinColor;
  imageUrl?: string;
  explanation: string;
}
