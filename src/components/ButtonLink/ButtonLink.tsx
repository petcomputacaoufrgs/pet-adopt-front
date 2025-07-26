import {
  PrimaryStyledLink,
  SecondaryStyledLink} from "./styles";

import {ILink} from "./types";

const ButtonLink = ({ children, href , link_type, disabled = false}: ILink) => {
  return link_type === "primary" ? (
    <PrimaryStyledLink $disabled = {disabled}>
      {children}
      {(
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.921962 7.92196H11.2203L6.72111 12.4211C6.36154 12.7807 6.36154 13.3708 6.72111 13.7303C7.08067 14.0899 7.66151 14.0899 8.02107 13.7303L14.0968 7.65459C14.4564 7.29503 14.4564 6.71419 14.0968 6.35463L8.03029 0.269674C7.67073 -0.0898913 7.08989 -0.0898913 6.73033 0.269674C6.37076 0.629239 6.37076 1.21008 6.73033 1.56964L11.2203 6.07804H0.921962C0.414883 6.07804 0 6.49292 0 7C0 7.50708 0.414883 7.92196 0.921962 7.92196Z" />
        </svg>
      )}
    </PrimaryStyledLink>
  ) : (
    <SecondaryStyledLink  $disabled = {disabled}>
      {children}
    </SecondaryStyledLink>
  );
};


export default ButtonLink;

