import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { chartUi, SendToApiCharts } from "./service";
import { useAuth } from "../../../context";
import { CssBaseline, Grid, Pagination, Avatar, Typography } from "@mui/material";
import usePagination from "../../handlers/Pagination";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { CSVLink } from "react-csv";

export default function StatisticsPage() {
    const { token } = useAuth();

    const [chartData, setChartData] = useState<Array<chartUi>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState<number>(1);
    const PER_PAGE = 5;


    useEffect(() => {
        let isSetState = true;
        async function tableStart() {
            try {
                setIsLoading(true);
                const stats: any = await SendToApiCharts(token);
                if (isSetState) {
                    setChartData(stats);
                }
            } catch (error) {
                alert(error);
            } finally {
                setIsLoading(false);
            }
        }
        tableStart();
        return () => {
            isSetState = false;
        };
    }, [token]);


    const count = Math.ceil(chartData.length / PER_PAGE);
    const data = usePagination(chartData, PER_PAGE);


    const handleChange = (_e: any, p: any) => {
        setPage(p);
        data.jump(p);
      };
    


    return (
        <Grid
            container
            sx={{
                height: "100vh",
                paddingTop: "30px",
                paddingBottom: "30px",
                gap: 4,
                bgcolor: "white",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
            }}
        >
            <Grid item sm={10}
             sx={{
                flexDirection:"column",
               display:"flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
            }}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                   
       <Grid sx={{ alignItems: "center", display: "flex", width: "100%", padding: "1rem", justifyContent: "center", bgcolor: "#1976d2", borderRadius: '7px' }}>
      
            <Typography component="h1" variant="h4" sx={{color:"white"}}>
             Charts
            </Typography>
            <Avatar sx={{ bgcolor: 'white', marginLeft: 2 }}>
              <InsertChartIcon sx={{ color: '#1976d2' }} />
            </Avatar>
            
                </Grid>
                <Grid  sx={{ alignItems: "center", display: "flex", width: "100%", justifyContent:"flex-end" }}>
                <CSVLink data={chartData}>Download cvs</CSVLink>
                </Grid>
                        <BarChart
                            xAxis={[{ scaleType: "band", dataKey: "location" }]}
                            series={[{ dataKey: "followers_count" }]}
                            colors={["#1976d2"]}
                            dataset={data.currentData()}
                            height={500}
                            grid={{ horizontal: true }}
                            borderRadius={9}
                            yAxis={[
                                {
                                    scaleType: "linear",
                                  min:0,
                                  max: 10,
                               
                    
                                },
                              ]}
                           
                        />
                        <Pagination
                           
                            
                            count={count}
                            size="large"
                            page={page}
                            shape="rounded"
                            onChange={handleChange}
                        />
                  
                    </>
                    
                )}
            </Grid>
            <CssBaseline />
        </Grid>
    );
}

