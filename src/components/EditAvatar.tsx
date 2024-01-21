import { useCallback, useEffect, useState } from "react";
import { Container, EmptyBox, Text, Wrap, colors } from "../styles";
import SimpleHeader from "./SimpleHeader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SCREEN_WIDTH } from "../configs/device";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setOverFlow } from "../store/slices/appState";

const AvatarView = styled.div`
  /* position: absolute; */
  top: calc(7px+56px);
  right: 50px;
  left: 50px;
  width: ${SCREEN_WIDTH * 0.722222}px;
  height: ${SCREEN_WIDTH * 0.722222}px;
  border-radius: 52px;
  border: 2px solid ${colors.Grey100};
  background-color: rgba(235, 235, 240, 0.5);
`;
const SelectModal = styled.div`
  margin-top: -15px;
  z-index: 1;
  padding: 30px 20px 0px 20px;
  border: 1px solid ${colors.Grey100};
  border-radius: 30px 30px 0px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
`;

const ItemBtn = styled.div<{
  width?: number | string;
  height: number;
  padding: string;
  radius: number;
}>`
  white-space: nowrap;
  min-width: 38px;
  width: ${(props) => (props.width != null ? props.width + "px" : "auto")};
  height: ${(props) => props.height}px;
  border: 1px solid ${colors.Grey100};
  border-radius: ${(props) => props.radius}px;
  padding: ${(props) => props.padding};
  text-align: center;
  background-color: rgba(235, 235, 240, 0.5);
`;

const PriceGuideView = styled.div`
  position: absolute;
  bottom: 1px;
  left: 1px;
  border-radius: 0px 17px 0px 17px;
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.Black};
  opacity: 0.4;
`;

const ItemContainer = styled.div`
  padding: 0px 15px 0px 15px;
  overflow: unset;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const InkImg = styled.div`
  width: 9px;
  height: 9px;
  background-color: ${colors.Grey100};
`;

interface IAvatarItems {
  id: string;
  name: string;
  price: number;
  category: string; // 나중에 카테고리 타입을 넣어도 될듯
}
const MockCategories = [
  "헤어",
  "얼굴",
  "피부",
  "염색",
  "착장",
  "착장",
  "착장",
  "착장",
  "착장",
  "착장",
  "착장",
];
const MockItem: IAvatarItems[] = [
  { id: "!@#!@#$$", name: "산발", price: 0, category: "헤어" },
  { id: "!@#!@$$", name: "꽁지", price: 10, category: "헤어" },
  { id: "!@#!#$$", name: "말똥", price: 50, category: "헤어" },
  { id: "!@!@35$$", name: "비대칭", price: 100, category: "헤어" },
  { id: "!#123!@#$$", name: "빡빡이", price: 150, category: "헤어" },
  { id: "!#!112@#67$$", name: "상처", price: 150, category: "얼굴" },
  { id: "!#!@#334$$", name: "홍조", price: 150, category: "얼굴" },
  { id: "!#!@#3314$$", name: "여드름", price: 150, category: "얼굴" },
  { id: "fw12g1", name: "검정", price: 150, category: "피부" },
  { id: "fw6g1", name: "옐로", price: 150, category: "피부" },
  { id: "fw436g1", name: "좀비", price: 150, category: "피부" },
  { id: "fw4g1", name: "그린", price: 150, category: "피부" },
  { id: "f6wg1", name: "화이트", price: 150, category: "피부" },
  { id: "fw7g1", name: "검정", price: 150, category: "염색" },
  { id: "fw7125g1", name: "코트", price: 150, category: "착장" },
];
const EditAvatar: React.FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  // const;
  const [category, setCategory] = useState([""] as string[]);
  const [items, setItems] = useState([] as IAvatarItems[]);
  const [slectCategory, setSelectCategory] = useState("");
  const [avatar, setAvatar] = useState({
    hair: "",
    face: "",
    skin: "",
    hairColor: "",
    wear: "",
  });

  const navigate = useNavigate();

  const onClickCategory = useCallback(
    (category: string) => () => {
      setSelectCategory(category);
    },
    []
  );

  useEffect(() => {
    setCategory(MockCategories);
    setItems(MockItem);
    setSelectCategory(MockCategories[0]);
    dispatch(setOverFlow(true));

    return () => {
      dispatch(setOverFlow(false));
    };
  }, []);

  return (
    <Container style={{ position: "relative" }}>
      <SimpleHeader goBack={navigate} />

      <EmptyBox height={7} />

      <AvatarView />
      <SelectModal>
        <div
          style={{
            flexDirection: "row",
            width: "auto",
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            margin: "0px -20px 0px 0px",
            padding: "0px 20px 0px 0px",
          }}
        >
          {category.map((item, i) => {
            return (
              <ItemBtn
                onClick={onClickCategory(item)}
                style={{ marginRight: 20 }}
                height={30}
                padding="8px"
                radius={6}
                key={i}
              >
                <Text.Caption2>{item}</Text.Caption2>
              </ItemBtn>
            );
          })}
        </div>

        <EmptyBox height={20} />

        <ItemContainer>
          {items.map((item, i) => {
            if (item.category === slectCategory) {
              return (
                <ItemBtn
                  key={item.id}
                  width={90}
                  height={90}
                  radius={18}
                  padding="23px"
                >
                  {true && (
                    <PriceGuideView>
                      <InkImg />
                      <Text.Caption2 color="#FFFFFF">
                        {item.price}
                      </Text.Caption2>
                    </PriceGuideView>
                  )}
                </ItemBtn>
              );
            }
          })}
        </ItemContainer>
      </SelectModal>
    </Container>
  );
};

export default EditAvatar;
