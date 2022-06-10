import { Card, CardContent, Grid, Grow, Link, Typography } from "@mui/material";
import parser from "html-react-parser";
import { ResultsProps } from "../lib/types";
import styles from "../styles/Results.module.css";

function Results(props: ResultsProps) {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={2} className={styles.resultsContainer}>
        {props.searchResults.map((result, index) => (
          <Grow key={result.url} in timeout={250 * (index + 1)}>
            <Grid item xs={11} md={9} lg={6} zeroMinWidth className={styles.result}>
              <Card variant="outlined">
                <CardContent>
                  <Link href={result.url} color="primary" underline="always">
                    <Typography variant="h6" component="h6">
                      {result.title}
                    </Typography>
                  </Link>
                  <Typography color="textSecondary" gutterBottom>
                    {result.url}
                  </Typography>
                  <Typography variant="body2">{parser(result.description)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </>
  );
}

export default Results;
