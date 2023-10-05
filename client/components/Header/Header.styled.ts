import NextImage from "next/image";
import { styled } from "styled-components";

export const Image = styled(NextImage)`
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  cursor: pointer;
`;

export const Input = styled.input`
  height: 43px;
  width: 254px;
  border-radius: 29px;
  padding: 0px 40px;
  border: none;
  color: #000;
  font-size: 22px;
  font-weight: 400;
`;
