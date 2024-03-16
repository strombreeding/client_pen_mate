import { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { SCREEN_WIDTH } from "../../../../configs/device";
import { Text } from "../../../../assets/fontStyles";

const ChatView = styled.div`
  position: absolute;
  top: -25px;
  left: 25px;
  width: ${SCREEN_WIDTH * 0.15}px;
  padding: 5px;
  border-radius: 5px;
  background-color: #ffffff7f;
  text-align: center;
`;

function ChatBox({ chat }: { chat: string[] }) {
  const chatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        console.log("말풍선의 높이가 변경되었습니다:", height);
        // 여기서 말풍선의 크기에 따른 추가적인 작업을 수행할 수 있습니다.
      }
    });

    if (chatRef.current) {
      resizeObserver.observe(chatRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ChatView
      style={{
        display: chat.length >= 1 ? "flex" : "none",
      }}
      ref={chatRef}
    >
      <Text.Spo_Light_12
        style={{ fontSize: 10, color: "black" }}
        // numOf2Lines
      >
        {chat[0]}
        {"\n"}
        {chat[1]}
      </Text.Spo_Light_12>
    </ChatView>
  );
}

export default ChatBox;
