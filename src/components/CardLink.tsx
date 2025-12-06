import { Card, CardActionArea, Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type CardLinkProps = {
  title: string;
  href: string;
  icon: ReactNode;
};

export function CardLink({ title, icon }: CardLinkProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #edf2f7",
      }}
    >
      <CardActionArea sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              className="icon-box"
              sx={{
                display: "flex",
                p: 1.5,
                borderRadius: "12px",
                bgcolor: "#f5f7fa",
                color: "text.secondary",
              }}
            >
              {icon}
            </Box>

            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>

          <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
        </Box>
      </CardActionArea>
    </Card>
  );
}