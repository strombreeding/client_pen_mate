import styled from "styled-components";
import { EmptyBox } from "../../styles";
import { imgSrc } from "../../assets/img";
import Bell26 from "../designs/26px/Bell_26";
import Dm_26 from "../designs/26px/Dm_26";
import { Fragment } from "react";
import { Text } from "../../assets/fontStyles";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 30px 15px 30px;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  width: 100%;
`;
export const RowView = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderHome = () => {
  return (
    <Header>
      <Text.Esa_Bold_16>홈</Text.Esa_Bold_16>
      <RowView>
        <Bell26 />
        <EmptyBox width={20} />
        <Dm_26 />
      </RowView>
    </Header>
  );
};

export default HeaderHome;
