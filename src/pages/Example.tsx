import styled from "styled-components";
import PetCard from "../components/PetCard";

const doguinhos = [
  { name: "Yoko", age: "9 anos" },
  { name: "Jacob", age: "10 anos" },
  { name: "Luli", age: "13 anos" },
  { name: "Juna", age: "9 anos" },
  { name: "Leia", age: "8 anos" },
  { name: "Axel", age: "8 anos" },
  { name: "Mia", age: "7 anos" },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Example = () => {
  return (
    <div>
      Eu sou uma pagina
      <Container>
        {doguinhos.map((dog) => (
          <PetCard name={dog.name} age={dog.age} />
        ))}
      </Container>
    </div>
  );
};

export default Example;
