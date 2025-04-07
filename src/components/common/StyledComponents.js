import { styled } from "@mui/material/styles";
import { Paper, Card } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
  height: "100%",
  backdropFilter: "blur(8px)",
  backgroundColor:
    theme.palette.mode === "dark"
      ? `${theme.palette.background.paper}CC` // 80% opacity
      : `${theme.palette.background.paper}E6`, // 90% opacity
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.1)",
  },
}));

export const StyledCard = styled(Card)(({ theme, color }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: color
    ? color
    : theme.palette.mode === "dark"
    ? `${theme.palette.background.paper}CC`
    : `${theme.palette.background.paper}E6`,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
  backdropFilter: "blur(8px)",
  height: "100%",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.08)",
  },
}));
