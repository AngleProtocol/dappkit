import { type ReactNode, useCallback } from "react";
import { type ResolvedRegister, type UseSendTransactionReturnType, useSendTransaction } from "wagmi";
import Button, { type ButtonProps } from "../primitives/Button";
import Icon from "../primitives/Icon";

export type TransactionButtonProps = ButtonProps & {
  tx?: Parameters<UseSendTransactionReturnType<ResolvedRegister["config"], unknown>["sendTransaction"]>["0"];
  name?: ReactNode;
};

export default function TransactionButton({ tx, name, children, ...props }: TransactionButtonProps) {
  const sendTxHook = useSendTransaction();
  const { sendTransaction, status } = sendTxHook;

  const execute = useCallback(() => {
    if (!tx) return;

    sendTransaction({
      to: tx.to as `0x${string}`,
      data: tx.data as `0x${string}`,
    });
  }, [tx, sendTransaction]);

  return (
    <Button {...props} onClick={execute}>
      {children}
      {status === "pending" && <Icon className="animate-spin" remix="RiLoader2Line" />}
    </Button>
  );
}
