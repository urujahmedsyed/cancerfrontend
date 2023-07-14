useEffect(() => {
  const calculateAllredScore = (counts) => {
    const prop = (counts[1] + counts[2] + counts[3]) / (counts[0] + counts[1] + counts[2] + counts[3]);
    const proportion = Math.round(prop * 100);

    let proportionScore;
    if (proportion === 0) {
      proportionScore = 0;
    } else if (proportion < 1) {
      proportionScore = 1;
    } else if (proportion >= 1 && proportion <= 10) {
      proportionScore = 2;
    } else if (proportion > 10 && proportion <= 33) {
      proportionScore = 3;
    } else if (proportion > 33 && proportion <= 66) {
      proportionScore = 4;
    } else {
      proportionScore = 5;
    }

    let intensity;
    if (counts[0] >= counts[1] && counts[0] >= counts[2] && counts[0] >= counts[3]) {
      intensity = 0;
    } else if (counts[1] >= counts[0] && counts[1] >= counts[2] && counts[1] >= counts[3]) {
      intensity = 1;
    } else if (counts[2] >= counts[0] && counts[2] >= counts[1] && counts[2] >= counts[3]) {
      intensity = 2;
    } else {
      intensity = 3;
    }

    const allred = proportionScore + intensity;
    setAllredScore(allred);
    console.log(proportionScore);
    console.log(intensity);
    console.log(allred);
  };

  if (response && response.n && response.w && response.m && response.s && (allredScore === null || allredScore === 0)) {
    const counts = [response.n, response.w, response.m, response.s];
    calculateAllredScore(counts);
  }
}, [response, allredScore]);
