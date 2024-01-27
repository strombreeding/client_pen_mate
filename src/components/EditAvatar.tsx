import { useCallback, useEffect, useState } from "react";
import { Container, EmptyBox, Text, Wrap, colors } from "../styles";
import SimpleHeader from "./SimpleHeader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setOverFlow } from "../store/slices/appState";
import { imgSrc } from "../assets/img";

const AvatarView = styled.div`
  /* position: sticky; */
  /* top: calc(7px+56px) px; */
  /* top: 100px;
  right: 50px;
  left: 50px; */
  width: ${SCREEN_WIDTH * 0.722222}px;
  height: ${SCREEN_WIDTH * 0.722222}px;
  border-radius: 52px;
  border: 2px solid ${colors.Grey100};
  background-color: rgba(235, 235, 240, 0.5);
`;
const SelectModal = styled.div`
  position: sticky;
  top: 324px;
  max-height: ${SCREEN_HEIGHT}px;
  overflow: unset;
  margin-top: -15px;
  z-index: 1;
  padding: 30px 20px 0px 20px;
  border: 1px solid ${colors.Grey100};
  border-radius: 30px 30px 0px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
`;

const CategoryBtn = styled.div`
  padding: 7.5px;
  border: 1px solid ${colors.Grey100};
  min-width: 40px;
  margin-right: 15px;
  border-radius: 6px;
  background-color: #ebebf040;
`;

const ItemContainer = styled.div`
  padding: 0px 15px 0px 15px;
  min-width: ${SCREEN_WIDTH * 0.80556}px;
  /* width: ${SCREEN_WIDTH * 0.80556}px; */
  overflow-y: hidden;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  display: grid;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const ItemBtn = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  white-space: nowrap;
  /* width: 90px; */
  aspect-ratio: 1;
  background-color: #ebebf040;
  border: 1.5px solid ${colors.Grey100};
  padding: 22.5px;
  border-radius: 18px;
  box-sizing: border-box;
`;

const PriceGuideView = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 20px;
  border-radius: 0px 16.5px 0px 16.5px;
  padding: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #00000040;
`;

const InkImg = styled.img`
  width: 9px;
  height: 9px;
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
  { id: "!#!112@#67$$", name: "상처", price: 150, category: "헤어" },
  { id: "!#!@#334$$", name: "홍조", price: 150, category: "헤어" },
  { id: "!#!@#3314$$", name: "여드름", price: 150, category: "헤어" },
  { id: "fw12g1", name: "검정", price: 150, category: "헤어" },
  { id: "fw6g1", name: "옐로", price: 150, category: "헤어" },
  { id: "fw436g1", name: "좀비", price: 150, category: "헤어" },
  { id: "fw4g1", name: "그린", price: 150, category: "헤어" },
  { id: "f6wg1", name: "화이트", price: 150, category: "헤어" },
  { id: "fw7g1", name: "검정", price: 150, category: "헤어" },
  { id: "fw7125g1", name: "코트", price: 150, category: "헤어" },
  { id: "fw7]125g1", name: "코트", price: 150, category: "헤어" },
  { id: "fw12ㅎㄷ5g1", name: "코트", price: 150, category: "헤어" },
  { id: "fw7125ㅎg1", name: "코트", price: 150, category: "헤어" },
  { id: "fw7125gㅎㅎ1", name: "코트", price: 150, category: "헤어" },
  { id: "fw7125gㅗㅗ1", name: "코트", price: 150, category: "헤어" },
];
const EditAvatar: React.FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLogged = useSelector((state: RootState) => state.userState.logedIn);
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
    <Container style={{ position: "relative", height: "100vh" }}>
      <SimpleHeader goBack={navigate} />

      <EmptyBox height={7} />

      <AvatarView />
      <SelectModal>
        <div
          style={{
            position: "sticky",
            top: 30,
            // flexDirection: "row",
            width: "100%",
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            marginRight: -20,
            // margin: "0px -20px 0px 0px",
            // padding: "0px 20px 0px 20px",
          }}
        >
          {category.map((item, i) => {
            return (
              <CategoryBtn onClick={onClickCategory(item)}>
                <Text.Caption2 color={colors.Grey600}>{item}</Text.Caption2>
              </CategoryBtn>
            );
          })}
        </div>

        <EmptyBox height={20} />

        <ItemContainer style={{}}>
          {items.map((item, i) => {
            if (item.category === slectCategory) {
              return (
                <ItemBtn key={item.id}>
                  {true && (
                    <PriceGuideView>
                      <InkImg src={imgSrc.ink} />
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
