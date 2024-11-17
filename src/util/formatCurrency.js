// src/util/formatCurrency.js

export function formatCurrency(value) {
  if (value >= 100000000) {
    // 억과 만 단위 계산
    const billions = Math.floor(value / 100000000); // 억 단위
    const remaining = Math.floor((value % 100000000) / 10000); // 남은 만 단위
    return remaining > 0 ? `${billions}억 ${remaining}만원` : `${billions}억원`;
  } else if (value >= 10000) {
    return `${Math.floor(value / 10000)}만원`; // 만원 단위로 변환
  } else {
    return `${value}원`; // 만원이 되지 않는 금액은 그대로 표시
  }
}
