import { CSSProperties } from "styled-components";
import { View } from "../../../nativeView";
import { Text } from "../../../assets/fontStyles";
import { useNavigate } from "react-router-dom";
import { PrevBtn } from "../../navigations/BottomPrevNext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  setGameSelectState,
  setGameState,
} from "../../../store/slices/gameState";
import { Dispatch, SetStateAction, memo, useState } from "react";
import { EmptyBox } from "../../../styles";
import { colors } from "../../../assets/colors";
import { imgSrc } from "../../../assets/img";
import { GameProps } from "../../../pages/SelectGames";
import axios from "axios";
import { SERVER_URI } from "../../../configs/server";
import Shake from "../../animations/Shake";
import LoadingLottie from "../../LoadingLottie";
import { setEncryptedCookie } from "../../../utils/cookies";

function CardBottomBtn({
  setSpecial,
  gameProps,
}: {
  setSpecial: Dispatch<SetStateAction<boolean>>;
  gameProps: GameProps;
}) {
  const [enough, setEnough] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const gameCreateReq = async () => {
    setLoading(true);
    try {
      const res = await axios.post(SERVER_URI + "game/new", gameState);
      console.log(res.data.result);
      navigation(`/games/${gameProps.id}`);
      const cookieData = { ...gameState, id: res.data.result.id };
      setEncryptedCookie("ingame", cookieData);
    } catch (err: any) {
      if (err.message === "NOT ENOUGH") {
        setEnough("포인트가 부족합니다!");
      } else {
        setEnough("문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {enough.length > 0 && (
        <Shake>
          <Text.Regular_20 color="#F828B1" style={{ fontSize: 14 }}>
            {enough}
          </Text.Regular_20>
        </Shake>
      )}
      {loading && (
        <View>
          <LoadingLottie />
        </View>
      )}
      <View style={styles.contentView}>
        <PrevBtn
          style={{ height: 50 }}
          onClick={() => {
            dispatch(setGameState({ gameTitle: undefined }));
            dispatch(setGameSelectState("move"));
            setSpecial(true);
          }}
        >
          <Text.Light_12>{"이전"}</Text.Light_12>
        </PrevBtn>
        <EmptyBox width={5} />
        <PrevBtn
          style={{ backgroundColor: colors.Main_Button1, height: 50 }}
          onClick={gameCreateReq}
        >
          <Text.Light_12>시작</Text.Light_12>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text.Light_12 style={{ fontSize: 10 }}>
              -{gameProps.cost}
            </Text.Light_12>
            <img
              src={imgSrc.atata_un}
              style={{ width: 12, aspectRatio: 1, marginTop: -2 }}
            />
          </View>
        </PrevBtn>
      </View>
    </>
  );
}

export default memo(CardBottomBtn);

const styles: {
  [key: string]: CSSProperties;
} = {
  contentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
