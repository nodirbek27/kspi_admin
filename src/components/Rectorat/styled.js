import styled, { keyframes } from "styled-components";

const shake = keyframes`
    0% {transform: translateX(0px);}
    25% {transform: translateX(8px);}
    50% {transform: translateX(0px);}
    75% {transform: translateX(-8px);}
    100% {transform: translateX(0px);}
`

export const TextWarn = styled.p`
    color: red;
    animation:  ${shake} 0.1s linear;
`