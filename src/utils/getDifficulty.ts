type Tsac_scale =
  | "hiking"
  | "mountain_hiking"
  | "demanding_mountain_hiking"
  | "emanding_alpine_hiking"
  | "pro";
const getDifficulty = (sac_scale: Tsac_scale) => {
  const difficultyEquivalents = {
    hiking: "easy",
    mountain_hiking: "moderate",
    demanding_mountain_hiking: "hard",
    alpine_hiking: "Difficult",
    emanding_alpine_hiking: "Experienced",
    pro: "difficult_alpine_hiking",
  };
  const trailDifficulty = difficultyEquivalents[sac_scale];
  return trailDifficulty;
};
export default getDifficulty;
