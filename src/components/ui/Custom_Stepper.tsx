import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import RTL_Creator from "./RTL_Creator";
import vazirFont from "@/common/local-fonts/VazirFont";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(var(--color-primary-900)) 0%,rgb(233,64,87) 50%,rgb(var(--color-secondary-900)) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(var(--color-primary-900)) 0%,rgb(233,64,87) 50%,rgb(var(--color-secondary-900)) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#ffffff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 95deg,rgb(var(--color-primary-900)) 0%,rgb(233,64,87) 50%,rgb(var(--color-secondary-900)) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 95deg,rgb(var(--color-primary-900)) 0%,rgb(233,64,87) 50%,rgb(var(--color-secondary-900)) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps, iconsArray: React.ReactNode[]) {
  const { active, completed, className, icon } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {iconsArray[(icon as unknown as number) - 1]}
    </ColorlibStepIconRoot>
  );
}

export default function Custom_Stepper({
  stepsLabels,
  stepsIcons,
  step,
}: {
  step: number;
  stepsIcons: React.ReactNode[];
  stepsLabels: string[];
}) {
  return (
    <RTL_Creator>
      <Stack
        sx={{
          width: "100%",
          color: "#ffffff",
          "& .MuiStepLabel-label": {
            color: "#ffffff !important",
            ...vazirFont.style,
          },
        }}
        spacing={4}
      >
        {stepsLabels.length !== stepsIcons.length ? (
          <>تعداد آیکون ها باید با تعداد لیبل ها برابر باشد.</>
        ) : (
          <Stepper
            alternativeLabel
            activeStep={step}
            connector={<ColorlibConnector />}
          >
            {stepsLabels.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={(props: {
                    active: boolean;
                    completed: boolean;
                    error: boolean;
                    icon: number;
                  }) => {
                    return ColorlibStepIcon(props, stepsIcons);
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Stack>
    </RTL_Creator>
  );
}
