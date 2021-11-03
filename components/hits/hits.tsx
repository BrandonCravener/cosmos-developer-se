import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import styles from './hits.module.css';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Hits({ hits, bookmarks }) {
    const [session, loading] = useSession()
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const addBookmark = async (hit) => {
        delete hit.thumbnail;

        try {
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hit),
            })
            if (!res.ok) {
                throw new Error(String(res.status))
            }
        } catch (error) {
            setErrorMessage(error);
            setErrorOpen(true);
        }
    }
    const removeBookmark = async (url) => {
        const bookmark = bookmarks.find(bookmark => bookmark.url == url);
        bookmarks.splice(bookmarks.findIndex(bookmark => bookmark.url == url), 1);
        if (bookmark) {
            try {
                const res = await fetch(`/api/bookmark/${bookmark._id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                if (!res.ok) {
                    throw new Error(String(res.status))
                } else {

                }
            } catch (error) {
                setErrorMessage(error);
                setErrorOpen(true);
            }
        } else {
            setErrorMessage("Bookmark not found!");
            setErrorOpen(true);
        }
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    return (
        <>
            <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}>
                <Grid item xs={11} md={9} lg={6}></Grid>
                {
                    hits.map((result, index) =>
                        <Grow key={result.url} in timeout={250 * (index + 1)}>
                            <Grid item xs={11} md={9} lg={6}>
                                <Card variant="outlined">
                                    <CardContent className={styles.hitContent}>
                                        <Link href={result.url}>
                                            <Typography variant="h6" component="h6">
                                                {result.title}
                                            </Typography>
                                        </Link>
                                        {/* {
                                            session && (bookmarks.findIndex(bookmark => bookmark.url == result.url) !== -1 ?
                                                <IconButton className={styles.bookmarkButton} aria-label="bookmark" onClick={() => removeBookmark(result.url)}>
                                                    <BookmarkIcon />
                                                </IconButton>
                                                :
                                                <IconButton className={styles.bookmarkButton} aria-label="bookmark" onClick={() => addBookmark(result)}>
                                                    <BookmarkBorderIcon />
                                                </IconButton>)
                                        } */}
                                        <Typography color="textSecondary" gutterBottom>
                                            {result.url}
                                        </Typography>
                                        <Typography variant="body2">
                                            {ReactHtmlParser(result.description)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grow>
                    )
                }
            </Grid>
        </>
    );
}

export default Hits