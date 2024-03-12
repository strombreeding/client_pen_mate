import { Dispatch, SetStateAction, memo } from "react";
import { Pressable } from "../../../../nativeView";
import { Socket, io } from "socket.io-client";
import { SOCKET_URI } from "../../../../configs/server";
import { gameImg } from "../../../../assets/gameImg";
import { SCREEN_WIDTH } from "../../../../configs/device";
import styled from "styled-components";

interface IActionBtnProps {
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

const ActionImg = styled.img`
  position: absolute;
  top: ${SCREEN_WIDTH / 1.5 / 3.5}px;
  width: ${SCREEN_WIDTH * 0.2777777777777778}px;
  height: ${SCREEN_WIDTH * 0.2777777777777778}px;
`;

function MatchBtn({ setSocket }: IActionBtnProps) {
  return (
    <Pressable
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => {
        //   socket;
        setSocket(
          io(`${SOCKET_URI}`, {
            transports: ["websocket"],
          })
        );
      }}
    >
      <img
        src={gameImg.action_btn}
        style={{
          width: SCREEN_WIDTH / 1.5,
          height: SCREEN_WIDTH / 1.5,
        }}
      />
    </Pressable>
  );
}

export default memo(MatchBtn);
