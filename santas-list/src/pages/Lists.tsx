import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC, useEffect } from "react";
import { Giftee, GiftList } from "../data/DataTypes";
import { useState } from "react";
import GifteeListItem from "../components/GifteeListItem";
import GiftCard from "../components/GiftCard";
import List from "@material-ui/core/List";
import { getLists, setGiftee, deleteGiftee, deleteGiftList } from "../utils/firebase";
import NewGiftCard from "../components/NewGiftCard";
import GifteeDetail from "../components/GifteeDetail";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Tooltip, IconButton } from "@material-ui/core";
import NewGifteeForm from "../components/NewGifteeForm";
import UserContext from "../context/UserContext";
import { useContext, useMemo } from "react";
import Alert from '@material-ui/lab/Alert';



const Lists: FC = () => {
    const [giftLists, setGiftLists] = useState<GiftList[]>([]);
    const [error, setError] = useState<string>("");
    const [changesSaved, setChangesSaved] = useState<boolean>(false);
    const [selectedGiftList, setSelectedGiftList] = useState<GiftList>();
    const [selectedGiftee, setSelectedGiftee] = useState<Giftee>();
    const { user } = useContext(UserContext);
    const [change, setChange] = useState<number>(0);


    useMemo(() => {
        if (user?.email) {
            getLists(user).then(val => {
                setGiftLists(val);
            });
        }
    }, [user])

    useEffect(() => {
        if (user?.email) {
            getLists(user).then(val => {
                setGiftLists(val);
            });
        }
    }, [user, change])

     const onGiftListClick = async (giftListId: string) => {
         setChangesSaved(false);
        setSelectedGiftList(() => giftLists!.find(l => l.id === giftListId));
    };

    const onGiftListDelete = async (giftList: GiftList) => {
        try {
            await deleteGiftList(giftList);
            setChange((ch) => (ch + 1) % 100);
            setChangesSaved(true);
        } catch (error) {
            console.log(error.message);
            setChangesSaved(false);
        }
    };

    const onGifteeClick = (gifteeId: string) => {
        if (change === 0 || selectedGiftee === undefined || changesSaved) {
            setSelectedGiftee(selectedGiftList?.recipients?.find(l => l.id === gifteeId));
            setChangesSaved(false);
            setChange(0);
            setError("");
        } else {
            setError("Unsaved changes");
        }             
    };

    const onGifteeDelete = (gifteeId: string) => {
        if (selectedGiftList?.id) {
            let updatedLists: GiftList[] = giftLists;
            let updatedList: GiftList = selectedGiftList;
            updatedList!.recipients = selectedGiftList!.recipients.filter(r => r.id !== gifteeId);


            deleteGiftee(gifteeId, selectedGiftList).then(() => {
                updatedLists.forEach((item, index) => {
                    if (item.id === selectedGiftList.id) {
                        updatedLists.splice(index, 1);
                    }
                })
                setGiftLists([...updatedLists]);
                setSelectedGiftee(undefined);
                setChange((ch) => (ch + 1) % 100);
                setChangesSaved(true);
            }).catch((error: Error) => {
                setError("Couldn't delete the giftee.");
                console.log(error.message);
                setChangesSaved(false);
            })
        }

    };

    const onSaveGifteeChanges = (updatedGiftee: Giftee) => {
        setChange((ch) => (ch + 1) % 100);
        if (user?.email && selectedGiftList?.id) {
            let updatedLists: GiftList[] = giftLists;
            let updatedList: GiftList = selectedGiftList;
            updatedList!.recipients = selectedGiftList!.recipients.map(r => r.id === updatedGiftee.id ? updatedGiftee : r);

            setGiftee(selectedGiftList.name, updatedGiftee, user).then(() => {
                updatedLists.forEach((item, index) => {
                    if (item.id === selectedGiftList.id) {
                        updatedLists.splice(index, 1);
                    }
                });
                
                updatedLists.push(updatedList);
                setGiftLists([...updatedLists]);
                setError("");                
                setChangesSaved(true);
            }).catch((error: Error) => {
                setError("Couldn't update the giftee.");
                console.log(error.message);
                setChangesSaved(false);
            })
        }
    }

    const onBackButton = () => {
        console.log(changesSaved);    
        console.log(selectedGiftee); 
        console.log(change)
            if (selectedGiftee === undefined || changesSaved || change === 0) {
                setSelectedGiftList(undefined);
                setSelectedGiftee(undefined); 
                setChangesSaved(false);
                setError("")
        } else {
                setError("Unsaved changes");
        }     
    }

    const title = selectedGiftList?.name ?? "Your Gift Lists";
    return (
        <Grid container spacing={2} xs={12}>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">{title}</Typography>
            </Grid>

            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            {changesSaved && <Grid item xs={12}><Alert severity="success">Changes were saved.</Alert></Grid>}

            {
                selectedGiftList &&
                <Grid item container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">
                            <Tooltip title="Go back">
                                <IconButton onClick={onBackButton}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Tooltip>
                            Gift Lists
                        </Typography>
                        <List style={{ borderStyle: "solid" }}>
                            {
                                selectedGiftList.recipients && selectedGiftList.recipients.map(rec => (
                                    <GifteeListItem key={rec.id} giftee={rec} onClick={onGifteeClick} onDelete={onGifteeDelete} />
                                ))
                            }
                            <NewGifteeForm key={-1} giftList={selectedGiftList} onGifteeCreated={(giftee) => setSelectedGiftee(giftee)} setChange={setChange} />
                        </List>
                    </Grid>

                    {selectedGiftee &&
                        <GifteeDetail selectedGiftListId={selectedGiftList.id} selectedGiftee={selectedGiftee!} onSaveChanges={onSaveGifteeChanges} setChange={setChange} setChangesSaved={setChangesSaved} />
                    }
                </Grid>
            }

            {
                !selectedGiftList &&
                <Grid item container direction='row' spacing={5}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <NewGiftCard giftLists={giftLists} setGiftListsState={setGiftLists} />
                    </Grid>
                    {giftLists.map(l => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <GiftCard key={l.id} onClick={onGiftListClick} onDelete={onGiftListDelete} giftList={l} />
                        </Grid>
                    ))}
                </Grid>
            }
        </Grid>
    );
};

export default Lists;