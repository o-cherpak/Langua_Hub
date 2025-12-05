import {Card, CardActionArea, CardContent, Icon} from "@mui/material";
import Typography from "@mui/material/Typography";
import type {ReactNode} from "react";

type CardLinkProps = {
  title: string;
  href: string;
  icon: ReactNode;
}

export function CardLink({title, icon}: CardLinkProps) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardActionArea>
        <CardContent sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>

          <Icon>
            {icon}
          </Icon>

          <Typography variant="h6">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
