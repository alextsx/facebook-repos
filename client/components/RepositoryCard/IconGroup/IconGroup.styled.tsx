"use client";
import Image from "next/image";
import styled from "styled-components";

export const IconGroupContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Icon = styled(Image)`
  width: 21px;
  height: 21px;
`;
