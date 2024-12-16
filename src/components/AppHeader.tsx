import { AppShell, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { BsDownload } from "react-icons/bs";
import { css } from "../assets/Doctor Glitch.otf";

export function AppHeader() {
  return (
    <AppShell.Header>
      <Stack pl={"md"} h={"100%"} justify={"center"}>
        <Group justify={"space-between"}>
          <Group>
            <Text
              style={{
                fontSize: "xx-large",
                fontFamily: css.family,
                color: "#f59e0f",
              }}
            >
              Dropzone
            </Text>
            <Divider orientation={"vertical"} />
            <Text
              style={{
                fontFamily: "Montserrat",
                width: 250,
              }}
            >
              Community Mod Manager for DCS World
            </Text>
          </Group>
          <Stack gap={2} pr={"md"}>
            <Button
              rightSection={<BsDownload />}
              color={"#f59e0f"}
              onClick={() =>
                window.open(
                  "https://github.com/flying-dice/dcs-dropzone-mod-manager/releases",
                )
              }
            >
              Get it on Github
            </Button>
          </Stack>
        </Group>
      </Stack>
    </AppShell.Header>
  );
}
