import { Card, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { RegistryIndexItem } from "../_autogen/client.ts";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ModAuthors } from "./ModAuthors.tsx";
import { ModTags } from "./ModTags.tsx";
import { ModCategory } from "./ModCategory.tsx";

export type ModCardProps = {
  mod: RegistryIndexItem;
};
export function ModCard({ mod }: ModCardProps) {
  const navigate = useNavigate();
  return (
    <Card>
      <Flex gap={"md"}>
        <Flex
          maw={300}
          miw={300}
          mah={190}
          mih={190}
          h={190}
          w={300}
          flex={"auto"}
          justify={"center"}
        >
          <Image
            w={"100%"}
            h={"100%"}
            src={"https://dcs-mod-manager-registry.pages.dev/" + mod.imageUrl}
          />
        </Flex>
        <Stack justify={"space-between"} flex={"auto"} gap={"xs"}>
          <Stack gap={"xs"}>
            <Text
              fw={"bold"}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/${mod.id}`)}
            >
              {mod.name}
            </Text>
            <Text size={"sm"} lineClamp={3}>
              {mod.description}
            </Text>
          </Stack>
          <Stack gap={"xs"}>
            <Group gap={"xs"}>
              {mod.category && <ModCategory category={mod.category} />}
              <ModTags tags={mod.tags} />
            </Group>
            <Group gap={"xs"}>
              <ModAuthors authors={mod.authors} />
              <BsDot />
              <Text size={"sm"}>{mod.latest}</Text>
            </Group>
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
}
