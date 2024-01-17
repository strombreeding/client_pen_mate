import { keyframes } from "styled-components";
import { SCREEN_HEIGHT } from "./configs/device";

export const SlideUp = keyframes`
    from{
        bottom: ${SCREEN_HEIGHT};
    }
    to{
        bottom: 0;
    }
    `;

export const SlideDown = keyframes`
    from{
        bottom:0;
    }
    to{
        bottom: ${SCREEN_HEIGHT};
    }
`;
