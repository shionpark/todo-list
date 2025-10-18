# To-Do List App

Next.js + TypeScript 기반의 할 일 관리 서비스입니다.<br/>
사용자는 할 일을 추가·수정·삭제하고, 완료 상태를 전환하며,<br/>
상세 페이지에서 메모와 이미지를 관리할 수 있습니다.

## 프로젝트 개요

| 항목       | 내용                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| 프로젝트명 | To-Do List                                                                      |
| 목표       | 사용자가 할 일을 생성·수정·삭제하고 완료 상태를 관리할 수 있는 Todo 서비스 구현 |
| 개발 기간  | 2025.10.13 ~ 2025.10.17                                                         |
| 배포 링크  | https://todo-list-gf24.vercel.app/                                                   |

## 기술 스택

| 구분        | 내용                    |
| ----------- | ----------------------- |
| Framework   | Next.js 15 (App Router) |
| Language    | TypeScript              |
| Styling     | Tailwind CSS            |
| HTTP Client | Axios                   |
| 배포        | Vercel                  |
| 포맷터      | Prettier                |

## 폴더 구조

```bash
src/
 ├─ app/                    # 페이지 라우트 (목록, 상세 페이지)
 │   ├─ page.tsx
 │   └─ items/[itemId]/page.tsx
 ├─ components/             # 공용 및 Todo 관련 컴포넌트
 │   ├─ common/
 │   └─ todo/
 ├─ hooks/                  # 커스텀 훅 (데이터 fetch, 상태 관리 등)
 ├─ lib/                    # API 통신 로직 (axios wrapper 등)
 ├─ styles/                 # 전역 스타일, 색상 시스템
 └─ types/                  # TypeScript 타입 정의
```

## 주요 기능

| 기능                | 설명                                                            |
| ------------------- | --------------------------------------------------------------- |
| **할 일 추가**      | 상단 입력창에 텍스트 입력 후 추가하기 버튼 클릭 또는 Enter 입력 |
| **할 일 완료/해제** | 체크박스를 클릭해 완료 ↔ 미완료 전환                           |
| **할 일 상세 보기** | 목록에서 항목 클릭 시 상세 페이지로 이동                        |
| **할 일 수정**      | 제목, 상태, 메모, 이미지(5MB 이하, 영어 파일명) 수정 가능       |
| **할 일 삭제**      | 상세 페이지에서 삭제하기 클릭 시 삭제 후 목록 페이지로 복귀     |
| **반응형 UI**       | 모바일, 태블릿, 데스크탑 대응                                   |
| **컬러 시스템**     | 디자인 시안 기반 Tailwind 컬러 토큰 적용                        |

## 실행 방법

```bash
# 1. 레포지토리 클론 및 디렉토리 이동
git clone https://github.com/shionpark/todo-list.git
cd todo-list

# 2. 패키지 설치
pnpm install

# 3. 환경 변수 설정 (.env.local)
NEXT_PUBLIC_API_URL=https://assignment-todolist-api.vercel.app/api/<tenantId>

# 4. 개발 서버 실행
pnpm run dev

# 5. 브라우저에서 확인
http://localhost:3000
```

> **⚙️ tenantId** <br/>

- tenantId는 API 요청 시 본인을 식별하기 위한 고유 ID입니다. <br/>
- 닉네임이나 영문 아이디를 자유롭게 지정할 수 있으며,<br/>
  예를 들어 tenantId가 shionpark이라면 요청 URL은 다음과 같습니다:<br/>
  `https://assignment-todolist-api.vercel.app/api/shionpark/items`
