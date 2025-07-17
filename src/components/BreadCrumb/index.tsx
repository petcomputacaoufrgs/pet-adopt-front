import { BreadcrumbContainer, BreadcrumbLink, Current, Separator } from "./styles"; 

type BreadcrumbItem = {
  label: string;
  to?: string; 
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