import React from "react";
import { Container, Typography, Box, styled } from "@mui/material";
import BookSearchBar from "./components/BookSearchBar";

const AppContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const ResponsiveHeading = styled(Typography)(({ theme }) => ({
  color: "#335C6E",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    margin: "1.5rem 0",
    textAlign: "center",
  },
}));

const App: React.FC = () => {
  return (
    <AppContainer>
      <Box
        component="img"
        alt="Ello logo"
        sx={{ maxHeight: "5rem" }}
        src="https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93"
      />
      <ResponsiveHeading variant="h4" gutterBottom style={{ color: "#335C6E" }}>
        Assign A Book
      </ResponsiveHeading>
      <BookSearchBar />
    </AppContainer>
  );
};

export default App;
