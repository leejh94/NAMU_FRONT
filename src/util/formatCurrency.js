// src/util/formatCurrency.js
export function formatCurrency(value) {
  // 값이 undefined나 null이면 0으로 처리
  if (value === undefined || value === null) {
    value = 0;
  }

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

export function formatCurrency2(value) {
  // 값이 undefined나 null이면 0으로 처리
  if (value === undefined || value === null) {
    value = 0;
  }

  if (value >= 100000000) {
    // 억과 만 단위 계산
    const billions = Math.floor(value / 100000000); // 억 단위
    const remaining = Math.floor((value % 100000000) / 10000); // 남은 만 단위
    return (
      <>
        {billions}
        <span className="currency-unit">억</span>
        {remaining > 0 && (
          <>
            {remaining}
            <span className="currency-unit">만원</span>
          </>
        )}
      </>
    );
  } else if (value >= 10000) {
    return (
      <>
        {Math.floor(value / 10000)}
        <span className="currency-unit">만원</span>
      </>
    );
  } else {
    return (
      <>
        {value}
        <span className="currency-unit">원</span>
      </>
    );
  }
}
