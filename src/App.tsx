import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";
import "./App.css";

const graphQLQuery = gql`
  {
    capsules(limit: 10) {
      dragon {
        crew_capacity
        description
        diameter {
          meters
        }
      }
      id
      landings
      missions {
        name
        flight
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(graphQLQuery);
  console.log(data);
  if (!loading && data)
    return (
      <>
        <div className="capsules">
          {data.capsules.map((capsule: any, capsuleI: number) => (
            <div key={capsuleI}>
              <h1>Dragon</h1>
              <p>{capsule.dragon.description}</p>
              <h4>Capsule missions:</h4>
              {capsule.missions.map((mission: any, missionI: number) => (
                <Fragment key={missionI}>{mission.name}</Fragment>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  if (error)
    return (
      <>
        <div>An Error occurred.</div>
      </>
    );
  return <div>Loading...</div>;
}

export default App;
