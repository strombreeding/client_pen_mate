import styled from "styled-components";
import { EmptyBox } from "../../styles";
import { imgSrc } from "../../assets/img";
import { Fragment, memo } from "react";
import { Text } from "../../assets/fontStyles";
import { View } from "../../nativeView";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SCREEN_WIDTH } from "../../configs/device";
import HeaderPoint from "../HeaderPoint";

const Header = styled.div`
  display: flex;
  padding: 30px 15px 0px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  width: 100%;
`;
export const RowView = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderHome = () => {
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  console.log(infomation);
  return (
    <Header>
      <Text.Regular_16>{infomation.nickname}</Text.Regular_16>

      <HeaderPoint />
    </Header>
  );
};

export default memo(HeaderHome);
