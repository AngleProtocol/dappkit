import { useMemo } from "react";
import type { ResolvedRegister, UseSendTransactionReturnType } from "wagmi";
import Group from "../extenders/Group";
import Box from "../primitives/Box";
import Button from "../primitives/Button";
import Divider from "../primitives/Divider";
import Hash from "../primitives/Hash";
import Icon from "../primitives/Icon";
import Text from "../primitives/Text";
import Title from "../primitives/Title";

export type TransactionHelperProps = UseSendTransactionReturnType<ResolvedRegister["config"], unknown> & {
  execute?: () => void;
};

export default function TransactionHelper({ status, data, variables }: TransactionHelperProps) {
  const statusBar = useMemo(() => {
    switch (status) {
      case "error":
        return (
          <Button coloring="warn" look="hype" className="justify-center">
            <Group>
              <Icon className="animate-spin" remix="RiSendPlaneLine" />
              <Text className="text-center" size="xs">
                Resend
              </Text>
            </Group>
          </Button>
        );
      case "idle":
        return (
          <Box look="soft" className="justify-center">
            <Group>
              <Icon className="animate-spin" remix="RiLoader3Line" />
              <Text className="text-center" size="xs">
                Idle
              </Text>
            </Group>
          </Box>
        );
      case "pending":
        return (
          <Box look="soft" className="justify-center">
            <Group>
              <Icon size="sm" className="animate-spin" remix="RiLoader3Line" />
              <Text className="text-center" size="xs">
                Pending
              </Text>
            </Group>
          </Box>
        );
      case "success":
        return (
          <Button look="soft" className="justify-center">
            <Group>
              <Icon size="sm" className="animate-spin" remix="RiCheckboxCircleLine" />
              <Text className="text-center" size="xs">
                Pending
              </Text>
            </Group>
          </Button>
        );
      default:
        break;
    }
  }, [status]);

  return (
    <>
      <Group size="xs" className="flex-col">
        <Group size="xl" className="justify-between">
          <Text size="xs">Transaction</Text>
          <Hash format={"short"}>{data}</Hash>
        </Group>
        <Group size="sm">
          <Icon size={"sm"} remix="RiCreativeCommonsByFill" />
          <Title h={4} size={"lg"}>
            Approve
          </Title>
        </Group>
        <Group className="justify-between">
          <Text size="xs">to</Text>
          <Hash size="xs" format="short">
            {variables?.to ?? ""}
          </Hash>
        </Group>
        <Divider horizontal look="soft" />
        <Text size="xs">status</Text>
      </Group>
      {statusBar}
    </>
  );
}
