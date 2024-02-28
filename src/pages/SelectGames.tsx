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
import { GameTitle, setGameState } from "../store/slices/gameState";
import GameBg from "../components/designs/GameBG";
import { setBgImg } from "../store/slices/appState";
import { imgSrc } from "../assets/img";
import BottomLayer from "../components/navigations/BottomLayer";
import BottomPrevNext from "../components/navigations/BottomPrevNext";
import { usePageState } from "../hooks/getVisitedPage";

const initOffsetX = SCREEN_WIDTH - SCREEN_WIDTH * 0.2 * 2;
const caculMoveValue = SCREEN_WIDTH * 0.736111111;
let touchStartX = 0;
let touchEndX = 0;

// == 컴포넌트

interface IGamesProps {
  id: string;
  title: GameTitle;
  description: string;
  img: string;
}

const SelectGames = () => {
  const pageState = usePageState();

  const [games, setGames] = useState<IGamesProps[]>([
    {
      id: "sachunsung",
      title: "우주 고철장",
      description: "시간 내에 많은 짝을 맞추고 AP를 얻으세요!",
      img: gameImg.junkyard,
    },
    { id: "bang", title: "BANG!", description: "어제", img: gameImg.bang_img },
    {
      id: "tetris",
      title: "테트리스",
      description: "오랜시간 생존하여 AP를 얻으세요!",
      img: gameImg.tetris_img,
    },
  ]);
  const [idx, setIdx] = useState(2);
  const choiceTitle = useSelector(
    (state: RootState) => state.gameState.status.gameTitle
  );
  const dispatch = useDispatch<AppDispatch>();

  const langeRef = useRef<number[]>([]);
  const dragRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigate();

  // const preventClose = (e: BeforeUnloadEvent) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  useEffect(() => {
    const startData = games[0];
    const endData = games[games.length - 1];
    const newList = [startData, endData, ...games, startData, endData];

    let subLange = initOffsetX;
    langeRef.current = newList.map((game, i) => {
      if (i === 0) return subLange - caculMoveValue;

      if (i === 1) return subLange;

      subLange = subLange + caculMoveValue;

      return subLange;
    });

    setGames(newList);
    return () => {
      console.log("언마운트");
    };
  }, []);

  // 새로고침 시 재확인
  // useEffect(() => {
  //   console.log(window.history.state.idx);
  //   window.addEventListener("beforeunload", preventClose);
  //   return () => window.removeEventListener("beforeunload", preventClose);
  // }, []);

  useEffect(() => {
    dispatch(setBgImg(imgSrc.bg_game));
    // dispatch(setCanPopstateEvent(false));
    const popstateLimit = (e: PopStateEvent) => {
      // window.history.go(1);\
    };
    window.addEventListener("popstate", popstateLimit);
    return () => {
      window.removeEventListener("popstate", popstateLimit);
      // dispatch(setCanPopstateEvent(true));
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current === null) return;
    scrollRef.current.style.transform = `translateX(-${langeRef.current[idx]}px)`;
  }, [idx]);

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

    setIdx((prev) => prev + direction);
    if (scrollRef.current !== null) {
      scrollRef.current.style.transition = "all 0.25s ease-in-out";
    }
  };

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = langeRef.current[idx];
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.clientX;
    dragRef.current = langeRef.current[idx];
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (scrollRef.current == null) return;

    if (dragRef.current < 0) return;

    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX > currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        langeRef.current[idx] + 8
      }px)`;
      scrollRef.current.style.transition = "all 0.25s ease-in-out";

      // dragRef.current = -1;
    } else if (touchStartX < currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        langeRef.current[idx] - 8
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
    // navigation("/games/" + games[idx].id);
  };

  return (
    <Container style={styles.container}>
      {/* <EmptyBox height={50} /> */}
      <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
        <Text.Regular_20>{"<= "}</Text.Regular_20>
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
            <GameCard
              img={gameProp.img}
              title={gameProp.title}
              description={gameProp.description}
              key={index}
              selected={selected}
              choiceTitle={choiceTitle === gameProp.title}
            />
          );
        })}
      </View>

      <EmptyBox style={{ flex: 1 }} />
      <BottomPrevNext style={{ flex: 1 }} />
      <BottomModal visible={choiceTitle !== undefined} />
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
