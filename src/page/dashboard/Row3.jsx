import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import Secteurs from "../../page/secteurs/secteurs";
import Geographiques from "../../page/geographique/geographique";

const Row3 = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: "100%", alignItems: "stretch" }}
    >
      {/* Première colonne - Graphique secteurs */}
      <Paper
        sx={{
          flex: 2,
          p: 2,
          border: `2px solid ${theme.palette.error.main}`,
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          color={theme.palette.secondary.main}
          fontWeight="bold"
          variant="h6"
          sx={{ mb: 2 }}
        >
          Répartition par secteurs
        </Typography>
        <Box sx={{ flex: 1 }}>
          <Secteurs />
        </Box>
      </Paper>

      {/* Deuxième colonne - Géographique */}
      <Paper
        sx={{
          flex: 1,
          p: 2,
          border: `2px solid ${theme.palette.error.main}`,
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          color={theme.palette.secondary.main}
          fontWeight="bold"
          variant="h6"
          sx={{ mb: 2 }}
        >
          Répartition géographique
        </Typography>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Geographiques />
        </Box>
      </Paper>
    </Stack>
  );
};

export default Row3;
