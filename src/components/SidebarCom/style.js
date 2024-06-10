import styled from "styled-components";
import arrow from "../../assets/icons/rightArrow.svg?react";
import exit from "../../assets/icons/exit.svg?react";

const Arrow = styled(arrow)`
  display: flex;
  margin-left: auto;
  transform: ${({ active }) => active && `rotate(90deg)`};
  transition: all 0.1s;
`;

const Container = styled.div`
  display: flex;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 280px;
  max-width: 280px;
  min-width: 280px;
  background-color: #fff;
  /* border: 1px solid red; */
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Body = styled.div`
  flex: 1;
`;
const Wrapper = styled.div`
  border: 1px solid blue;
  margin: 16px;
  background-color: white;
`;

const Logo = styled.div`
  padding: 16px 24px;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1890ff;
  border-bottom: 1px solid #f8fafc;
  cursor: pointer;
`;

const LogOut = styled(Logo)`
  margin-top: auto;
  border-top: 1px solid #f8fafc;
  border-bottom: 0;
`;

// Profile
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 23px 24px 32px;
`;

ProfileContainer.Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
`;

ProfileContainer.Name = styled.div`
  width: 168px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--primaryColor);
`;

ProfileContainer.Email = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: var(--secondaryColor);
`;

// Menu
const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;

  &:hover {
    cursor: pointer;
    background-color: rgba(248, 250, 252, 1);
  }
`;

MenuItem.Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  padding: 12px 0 12px 24px;

  &:hover {
    color: var(--activeColor);
    & path {
      fill: var(--activeColor);
    }
  }

  .icon {
    margin-right: 16px;
  }
`;

const ChildWrapper = styled.div`
  margin-left: 35px;
  height: ${({ active }) => (active ? "auto" : "0px")};
  overflow: hidden;
`;

const ExitIcon = styled(exit)``

export {
  Container,
  ChildWrapper,
  Side,
  Body,
  Wrapper,
  Logo,
  LogOut,
  Menu,
  MenuItem,
  Arrow,
  ExitIcon,
};
