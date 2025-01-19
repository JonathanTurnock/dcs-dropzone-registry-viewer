import {
  RegistryIndexItem,
  useGetRegistryEntry,
  useGetRegistryIndex,
} from "../_autogen/client.ts";
import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Divider,
  LoadingOverlay,
  Stack,
  Text,
  Textarea,
  Title,
  TypographyStylesProvider,
  Image
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage.tsx";
import { marked } from "marked";
import { MdOpenInNew } from "react-icons/md";
import styles from "./ModPage.module.css";
import { ReleaseSummary } from "../components/ReleaseSummary.tsx";
import { ModAuthors } from "../components/ModAuthors.tsx";
import { ModTags } from "../components/ModTags.tsx";
import { ModCategory } from "../components/ModCategory.tsx";
import { ReactNode } from "react";
import { css } from "../assets/Doctor Glitch.otf";
import { useMount } from "react-use";

export type SectionProps = {
  title: string;
  children: ReactNode;
};
function Section({ title, children }: SectionProps) {
  return (
    <Stack gap={"xs"}>
      <Title order={4} fw={500}>
        {title}
      </Title>
      {children}
    </Stack>
  );
}

function Page({ mod }: { mod: RegistryIndexItem }) {
  const navigate = useNavigate();
  const data = useGetRegistryEntry(mod.id);

  useMount(() => {
    scrollTo(0, 0);
  });

  if (data.error) {
    return (
      <ErrorPage
        title={"Failed to load mod"}
        message={
          <Stack gap={"xs"}>
            <Text>An error occurred while loading the mod.</Text>
            <Anchor href={"/"}>Return to the library</Anchor>
          </Stack>
        }
      />
    );
  }

  const latestRelease = data.data?.data.versions.find(
    (it) => it.version === data.data?.data.latest
  );

  return (
    <AppShell.Main m={"md"}>
      <LoadingOverlay visible={data.isLoading} />
      {data.data && (
        <Container className={styles.container}>
          <Stack className={styles.content}>
            <Breadcrumbs>
              <Anchor size={"sm"} onClick={() => navigate("/")}>
                Library
              </Anchor>
              <Anchor size={"sm"}>{mod.name}</Anchor>
            </Breadcrumbs>
            <TypographyStylesProvider className={"readme"}>
              {mod.imageUrl && (
                <Center>
                  <Image
                    src={`https://dcs-mod-manager-registry.pages.dev/${mod.imageUrl}`}
                    h="auto"
                    w="80%"
                    mah="50vh"
                    fit="contain"
                    alt="preview"
                    radius="sm"
                  />
                </Center>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(atob(data.data.data.content)),
                }}
              />
            </TypographyStylesProvider>
          </Stack>
          <Stack className={styles.aside}>
            <Stack p={"md"}>
              <Section title={"About"}>
                {data.data.data.category && (
                  <ModCategory category={data.data.data.category} />
                )}
                <Textarea
                  readOnly
                  variant={"unstyled"}
                  autosize
                  size={"sm"}
                  value={data.data.data.description}
                />
                <ModTags tags={data.data.data.tags} />

                <Text size={"sm"} c={"dimmed"}>
                  {data.data.data.license}
                </Text>
              </Section>

              <Stack gap={"xs"}>
                <Button
                  variant={"default"}
                  rightSection={<MdOpenInNew />}
                  onClick={() => window.open(`dropzone://library/${mod.id}`)}
                >
                  <Text
                    style={{
                      fontFamily: css.family,
                      color: "#f59e0f",
                    }}
                  >
                    Open in Dropzone
                  </Text>
                </Button>
              </Stack>

              <Divider color={"gray"} />

              <Section title={"Authors"}>
                <ModAuthors authors={data.data.data.authors} />
              </Section>

              <Divider color={"gray"} />

              <Section title={"Links"}>
                <Anchor href={data.data.data.homepage} target={"_blank"}>
                  Homepage
                </Anchor>
              </Section>

              <Divider color={"gray"} />

              <Section title={"Versions"}>
                {data.data.data.versions.reverse().map((release) => (
                  <ReleaseSummary
                    key={release.version}
                    release={release}
                    latest={release.version === latestRelease?.version}
                  />
                ))}
              </Section>
            </Stack>
          </Stack>
        </Container>
      )}
    </AppShell.Main>
  );
}

export function ModPage() {
  const { id } = useParams();
  const data = useGetRegistryIndex();

  const mod = data.data?.data.find((mod) => mod.id === id);

  if (data.isLoading) {
    return <LoadingOverlay visible />;
  }

  if (!mod) {
    return (
      <ErrorPage
        title={"Mod not found"}
        message={
          <Stack>
            <Text>The mod with the id "{id}" could not be found.</Text>
            <Anchor href={"/"}>Return to the library</Anchor>
          </Stack>
        }
      />
    );
  }

  return <Page mod={mod} />;
}
