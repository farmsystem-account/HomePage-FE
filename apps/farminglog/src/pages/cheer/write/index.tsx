import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Search from './search';
import Cheer from './cheer'; 
import WhiteContentContainer from '@/layouts/WhiteContentContainer';

function Main() {
  const location = useLocation();
  /** 검색으로 선택된 유저 이름 */
  const [selectedUser, setSelectedUser] = useState<{ userId: number; name: string } | null>(null);

  /** Search 컴포넌트에서 유저를 클릭하면 setSelectedUser 갱신 */
  const handleSelectUser = (user: { userId: number; name: string }) => {
    setSelectedUser(user);
  };

  /** 랭킹 페이지에서 넘어온 userId 및 name이 있다면 갱신신 */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    const name = params.get('name');
    
    if (userId && name) {
      setSelectedUser({ userId: Number(userId), name });
    }
  }, [location.search]);

  return (
    <WhiteContentContainer title="응원하기" >
      {!selectedUser ? (
        /** 아직 선택된 유저가 없으면 "검색 화면" */
        <Search onSelectUser={handleSelectUser} />
      ) : (
        /** 유저가 선택됐다면 "응원 메시지 작성 화면" */
        <Cheer searchedUser={selectedUser} />
      )}
    </WhiteContentContainer>
  );
}

export default Main;