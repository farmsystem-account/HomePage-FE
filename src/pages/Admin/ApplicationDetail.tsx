import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicationDetail } from "../../services/applicationDetail"; // 서비스에서 함수 가져오기

const ApplicationDetail = () => {
  const { applyId } = useParams<{ applyId: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["applicationDetail", applyId],
    queryFn: () => fetchApplicationDetail(applyId!),
    enabled: !!applyId, 
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {(error as Error).message}</p>;
  console.log(data); //여기까지 데이터가 다 받아와지는데 왜 아래에서 호출하면 안보이는지 모르겠어요...

  return (
    <div>
      <h1>지원서 상세</h1>
      {data ? (
        <>
          <p>ID: {data.applyId}</p>
          <p>이름: {data.name}</p>
          <p>전공: {data.major}</p>
          <p>전화번호: {data.phoneNumber}</p>
          <p>이메일: {data.email}</p>
          <p>트랙: {data.track}</p>
          <p>업데이트 날짜: {new Date(data.updatedAt).toLocaleString()}</p>
          <h2>답변</h2>
          <ul>
            {data.answers && data.answers.map((answer: any) => (
              <li key={answer.questionId}>
                <p>질문 ID: {answer.questionId}</p>
                <p>내용: {answer.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default ApplicationDetail;