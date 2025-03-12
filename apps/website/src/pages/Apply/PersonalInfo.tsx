import { ChangeEvent } from "react";
import { validatePersonalInfo } from "@/validations/apply";

interface PersonalInfoProps {
  studentNumber: string;
  password: string;
  name: string;
  major: string;
  email: string;
  phoneNumber: string;
  onStudentNumberChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

export default function PersonalInfo({
  studentNumber,
  password,
  name,
  major,
  email,
  phoneNumber,
  onStudentNumberChange,
  onPasswordChange,
  onNameChange,
  onMajorChange,
  onEmailChange,
  onPhoneNumberChange,
}: PersonalInfoProps) {
  // 현재 입력값으로 검증 수행
  const validationResult = validatePersonalInfo({
    studentNumber,
    password,
    name,
    major,
    email,
    phoneNumber,
  });

  // 성공 시 빈 객체, 실패 시 fieldErrors를 가져옵니다.
  const fieldErrors = validationResult.success
    ? {}
    : validationResult.error.formErrors.fieldErrors;

  return (
    <div>
      <div>
        <label>
          학번:
          <input
            type="text"
            value={studentNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onStudentNumberChange(e.target.value)
            }
            disabled
          />
        </label>
        {fieldErrors.studentNumber && (
          <div style={{ color: "red" }}>{fieldErrors.studentNumber[0]}</div>
        )}
      </div>
      <div>
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onPasswordChange(e.target.value)
            }
            disabled
          />
        </label>
        {fieldErrors.password && (
          <div style={{ color: "red" }}>{fieldErrors.password[0]}</div>
        )}
      </div>
      <div>
        <label>
          이름:
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onNameChange(e.target.value)
            }
          />
        </label>
        {fieldErrors.name && (
          <div style={{ color: "red" }}>{fieldErrors.name[0]}</div>
        )}
      </div>
      <div>
        <label>
          전공:
          <input
            type="text"
            value={major}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onMajorChange(e.target.value)
            }
          />
        </label>
        {fieldErrors.major && (
          <div style={{ color: "red" }}>{fieldErrors.major[0]}</div>
        )}
      </div>
      <div>
        <label>
          이메일:
          <input
            type="text"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onEmailChange(e.target.value)
            }
            placeholder="farmsystem@farm.com"
          />
        </label>
        {fieldErrors.email && (
          <div style={{ color: "red" }}>{fieldErrors.email[0]}</div>
        )}
      </div>
      <div>
        <label>
          전화번호:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onPhoneNumberChange(e.target.value)
            }
            placeholder="010-1234-5678"
          />
        </label>
        {fieldErrors.phoneNumber && (
          <div style={{ color: "red" }}>{fieldErrors.phoneNumber[0]}</div>
        )}
      </div>
    </div>
  );
}
