import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC, useEffect } from "react";
import { Giftee, GiftList } from "../data/DataTypes";
import { useState } from "react";
import GifteeListItem from "../components/GifteeListItem";
import GiftCard from "../components/GiftCard";
import List from "@material-ui/core/List";
import { getLists, setGiftee, deleteGiftee, deleteGift, deleteGiftList } from "../utils/firebase";
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
        setSelectedGiftList(() => giftLists!.find(l => l.id === giftListId));
    };

    const onGiftListDelete = async (giftList: GiftList) => {
        await deleteGiftList(giftList);
        setChange((ch) => (ch + 1) % 100);
    };

    const onGifteeClick = (gifteeId: string) => {
        setSelectedGiftee(selectedGiftList?.recipients?.find(l => l.id === gifteeId));
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
            }).catch((error: Error) => {
                setError("Couldn't delete the giftee.");
                console.log(error.message);
            })
        }

    };

    const onGiftDelete = (giftId: string) => {
        if (selectedGiftee?.id && selectedGiftList?.id) {
            let updatedLists: GiftList[] = [...giftLists];
            let updatedList: GiftList = { ...selectedGiftList };
            let updatedGiftee = { ...selectedGiftee };

            updatedGiftee.gifts = selectedGiftee.gifts.filter(g => g.id !== giftId);
            updatedList!.recipients = selectedGiftList!.recipients.map(r => r.id === updatedGiftee.id ? updatedGiftee : r);

            deleteGift(giftId, selectedGiftee, selectedGiftList.id).then(() => {
                updatedLists.forEach((item, index) => {
                    if (item.id === selectedGiftList.id) {
                        updatedLists.splice(index, 1);
                    }
                });

                updatedLists.push(updatedList);
                setGiftLists([...updatedLists]);
                setSelectedGiftee(updatedGiftee);
                setChange((ch) => (ch + 1) % 100);

            }).catch((error: Error) => {
                setError("Couldn't delete the gift.");
                console.log(error.message);
            })
        }

    }

    const onSaveGifteeChanges = (updatedGiftee: Giftee) => {
        if (user?.email && selectedGiftList?.id) {
            let updatedLists: GiftList[] = giftLists;
            let updatedList: GiftList = selectedGiftList;
            updatedList!.recipients = selectedGiftList!.recipients.map(r => r.id === updatedGiftee.id ? updatedGiftee : r);

            setGiftee(selectedGiftList.name, updatedGiftee, user).then(() => {
                updatedLists.forEach((item, index) => {
                    if (item.id === selectedGiftList.id) {
                        updatedLists.splice(index, 1);
                    }
                })
                updatedLists.push(updatedList);
                setGiftLists([...updatedLists]);
                setChange((ch) => (ch + 1) % 100);
            }).catch((error: Error) => {
                setError("Couldn't update the giftee.");
                console.log(error.message);
            })
        }
    }

    const title = selectedGiftList?.name ?? "Your Gift Lists";
    return (
        <div>

            <br />
            <Typography variant="h3" align="center">{title}</Typography>
            <br />

            {error && <p>{error}</p>  /* TOOD:show error on download */}
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
                        <List style={{ borderStyle: "solid" }}>
                            {
                                selectedGiftList.recipients && selectedGiftList.recipients.map(rec => (
                                    <GifteeListItem key={rec.id} giftee={rec} onClick={onGifteeClick} onDelete={onGifteeDelete} />
                                ))
                            }
                            <NewGifteeForm key={-1} giftList={selectedGiftList} onGifteeCreated={(giftee) => setSelectedGiftee(giftee)} />
                        </List>
                    </Grid>

                    {selectedGiftee &&
                        <Grid item container xs={12} md={6} spacing={5}>
                            <GifteeDetail selectedGiftee={selectedGiftee!} onSaveChanges={onSaveGifteeChanges} onGiftDelete={onGiftDelete} change={change} />
                        </Grid>
                    }
                </Grid>
            }

            {
                !selectedGiftList &&
                <Grid container direction='row' spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <NewGiftCard giftLists={giftLists} setGiftListsState={setGiftLists} />
                    </Grid>
                    {giftLists.map(l => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <GiftCard key={l.id} onClick={onGiftListClick} onDelete={onGiftListDelete} giftList={l}/>
                        </Grid>
                    ))}
                </Grid>
            }
        </div >
    );
};

export default Lists;