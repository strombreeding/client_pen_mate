import styled from "styled-components";
import { EmptyBox } from "../../styles";
import { imgSrc } from "../../assets/img";
import { Fragment } from "react";
import { Text } from "../../assets/fontStyles";
import { View } from "../../nativeView";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px 0px 20px;
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
  const point = 1004;
  return (
    <Header>
      <View>
        <Text.Regular_16>esaynee_</Text.Regular_16>
        <EmptyBox height={4} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <img src={imgSrc.atata_point} style={{ width: 20, height: 20 }} />
          {/* <EmptyBox width={5} /> */}
          <Text.Spo_Medium_16>{point}p</Text.Spo_Medium_16>
        </View>
      </View>
      <RowView>
        <EmptyBox width={20} />
      </RowView>
    </Header>
  );
};

export default HeaderHome;
