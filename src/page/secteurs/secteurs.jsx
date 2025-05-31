import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Alert, Box } from "@mui/material";

const Secteurs = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost/Municipalite/admin";

  const fetchReclamations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api_reclamations.php`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données");
      }
      const data = await response.json();

      const formattedData = data.map((item) => ({
        id: item.id,
        typeReclamation: item.type_reclamation || "Autres réclamations",
      }));

      setReclamations(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);
  const normalizeType = (type) => {
    if (!type) return "Autres réclamations";

    const lowerType = type.toLowerCase().trim();

    const mappings = {
      administration: "Administration",
      "constructions anarchiques": "Constructions anarchiques",
      "éclairage public": "Éclairage public",
      "espaces verts": "Espaces verts",
      "occupations illégales": "Occupations illégales",
      voirie: "Voirie",
      propreté: "Propreté",
      "santé et hygiène": "Santé et hygiène",
    };

    for (const [key, value] of Object.entries(mappings)) {
      if (lowerType.includes(key)) {
        return value;
      }
    }

    return "Autres réclamations";
  };

  const countByType = reclamations.reduce((acc, reclamation) => {
    const normalizedType = normalizeType(reclamation.typeReclamation);
    acc[normalizedType] = (acc[normalizedType] || 0) + 1;
    return acc;
  }, {});

  const typesSpecifies = [
    "Administration",
    "Constructions anarchiques",
    "Éclairage public",
    "Espaces verts",
    "Occupations illégales",
    "Voirie",
    "Propreté",
    "Santé et hygiène",
    "Autres réclamations",
  ];

  const data = typesSpecifies.map((type) => ({
    id: type,
    label: type,
    value: countByType[type] || 0,
  }));

  const colorPalette = [
    "#4E79A7",
    "#F28E2B",
    "#E15759",
    "#76B7B2",
    "#59A14F",
    "#EDC948",
    "#B07AA1",
    "#FF9DA7",
    "#BAB0AC",
  ];

  const colors = isDarkMode
    ? colorPalette.map((color) => color + "CC")
    : colorPalette;

  const chartTheme = {
    textColor: isDarkMode ? "#ffffff" : "#333333",
    fontSize: 13,
    tooltip: {
      container: {
        background: isDarkMode ? "#2d2d2d" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#333333",
        boxShadow: "0 3px 9px rgba(0, 0, 0, 0.15)",
        border: isDarkMode ? "1px solid #444" : "1px solid #eee",
      },
    },
    labels: {
      text: {
        fontWeight: 600,
        fontSize: 14,
        fill: isDarkMode ? "#ffffff" : "#333333",
      },
    },
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div
      style={{
        height: "600px",
        padding: "20px",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      }}
    >
      <h2
        style={{
          color: isDarkMode ? "#ffffff" : "#2E4053",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: 500,
        }}
      >
        Répartition des réclamations par type
      </h2>

      <div style={{ height: "600px", position: "relative" }}>
        <ResponsivePie
          data={data}
          colors={colors}
          theme={chartTheme}
          margin={{ top: 20, right: 50, bottom: 120, left: 150 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", isDarkMode ? 0.3 : 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={isDarkMode ? "#eeeeee" : "#555555"}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", isDarkMode ? 2.5 : 1.5]],
          }}
          legends={[
            {
              anchor: "left",
              direction: "column",
              justify: false,
              translateX: -120,
              translateY: 60,
              itemsSpacing: 4,
              itemWidth: 80,
              itemHeight: 16,
              itemTextColor: isDarkMode ? "#ffffff" : "#666666",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 10,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: isDarkMode ? "#F28E2B" : "#4E79A7",
                  },
                },
              ],
            },
          ]}
          motionConfig="gentle"
        />
      </div>
    </div>
  );
};

export default Secteurs;
