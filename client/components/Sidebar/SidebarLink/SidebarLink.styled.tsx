"use client";
import Link from "next/link";

import { styled } from "styled-components";

type LabelProps = {
  isActive: boolean;
};

export const SidebarLinkContainerStyled = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1rem;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  display: flex;
  gap: 20px;
  color: inherit;
  align-items: center;
`;
export const LabelStyled = styled.span<LabelProps>`
  color: ${(props) => (props.isActive ? "#73D597" : "inherit")};
  font-weight: ${(props) => (props.isActive ? "600" : "inherit")};
`;
