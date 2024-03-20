import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Link from "@mui/material/Link";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import { useGetHTMLContent } from "../queries";
import { LoadingHolder } from "./styledComponents";
import { CategoryScale } from "chart.js";
import DownloadIcon from "@mui/icons-material/Download";
import html2canvas from "html2canvas";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const ChartGenerate: React.FC = () => {
  const [url, setUrl] = React.useState<string>("");
  const componentRef = React.useRef();
  const {
    data: scrapeResponse,
    isFetching,
    refetch,
  } = useGetHTMLContent({
    url,
  });

  const handleShortTitleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUrl(value);
    },
    []
  );

  const onClickGenerate = () => {
    refetch();
  };

  const onClickDownloadChart = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element!),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-chart.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetShortTitle = React.useCallback(() => {
    setUrl("");
  }, []);

  return (
    <>
      <AppBar position="relative">
        <Toolbar>Detector Inspector</Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          <Box
            justifyContent="center"
            display="flex"
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 2,
            }}
          >
            <FormControl sx={{ m: 1, width: 500 }}>
              <TextField
                placeholder="URL"
                type="text"
                value={url}
                onChange={handleShortTitleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: url && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleResetShortTitle}
                    >
                      <CancelRoundedIcon />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
          </Box>
          <Box justifyContent="center" display="flex">
            <Button
              variant="contained"
              size="large"
              onClick={onClickGenerate}
              disabled={!url || isFetching}
            >
              Generate
            </Button>
          </Box>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {isFetching ? (
            <LoadingHolder>
              <CircularProgress size={60} />
            </LoadingHolder>
          ) : !scrapeResponse?.data ? (
            <Typography gutterBottom variant="h5" component="h2">
              No data table found.
            </Typography>
          ) : (
            <>
              <Line
                id="print"
                ref={componentRef}
                data={{
                  labels: Object.values(scrapeResponse.data)[0].map((_) => ""),
                  datasets: [
                    {
                      label: Object.keys(scrapeResponse.data)[0],
                      data: Object.values(scrapeResponse.data)[0].map(
                        (item) => item.value
                      ),
                    },
                  ],
                }}
              />
              <Box justifyContent="center" display="flex">
                <Button
                  variant="contained"
                  size="large"
                  onClick={onClickDownloadChart}
                  startIcon={<DownloadIcon />}
                >
                  Download Chart
                </Button>
              </Box>
            </>
          )}
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit">Nguyen Thanh Nguyen</Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
};

export default React.memo(ChartGenerate);
