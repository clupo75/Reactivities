import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({ children, to }: { children: ReactNode, to: string }) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            // use the '&.active' selector to style the active link is added by NavLink
            sx={{
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                '&.active': {
                    color: 'yellow',
                },
            }}
        >
            {children}
        </MenuItem>
    )
}