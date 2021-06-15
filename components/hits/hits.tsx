import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { getSession, useSession } from 'next-auth/client';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import styles from './hits.module.css'
import { useState } from 'react';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Hits({ hits, bookmarks }) {
    const [session, loading] = useSession()
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    let bookmarksShort = [];
    if (session) {
        bookmarks.map((bookmark) => {
            bookmarksShort.push(bookmark.url)
        });
    }

    const addBookmark = async (hit) => {
        try {
            const res = await fetch('/api/bookmark', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: hit.url,
                    title: hit.title,
                    description: hit.description
                }),
            })
            if (!res.ok) {
                throw new Error(String(res.status))
            }
        } catch (error) {
            setErrorMessage(error)
        }
    }
    const removeBookmark = async (hit) => {
        let bookmark = bookmarks.find(bookmark => bookmark.url == hit.url);
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
                    console.log(hit)
                    console.log(bookmarksShort)
                    bookmarksShort.splice(bookmarksShort.indexOf(hit.url), 1);
                    console.log(bookmarksShort)
                }
            } catch (error) {
                setErrorMessage(error)
            }
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
            <Grid container item
                justify="center"
                direction="column"
                alignItems="center"
                spacing={1} xs={12} >
                <Grid item xs={11} md={6} lg={4}></Grid>
                {
                    hits.map((hit) => (
                        <Grid item key={hit.url} xs={11} md={6} lg={4}>
                            <Card className={styles.result} variant="outlined" >
                                <Typography variant="caption">
                                    {hit.url}
                                </Typography>
                                {
                                    session != null && (bookmarksShort.indexOf(hit.url) !== -1 ?
                                        <IconButton className={styles.bookmarkButton} aria-label="bookmark" onClick={() => removeBookmark(hit)}>
                                            <BookmarkIcon />
                                        </IconButton>
                                        :
                                        <IconButton className={styles.bookmarkButton} aria-label="bookmark" onClick={() => addBookmark(hit)}>
                                            <BookmarkBorderIcon />
                                        </IconButton>)
                                }
                                <Typography variant="h6" component="h6">
                                    <u><a href={hit.url}>{hit.title}</a></u>
                                </Typography>
                                <p className={styles.truncate}>{hit.text}</p>
                                <Typography variant="caption">
                                    {hit.date}
                                </Typography>
                            </Card>
                        </Grid >
                    ))
                }
            </Grid >
        </>
    );
}

export default Hits