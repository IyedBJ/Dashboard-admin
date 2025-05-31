import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Alert, Box } from "@mui/material";

const Barres = () => {
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
      setReclamations(data);
    } catch (err) {
      setError(err.message);
      console.error("Erreur de récupération:", err);
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

    if (lowerType.includes("administration")) return "Administration";
    if (lowerType.includes("constructions anarchiques"))
      return "Constructions anarchiques";
    if (lowerType.includes("éclairage public")) return "Éclairage public";
    if (lowerType.includes("espaces verts")) return "Espaces verts";
    if (lowerType.includes("occupations illégales"))
      return "Occupations illégales";
    if (lowerType.includes("voirie")) return "Voirie";
    if (lowerType.includes("propreté")) return "Propreté";
    if (lowerType.includes("santé et hygiène")) return "Santé et hygiène";

    return "Autres réclamations";
  };

  const getReclamationsByType = () => {
    const types = [
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

    const countByType = types.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    reclamations.forEach((reclamation) => {
      const normalizedType = normalizeType(reclamation.type_reclamation);
      countByType[normalizedType]++;
    });

    return types.map((type) => ({
      type,
      nombre: countByType[type],
    }));
  };

  const getReclamationsByMonth = () => {
    const months = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];

    const countByMonth = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    reclamations.forEach((reclamation) => {
      if (reclamation.date_creation) {
        const datePart = reclamation.date_creation.split(" ")[0];
        const [day, month, year] = datePart.split("/").map(Number);

        const monthIndex = month - 1;

        if (monthIndex >= 0 && monthIndex < 12) {
          const monthName = months[monthIndex];
          countByMonth[monthName]++;
        }
      }
    });

    return months.map((month) => ({
      mois: month,
      nombre: countByMonth[month],
    }));
  };

  const chartTheme = {
    axis: {
      ticks: {
        line: {
          stroke: isDarkMode ? "#ffffff" : "#000000",
        },
        text: {
          fill: isDarkMode ? "#ffffff" : "#000000",
          fontSize: 12,
        },
      },
      legend: {
        text: {
          fill: isDarkMode ? "#ffffff" : "#000000",
          fontSize: 14,
        },
      },
    },
    grid: {
      line: {
        stroke: isDarkMode ? "#555555" : "#e0e0e0",
        strokeWidth: 1,
      },
    },
    tooltip: {
      container: {
        background: isDarkMode ? "#333333" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
        border: isDarkMode ? "1px solid #555" : "1px solid #ddd",
        borderRadius: "6px",
        boxShadow: "0 3px 9px rgba(0, 0, 0, 0.15)",
      },
    },
    labels: {
      text: {
        fill: isDarkMode ? "#ffffff" : "#000000",
      },
    },
  };

  const colors = isDarkMode
    ? ["#4ecdc4", "#a2d9d5", "#7fdbda", "#6be0d9", "#5ce3d9"]
    : ["#1976d2", "#2196f3", "#64b5f6", "#90caf9", "#bbdefb"];

  const commonProps = {
    keys: ["nombre"],
    margin: { top: 50, right: 130, bottom: 100, left: 80 },
    padding: 0.3,
    valueScale: { type: "linear" },
    indexScale: { type: "band", round: true },
    colors: colors,
    theme: chartTheme,
    borderColor: { from: "color", modifiers: [["darker", 0.5]] },
    axisTop: null,
    axisRight: null,
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Nombre de réclamations",
      legendPosition: "middle",
      legendOffset: -60,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    enableLabel: false,
    role: "application",
    motionConfig: "gentle",
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
        height: "1000px",
        padding: "20px",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      }}
    >
      <h2
        style={{
          color: isDarkMode ? "#ffffff" : "#000000",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Statistiques des réclamations
      </h2>

      <div style={{ height: "450px", marginBottom: "50px" }}>
        <h3
          style={{
            color: isDarkMode ? "#ffffff" : "#000000",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Répartition par type
        </h3>
        <ResponsiveBar
          {...commonProps}
          data={getReclamationsByType()}
          indexBy="type"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,

            legendPosition: "middle",
            legendOffset: 70,
          }}
        />
      </div>

      <div style={{ height: "450px" }}>
        <h3
          style={{
            color: isDarkMode ? "#ffffff" : "#000000",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Évolution mensuelle
        </h3>
        <ResponsiveBar
          {...commonProps}
          data={getReclamationsByMonth()}
          indexBy="mois"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Mois",
            legendPosition: "middle",
            legendOffset: 40,
          }}
        />
      </div>
    </div>
  );
};

export default Barres;
