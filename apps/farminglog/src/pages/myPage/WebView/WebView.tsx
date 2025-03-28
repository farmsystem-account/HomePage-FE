import { useEffect, useState } from 'react';
import * as S from './WebView.styles';
import useMediaQueries from '@/hooks/useMediaQueries';
import BackArrow from '../../../assets/Icons/BackArrow.png';
import Notion from '../../../assets/Icons/Notion.png';
import Github from '../../../assets/Icons/Github.png';
import PhoneIcon from '../../../assets/Icons/PhoneIcon.png';

import { useUserInfoQuery } from '@repo/auth/services/query/useUserInfoQuery';
import { useUpdateUserMutation } from '@repo/auth/services/mutation/useUpdateUserMutation';

export default function WebView() {
  const { isMobile } = useMediaQueries();
  const { data: user } = useUserInfoQuery();
  const { mutate: updateUserInfo } = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);

  // 상태 초기값은 user로부터
  const [mobile, setMobile] = useState('');
  const [notion, setNotion] = useState('');
  const [github, setGithub] = useState('');

  useEffect(() => {
    if (user) {
      setMobile(user.phoneNumber || '');
      setNotion(user.notionAccount || '');
      setGithub(user.githubAccount || '');
    }
  }, [user]);

  const handleEditComplete = () => {
    updateUserInfo({
      phoneNumber: mobile,
      notionAccount: notion,
      githubAccount: github,
    });
    setIsEditing(false);
  };

  return (
    <S.MyPageContainer>
      <S.ProfileWrapper isMobile={isMobile}>
        <S.TitleBox isMobile={isMobile}>
          <S.BackArrow src={BackArrow} />
          <S.Title>마이페이지</S.Title>
          <S.EditButton onClick={() => {
            isEditing ? handleEditComplete() : setIsEditing(true);
          }}>
            {isEditing ? '완료' : '수정하기'}
          </S.EditButton>
        </S.TitleBox>

        <S.SectionTitleBox isMobile={isMobile}>
          <S.SectionTitle>프로필</S.SectionTitle>
        </S.SectionTitleBox>

        <S.ProfileCard isMobile={isMobile}>
          <S.ProfileImage />
          <S.ProfileInfo>
            <S.RoleBox>
              <S.Role>{user?.role}</S.Role>
            </S.RoleBox>
            <S.Name>{user?.name}</S.Name>
          </S.ProfileInfo>
        </S.ProfileCard>

        {isEditing ? (
          <>
            <S.SectionTitleBox isMobile={isMobile}>
              <S.SectionTitle>수정 정보</S.SectionTitle>
            </S.SectionTitleBox>
            <S.EditForm>
              <S.EditField>
                <S.RowBox><S.Icon2 src={PhoneIcon} /><label>전화번호</label></S.RowBox>
                <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </S.EditField>
              <S.EditField>
                <S.RowBox><S.Icon2 src={Notion} /><label>Notion</label></S.RowBox>
                <input value={notion} onChange={(e) => setNotion(e.target.value)} />
              </S.EditField>
              <S.EditField>
                <S.RowBox><S.Icon2 src={Github} /><label>Github</label></S.RowBox>
                <input value={github} onChange={(e) => setGithub(e.target.value)} />
              </S.EditField>
            </S.EditForm>
          </>
        ) : (
          <>
            <S.SectionTitleBox isMobile={isMobile}>
              <S.SectionTitle>기본 정보</S.SectionTitle>
            </S.SectionTitleBox>
            <S.InfoGrid>
              <S.InfoItem><S.InfoLabel>전공</S.InfoLabel><S.InfoValue>{user?.major}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>트랙</S.InfoLabel><S.InfoValue>{user?.track}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>기수</S.InfoLabel><S.InfoValue>{user?.generation}기</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>학번</S.InfoLabel><S.InfoValue>{user?.studentNumber}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>전화번호</S.InfoLabel><S.InfoValue>{user?.phoneNumber}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>현재 씨앗 개수 🌱</S.InfoLabel><S.InfoValue>{user?.totalSeed}개</S.InfoValue></S.InfoItem>
            </S.InfoGrid>

            <S.SectionTitleBox isMobile={isMobile}>
              <S.SectionTitle>계정 연동</S.SectionTitle>
            </S.SectionTitleBox>
            <S.AccountLinks isMobile={isMobile}>
              <S.AccountBox>
                <S.RowBox><S.Icon src={Notion} /><S.AccountLable>Notion</S.AccountLable></S.RowBox>
                <S.AccountValue>{user?.notionAccount}</S.AccountValue>
              </S.AccountBox>
              <S.AccountBox>
                <S.RowBox><S.Icon src={Github} /><S.AccountLable>Github</S.AccountLable></S.RowBox>
                <S.AccountValue>{user?.githubAccount}</S.AccountValue>
              </S.AccountBox>
            </S.AccountLinks>
          </>
        )}
      </S.ProfileWrapper>
    </S.MyPageContainer>
  );
}
