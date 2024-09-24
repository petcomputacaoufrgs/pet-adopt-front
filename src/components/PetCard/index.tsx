import { Card, CardContent, Typography } from "@mui/material";

interface IPetCard {
  name: string;
  age: string;
}

const PetCard = ({ name, age }: IPetCard) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>{age}</Typography>
      </CardContent>
    </Card>
  );
};
export default PetCard;
