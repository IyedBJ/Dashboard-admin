import { Paper, Stack, Typography, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import { ResponsivePie } from "@nivo/pie";
import React from "react";

const Row1 = () => {
  const theme = useTheme();

  const claimsData = [
    { id: "Résolus", value: 8 },
    { id: "En cours", value: 4 },
  ];

  const teamData = [
    { id: "Actifs", value: 7 },
    { id: "Inactifs", value: 3 },
  ];

  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={2}
      marginTop={2}
      justifyContent={"center"}
    >
      {/* Carte des réclamations */}
      <Paper
        sx={{
          minWidth: "333px",
          padding: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack gap={1}>
          <EmailIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
          <Typography variant="body2" sx={{ fontSize: "13px" }}>
            Nombre réclamations
          </Typography>
          <Typography variant="h6">12</Typography>
        </Stack>
        <Stack alignItems="flex-end" sx={{ width: 120, height: 80 }}>
          <ResponsivePie
            data={claimsData}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={[theme.palette.primary.main, theme.palette.secondary.main]}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            isInteractive={false}
          />
          <Typography variant="body2" color="success.main">
            +14%
          </Typography>
        </Stack>
      </Paper>

      {/* Carte de l'équipe */}
      <Paper
        sx={{
          minWidth: "333px",
          padding: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack gap={1}>
          <GroupsIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
          <Typography variant="body2" sx={{ fontSize: "13px" }}>
            Membres de l'équipe
          </Typography>
          <Typography variant="h6">10</Typography>
        </Stack>
        <Stack alignItems="flex-end" sx={{ width: 120, height: 80 }}>
          <ResponsivePie
            data={teamData}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={[theme.palette.success.main, theme.palette.warning.main]}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            isInteractive={false}
          />
          <Typography variant="body2" color="success.main">
            +5%
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Row1;
