import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function InteractiveCard({ repoOwner, repoName, ultimaModifica, codeLang, link_to }) {
    return (
        <Card
            color="neutral"
            invertedColors
            variant="solid"
            orientation="horizontal"
            sx={{
                width: 150,
                height: 150,
                maxWidth: 345,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <CardContent>
                <Typography level="title-lg" id="card-description" >
                    {repoOwner}
                </Typography>
                <Typography level="title-lg" id="card-description-repo-name">
                    {repoName.slice(0, 15)}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                    <Link
                        overlay
                        underline="none"
                        href={link_to}
                        target="_blank"
                        sx={{ color: 'text.tertiary' }}
                    >
                        {ultimaModifica}
                    </Link>
                </Typography>
                <Chip
                    variant="outlined"
                    size="sm"
                    sx={{
                        pointerEvents: 'none',
                    }}
                >
                    {codeLang}
                </Chip>
            </CardContent>
        </Card >
    );
}