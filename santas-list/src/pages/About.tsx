import React, { FC, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { giftListCount } from '../utils/firebase'
import { useTranslation } from 'react-i18next';

const About: FC = () => {
    const [listCount, setListCount] = useState<number>(0);
    const { t } = useTranslation();

    useEffect(() => {
        giftListCount().then(val =>
            setListCount(val));
    }, [])

    return <div>
        <br />
        <Typography variant="h3" align="center">
            {t('about.title')}
        </Typography>
        <br />

        <p>{t('about.description1')}</p>
        <p>{t('about.description2')}</p>
        <p>{t('about.description3', { listCount: listCount })}</p>
        <p><i>{t('about.creators')}</i></p>
    </div>;
};

export default About;