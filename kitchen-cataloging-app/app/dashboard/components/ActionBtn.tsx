import React from 'react'
import Link from 'next/link';
import { Stack, Typography } from '@mui/material';

interface ActionBtn {
    scheme: "blue" | "green";
    link: string;
    title: string;
    logo: JSX.Element;
    description: string;
}

const ActionBtn = ({scheme, link, title, logo, description }: ActionBtn) => {

    const schemeChoices = [
        {
            name: 'green',
            bg: "bg-default-sys-light-tertiary-container",
            color1: "text-default-ref-tertiary-tertiary40",
            color2: "text-default-ref-tertiary-tertiary20",
        },
        {
            name: 'blue',
            bg: "bg-default-sys-light-primary-container",
            color1: "text-default-ref-primary-primary40",
            color2: "text-default-ref-primary-primary20",
        }
    ]

    const selectedScheme = schemeChoices.find(
      (choice) => choice.name === scheme
    );
    
  return (
    <Link href={link} className="w-full h-full">
      <Stack className={`p-3 md:p-6 w-full h-full ${selectedScheme?.bg}`}>
        <Stack direction="row" className="items-center gap-2 mb-2">
          {logo}
          <Typography
            className={`${selectedScheme?.color1}`}
            sx={{
              fontSize: { xs: "1.125rem", md: "1.5rem" },
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          className={`${selectedScheme?.color2}`}
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Link>
  );
}

export default ActionBtn
