'use client';

import { useEffect, useState } from 'react';

/**
 * Tailwind CSS의 반응형 기준(sm, md, lg)을 기반으로
 * 현재 화면 크기에 맞는 브레이크포인트 상태를 감지합니다.
 *
 * @returns {{ sm: boolean, md: boolean, lg: boolean }}
 * Tailwind 기준으로 현재 뷰포트가 각 브레이크포인트에 해당하는지 여부
 */
export function useBreakpoint() {
  const [breakpoints, setBreakpoints] = useState({
    sm: false,
    md: false,
    lg: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Tailwind CSS의 기본 브레이크포인트에 맞춰 정의
    const queries = {
      sm: window.matchMedia('(max-width: 640px)'),
      md: window.matchMedia('(max-width: 768px)'),
      lg: window.matchMedia('(max-width: 1024px)'),
    };

    const updateBreakpoints = () => {
      setBreakpoints({
        sm: queries.sm.matches,
        md: queries.md.matches,
        lg: queries.lg.matches,
      });
    };

    updateBreakpoints(); // 초기 렌더 시 바로 상태 반영

    Object.values(queries).forEach((media) =>
      media.addEventListener('change', updateBreakpoints)
    );

    return () =>
      Object.values(queries).forEach((media) =>
        media.removeEventListener('change', updateBreakpoints)
      );
  }, []);

  return breakpoints;
}
