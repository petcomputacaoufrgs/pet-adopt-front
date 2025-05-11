import dog from "../../../assets/dog.svg";
import dogEffect from "../../../assets/dogEffects.svg";

import cat from "../../../assets/Cat.svg";
import catEffect from "../../../assets/catEffects.svg";

import bird from "../../../assets/Bird.svg";
import birdEffect from "../../../assets/birdEffects.svg";
import SelectorRadioGroup from "../../../components/SelectorButtonRadioGroup";


export default function AnimalFilter() {
    const options = [
    {
      label: "Cachorro",
      value: "dog",
      backgroundImage: dog,
      backgroundColor: "#F17D6E",
      overlayImage: dogEffect,
    },
    {
      label: "Gato",
      value: "cat",
      backgroundImage: cat,
      backgroundColor: "#45E4FF",
      overlayImage: catEffect,
    },
    {
      label: "Pássaro",
      value: "bird",
      backgroundImage: bird,
      backgroundColor: "#FF9944",
      overlayImage: birdEffect,
    }
  ]

    return (
    < SelectorRadioGroup options={options} width="92px" height="81px" overlayImageWidth="81px" overlayImageHeight="51px" overlayImageLeft="4px" overlayImageTop="11px" />
    )
  }

