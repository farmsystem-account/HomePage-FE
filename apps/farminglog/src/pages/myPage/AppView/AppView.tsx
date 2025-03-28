import { useState } from 'react';
import * as S from './AppView.styles';
import Notion from '../../../assets/Icons/Notion.png';
import Github from '../../../assets/Icons/Github.png';
import Seed from '../../../assets/Icons/Seed.png';
import BackArrow from '../../../assets/Icons/BackArrow.png'; // ← 뒤로가기 아이콘

export default function Main() {
  const [isEditView, setIsEditView] = useState(false);
  const [mobile, setMobile] = useState('010-8785-8853');
  const [notion, setNotion] = useState('2023110994@dgu.ac.kr');
  const [github, setGithub] = useState('dear.minseo');
  const [seed] = useState(15);

  if (isEditView) {
    return (
      <S.EditViewWrapper>
        <S.EditHeader>
          <img src={BackArrow} onClick={() => setIsEditView(false)} style={{ width: 24, cursor: 'pointer' }} />
          <S.EditTitle>내 정보 수정</S.EditTitle>
          <S.CompleteButton onClick={() => setIsEditView(false)}>완료</S.CompleteButton>
        </S.EditHeader>

        <S.EditProfile>
          <S.ProfileImageEdit />
          <S.NameText>박파밍</S.NameText>
        </S.EditProfile>

        <S.EditSection>
          <S.EditLabel>전화번호</S.EditLabel>
          <S.Input value={mobile} onChange={(e) => setMobile(e.target.value)} colorType="dark" />
        </S.EditSection>
        <S.Line />
        <S.EditSection>
          <S.EditLabel>Notion</S.EditLabel>
          <S.Input value={notion} onChange={(e) => setNotion(e.target.value)} colorType="dark" />
        </S.EditSection>
        <S.Line />
        <S.EditSection>
          <S.EditLabel>Github</S.EditLabel>
          <S.Input value={github} onChange={(e) => setGithub(e.target.value)} colorType="dark" />
        </S.EditSection>
        <S.Line />
      </S.EditViewWrapper>
    );
  }

  return (
    <S.AppStyleWrapper>
      <S.TopInfoArea>
        <S.AppHeader>
          <S.ColumnBox>
            <S.AppName>박파밍</S.AppName>
            <S.RowBox>
              <S.AppRole>역할</S.AppRole>
              <S.EditButton onClick={() => setIsEditView(true)}>수정</S.EditButton>
            </S.RowBox>
          </S.ColumnBox>
          <S.ProfileImage />
        </S.AppHeader>

        <S.AppInfoTable>
          <S.AppInfoRow><span>전공</span><strong>미디어커뮤니케이션</strong></S.AppInfoRow>
          <S.AppInfoRow><span>트랙</span><strong>게임·영상</strong></S.AppInfoRow>
          <S.AppInfoRow><span>기수</span><strong>4기</strong></S.AppInfoRow>
          <S.AppInfoRow><span>학번</span><strong>2023110994</strong></S.AppInfoRow>
          <S.AppInfoRow><span>전화번호</span><strong>{mobile}</strong></S.AppInfoRow>
        </S.AppInfoTable>
      </S.TopInfoArea>

      <S.AppBottomArea>
        <S.AppAccountBox>
          <S.AccountRow>
            <S.RowBox><S.Icon src={Notion} /><label>Notion</label></S.RowBox>
            <S.AccountText>{notion}</S.AccountText>
          </S.AccountRow>
        </S.AppAccountBox>
        <S.AppAccountBox>
          <S.AccountRow>
            <S.RowBox><S.Icon src={Github} /><label>Github</label></S.RowBox>
            <S.AccountText>{github}</S.AccountText>
          </S.AccountRow>
        </S.AppAccountBox>
        <S.AppAccountBox>
          <S.AccountRow>
            <S.RowBox><S.Icon src={Seed} /><label>현재 씨앗 개수</label></S.RowBox>
            <S.AccountText>{seed}개</S.AccountText>
          </S.AccountRow>
        </S.AppAccountBox>
      </S.AppBottomArea>
    </S.AppStyleWrapper>
  );
}
