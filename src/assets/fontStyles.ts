import styled from "styled-components";

const SpoqaHanSansNeoBold = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "SpoqaHanSansNeoBold";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;
const SpoqaHanSansNeoLight = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "SpoqaHanSansNeoLight";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;
const SpoqaHanSansNeoMedium = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "SpoqaHanSansNeoMedium";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;
const SpoqaHanSansNeoRegular = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "SpoqaHanSansNeoRegular";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;
const esamanruBold = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "esamanruBold";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;
const esamanru = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "esamanru";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;
const esamanruLight = styled.div<{ numOf2Lines?: boolean }>`
  font-family: "esamanruLight";
  ${(props) =>
    props.numOf2Lines != null &&
    `white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; `}
`;

export const Text = {
  SemiBold_32: styled(esamanruBold)<{ color?: string }>`
    font-size: 32px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  SemiBold_24: styled(esamanruBold)<{ color?: string }>`
    font-size: 24px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  SemiBold_20: styled(esamanruBold)<{ color?: string }>`
    font-size: 20px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Regular_32: styled(esamanru)<{ color?: string }>`
    font-size: 32px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Regular_24: styled(esamanru)<{ color?: string }>`
    font-size: 24px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Regular_20: styled(esamanru)<{ color?: string }>`
    font-size: 20px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Regular_16: styled(esamanru)<{ color?: string }>`
    font-size: 16px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Light_32: styled(esamanruLight)<{ color?: string }>`
    font-size: 32px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Light_24: styled(esamanruLight)<{ color?: string }>`
    font-size: 24px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Light_20: styled(esamanruLight)<{ color?: string }>`
    font-size: 20px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Light_16: styled(esamanruLight)<{ color?: string }>`
    font-size: 16px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Light_12: styled(esamanruLight)<{ color?: string }>`
    font-size: 12px;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Regular_20: styled(esamanru)<{ color?: string }>`
    font-size: 20;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Regular_18: styled(esamanru)<{ color?: string }>`
    font-size: 18;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Regular_16: styled(esamanru)<{ color?: string }>`
    font-size: 16;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
  Spo_Regular_14: styled(esamanru)<{ color?: string }>`
    font-size: 14;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Regular_12: styled(esamanru)<{ color?: string }>`
    font-size: 12;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Medium_20: styled(SpoqaHanSansNeoMedium)<{ color?: string }>`
    font-size: 20;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Medium_18: styled(SpoqaHanSansNeoMedium)<{ color?: string }>`
    font-size: 18;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Medium_16: styled(SpoqaHanSansNeoMedium)<{ color?: string }>`
    font-size: 16;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Medium_14: styled(SpoqaHanSansNeoMedium)<{ color?: string }>`
    font-size: 14;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Medium_12: styled(SpoqaHanSansNeoMedium)<{ color?: string }>`
    font-size: 12;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Light_20: styled(esamanruLight)<{ color?: string }>`
    font-size: 20;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Light_18: styled(esamanruLight)<{ color?: string }>`
    font-size: 18;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Light_16: styled(esamanruLight)<{ color?: string }>`
    font-size: 16;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Light_14: styled(esamanruLight)<{ color?: string }>`
    font-size: 14;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,

  Spo_Light_12: styled(esamanruLight)<{ color?: string }>`
    font-size: 12;
    white-space: pre-line;
    color: ${(props) => (props.color != null ? props.color : "#FFFFFF")};
  `,
};
