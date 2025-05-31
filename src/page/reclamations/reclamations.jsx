import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Modal,
  IconButton,
  Typography,
  useTheme,
  MenuItem,
  Select,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Reclamations = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [reclamationToDelete, setReclamationToDelete] = useState(null);

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
        nomPrenom: item.nom_prenom || "Non spécifié",
        cin: item.cin || "Non spécifié",
        email: item.email || "Non spécifié",
        adresse: item.adresse || "Non spécifiée",
        typeReclamation: item.type_reclamation || "Non spécifié",
        sujet: item.sujet || "Non spécifié",
        photoPath: item.photo_path
          ? `http://localhost/Municipalite/${item.photo_path}`
          : null,
        dateCreation: item.date_creation || "Non spécifiée",
        statut: item.statut || "Nouvelle",
      }));

      setRows(formattedData);
    } catch (err) {
      setError(err.message);
      setSnackbar({
        open: true,
        message: "Erreur de chargement des données",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);

  const handleOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const openDeleteConfirm = (id) => {
    setReclamationToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setReclamationToDelete(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete_reclamation.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: reclamationToDelete }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setRows(rows.filter((row) => row.id !== reclamationToDelete));
      setSnackbar({
        open: true,
        message: result.message,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      closeDeleteConfirm();
    }
  };
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update_reclamation.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setRows(
        rows.map((row) => (row.id === id ? { ...row, statut: newStatus } : row))
      );

      setSnackbar({
        open: true,
        message: result.message,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  // Définition des colonnes
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nomPrenom", headerName: "Nom & Prénom", width: 180 },
    { field: "cin", headerName: "CIN", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "adresse", headerName: "Adresse", width: 200 },
    { field: "dateCreation", headerName: "Date de création", width: 150 },
    { field: "typeReclamation", headerName: "Type de réclamation", width: 180 },
    { field: "sujet", headerName: "Sujet", width: 200 },
    {
      field: "photoPath",
      headerName: "Photo",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {params.value ? (
            <>
              <Avatar
                src={params.value}
                variant="square"
                sx={{ width: 56, height: 56, mr: 1 }}
              />
              <IconButton onClick={() => handleOpen(params.value)} size="small">
                <ZoomInIcon color="primary" />
              </IconButton>
            </>
          ) : (
            <Typography variant="body2">Aucune photo</Typography>
          )}
        </Box>
      ),
    },
    // Colonne de statut
    {
      field: "statut",
      headerName: "Statut",
      width: 150,
      renderCell: (params) => {
        let backgroundColor;
        let textColor = "#fff";
        let icon = <InfoIcon fontSize="small" />;

        switch (params.value) {
          case "Résolue":
            backgroundColor = theme.palette.success.main;
            icon = <CheckCircleIcon fontSize="small" />;
            break;
          case "En cours":
            backgroundColor = theme.palette.warning.main;
            icon = <AutorenewIcon fontSize="small" />;
            break;
          case "Rejetée":
            backgroundColor = theme.palette.error.main;
            icon = <CancelIcon fontSize="small" />;
            break;
          default: // "Nouvelle" ou autre
            backgroundColor = theme.palette.info.main;
            break;
        }

        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                backgroundColor,
                color: textColor,
                padding: "4px 8px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {icon}
              <Select
                value={params.value || "Nouvelle"}
                onChange={(e) =>
                  handleStatusChange(params.row.id, e.target.value)
                }
                sx={{
                  backgroundColor,
                  color: textColor,
                  "& .MuiSelect-icon": { color: textColor },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  minWidth: 100,
                }}
                size="small"
              >
                <MenuItem value="Nouvelle">Nouvelle</MenuItem>
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="Résolue">Résolue</MenuItem>
                <MenuItem value="Rejetée">Rejetée</MenuItem>
              </Select>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title="Supprimer">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              openDeleteConfirm(params.row.id);
            }}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Réclamations
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Nombre total de réclamations : {rows.length}
      </Typography>

      <Box sx={{ height: 600, width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            outline: "none",
          }}
        >
          <img
            src={selectedImage}
            alt="Réclamation"
            style={{ maxHeight: "80vh", maxWidth: "80vw" }}
          />
        </Box>
      </Modal>

      <Dialog open={deleteConfirmOpen} onClose={closeDeleteConfirm}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer définitivement cette réclamation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Annuler</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Reclamations;
