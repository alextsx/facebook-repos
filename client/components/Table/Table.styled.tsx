"use client";
import { ComponentPropsWithoutRef } from "react";
import { styled } from "styled-components";

export const TableContainerStyled = styled.table`
  background-color: #261275;
  border-radius: 25px;
  min-width: 40vw;
  text-align: center;
  border-collapse: collapse;
  border-style: hidden;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
`;

type HeaderProps = {
  percentage: number;
} & ComponentPropsWithoutRef<"th">;

export const HeaderStyled = styled.th<HeaderProps>`
  width: ${(props) => `${props.percentage}%`};
  padding: 20px 30px;
  border: 1px solid #d9d9d9;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
