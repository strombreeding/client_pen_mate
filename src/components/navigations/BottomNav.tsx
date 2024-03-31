import styled from "styled-components";
import { imgSrc } from "../../assets/img";
import { Pressable, View } from "../../nativeView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setNavTab } from "../../store/slices/appState";
import { NavTab } from "../../types";
import { useNavigate } from "react-router-dom";
import { IOS, SCREEN_WIDTH } from "../../configs/device";
import BottomLayer from "./BottomLayer";

const IconWrapper = styled.div`
  width: 100%;
  height: 40%;
  /* background-color: #ffffff9b; */
  display: flex;
  justify-content: space-around;
`;

const NavIcon = styled.img`
  /* background-color: white; */
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

function BottomNav() {
  const currentTab = useSelector((state: RootState) => state.appState.navTab);
  const dispatch = useDispatch<AppDispatch>();
  const navTab = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const type = e.currentTarget.id;
    // navigation(type);
    dispatch(setNavTab(type));
  };

  return (
    <BottomLayer visible={true}>
      <IconWrapper>
        <Pressable id="/" onClick={navTab}>
          <NavIcon
            src={currentTab === "/" ? imgSrc.home_active : imgSrc.home_un}
            alt=""
          />
        </Pressable>
        <Pressable id="/ranking" onClick={navTab}>
          <NavIcon
            src={
              currentTab === "/ranking"
                ? imgSrc.ranking_active
                : imgSrc.ranking_un
            }
            alt=""
          />
        </Pressable>
        <Pressable id="/store" onClick={navTab}>
          <NavIcon
            src={
              currentTab === "/store" ? imgSrc.store_active : imgSrc.store_un
            }
            alt=""
          />
        </Pressable>
        {/* <Pressable id="/profile" onClick={navTab}>
          <NavIcon
            src={
              currentTab === "/profile"
                ? imgSrc.profile_active
                : imgSrc.profile_un
            }
            alt=""
          />
        </Pressable> */}
      </IconWrapper>
    </BottomLayer>
  );
}

export default BottomNav;
