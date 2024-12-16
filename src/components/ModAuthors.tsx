import { EntryIndexAuthorsItem } from "../_autogen/client.ts";
import { Avatar, AvatarGroup, Tooltip } from "@mantine/core";

export type ModAuthorsProps = {
  authors: EntryIndexAuthorsItem[];
};
export function ModAuthors({ authors }: ModAuthorsProps) {
  return (
    <AvatarGroup>
      {authors.map((author) => (
        <Tooltip label={author.name} key={author.name}>
          <Avatar
            key={author.name}
            src={author.avatar}
            name={author.name}
            color={"initials"}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  );
}
