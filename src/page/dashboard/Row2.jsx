import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import Lineaires from "../../page/linearies/linearies";
import React from "react";
import Equipe from "../../page/equipe/equipe";

const Row2 = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
      {/* Première colonne - Graphique linéaire */}
      <Box sx={{ flex: 2 }}>
        <Paper
          sx={{
            p: 2,
            border: `2px solid ${theme.palette.error.main}`,
            borderRadius: 2,
            height: "100%",
            minHeight: 400,
          }}
        >
          <Lineaires />
        </Paper>
      </Box>

      {/* Deuxième colonne - Équipe */}
      <Box sx={{ flex: 1 }}>
        <Paper
          sx={{
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
            Toute l'équipe
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Equipe />
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Row2;
