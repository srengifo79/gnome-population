import { useQuery } from "react-query";

import { getGnomePopulation } from "../../api/gnomePopulation";

const Landing = () => {
  const { isLoading, error, data } = useQuery("townData", getGnomePopulation);

  console.log(isLoading, error, data);
  return <div></div>;
};

export default Landing;
