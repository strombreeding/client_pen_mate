import {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text } from "../assets/fontStyles";
import { View } from "../nativeView";
import { Container, EmptyBox } from "../styles";
import GameCard from "../components/designs/Card";
import { SCREEN_WIDTH } from "../configs/device";
import { useNavigate } from "react-router-dom";
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
import { setBgImg } from "../store/slices/appState";
import { imgSrc } from "../assets/img";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import { usePageState } from "../hooks/getVisitedPage";
import axios from "axios";

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

const SelectGames = () => {
  const pageState = usePageState();
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

  const req = async () => {
    const res = await axios.get("http://localhost:8080/game");
    const data = res.data.data;
    data[0].img = gameImg.junkyard;
    data[1].img = gameImg.tetris_img;
    data[2].img = gameImg.bang_img;
    const startData = data[0];
    const endData = data[data.length - 1];
    const newList = [startData, endData, ...data, startData, endData];
    console.log(newList);
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
  };

  useEffect(() => {
    req();

    return () => {
      console.log("언마운트");
    };
  }, []);

  useEffect(() => {
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
  }, [idx, ready]);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setIdx(index);
      if (scrollRef.current !== null) {
        scrollRef.current.style.transition = "";
      }
    }, 250);
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
      scrollRef.current.style.transition = "all 0.25s ease-in-out";
    }
  };

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = scrollSection[idx];
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.clientX;
    dragRef.current = scrollSection[idx];
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (scrollRef.current == null) return;

    if (dragRef.current < 0) return;

    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX > currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        scrollSection[idx] + 8
      }px)`;
      scrollRef.current.style.transition = "all 0.25s ease-in-out";

      // dragRef.current = -1;
    } else if (touchStartX < currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        scrollSection[idx] - 8
      }px)`;
      scrollRef.current.style.transition = "all 0.25s ease-in-out";

      // dragRef.current = -1;
    }
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = -1;
    // if (touchStartX === touchEndX) return;
    dispatch(setGameState({ gameTitle: undefined }));

    if (touchStartX > touchEndX) {
      handleSwipe(1);
    } else if (touchStartX < touchEndX) {
      handleSwipe(-1);
    } else {
      onClick();
    }
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.clientX;
    dragRef.current = -1;
    console.log("마우스 뗏다");
    dispatch(setGameState({ gameTitle: undefined }));
    if (touchStartX > touchEndX) {
      handleSwipe(1);
    } else if (touchStartX < touchEndX) {
      handleSwipe(-1);
    } else {
      onClick();
    }
  };

  const onClick = () => {
    // dispatch(setChoiceTitle(games[idxsetGameState({gameTitle:undefined}))
    dispatch(setGameState({ gameTitle: games[idx].title }));
    dispatch(setGameSelectState("choice"));
    // navigation("/games/" + games[idx].id);
  };

  if (!ready) return <></>;
  return (
    <Container style={styles.container}>
      {/* <EmptyBox height={50} /> */}
      <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
        <Text.Regular_20>{langueage.gameSelect[0]}</Text.Regular_20>
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
      <BottomPrevNext style={{ flex: 1 }} visible={choiceTitle === undefined} />
      {/* <BottomModal visible={choiceTitle !== undefined} /> */}
    </Container>
  );
};

export default SelectGames;

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
