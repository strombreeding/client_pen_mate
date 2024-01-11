import styled from "styled-components";

const PretendardRegular = styled.span`
  font-family: "Pretendard Regular";
  font-weight: 400;
  font-display: swap;
`;
const PretendardSemiBold = styled.span`
  font-family: "Pretendard SemiBold";
  font-weight: 600;
  font-display: swap;
`;
export const Text = {
  LargeTitle: styled(PretendardRegular)`
    font-size: 34px;
    line-height: 41px;
  `,
  Title1: styled(PretendardRegular)`
    font-size: 28px;
    line-height: 34px;
  `,
  Title2: styled(PretendardRegular)`
    font-size: 22px;
    line-height: 28px;
  `,
  Title3: styled(PretendardRegular)`
    font-size: 22px;
    line-height: 28px;
  `,
  Headline: styled(PretendardSemiBold)`
    font-size: 20px;
    line-height: 25px;
  `,
  Body: styled(PretendardRegular)`
    font-size: 17px;
    line-height: 22px;
  `,
  Callout: styled(PretendardRegular)`
    font-size: 16px;
    line-height: 21px;
  `,
  Subhead: styled(PretendardRegular)`
    font-size: 15px;
    line-height: 20px;
  `,
  Footnote: styled(PretendardRegular)`
    font-size: 13px;
    line-height: 18px;
  `,
  Caption1: styled(PretendardRegular)`
    font-size: 12px;
    line-height: 16px;
  `,
  Caption2: styled(PretendardRegular)`
    font-size: 11px;
    line-height: 13px;
  `,
};
