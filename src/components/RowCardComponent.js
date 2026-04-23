import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function InteractiveCard({ repoOwner, repoName, lastModification, codeLang, link_to }) {
    return (
        <Card
            color="neutral"
            invertedColors
            variant="solid"
            orientation="horizontal"
            sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                height: 'auto',
                maxWidth: 345,
                overflow: 'hidden',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <CardContent sx={{ overflow: 'hidden' }}>
                <Typography level="title-lg" id="card-description" className="card-owner" noWrap>
                    {repoOwner}
                </Typography>
                <Typography level="title-lg" id="card-description-repo-name" noWrap>
                    {repoName.slice(0, 15)}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Link
                        overlay
                        underline="none"
                        href={link_to}
                        target="_blank"
                        sx={{ color: 'text.tertiary' }}
                    >
                        {lastModification}
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