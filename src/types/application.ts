export interface Application {
  applyId: number;
  name: string;
  track: string;
  updatedAt: string;
  major?: string;
  phoneNumber?: string;
  email?: string;
  answers?: {
    questionId: number;
    content: string;
    choiceId: number[];
  }[];
}
