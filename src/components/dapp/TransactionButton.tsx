import { type ReactNode, useCallback } from "react";
import { type ResolvedRegister, type UseSendTransactionReturnType, useSendTransaction } from "wagmi";
import { useWalletContext } from "../../context/Wallet.context";
import Button, { type ButtonProps } from "../primitives/Button";
import Icon from "../primitives/Icon";

export type TransactionButtonProps = ButtonProps & {
  tx?: Parameters<UseSendTransactionReturnType<ResolvedRegister["config"], unknown>["sendTransaction"]>["0"];
  name?: ReactNode;
  onExecute?: (hash: string) => void;
};

export default function TransactionButton({ tx, name, children, onExecute, ...props }: TransactionButtonProps) {
  const sendTxHook = useSendTransaction();
  const { status } = sendTxHook;
  const { address: user, client, sendTransaction } = useWalletContext();

  const execute = useCallback(async () => {
    console.log("CLIENT", client);

    if (!tx || !user || !client) return;

    const hash = await sendTransaction?.([
      {
        chain: client.chain,
        account: user,
        to: tx.to,
        data: tx.data,
        value: tx.value,
      },
    ]);

    hash && onExecute?.(hash);
  }, [tx, client, user, sendTransaction, onExecute]);

  return (
    <Button {...props} onClick={execute}>
      {children}
      {status === "pending" && <Icon className="animate-spin" remix="RiLoader2Line" />}
    </Button>
  );
}
