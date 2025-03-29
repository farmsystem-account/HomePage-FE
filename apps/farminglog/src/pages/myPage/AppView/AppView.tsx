import { useEffect, useState } from 'react';
import * as S from './AppView.styles';
import NotionIcon from '../../../assets/Icons/Notion.png';
import GithubIcon from '../../../assets/Icons/Github.png';
import SeedIcon from '../../../assets/Icons/Seed.png';
import BackArrow from '../../../assets/Icons/BackArrow.png';
import DefaultProfile from '../../../assets/home/default_profile.png';

import { useUserInfoQuery } from '@repo/auth/services/query/useUserInfoQuery';
import { useUpdateUserMutation } from '@repo/auth/services/mutation/useUpdateUserMutation';
import { useUserStore } from '@repo/auth/stores/userStore';

export default function AppView() {
  const [isEditView, setIsEditView] = useState(false);
  const { data: user, refetch } = useUserInfoQuery();
  const { mutate: updateUserInfo } = useUpdateUserMutation();
  const setUser = useUserStore((s) => s.setUser);

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
    updateUserInfo(
      { phoneNumber: mobile, notionAccount: notion, githubAccount: github },
      {
        onSuccess: async () => {
          const { data: updatedUser } = await refetch();
          if (updatedUser) setUser(updatedUser);
          setIsEditView(false);
        },
      }
    );
  };

  const userName = user?.name || '사용자';
  const profileImageUrl = user?.profileImageUrl || DefaultProfile;

  if (isEditView) {
    return (
      <S.EditViewWrapper>
        <S.EditHeader>
          <img src={BackArrow} onClick={() => setIsEditView(false)} style={{ width: 24, cursor: 'pointer' }} />
          <S.EditTitle>내 정보 수정</S.EditTitle>
          <S.CompleteButton onClick={handleEditComplete}>완료</S.CompleteButton>
        </S.EditHeader>

        <S.EditProfile>
          <S.ProfileImageEdit src={profileImageUrl} />
          <S.NameText>{userName}</S.NameText>
        </S.EditProfile>

        {[
          { label: '전화번호', value: mobile, set: setMobile },
          { label: 'Notion', value: notion, set: setNotion },
          { label: 'Github', value: github, set: setGithub },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <S.EditSection>
              <S.EditLabel>{label}</S.EditLabel>
              <S.Input value={value} onChange={(e) => set(e.target.value)} colorType="dark" />
            </S.EditSection>
            <S.Line />
          </div>
        ))}
      </S.EditViewWrapper>
    );
  }

  return (
    <S.AppStyleWrapper>
      <S.TopInfoArea>
        <S.AppHeader>
          <S.ColumnBox>
            <S.AppName>{userName}</S.AppName>
            <S.RowBox>
              <S.AppRole>{user?.role}</S.AppRole>
              <S.EditButton onClick={() => setIsEditView(true)}>수정</S.EditButton>
            </S.RowBox>
          </S.ColumnBox>
          <S.ProfileImage src={profileImageUrl} />
        </S.AppHeader>

        <S.AppInfoTable>
          <S.AppInfoRow><span>전공</span><strong>{user?.major}</strong></S.AppInfoRow>
          <S.AppInfoRow><span>트랙</span><strong>{user?.track}</strong></S.AppInfoRow>
          <S.AppInfoRow><span>기수</span><strong>{user?.generation}기</strong></S.AppInfoRow>
          <S.AppInfoRow><span>학번</span><strong>{user?.studentNumber}</strong></S.AppInfoRow>
          <S.AppInfoRow><span>전화번호</span><strong>{user?.phoneNumber}</strong></S.AppInfoRow>
        </S.AppInfoTable>
      </S.TopInfoArea>

      <S.AppBottomArea>
        <S.AppAccountBox>
          <S.AccountRow>
            <S.RowBox><S.Icon src={NotionIcon} /><label>Notion</label></S.RowBox>
            <S.AccountText>{user?.notionAccount}</S.AccountText>
          </S.AccountRow>
        </S.AppAccountBox>
        <S.AppAccountBox>
          <S.AccountRow>
            <S.RowBox><S.Icon src={GithubIcon} /><label>Github</label></S.RowBox>
            <S.AccountText>{user?.githubAccount}</S.AccountText>
          </S.AccountRow>
        </S.AppAccountBox>
        <S.AppAccountBox>
          <S.AccountRow>
            <S.RowBox><S.Icon src={SeedIcon} /><label>현재 씨앗 개수</label></S.RowBox>
            <S.AccountText>{user?.totalSeed}개</S.AccountText>
          </S.AccountRow>
        </S.AppAccountBox>
      </S.AppBottomArea>
    </S.AppStyleWrapper>
  );
}
