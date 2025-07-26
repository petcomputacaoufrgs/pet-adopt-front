// SignUpToggle.js
import React from 'react';

import { ToggleContainer, ToggleButton } from './styles';
import { ISignUpToggle } from './types';


const SignUpToggle = ({ selected, onSelect }:ISignUpToggle) => {
  return (
    <ToggleContainer>
      <ToggleButton
        type='button'
        $isActive={selected === 'ong'}
        onClick={() => onSelect('ong')}
      >
        Cadastro de ONG
      </ToggleButton>
      <ToggleButton
        type='button'
        $isActive={selected === 'membro'}
        onClick={() => onSelect('membro')}
      >
        Cadastro de Membro
      </ToggleButton>
    </ToggleContainer>
  );
};

export default SignUpToggle;