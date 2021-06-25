import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import styles from './hits.module.css'
import { useSession } from 'next-auth/client';
import { useState } from 'react';

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
            <Grid container
                item
                spacing={1}
                direction="column"
                justify="center"
                alignItems="flex-start"
                xs={12}
                className={styles.linksPadding}>
                <Grid item xs={11} md={6} lg={4}></Grid>
                {
                    hits.map((result) =>
                        <Grid item key={result.url} xs={12} md={10} lg={8} zeroMinWidth>
                            <Card variant="outlined">
                                <CardContent className={styles.hitContent}>
                                    <Typography variant="h6" component="h6">
                                        <Link href={result.url}>
                                            {result.title}
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
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        {result.url}
                                    </Typography>
                                    <Typography variant="body2">
                                        {result.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
}

export default Hits