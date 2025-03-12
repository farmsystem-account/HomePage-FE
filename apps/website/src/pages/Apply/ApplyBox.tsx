import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { 
  useApplyQuestions, 
  useSaveApply, 
  useSubmitApply, 
  useLoadApply 
} from "@/hooks/useApply";
import { ApplyQuestion, ApplyAnswer, Answer, Track } from "@/models/apply";
import { filterQuestionsByTrack, sortQuestionsByPriority } from "@/utils/apply";
import ChoiceSelector from "./ChoiceSelector";
import PersonalInfo from "./PersonalInfo";
import Logger from "@/utils/Logger";

const defaultTrack: Track = Track.UNION;
type AnswerMap = Record<number, { content: string; choiceId: number[] }>;

interface ApplyBoxProps {
  propStudentNumber: string;
  propPassword: string;
}

const TrackKorean = {
  UNION: "유니온",
  GAMING_VIDEO: "게임/영상",
  AI: "인공지능",
  SECURITY_WEB: "보안/웹",
  IOT_ROBOTICS: "사물인터넷/로봇",
  BIGDATA: "빅데이터",
} as const;

export default function ApplyBox({ propStudentNumber, propPassword }: ApplyBoxProps) {
  const navigate = useNavigate();
  const { data: questionsData, loading: questionsLoading, error: questionsError } = useApplyQuestions();
  const { saveApply, loading: saveLoading, error: saveError } = useSaveApply();
  const { submitApply, loading: submitLoading, error: submitError } = useSubmitApply();
  const { loadApply, loading: loadLoading, error: loadError } = useLoadApply();

  const [studentNumber, setStudentNumber] = useState(propStudentNumber);
  const [password, setPassword] = useState(propPassword);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [loadedData, setLoadedData] = useState<ApplyAnswer | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track>(defaultTrack);
  const [applyStatus, setApplyStatus] = useState<string>("");

  const handleTrackChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newTrack = e.target.value as Track;
    setSelectedTrack(newTrack);
  };

  const handleAnswerChange = (
    questionId: number,
    value: string | number[],
    questionType: "ESSAY" | "CHOICE"
  ) => {
    setAnswers(prev => {
      const prevAnswer = prev[questionId] || { content: "", choiceId: [] };
      if (questionType === "ESSAY") {
        return { ...prev, [questionId]: { ...prevAnswer, content: value as string } };
      } else {
        return { ...prev, [questionId]: { ...prevAnswer, choiceId: value as number[] } };
      }
    });
  };

  // 화면에 보여줄 질문은 선택한 트랙에 해당하는 질문만 표시
  const processedQuestions: ApplyQuestion[] = questionsData?.data
    ? sortQuestionsByPriority(filterQuestionsByTrack(questionsData.data, selectedTrack))
    : [];

  // state에 보관된 모든 답변(항상 content, choiceId가 존재)을 전송
  const transformAnswers = (): Answer[] => {
    return Object.entries(answers).map(([questionId, answer]) => ({
      questionId: Number(questionId),
      content: answer.content,
      choiceId: answer.choiceId,
    }));
  };

  useEffect(() => {
    if (studentNumber && password) {
      loadApply({ studentNumber, password })
        .then((res) => {
          if (res.data) {
            setLoadedData(res.data);
            setApplyStatus(res.data.status);
            const answerMap: AnswerMap = {};
            res.data.answers.forEach((ans) => {
              answerMap[ans.questionId] = {
                content: ans.content ?? "",
                choiceId: ans.choiceId ?? [],
              };
            });
            setAnswers(answerMap);
            setSelectedTrack(res.data.track);
          }
        })
        .catch((err) => {
          Logger.error("지원서 로드 에러:", err);
        });
    }
  // loadApply 넣으면 무한 호출됨
  }, [studentNumber, password]);

  const buildApplyData = (): ApplyAnswer => {
    if (loadedData) {
      return {
        ...loadedData,
        track: selectedTrack,
        answers: transformAnswers(),
      };
    }
    throw new Error("지원서 데이터 구성 실패: 로드된 데이터가 없습니다.");
  };

  const handleSave = async () => {
    try {
      const response = await saveApply(buildApplyData());
      Logger.log("임시저장 성공:", response);
      navigate('/'); 
    } catch (err) {
      Logger.error("임시저장 에러:", err);
    }
  };

  const handleSubmit = async () => {
    const confirmSubmission = window.confirm(
      "한번 제출하시면 수정이 불가합니다. 또한 동일한 학번으로 재제출도 불가합니다"
    );
    if (!confirmSubmission) return;
  
    const submissionData = buildApplyData();
    try {
      const response = await submitApply(submissionData);
      Logger.log("제출 성공:", response);
      setApplyStatus("SUBMITTED");
      navigate('/'); 
    } catch (err) {
      Logger.error("제출 에러:", err);
    }
  };

  // 로드 중 또는 에러 상태에 따른 처리
  if (loadLoading) return <div>지원서를 로딩중입니다...</div>;
  if (loadError) return <div>지원서 로드 에러: {loadError.message}</div>;
  if (questionsLoading) return <div>질문 데이터를 로딩중입니다...</div>;
  if (questionsError) return <div>질문 데이터를 로딩 에러: {questionsError.message}</div>;

  return (
    <div>
      <h1>지원서 작성</h1>
      <PersonalInfo
        studentNumber={studentNumber}
        password={password}
        name={loadedData?.name ?? ""}
        major={loadedData?.major ?? ""}
        email={loadedData?.email ?? ""}
        phoneNumber={loadedData?.phoneNumber ?? ""}
        onStudentNumberChange={setStudentNumber}
        onPasswordChange={setPassword}
        onNameChange={(value) => {
          if (loadedData) setLoadedData({ ...loadedData, name: value });
        }}
        onMajorChange={(value) => {
          if (loadedData) setLoadedData({ ...loadedData, major: value });
        }}
        onEmailChange={(value) => {
          if (loadedData) setLoadedData({ ...loadedData, email: value });
        }}
        onPhoneNumberChange={(value) => {
          if (loadedData) setLoadedData({ ...loadedData, phoneNumber: value });
        }}
      />
      <div>
        <label>
          트랙 선택:
          <select value={selectedTrack} onChange={handleTrackChange}>
            {Object.values(Track).map((track) => (
              <option key={track} value={track}>
                {TrackKorean[track]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <hr />
      {processedQuestions.map((question, index) => (
        <div key={question.questionId} style={{ marginBottom: "1rem" }}>
          <p>
            {index + 1}번. {question.content}{" "}
            {question.isRequired && <span style={{ color: "red" }}>*</span>}
          </p>
          {question.type === "ESSAY" ? (
            <textarea
              maxLength={question.maxLength}
              value={answers[question.questionId]?.content ?? ""}
              onChange={(e) =>
                handleAnswerChange(question.questionId, e.target.value, "ESSAY")
              }
              style={{ width: "100%", minHeight: "80px" }}
            />
          ) : question.type === "CHOICE" && question.choices ? (
            <ChoiceSelector
              question={question}
              value={answers[question.questionId]?.choiceId ?? []}
              onChange={(newValue) =>
                handleAnswerChange(question.questionId, newValue, "CHOICE")
              }
            />
          ) : null}
        </div>
      ))}
      <div>
        {applyStatus === "SUBMITTED" ? (
          <div>이미 제출한 지원서입니다.</div>
        ) : (
          <>
            <button onClick={handleSave} disabled={saveLoading}>
              {saveLoading ? "저장중..." : "임시저장"}
            </button>
            <button onClick={handleSubmit} disabled={submitLoading}>
              {submitLoading ? "제출중..." : "제출"}
            </button>
          </>
        )}
      </div>

      {saveError && <div style={{ color: "red" }}>임시저장 에러: {saveError.message}</div>}
      {submitError && <div style={{ color: "red" }}>제출 에러: {submitError.message}</div>}
    </div>
  );
}
