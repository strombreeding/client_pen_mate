import { keyframes } from "styled-components";
import { SCREEN_HEIGHT } from "./configs/device";

export const SlideUp = keyframes`
    from{
        top: ${SCREEN_HEIGHT + 200}px;
        opacity: 0;
    }
    to{
        top:${SCREEN_HEIGHT / 3 - 20}px;
        opacity: 1;
    }
    `;

export const SlideDown = keyframes`
    from{
        top:${SCREEN_HEIGHT / 3 - 20}px;
        opacity: 1;
    }
    to{
        top: ${SCREEN_HEIGHT + 200}px;
        opacity: 0;
    }
`;
