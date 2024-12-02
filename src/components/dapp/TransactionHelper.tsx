import { useEffect, useMemo } from "react";
import { ResolvedRegister, UseSendTransactionReturnType } from "wagmi";
import Icon from "../primitives/Icon";
import Box from "../primitives/Box";
import Group from "../extenders/Group";
import Button from "../primitives/Button";
import Text from "../primitives/Text";
import Hash from "../primitives/Hash";
import Title from "../primitives/Title";
import Divider from "../primitives/Divider";

export type TransactionHelperProps = UseSendTransactionReturnType<ResolvedRegister["config"], unknown> & {
  execute?: () => void;
};

export default function TransactionHelper({ status, data,  variables, execute }: TransactionHelperProps) {
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
