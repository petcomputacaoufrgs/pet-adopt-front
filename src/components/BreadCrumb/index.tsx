import styled from "styled-components";
import { Link } from "react-router-dom";
import { BreadcrumbContainer, BreadcrumbLink, Current, Separator } from "./styled";

type BreadcrumbItem = {
  label: string;
  to?: string; // se não tiver, é o item atual
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <span key={index}>
          {item.to ? (
            <BreadcrumbLink to={item.to}>{item.label}</BreadcrumbLink>
          ) : (
            <Current>{item.label}</Current>
          )}
          {index < items.length - 1 && <Separator>/</Separator>}
        </span>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
