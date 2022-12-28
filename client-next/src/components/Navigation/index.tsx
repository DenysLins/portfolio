import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const ImageContainer = styled(Image)({
  transition: "all 0.3s",
  width: "3rem",
  height: "auto",
  cursor: "pointer",
  zIndex: 2000,
  marginRight: "1rem",

  "&:active": {
    transform: "translateY(-0.5rem)",
  },
});

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { t } = useTranslation("navigation");
  const router = useRouter();

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: "0px 1px 10px 2px rgb(255 255 255 / 25%)",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page.link} href={page.link} passHref>
                  <MenuItem onClick={handleCloseNavMenu}>
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
            }}
          >
            {pages.map((page) => (
              <Link key={page.link} href={page.link} passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: "auto",
                    color: "white",
                    display: "block",
                    fontWeight: "normal",
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Link
              href={{
                pathname: router.pathname,
                query: router.query,
              }}
              locale={(router.locale = "pt")}
              passHref
            >
              <ImageContainer
                src="/img/br-flag.png"
                alt="Brazil flag"
                width={48}
                height={32}
              />
            </Link>
            <Link
              href={{
                pathname: router.pathname,
                query: router.query,
              }}
              locale={(router.locale = "en")}
              passHref
            >
              <ImageContainer
                src="/img/usa-flag.png"
                alt="USA flag"
                width={48}
                height={32}
              />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              href={{
                pathname: router.pathname,
                query: router.query,
              }}
              locale={(router.locale = "pt")}
              passHref
            >
              <ImageContainer
                src="/img/br-flag.png"
                alt="Brazil flag"
                width={48}
                height={32}
              />
            </Link>
            <Link
              href={{
                pathname: router.pathname,
                query: router.query,
              }}
              locale={(router.locale = "en")}
              passHref
            >
              <ImageContainer
                src="/img/usa-flag.png"
                alt="USA flag"
                width={48}
                height={32}
              />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
