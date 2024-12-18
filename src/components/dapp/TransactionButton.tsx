import { type ReactNode, useCallback } from "react";
import { type ResolvedRegister, type UseSendTransactionReturnType, useSendTransaction } from "wagmi";
import Button, { type ButtonProps } from "../primitives/Button";
import Icon from "../primitives/Icon";

export type TransactionButtonProps = ButtonProps & {
  tx?: Parameters<UseSendTransactionReturnType<ResolvedRegister["config"], unknown>["sendTransaction"]>["0"];
  name?: ReactNode;
  onExecute?: (hash: string) => void;
};

export default function TransactionButton({ tx, name, children, onExecute, ...props }: TransactionButtonProps) {
  const sendTxHook = useSendTransaction();
  const { sendTransactionAsync, status } = sendTxHook;

  const execute = useCallback(async () => {
    if (!tx) return;

    const hash = await sendTransactionAsync({
      to: tx.to as `0x${string}`,
      data: tx.data as `0x${string}`,
    });

    onExecute?.(hash);
  }, [tx, sendTransactionAsync, onExecute]);

  return (
    <Button {...props} onClick={execute}>
      {children}
      {status === "pending" && <Icon className="animate-spin" remix="RiLoader2Line" />}
    </Button>
  );
}
