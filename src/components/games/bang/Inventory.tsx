import styled from "styled-components";
import { Pressable, ScrollView, View } from "../../../nativeView";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../configs/device";
import { Text } from "../../../assets/fontStyles";
import { EmptyBox } from "../../../styles";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Ablilty,
  IMessageProps,
  IStatusProps,
  ItemProps,
  TerminelProps,
} from "../../../pages/Bang";
import { gameImg } from "../../../assets/gameImg";
import { imgSrc } from "../../../assets/img";
import SoundPressable from "../../designs/SoundPressable";

const InitModal = styled(View)`
  z-index: 2;
  position: absolute;
  top: ${SCREEN_HEIGHT / 7}px;
  padding: 20px;
  width: 90%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px) contrast(90%);
  -webkit-backdrop-filter: blur(2px) contrast(90%);
  border-radius: 20px;
`;

const GridItemView = styled(View)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const ItemImg = styled.img`
  width: ${SCREEN_WIDTH * 0.137777777777778}px;
  height: ${SCREEN_WIDTH * 0.137777777777778}px;
`;
const ItemSlot = styled(Pressable)`
  margin: 3px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
`;

interface InventoryProps {
  bag: ItemProps[];
  ability: Ablilty;
  setBag: Dispatch<SetStateAction<ItemProps[]>>;
  setAbility: Dispatch<SetStateAction<Ablilty>>;
  setStatus: Dispatch<SetStateAction<IStatusProps>>;
  setTerminel: Dispatch<SetStateAction<TerminelProps>>;
  sendData: (data: IMessageProps) => () => void;
}

function Inventory({
  ability,
  bag,
  setBag,
  setAbility,
  sendData,
  setStatus,
  setTerminel,
}: InventoryProps) {
  const [checkItem, setCheckItem] = useState<number[]>([]);
  const [inventory, setInventory] = useState([
    {
      cnt: 0,
      description: "공격력 1짜리",
      type: "atk",
      itemImg: gameImg.action_atk,
      cost: 1,
      skil: null,
    },
    {
      cnt: 12,
      description: "회복포션",
      type: "util",
      itemImg: gameImg.action_btn,
      cost: 1,
      skil: null,
    },
    {
      cnt: 1,
      description: "이속증가",
      type: "atk",
      itemImg: gameImg.action_jump,
      cost: 3,
      skil: "확산",
    },
  ] as ItemProps[]);
  return (
    <InitModal>
      <Text.Light_32>장착</Text.Light_32>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {bag.map((item, index) => {
          return (
            <ItemSlot>
              {item.itemImg == null ? (
                <EmptyBox
                  width={SCREEN_WIDTH * 0.137777777777778}
                  height={SCREEN_WIDTH * 0.137777777777778}
                />
              ) : (
                <>
                  <Pressable
                    onClick={() => {
                      const newBag = [...bag];
                      newBag.splice(index, 1);
                      newBag.push({});
                      setBag([...newBag]);
                      const newCheckItem = [...checkItem];
                      newCheckItem.splice(index, 1);
                      const newAbility = { ...ability };
                      if (item.type === "atk") {
                        newAbility.atk = newAbility.atk - item.cost!;
                      } else if (item.type === "util") {
                        newAbility.subHealth =
                          newAbility.subHealth - item.cost!;
                      }
                      if (item.skil != null) {
                        const skilIdx = ability.skil.indexOf(item.skil);
                        newAbility.skil.splice(skilIdx, 1);
                        console.log(item.skil, skilIdx);
                      }
                      console.log(item.skil);
                      console.log(item);

                      setAbility({ ...newAbility });
                      setCheckItem([...newCheckItem]);
                    }}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <img src={imgSrc.close} width={20} />
                  </Pressable>
                  <ItemImg src={item.itemImg} />
                </>
              )}
            </ItemSlot>
          );
        })}
      </View>
      <EmptyBox height={10} />
      <Text.Light_32>인벤토리</Text.Light_32>
      <ScrollView style={{ height: SCREEN_HEIGHT / 5 }}>
        <GridItemView>
          {inventory.map((item, index) => {
            return (
              <ItemSlot
                style={checkItem.includes(index) ? { opacity: 0.3 } : {}}
                onClick={() => {
                  if (checkItem.includes(index)) return;
                  if (bag[2].itemImg != undefined) return;
                  const current = bag.filter(
                    (item, a) => Object.values(item).length > 1
                  );
                  console.log(current.length);
                  const newBag = [...bag];
                  const newIdx = current.length;
                  newBag[newIdx] = {
                    cnt: item.cnt,
                    cost: item.cost,
                    description: item.description,
                    itemImg: item.itemImg,
                    type: item.type,
                    skil: item.skil,
                  };
                  const newAbility = { ...ability };
                  if (item.type === "atk") {
                    newAbility.atk = newAbility.atk + item.cost!;
                  } else if (item.type === "util") {
                    newAbility.subHealth = newAbility.subHealth + item.cost!;
                  }
                  if (item.skil) {
                    newAbility.skil.push(item.skil!);
                  }
                  console.log(item.skil);
                  setAbility({ ...newAbility });
                  setCheckItem([...checkItem, index]);
                  setBag([...newBag]);
                }}
              >
                <ItemImg src={item.itemImg} />
                <Text.Light_12
                  style={{ position: "absolute", bottom: 2, right: 5 }}
                >
                  {item.cnt}
                </Text.Light_12>
              </ItemSlot>
            );
          })}
        </GridItemView>
      </ScrollView>
      <EmptyBox height={10} />

      <View style={{ width: "100%", alignItems: "center" }}>
        <Text.Light_32>능력치</Text.Light_32>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>공격력</Text.Light_16>
          <Text.Light_16>{ability.atk}</Text.Light_16>
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>체력</Text.Light_16>
          <Text.Light_16>{ability.health}</Text.Light_16>
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>방어구</Text.Light_16>
          <Text.Light_16>{ability.subHealth}</Text.Light_16>
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>특수능력</Text.Light_16>
          <Text.Light_16>{[...ability.skil]}</Text.Light_16>
        </View>
      </View>
      <EmptyBox height={20} />
      <SoundPressable
        onClick={() => {
          const dataObj = {
            ...ability,
          };
          sendData({ type: "상대능력", data: dataObj })();
          setStatus((prev) => ({
            ...prev,
            me: {
              ...prev.me,
              health: dataObj.health,
              subHealth: dataObj.subHealth,
            },
          }));
          setTerminel((prev) => ({ ...prev, me: "initDone" }));
        }}
      >
        <Text.Light_24>정비 완료</Text.Light_24>
      </SoundPressable>
    </InitModal>
  );
}

export default Inventory;
