import {
  MouseEventHandler,
  SetStateAction,
  TouchEventHandler,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text } from "../assets/fontStyles";
import { View } from "../nativeView";
import { Container, EmptyBox } from "../styles";
import { SCREEN_WIDTH } from "../configs/device";
import { useBlocker, useNavigate } from "react-router-dom";
import { gameImg } from "../assets/gameImg";
import { langueage } from "../configs/language";
import BottomModal from "../components/games/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  GameTitle,
  setGameSelectState,
  setGameState,
} from "../store/slices/gameState";
import { setBgImg, setLoading } from "../store/slices/appState";
import { imgSrc } from "../assets/img";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import { usePageState } from "../hooks/getVisitedPage";
import axios from "axios";
import { SERVER_URI } from "../configs/server";
import GameCard from "../components/games/card/Card";
import Cookies from "js-cookie";
import { allSfx } from "../assets/sound";
import { useAudio } from "../hooks/useAudio";
import MatchingModal from "../components/games/bang/detail/MatchingModal";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

const initOffsetX = SCREEN_WIDTH - SCREEN_WIDTH * 0.2 * 2;
const caculMoveValue = SCREEN_WIDTH * 0.736111111;
let touchStartX = 0;
let touchEndX = 0;

// == 컴포넌트

export interface GameProps {
  id: string;
  title: GameTitle;
  description: string;
  minReward: number;
  cost: number;
  matchType: string[];
  player: string[];
  img: string;
}

