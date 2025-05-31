import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Alert, Box } from "@mui/material";

const Lineaires = () => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);
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

    const countByMonth = {};
    months.forEach((month) => {
      countByMonth[month] = 0;
    });

    reclamations.forEach((reclamation) => {
      if (reclamation.date_creation) {
        const [day, month, year] = reclamation.date_creation
          .split(" ")[0]
          .split("/");

        const monthIndex = parseInt(month, 10) - 1;

        if (monthIndex >= 0 && monthIndex < 12) {
          const monthName = months[monthIndex];
          countByMonth[monthName]++;
        }
      }
    });

    return months.map((month) => ({
      x: month,
      y: countByMonth[month],
    }));
  };

  const data = [
    {
      id: "Réclamations",
      color: isDarkMode ? "#4ecdc4" : "#1976d2",
      data: getReclamationsByMonth(),
    },
  ];

  const chartTheme = {
    axis: {
      ticks: {
        line: {
          stroke: isDarkMode ? "#555555" : "#dddddd",
          strokeWidth: 1,
        },
        text: {
          fill: isDarkMode ? "#f0f0f0" : "#333333",
          fontSize: 12,
          fontWeight: 500,
        },
      },
      legend: {
        text: {
          fill: isDarkMode ? "#ffffff" : "#333333",
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
    grid: {
      line: {
        stroke: isDarkMode ? "#444444" : "#eeeeee",
        strokeWidth: 1,
      },
    },
    tooltip: {
      container: {
        background: isDarkMode ? "#2d2d2d" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#333333",
        fontSize: 14,
        borderRadius: 6,
        boxShadow: "0 3px 9px rgba(0, 0, 0, 0.2)",
        border: isDarkMode ? "1px solid #444" : "1px solid #ddd",
      },
    },
    labels: {
      text: {
        fill: isDarkMode ? "#ffffff" : "#333333",
        fontWeight: 600,
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
        height: "500px",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2
        style={{
          color: isDarkMode ? "#ffffff" : "#2E4053",
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: 500,
          fontSize: "1.2rem",
        }}
      >
        Évolution mensuelle des réclamations
      </h2>

      <ResponsiveLine
        data={data}
        theme={chartTheme}
        margin={{ top: 40, right: 110, bottom: 80, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: "Mois",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: "Nombre de réclamations",
          legendOffset: -50,
          legendPosition: "middle",
          format: (value) => (Number.isInteger(value) ? value : ""),
        }}
        colors={{ datum: "color" }}
        lineWidth={3}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={isDarkMode ? 0.15 : 0.1}
        areaBaselineValue={0}
        enableSlices="x"
        useMesh={true}
        enableGridX={false}
        enableGridY={true}
        enablePoints={true}
        animate={true}
        motionConfig="gentle"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 8,
            itemDirection: "left-to-right",
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 1,
            itemTextColor: isDarkMode ? "#f0f0f0" : "#333333",
            symbolSize: 14,
            symbolShape: "circle",
            symbolBorderColor: isDarkMode
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0, 0, 0, 0.5)",
            symbolBorderWidth: 1,
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  itemOpacity: 1,
                  itemTextColor: isDarkMode ? "#4ecdc4" : "#1976d2",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Lineaires;
