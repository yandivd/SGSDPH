import React from 'react';
import {useRouter} from "next/navigation";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import clsx from "clsx";

const SidebarLink = ({href, text}) => {
    const router = useRouter();

    const isActive = router.asPath === href;

    const linkClassName = clsx('link-sidebar', {
        'active': isActive, // Agrega la clase 'active' si isActive es true
    });

    return (
        <Link href={href} className={linkClassName}>
            <ListItemButton>
                <ListItemIcon>
                    <ArchiveIcon />
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </ListItemButton>
        </Link>
    );
};

export default SidebarLink;