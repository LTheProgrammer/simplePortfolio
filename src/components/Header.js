import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {

  const previousScroll = useRef(0);
  const [translateY,setTranslateY] = useState(0);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > previousScroll.current) {
      setTranslateY(-200);
    } else if (window.scrollY < previousScroll.current) {
      setTranslateY(0);
    }
    previousScroll.current = window.scrollY;
  };

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  };
}, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={`translateY(${translateY}px)`}
      transition="transform 1s ease-in-out"      
      backgroundColor="#18181b"
      zIndex={1}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={4}>
              {socials.map((social,i) => (
                <a href={social.url} target="_blank" key={i}>
                  <FontAwesomeIcon  icon={social.icon}  size="3x"/>
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a onClick={handleClick("contact-me")}>Contact Me</a>
              <a onClick={handleClick("projects")}>Projects</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
