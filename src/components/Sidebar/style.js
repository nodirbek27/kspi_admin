import styled from "styled-components";

const Side = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const SideOutlet = styled.div`
height: 94vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export { Side, SideOutlet };
