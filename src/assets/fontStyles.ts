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
  SemiBold_32: styled(SpoqaHanSansNeoBold)`
    font-size: 32px;
    color: white;
  `,
  SemiBold_24: styled(SpoqaHanSansNeoBold)`
    font-size: 24px;
    color: white;
  `,
  SemiBold_20: styled(SpoqaHanSansNeoBold)`
    font-size: 20px;
    color: white;
  `,
  Regular_32: styled(SpoqaHanSansNeoRegular)`
    font-size: 32px;
    color: white;
  `,
  Regular_24: styled(SpoqaHanSansNeoRegular)`
    font-size: 24px;
    color: white;
  `,
  Regular_20: styled(SpoqaHanSansNeoRegular)`
    font-size: 20px;
    color: white;
  `,
  Light_32: styled(SpoqaHanSansNeoLight)`
    font-size: 32px;
    color: white;
  `,
  Light_24: styled(SpoqaHanSansNeoLight)`
    font-size: 24px;
    color: white;
  `,
  Light_20: styled(SpoqaHanSansNeoLight)`
    font-size: 20px;
    color: white;
  `,

  Esa_Bold_20: styled(esamanruBold)`
    font-size: 20;
    color: white;
  `,
  Esa_Bold_18: styled(esamanruBold)`
    font-size: 18;
    color: white;
  `,
  Esa_Bold_16: styled(esamanruBold)`
    font-size: 16;
    color: white;
  `,
  Esa_Bold_14: styled(esamanruBold)`
    font-size: 14;
    color: white;
  `,
  Esa_Bold_12: styled(esamanruBold)`
    font-size: 12;
    color: white;
  `,

  Esa_Medium_20: styled(esamanru)`
    font-size: 20;
    color: white;
  `,
  Esa_Medium_18: styled(esamanru)`
    font-size: 18;
    color: white;
  `,
  Esa_Medium_16: styled(esamanru)`
    font-size: 16;
    color: white;
  `,
  Esa_Medium_14: styled(esamanru)`
    font-size: 14;
    color: white;
  `,
  Esa_Medium_12: styled(esamanru)`
    font-size: 12;
    color: white;
  `,

  Esa_Light_20: styled(esamanruLight)`
    font-size: 20;
    color: white;
  `,
  Esa_Light_18: styled(esamanruLight)`
    font-size: 18;
    color: white;
  `,
  Esa_Light_16: styled(esamanruLight)`
    font-size: 16;
    color: white;
  `,
  Esa_Light_14: styled(esamanruLight)`
    font-size: 14;
    color: white;
  `,
  Esa_Light_12: styled(esamanruLight)`
    font-size: 12;
    color: white;
  `,
};