type Tx = {
  retry: () => void;
};
const SelectGames = () => {
  const pageState = usePageState();
  const slideAudio = useAudio(allSfx.slide);
  const clickAudio = useAudio(allSfx.click);
  const matchStart = useSelector(
    (state: RootState) => state.bangState.matchStart
  );
  const [ready, setReady] = useState(false);
  const [games, setGames] = useState<GameProps[]>([{}, {}, {}] as GameProps[]);
  const [idx, setIdx] = useState(2);
  const [scrollSection, setScrollSection] = useState<number[]>([]);
  const choiceTitle = useSelector(
    (state: RootState) => state.gameState.status.gameTitle
  );
  const dispatch = useDispatch<AppDispatch>();
  const dragRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigate();
  useEffect(() => {}, []);
  const req = async () => {
    dispatch(setLoading(true));
    const res = await axios.get(SERVER_URI + "game");
    const data = res.data.result;
    data[0].img = gameImg.junkyard;
    data[1].img = gameImg.tetris_img;
    data[2].img = gameImg.bang_img;
    const startData = data[0];
    const endData = data[data.length - 1];
    const newList = [startData, endData, ...data, startData, endData];
    let subLange = initOffsetX;
    const lange = newList.map((game, i) => {
      if (i === 0) return subLange - caculMoveValue;

      if (i === 1) return subLange;

      subLange = subLange + caculMoveValue;

      return subLange;
    });
    setScrollSection(lange);
    setGames(newList);
    setReady(true);
    setTimeout(() => dispatch(setLoading(false)), 300);
  };

  useEffect(() => {
    req();

    dispatch(setBgImg(imgSrc.bg_game));
    dispatch(setGameSelectState("move"));
    dispatch(setGameState({ gameTitle: undefined }));
    // dispatch(setCanPopstateEvent(false));
    return () => {
      dispatch(setBgImg(undefined));
      dispatch(setGameSelectState("move"));
      dispatch(setGameState({ gameTitle: undefined }));
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current === null) return;
    scrollRef.current.style.transform = `translateX(-${scrollSection[idx]}px)`;
    // scrollRef.current.style.transition = "all 0.15s ease-in-out";
    dragRef.current = -1;
  }, [idx, ready]);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setIdx(index);
      if (scrollRef.current !== null) {
        scrollRef.current.style.transition = "";
      }
    }, 100);
  };

  const handleSwipe = (direction: number) => {
    const newIndex = idx + direction;

    if (newIndex === games.length - 2) {
      moveToNthSlide(2);
    } else if (newIndex === 1) {
      moveToNthSlide(games.length - 3);
    }
    dispatch(setGameSelectState("move"));
    setIdx((prev) => prev + direction);
    if (scrollRef.current !== null) {
      scrollRef.current.style.transition = "all 0.15s ease-in-out";
    }
  };

  const gameSelectState = useSelector(
    (state: RootState) => state.gameState.selectState
  );
  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (gameSelectState === "choice") return;
    touchStartX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = scrollSection[idx];
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (gameSelectState === "choice") return;
    touchStartX = e.clientX;
    dragRef.current = scrollSection[idx];
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (gameSelectState === "choice") return;

    if (scrollRef.current == null) return;

    if (dragRef.current < 0) return;

    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX > currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        scrollSection[idx] + 8
      }px)`;
      // scrollRef.current.style.transition = "all 0.15s ease-in-out";

      // dragRef.current = -1;
    } else if (touchStartX < currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        scrollSection[idx] - 8
      }px)`;
      // scrollRef.current.style.transition = "all 0.15s ease-in-out";

      // dragRef.current = -1;
    }
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;
    // dragRef.current = -1;
    // if (touchStartX === touchEndX) return;
    dispatch(setGameState({ gameTitle: undefined }));

    if (touchStartX - touchEndX > 10 && gameSelectState === "move") {
      handleSwipe(1);
      slideAudio.play();
    } else if (touchStartX - touchEndX < -10 && gameSelectState === "move") {
      handleSwipe(-1);
      slideAudio.play();
    } else {
      clickAudio.play();
      onClick();
    }
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.clientX;
    // dragRef.current = -1;
    console.log("마우스 뗏다");
    dispatch(setGameState({ gameTitle: undefined }));
    // if (touchStartX > touchEndX) {
    if (touchStartX - touchEndX > 10 && gameSelectState === "move") {
      handleSwipe(1);
      slideAudio.play();
    } else if (touchStartX - touchEndX < -10 && gameSelectState === "move") {
      // } else if (touchStartX < touchEndX) {
      handleSwipe(-1);
      slideAudio.play();
    } else {
      clickAudio.play();
      onClick();
    }
  };

  const onClick = () => {
    // dispatch(setChoiceTitle(games[idxsetGameState({gameTitle:undefined}))
    dispatch(
      setGameState({
        gameTitle: games[idx].title,
        matchType: games[idx].matchType[0],
        cost: games[idx].cost,
        player: games[idx].player[0],
      })
    );
    dispatch(setGameSelectState("choice"));
    // navigation("/games/" + games[idx].id);
  };

  return (
    <Container style={styles.container}>
      {/* <EmptyBox height={50} /> */}
      <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Regular_20>{langueage.gameSelect[0]}</Text.Regular_20>
          <View style={{ flexDirection: "row" }}>
            <img
              src={imgSrc.atata_un}
              style={{ width: 20, height: 20, marginTop: -3 }}
            />
            <Text.Spo_Medium_16>{100}</Text.Spo_Medium_16>
          </View>
        </View>
        <EmptyBox height={35} />
      </View>

      {/* scroll View */}
      <View
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        // onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={scrollRef}
        style={styles.scrollView}
      >
        {games.map((gameProp, index) => {
          const selected = isFocused(idx, games.length, index);

          return (
            <GameCard gameProps={gameProp} key={index} selected={selected} />
          );
        })}
      </View>

      <EmptyBox style={{ flex: 1 }} />
      <BottomPrevNext
        style={{ flex: 1 }}
        prevAction={() => navigation("/", { replace: true })}
        visible={choiceTitle === undefined}
      />
      <MatchingModal />
      {/* <BottomModal visible={choiceTitle !== undefined} /> */}
    </Container>
  );
};

export default memo(SelectGames);

const styles: { [key: string]: React.CSSProperties } = {
  scrollView: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    cursor: "pointer",
  },
  container: { overflow: "hidden", padding: "30px 15px 30px 15px", flex: 1 },
};

// methods

const isFocused = (idx: number, gamesLength: number, itemIndex: number) => {
  let selected = false;
  if (idx === itemIndex) {
    selected = true;
  } else if (
    (idx === 2 || idx === gamesLength - 2) &&
    (itemIndex === 2 || itemIndex === gamesLength - 2)
  ) {
    selected = true;
  } else if (
    (idx === 1 || idx === gamesLength - 3) &&
    (itemIndex === 1 || itemIndex === gamesLength - 3)
  ) {
    selected = true;
  }
  return selected;
};
