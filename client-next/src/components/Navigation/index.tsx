import * as React from "react";
import { useTranslation } from "next-i18next";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";

import style from "@/styles/navigation.module.scss";

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { t } = useTranslation("navigation");
  const router = useRouter();
  const [pageLink, setPageLink] = React.useState(router.pathname);

  const pages = [
    { link: "/", label: t("1") },
    { link: "/projects", label: t("2") },
    { link: "/resume", label: t("3") },
    { link: "/blog", label: t("4") },
    { link: "/about", label: t("5") },
    { link: "/contact", label: t("6") },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (currentPageLink) => {
    if (currentPageLink) setPageLink(currentPageLink);
    setAnchorElNav(null);
  };

  return (
    <AppBar color="transparent">
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              sx={{ color: "white" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page.link} href={page.link} passHref>
                  <MenuItem onClick={() => handleCloseNavMenu(page.link)}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              mr: "5rem",
            }}
          >
            {pages.map((page) => (
              <Link key={page.link} href={page.link} passHref>
                <Button
                  onClick={() => handleCloseNavMenu(page.link)}
                  sx={{ my: 2, mx: "auto", color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Link href={pageLink} locale={(router.locale = "pt")} passHref>
              <a>
                <img
                  src="/img/br-flag.png"
                  alt="Portuguese"
                  className={style.flag}
                />
              </a>
            </Link>
            <Link href={pageLink} locale={(router.locale = "en")} passHref>
              <a>
                <img
                  src="/img/usa-flag.png"
                  alt="English"
                  className={style.flag}
                />
              </a>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href={pageLink} locale={(router.locale = "pt")} passHref>
              <a>
                <img
                  src="/img/br-flag.png"
                  alt="Portuguese"
                  className={style.flag__xl}
                />
              </a>
            </Link>
            <Link href={pageLink} locale={(router.locale = "en")} passHref>
              <a>
                <img
                  src="/img/usa-flag.png"
                  alt="English"
                  className={style.flag__xl}
                />
              </a>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
