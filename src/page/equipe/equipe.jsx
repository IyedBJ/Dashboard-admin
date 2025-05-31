import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, useTheme } from "@mui/material";

const Equipe = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  // Fetch agents from the PHP API
  useEffect(() => {
    fetch("http://localhost/admin+-Copie/api_get_agents.php")
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, []);

  const columns = [
    {
      field: "photo",
      headerName: "Photo",
      width: 100,
      renderCell: (params) => (
        <Avatar
          alt={`${params.row.prenom} ${params.row.nom}`}
          src={params.value}
        />
      ),
    },
    {
      field: "nom",
      headerName: "Nom",
      width: 150,
    },
    {
      field: "prenom",
      headerName: "Prénom",
      width: 150,
    },
    {
      field: "categorie",
      headerName: "Catégorie",
      width: 150,
    },
    {
      field: "status",
      headerName: "Statut",
      width: 130,
      renderCell: (params) => {
        let backgroundColor;
        switch (params.value) {
          case "Disponible":
            backgroundColor = theme.palette.success.main;
            break;
          case "En mission":
          case "En formation":
            backgroundColor = theme.palette.warning.main;
            break;
          case "En congé":
            backgroundColor = theme.palette.error.main;
            break;
          default:
            backgroundColor = theme.palette.info.main;
        }
        return (
          <div
            style={{
              backgroundColor,
              color: theme.palette.getContrastText(backgroundColor),
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "0.7rem",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              height: "24px",
              lineHeight: "1",
              boxSizing: "border-box",
              width: "auto",
              minWidth: "fit-content",
              margin: "0 auto",
            }}
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Equipe;
