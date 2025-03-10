import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicationDetail } from "../../services/applicationDetail";
import { Application, Answer } from "../../types/application";

const ApplicationDetail = () => {
  const { applyId } = useParams<{ applyId: string }>();

  const applicationId = applyId ? parseInt(applyId, 10) : undefined;

  const { data, error, isLoading } = useQuery<Application>({
    queryKey: ["applicationDetail", applicationId],
    queryFn: () => fetchApplicationDetail(applicationId!.toString()),
    enabled: !!applicationId, 
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {(error as Error).message}</p>;

  return (
    <div>
      <h1>지원서 상세</h1>
      {data ? (
        <>
          <p><strong>ID:</strong> {data.applyId}</p>
          <p><strong>이름:</strong> {data.name}</p>
          <p><strong>전공:</strong> {data.major}</p>
          <p><strong>전화번호:</strong> {data.phoneNumber}</p>
          <p><strong>이메일:</strong> {data.email}</p>
          <p><strong>트랙:</strong> {data.track}</p>
          <p><strong>업데이트 날짜:</strong> {new Date(data.updatedAt).toLocaleString()}</p>

          <h2>답변</h2>
          {data.answers && data.answers.length > 0 ? (
            <ul>
              {data.answers.map((answer: Answer) => (
                <li key={answer.questionId}>
                  <p><strong>질문 ID:</strong> {answer.questionId}</p>
                  <p><strong>내용:</strong> {answer.content ?? "없음"}</p>
                  <p><strong>선택한 옵션:</strong> {answer.choiceId.length > 0 ? answer.choiceId.join(", ") : "없음"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>답변이 없습니다.</p>
          )}
        </>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default ApplicationDetail;
