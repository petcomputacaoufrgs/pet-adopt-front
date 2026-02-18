import {
  EditButtonContainer,
  StyledDeleteButton,

} from "./styles";

import type { IDeleteButtonProps } from "./types";
import DeleteIcon from "../../assets/DeleteIcon.svg";

const DeleteButton = ({ width, height, onClick }: IDeleteButtonProps) => {

  return (
    <EditButtonContainer $width={width} $height={height}>
      <StyledDeleteButton
        $backgroundImage={DeleteIcon}
        $width={width}
        $height={height}
        onClick={onClick}
      />

    </EditButtonContainer>
  );
};

export default DeleteButton;