import { useGetRegistryIndex } from "../_autogen/client.ts";
import {
  AppShell,
  Container,
  Pagination,
  Stack,
  TextInput,
  Text,
  Card,
} from "@mantine/core";
import { ModCard } from "../components/ModCard.tsx";
import { usePagination } from "@mantine/hooks";
import { useFuse } from "../hooks/useFuse.ts";
import { BsSearch } from "react-icons/bs";

export function IndexPage() {
  const data = useGetRegistryIndex();
  const { results, search, setSearch } = useFuse(data.data?.data || [], "", [
    "name",
    "description",
  ]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil((results.length || 0) / itemsPerPage);
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
  });

  const paginatedData = results.slice(
    (pagination.active - 1) * itemsPerPage,
    pagination.active * itemsPerPage,
  );

  return (
    <AppShell.Main m={"md"}>
      <Container>
        <Stack>
          <TextInput
            value={search}
            onChange={(it) => it && setSearch(it.target.value)}
            placeholder={"Search..."}
            leftSection={<BsSearch />}
          />

          {paginatedData?.map((mod) => <ModCard key={mod.id} mod={mod} />)}
          <Card style={{ cursor: "pointer" }}>
          <Stack justify={"space-between"} flex={"auto"} gap={"xs"}>
              <Text fw={"bold"}>Help us expand our mod library by registering it with us.</Text>
                <Text>
                  Best Inform the mod owner of us and ask them raise a Pull Request with us at our{' '}
                  <a href="https://github.com/flying-dice/dcs-dropzone-registry">Registry</a>. This
                  means they can inform us of mod releases so your always upto date.
                </Text>
            </Stack>
            </Card>

          <Pagination
            total={totalPages}
            value={pagination.active}
            onChange={pagination.setPage}
          />
        </Stack>
      </Container>
    </AppShell.Main>
  );
}
