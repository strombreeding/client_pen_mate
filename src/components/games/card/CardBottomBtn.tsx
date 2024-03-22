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
import { getDecryptedCookie, setEncryptedCookie } from "../../../utils/cookies";
import { setMatchStart } from "../../../store/slices/bangState";
import { IPopupProps, setPopup } from "../../../store/slices/appState";
import { IRecordGameProps, recordGame } from "../../../apis/recordGame";
import { checkCost } from "../../../apis/game";
import { setInfomation } from "../../../store/slices/userState";
import { setStorageCrypto } from "../../../utils/localStorage";

function CardBottomBtn({
  setSpecial,
  gameProps,
}: {
  setSpecial: Dispatch<SetStateAction<boolean>>;
  gameProps: GameProps;
}) {
  const [clicked, setClicked] = useState(false);
  const [enough, setEnough] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const matchStart = useSelector(
    (state: RootState) => state.bangState.matchStart
  );
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector((state: RootState) => state.gameState.status);
  const checkOutCost = async () => {
    try {
      const canCreateRecord = await checkCost(gameProps.costObj);
      return canCreateRecord;
    } catch (err: any) {
      setEnough(err.message);
    }
  };
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  const gameCreateReq = async () => {
    try {
      // setLoading(true);
      const props = {
        gameTitle: gameState.gameTitle!,
        costObj: gameProps.costObj,
      };
      const { record, updateSource } = await recordGame(props);

      const updateStateList = Object.entries(updateSource);
      updateStateList.map((item) => {
        const key = item[0];
        const value = item[1];
        setStorageCrypto(key, value);
      });

      const cookieData = { ...record };

      dispatch(setInfomation({ ...infomation, ...updateSource }));
      setEncryptedCookie("ingame", cookieData);
      console.log(getDecryptedCookie("ingame"));
      navigation(`/games/${gameProps.game_url}`);
    } catch (err: any) {
      setEnough(err.message);
    } finally {
      // setLoading(false);
    }
  };
  const matchFound = useSelector(
    (state: RootState) => state.bangState.matchFound
  );
  const bangMatch = () => {
    const canCreateRecord = checkOutCost();
    if (!canCreateRecord) return;

    dispatch(setMatchStart(true));
  };
  const bangCancelMatch = () => {
    dispatch(setMatchStart(false));
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
            if (gameState.gameTitle === "결투!" && matchStart) {
              bangCancelMatch();
              return;
            }
            dispatch(setGameState({ gameTitle: undefined }));
            dispatch(setGameSelectState("move"));
            setSpecial(true);
          }}
        >
          <Text.Light_12>{matchStart ? "취소" : "이전"}</Text.Light_12>
        </PrevBtn>
        <EmptyBox width={5} />
        <PrevBtn
          style={{
            backgroundColor: colors.Main_Button1,
            height: 50,
            opacity: matchStart || clicked ? 0.5 : 1,
          }}
          onClick={() => {
            if (clicked) return;

            if (gameState.gameTitle === "결투!" && !matchStart) {
              bangMatch();
            } else if (matchStart) {
            } else {
              setClicked(true);
              gameCreateReq();
            }
          }}
        >
          <Text.Light_12>
            {gameState.gameTitle === "결투!" ? "매칭" : "시작"}
          </Text.Light_12>
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
