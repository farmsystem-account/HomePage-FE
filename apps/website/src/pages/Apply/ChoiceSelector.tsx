import { ChangeEvent } from "react";
import { ApplyQuestion, Choice } from "@/models/apply";

interface ChoiceSelectorProps {
  question: ApplyQuestion;
  value: number[]; // 항상 배열 형태
  onChange: (newValue: number[]) => void;
}

export default function ChoiceSelector({ question, value, onChange }: ChoiceSelectorProps) {
  if (question.isDuplicated && question.choices) {
    // 다중 선택: 체크박스
    return (
      <div>
        {question.choices.map((choice: Choice) => {
          const choiceId = choice.choiceId; // 수정된 부분
          return (
            <label key={choiceId} style={{ display: "block", marginBottom: "0.5rem" }}>
              <input
                type="checkbox"
                value={choiceId}
                checked={value.includes(choiceId)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    onChange([...value, choiceId]);
                  } else {
                    onChange(value.filter((id) => id !== choiceId));
                  }
                }}
              />
              {choice.content}
            </label>
          );
        })}
      </div>
    );
  } else if (question.choices) {
    // 단일 선택: 라디오 버튼 (답은 단일 원소 배열)
    return (
      <div>
        {question.choices.map((choice: Choice) => {
          const choiceId = Number(choice.choiceId); // 수정된 부분
          return (
            <label key={choiceId} style={{ display: "block", marginBottom: "0.5rem" }}>
              <input
                type="radio"
                name={`question-${question.questionId}`}
                value={choiceId}
                checked={value[0] === choiceId}
                onChange={() => onChange([choiceId])}
              />
              {choice.content}
            </label>
          );
        })}
      </div>
    );
  }
  return null;
}
