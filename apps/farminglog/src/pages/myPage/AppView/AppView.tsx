import { useEffect, useState, useRef } from 'react';
import * as S from './AppView.styles';
import NotionIcon from '../../../assets/Icons/Notion.png';
import GithubIcon from '../../../assets/Icons/Github.png';
import SeedIcon from '../../../assets/Icons/Seed.png';
import BackArrow from '../../../assets/Icons/BackArrow.png';
import DefaultProfile from '../../../assets/home/default_profile.png';
import ImageEdit from '../../../assets/buttons/ImageEdit.png';

import { useUserInfoQuery } from '@repo/auth/services/query/useUserInfoQuery';
import { useUpdateUserMutation } from '@repo/auth/services/mutation/useUpdateUserMutation';
import { useUserStore } from '@repo/auth/stores/userStore';
import { usePresignedUrlMutation } from '@/services/mutation/usePresignedUrlMutation'; 

export default function AppView() {
  const [isEditView, setIsEditView] = useState(false);
  const { data: user, refetch } = useUserInfoQuery();
  const { mutate: updateUserInfo } = useUpdateUserMutation();
  const setUser = useUserStore((s) => s.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: getPresignedUrl } = usePresignedUrlMutation(); 

  const [mobile, setMobile] = useState('');
  const [notion, setNotion] = useState('');
  const [github, setGithub] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setMobile(user.phoneNumber || '');
      setNotion(user.notionAccount || '');
      setGithub(user.githubAccount || '');
      setProfileImageUrl(user.profileImageUrl || DefaultProfile);
    }
  }, [user]);

  const handleEditComplete = () => {
    console.log('Profile Image URL:', profileImageUrl);
    
    updateUserInfo(
      {
        profileImageUrl: profileImageUrl || '',
        phoneNumber: mobile,
        notionAccount: notion,
        githubAccount: github,
      },
      {
        onSuccess: async () => {
          const { data: updatedUser } = await refetch();
          if (updatedUser) setUser(updatedUser);
          setIsEditView(false);
        },
      }
    );
  };

  const uploadImageToS3 = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}_${file.name}`;
    const directory = 'profile_images';

    try {
      console.log('📦 Presigned URL 요청 중...');
      const { presignedUrl } = await getPresignedUrl({ directory, fileName });
      console.log('✅ Presigned URL 수신 완료:', presignedUrl);

      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`S3 업로드 실패: ${response.status} ${response.statusText}`);
      }

      const objectUrl = presignedUrl.split('?')[0];
      console.log('✅ S3 업로드 성공! 접근 URL:', objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('❌ 이미지 업로드 중 오류 발생:', error);
      throw error;
    }
  };

  const handleImageEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      const objectUrl = await uploadImageToS3(file);
      setProfileImageUrl(objectUrl);
    }
  };
  const userName = user?.name || '사용자';

  if (isEditView) {
    return (
      <S.EditViewWrapper>
        <S.EditHeader>
          <img src={BackArrow} onClick={() => setIsEditView(false)} style={{ width: 24, cursor: 'pointer' }} />
          <S.EditTitle>내 정보 수정</S.EditTitle>
          <S.CompleteButton onClick={handleEditComplete}>완료</S.CompleteButton>
        </S.EditHeader>

        <S.EditProfile>
          <S.ImageEditWrapper>
            <S.ProfileImageEdit
              src={profileImage ? URL.createObjectURL(profileImage) : profileImageUrl || DefaultProfile}
            />
            <S.ImageEditButton src={ImageEdit} onClick={handleImageEditClick} />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </S.ImageEditWrapper>
          <S.NameText>{userName}</S.NameText>
        </S.EditProfile>

        {[{ label: '전화번호', value: mobile, set: setMobile }, { label: 'Notion', value: notion, set: setNotion }, { label: 'Github', value: github, set: setGithub }].map(({ label, value, set }) => (
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
          <S.ProfileImage src={profileImageUrl || DefaultProfile} />
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
