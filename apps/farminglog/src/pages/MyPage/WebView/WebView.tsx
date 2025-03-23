import React, { useState } from 'react';
import * as S from './WebView.styles';
import useMediaQueries from '@/hooks/useMediaQueries';
import BackArrow from '../../../assets/Icons/BackArrow.png';
import Notion from '../../../assets/Icons/Notion.png';
import Github from '../../../assets/Icons/Github.png';
import PhoneIcon from '../../../assets/Icons/PhoneIcon.png';

export default function Main() {
    const { isMobile } = useMediaQueries();
    const [isEditing, setIsEditing] = useState(false);

    // 초기 값들 (기존 정보)
    const [mobile, setMobile] = useState('010-8785-8853');
    const [notion, setNotion] = useState('2023110994@dgu.ac.kr');
    const [github, setGithub] = useState('dear.minseo');

    return (
        <S.MyPageContainer>
            
                <S.ProfileWrapper isMobile={isMobile}>
                    <S.TitleBox isMobile={isMobile}>
                        <S.BackArrow src={BackArrow} />
                        <S.Title>마이페이지</S.Title>
                        <S.EditButton onClick={() => setIsEditing(!isEditing)}>
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
                                <S.Role>역할</S.Role>
                            </S.RoleBox>
                            <S.Name>박파밍</S.Name>
                        </S.ProfileInfo>
                    </S.ProfileCard>
                    {isEditing ? (
                    <>
                        <S.SectionTitleBox isMobile={isMobile}>
                            <S.SectionTitle>수정 정보</S.SectionTitle>
                        </S.SectionTitleBox>

                        <S.EditForm>
                        <S.EditField>
                            <S.RowBox>
                                <S.Icon2 src={PhoneIcon}/>
                                <label>전화번호</label>
                            </S.RowBox>
                            <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </S.EditField>
                        <S.EditField>
                            <S.RowBox>
                                <S.Icon2 src={Notion}/>
                                <label>Notion</label>
                            </S.RowBox>
                            <input value={notion} onChange={(e) => setNotion(e.target.value)} />
                        </S.EditField>
                        <S.EditField>
                            <S.RowBox>
                                <S.Icon2 src={Github}/>
                                <label>Github</label>
                            </S.RowBox>
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
                        <S.InfoItem>
                            <S.InfoLabel>전공</S.InfoLabel>
                            <S.InfoValue>미디어커뮤니케이션</S.InfoValue>
                        </S.InfoItem>
                        <S.InfoItem>
                            <S.InfoLabel>트랙</S.InfoLabel>
                            <S.InfoValue>게임·영상</S.InfoValue>
                        </S.InfoItem>
                        <S.InfoItem>
                            <S.InfoLabel>기수</S.InfoLabel>
                            <S.InfoValue>4기</S.InfoValue>
                        </S.InfoItem>
                        <S.InfoItem>
                            <S.InfoLabel>학번</S.InfoLabel>
                            <S.InfoValue>2023110994</S.InfoValue>
                        </S.InfoItem>
                        <S.InfoItem>
                            <S.InfoLabel>전화번호</S.InfoLabel>
                            <S.InfoValue>010-8785-8853</S.InfoValue>
                        </S.InfoItem>
                        <S.InfoItem>
                            <S.InfoLabel>현재 씨앗 개수 🌱</S.InfoLabel>
                            <S.InfoValue>15개</S.InfoValue>
                        </S.InfoItem>
                    </S.InfoGrid>


                    <S.SectionTitleBox isMobile={isMobile}>
                        <S.SectionTitle>계정 연동</S.SectionTitle>
                    </S.SectionTitleBox>
                    <S.AccountLinks isMobile={isMobile}>
                        <S.AccountBox>
                            <S.RowBox>
                            <S.Icon src={Notion} />
                            <S.AccountLable>Notion</S.AccountLable>
                            </S.RowBox>
                            {isEditing ? (
                            <input
                                value={notion}
                                onChange={(e) => setNotion(e.target.value)}
                                style={{ border: 'none', fontSize: '16px' }}
                            />
                            ) : (
                            <S.AccountValue>{notion}</S.AccountValue>
                            )}
                        </S.AccountBox>

                        <S.AccountBox>
                            <S.RowBox>
                            <S.Icon src={Github} />
                            <S.AccountLable>Github</S.AccountLable>
                            </S.RowBox>
                            {isEditing ? (
                            <input
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                style={{ border: 'none', fontSize: '16px' }}
                            />
                            ) : (
                            <S.AccountValue>{github}</S.AccountValue>
                            )}
                        </S.AccountBox>
                    </S.AccountLinks>
                    </>
                    )}

                </S.ProfileWrapper>
            
        </S.MyPageContainer>
    );
}
