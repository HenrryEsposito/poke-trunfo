import styled from "styled-components";

export const CardBody = styled.div`
  width: 250px;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 4px solid rgb(233, 233, 233);
  background-image: linear-gradient(
    to bottom,
    rgb(79, 112, 242),
    rgb(166, 183, 249),
    rgb(79, 112, 242),
    rgb(79, 112, 242)
  );
  font-family: "Courier New", Courier, monospace;
`;

export const CardThumbContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CardThumb = styled.img`
  width: 250px;
  height: auto;
  margin: -10px 0 -20px;
`;

export const DataContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 5px 0;
  border: 2px solid #b4b4b4;
`;

export const DataTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export const PokemonNumber = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: rgb(249, 221, 11);
`;

export const StatsName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const StatsValue = styled.span`
  font-size: 1.3rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

interface IStatsContainerProps {
  playerblocked : boolean;
}

export const StatsContainer = styled.div<IStatsContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  margin: 4px;
  background-color: rgb(218, 218, 218);
  border-radius: 10px;
  cursor: ${(props: IStatsContainerProps) => props.playerblocked ? "auto" : "pointer"};

  &:hover {
    background-color: rgb(200, 200, 200);
  }
`;
