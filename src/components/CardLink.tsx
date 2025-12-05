import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import type {ReactNode} from "react";
import Box from "@mui/material/Box";

type CardLinkProps = {
  title: string;
  href: string;
  icon: ReactNode;
}

export function CardLink({title, icon}: CardLinkProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        display: "flex",
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            paddingY: 2,
            paddingX: 3,
          }}
        >
          <Box
            sx={{
              color: "primary.main",
              display: "flex",
              "& svg": {
                fontSize: 40,
              }
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h6"
            sx={{fontWeight: 600, textAlign: "center"}}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

