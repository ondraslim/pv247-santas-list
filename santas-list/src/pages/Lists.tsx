import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC, useEffect } from "react";
import { Giftee, GiftList } from "../data/DataTypes";
import { useState } from "react";
import GifteeListItem from "../components/GifteeListItem";
import GiftCard from "../components/GiftCard";
import List from "@material-ui/core/List";
import { giftListsCollection, updateGiftList, getLists } from "../utils/firebase";
import NewGiftCard from "../components/NewGiftCard";
import GifteeDetail from "../components/GifteeDetail";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Tooltip, IconButton } from "@material-ui/core";
import NewGifteeForm from "../components/NewGifteeForm";
import UserContext from "../context/UserContext";
import { useContext, useMemo } from "react";


const Lists: FC = () => {
    const [giftLists, setGiftLists] = useState<GiftList[]>([]);
    const [error, setError] = useState<string>("");
    const [selectedGiftList, setSelectedGiftList] = useState<GiftList>();
    const [selectedGiftee, setSelectedGiftee] = useState<Giftee>();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = giftListsCollection.onSnapshot(
            snapshot => {
                setGiftLists(
                    snapshot
                        .docs
                        .filter(doc => doc.data().user === user?.email)
                        .map(doc => { return { ...doc.data(), id: doc.id } })
                );
            },
            err => setError(err.message),
        );
        return () => unsubscribe();
    }, [user]);

    useMemo(() => {
        if (user?.email) {
            getLists(user).then(val => {
                setGiftLists(val);
            })
        }
    }, [user])

    console.log(giftLists);


    const onGiftListClick = async (giftListId: string) => {
        console.log("click on giftList: " + giftListId);
        setSelectedGiftList(() => giftLists!.find(l => l.id === giftListId));
    };

    const onGifteeClick = (gifteeId: string) => {
        console.log("click on giftee: " + gifteeId);
        setSelectedGiftee(selectedGiftList?.recipients?.find(l => l.id === gifteeId));
    };

    const onGifteeDelete = (gifteeId: string) => {
        console.log("delete giftee: " + gifteeId);
        selectedGiftList!.recipients = selectedGiftList!.recipients.filter(r => r.id !== gifteeId);

        updateGiftList(selectedGiftList!)
            .catch((error: Error) => {
                setError("Couldn't update the giftee.");
                console.log(error.message);
            });
    };

    const onSaveGifteeChanges = (updatedGiftee: Giftee) => {
        console.log(updatedGiftee);
        selectedGiftList!.recipients = selectedGiftList!.recipients.map(r => r.id === updatedGiftee.id ? updatedGiftee : r);

        updateGiftList(selectedGiftList!)
            .catch((error: Error) => {
                setError("Couldn't update the giftee.");
                console.log(error.message);
            });
    }

    const title = selectedGiftList?.name ?? "Your Gift Lists";
    return (
        <div>
            <Typography variant="h3" align="center">{title}</Typography>
            {error && <p>error</p>  /* TOOD:show error on download */}
            {
                selectedGiftList &&
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">
                            <Tooltip title="Go back">
                                <IconButton onClick={() => {
                                    setSelectedGiftList(undefined);
                                    setSelectedGiftee(undefined);
                                }}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Tooltip>
                            Giftees
                        </Typography>
                        <List style={{borderStyle: "solid"}}>
                            {
                                selectedGiftList.recipients && selectedGiftList.recipients.map(rec => (
                                    <GifteeListItem key={rec.id} giftee={rec} onClick={onGifteeClick} onDelete={onGifteeDelete}/>
                                ))
                            }
                            <NewGifteeForm key={-1} giftList={selectedGiftList} onGifteeCreated={(giftee) => setSelectedGiftee(giftee)} />
                        </List>
                    </Grid>

                    {selectedGiftee &&
                        <Grid item container xs={12} md={6} spacing={5}>
                            <GifteeDetail selectedGiftee={selectedGiftee!} onSaveChanges={onSaveGifteeChanges} />
                        </Grid>
                    }
                </Grid>
            }

            {
                !selectedGiftList &&
                <Grid container direction='row' spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <NewGiftCard />
                    </Grid>
                    {giftLists.map(l => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <GiftCard key={l.id} onClick={onGiftListClick} giftList={l}/>
                        </Grid>
                    ))}
                </Grid>
            }
        </div >
    );
};

export default Lists;